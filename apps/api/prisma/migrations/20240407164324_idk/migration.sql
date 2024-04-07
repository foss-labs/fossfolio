-- AlterTable
ALTER TABLE "Events" ADD COLUMN "embedding" vector;
ALTER TABLE "Events" ALTER COLUMN "embedding" TYPE vector(768);

create index on "Events" using hnsw (embedding vector_cosine_ops);

