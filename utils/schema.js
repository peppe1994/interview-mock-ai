import {varchar, pgTable, serial, text, timestamp, boolean} from 'drizzle-orm/pg-core';

export const MockInterview=pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull()
})

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),

})


export const Subscriptions = pgTable('subscriptions', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id').notNull(),
    stripeSubscriptionId: varchar('stripe_subscription_id', {
        length: 255
    }).notNull(),
    plan: varchar('plan', {
        length: 50
    }).notNull(),
    status: varchar('status', {
        length: 50
    }).notNull(),
    currentPeriodStart: timestamp('current_period_start').notNull(),
    currentPeriodEnd: timestamp('current_period_end').notNull(),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
})