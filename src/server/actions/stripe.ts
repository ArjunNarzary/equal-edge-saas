"use server"

import { PaidTierNames } from "@/data/subscriptionTiers"
import { auth, currentUser } from "@clerk/nextjs/server"
import { getUserSubscription, updateUserSubscription } from "../db/subscription"
import { Stripe } from "stripe"
import { env as serverEnv } from "@/data/env/server"
import { env as clientEnv } from "@/data/env/client"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { UserSubscriptionTable } from "@/drizzle/schema"

const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY)

export async function createCancelSession() {
  const user = await currentUser()
  if (!user) throw new Error()

  const subscription = await getUserSubscription(user.id)
  if (!subscription) throw new Error()

  await updateUserSubscription(eq(UserSubscriptionTable.clerkUserId, user.id), {
    tier: "Free",
  })

  redirect("/dashboard/subscription")
}

export async function createCustomerPortalSession() {
  const { userId } = await auth()

  if (!userId) throw new Error()

  const subscription = await getUserSubscription(userId)

  if (!subscription?.stripeCustomerId) throw new Error()

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/dashboard/subscription`,
  })

  redirect(portalSession.url)
}

export async function createCheckoutSession(tier: PaidTierNames) {
  const user = await currentUser()
  if (!user) throw new Error()

  const subscription = await getUserSubscription(user.id)
  if (!subscription) throw new Error()

  await updateUserSubscription(eq(UserSubscriptionTable.clerkUserId, user.id), {
    tier: tier,
  })

  redirect("/dashboard/subscription")
}
