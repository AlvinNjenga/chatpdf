import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// System messages are the LLM replies.
export const userSystemEnum = pgEnum("user_system_enum", ['system', 'user']);

export const chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    pdfName: text('pdf_name').notNull(),
    pdfUrl: text('pdf_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    userId: varchar('user_id', {length:256}).notNull(), // UserID comes from Clerk. 
    fileKey: text('file_key').notNull() // FileKey references AWS bucket for the PDF file
})

export const messages = pgTable("messages", {
    id: serial('serial').primaryKey(),
    chatId: integer('chat_id').references(()=>chats.id).notNull(), // Foreign key for above chats.
    content: text('content').notNull(),
    createdAt: timestamp('created_at'),
    role: userSystemEnum('role').notNull()
})