-- CreateTable
CREATE TABLE "Account" (
    "id" VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "type" VARCHAR(191) NOT NULL,
    "provider" VARCHAR(191) NOT NULL,
    "providerAccountId" VARCHAR(191) NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" VARCHAR(191),
    "scope" VARCHAR(191),
    "id_token" TEXT,
    "session_state" VARCHAR(191),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" VARCHAR(191) NOT NULL,
    "sessionToken" VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(191) NOT NULL,
    "name" VARCHAR(191),
    "email" VARCHAR(191),
    "emailVerified" TIMESTAMP(3),
    "image" VARCHAR(191),
    "firstName" VARCHAR(191),
    "lastName" VARCHAR(191),
    "phone" VARCHAR(191),
    "isGuest" BOOLEAN NOT NULL DEFAULT true,
    "passwordHash" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" VARCHAR(191) NOT NULL,
    "token" VARCHAR(191) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "token" VARCHAR(191) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy" (
    "id" VARCHAR(191) NOT NULL,
    "userId" VARCHAR(191) NOT NULL,
    "externalPolicyId" VARCHAR(191),
    "policyType" VARCHAR(191),
    "planCategory" VARCHAR(191) NOT NULL,
    "destination" VARCHAR(191) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE INDEX "PasswordResetToken_email_idx" ON "PasswordResetToken"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
