-- AlterTable
ALTER TABLE `Policy`
    ADD COLUMN `externalPolicyId` VARCHAR(191) NULL,
    ADD COLUMN `policyType` VARCHAR(191) NULL;
