-- AlterEnum
ALTER TYPE "FieldType" ADD VALUE 'DateTime';

create index if not exists "index_embedding_description" on "Events" using hnsw (embedding_description vector_cosine_ops);
create index if not exists "index_embedding_title" on "Events" using hnsw (embedding_title vector_cosine_ops);