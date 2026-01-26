-- Script to fix duplicate index issue
-- Run this in your MySQL database to identify and remove duplicate indexes

-- First, check which table has the problematic index
SELECT 
    TABLE_NAME,
    INDEX_NAME,
    COLUMN_NAME,
    SEQ_IN_INDEX
FROM 
    INFORMATION_SCHEMA.STATISTICS
WHERE 
    INDEX_NAME = 'IDX_4542dd2f38a61354a040ba9fd5'
    AND TABLE_SCHEMA = DATABASE();

-- Drop the duplicate index (replace 'table_name' with the actual table name from above)
-- Uncomment and run the appropriate DROP INDEX command:
-- ALTER TABLE table_name DROP INDEX IDX_4542dd2f38a61354a040ba9fd5;
