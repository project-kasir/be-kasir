-- DropForeignKey
ALTER TABLE `categories` DROP FOREIGN KEY `categories_parent_id_fkey`;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
