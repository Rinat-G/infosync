--liquibase formatted sql

--changeset gimaletdinov-rr:infosync_ddl_initial_001 runOnChange:true failOnError:true
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM pg_tables WHERE  schemaname = 'INFOSYNC'
CREATE SCHEMA "INFOSYNC";

--changeset gimaletdinov-rr:infosync_ddl_initial_001 runOnChange:true failOnError:true
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM pg_tables WHERE  schemaname = 'INFOSYNC' AND tablename  = 'GROUP'
CREATE TABLE "GROUP"
(
    "ID"   BIGINT GENERATED BY DEFAULT AS IDENTITY,
    "NAME" VARCHAR(100) NOT NULL,
    CONSTRAINT "GROUP_PK" PRIMARY KEY ("ID"),
    CONSTRAINT "GROUP_NAME_U" UNIQUE ("NAME")
);

--changeset gimaletdinov-rr:infosync_ddl_initial_001 runOnChange:true failOnError:true
CREATE TABLE "USER"
(
    "ID"         BIGINT GENERATED BY DEFAULT AS IDENTITY,
    "FIRST_NAME" VARCHAR      NOT NULL,
    "LAST_NAME"  VARCHAR      NOT NULL,
    "PATRONYMIC" VARCHAR,
    "GROUP"      BIGINT,
    "TYPE"       VARCHAR(100) NOT NULL DEFAULT 'STUDENT',
    CONSTRAINT "USER_PK" PRIMARY KEY ("ID"),
    CONSTRAINT "USER_GROUP_FK" FOREIGN KEY ("GROUP") REFERENCES "GROUP" ("ID") ON DELETE SET NULL,
    CONSTRAINT "USER_FULL_NAME_GROUP_U" UNIQUE ("FIRST_NAME", "LAST_NAME", "PATRONYMIC", "GROUP")
);


--changeset gimaletdinov-rr:infosync_ddl_initial_001 runOnChange:true failOnError:true
CREATE TABLE "POST"
(
    "ID"             BIGINT GENERATED BY DEFAULT AS IDENTITY,
    "TITLE"          VARCHAR NOT NULL,
    "POST_LINK"      VARCHAR NOT NULL,
    "POST_BODY"      VARCHAR NOT NULL,
    "GROUP"          BIGINT  NOT NULL,
    "RECOMMENDED_BY" BIGINT  NOT NULL,
    CONSTRAINT "POST_PK" PRIMARY KEY ("ID"),
    CONSTRAINT "POST_GROUP_FK" FOREIGN KEY ("GROUP") REFERENCES "GROUP" ("ID"),
    CONSTRAINT "POST_RECOMMENDED_BY_FK" FOREIGN KEY ("RECOMMENDED_BY") REFERENCES "USER" ("ID") ON DELETE SET NULL
);


--changeset gimaletdinov-rr:infosync_ddl_initial_001 runOnChange:true failOnError:true
CREATE TABLE "ESSAY"
(
    "ID"     BIGINT GENERATED BY DEFAULT AS IDENTITY,
    "POST"   BIGINT  NOT NULL,
    "AUTHOR" BIGINT  NOT NULL,
    "TEXT"   VARCHAR NOT NULL,
    CONSTRAINT "ESSAY_PK" PRIMARY KEY ("ID"),
    CONSTRAINT "ESSAY_POST_FK" FOREIGN KEY ("POST") REFERENCES "POST" ("ID") ON DELETE CASCADE,
    CONSTRAINT "ESSAY_AUTHOR_FK" FOREIGN KEY ("AUTHOR") REFERENCES "USER" ("ID") ON DELETE SET NULL,
    CONSTRAINT "ESSAY_POST_AUTHOR_U" UNIQUE ("POST", "AUTHOR"   )
);


--changeset gimaletdinov-rr:infosync_ddl_initial_001 runOnChange:true failOnError:true
CREATE TABLE "POST_STATUS"
(
    "USER"   BIGINT NOT NULL,
    "POST"   BIGINT NOT NULL,
    "READED" BOOL   NOT NULL,
    CONSTRAINT "POST_STATUS_PK" PRIMARY KEY ("USER", "POST"),
    CONSTRAINT "POST_STATUS_USER_FK" FOREIGN KEY ("USER") REFERENCES "USER" ("ID") ON DELETE CASCADE,
    CONSTRAINT "POST_STATUS_POST_FK" FOREIGN KEY ("POST") REFERENCES "POST" ("ID") ON DELETE CASCADE
);


--changeset gimaletdinov-rr:infosync_ddl_initial_001 runOnChange:true failOnError:true
CREATE TABLE "RATING"
(
    "ID"      BIGINT GENERATED BY DEFAULT AS IDENTITY,
    "ESSAY"   BIGINT NOT NULL,
    "MARK"    INT    NOT NULL,
    "MARK_BY" BIGINT NOT NULL,
    CONSTRAINT "RATING_PK" PRIMARY KEY ("ID"),
    CONSTRAINT "RATING_ESSAY_FK" FOREIGN KEY ("ESSAY") REFERENCES "ESSAY" ("ID") ON DELETE CASCADE,
    CONSTRAINT "RATING_MARK_BY_FK" FOREIGN KEY ("MARK_BY") REFERENCES "USER" ("ID") ON DELETE SET NULL,
    CONSTRAINT "RATING_ESSAY_MARK_BY_U" UNIQUE ("ESSAY", "MARK_BY")
);


--changeset gimaletdinov-rr:infosync_ddl_initial_001 runOnChange:true failOnError:true
CREATE TABLE "COMMENT"
(
    "ID"     BIGINT GENERATED BY DEFAULT AS IDENTITY,
    "ESSAY"  BIGINT  NOT NULL,
    "AUTHOR" BIGINT  NOT NULL,
    "TEXT"   VARCHAR NOT NULL,
    CONSTRAINT "COMMENT_PK" PRIMARY KEY ("ID"),
    CONSTRAINT "COMMENT_ESSAY_FK" FOREIGN KEY ("ESSAY") REFERENCES "ESSAY" ("ID") ON DELETE CASCADE,
    CONSTRAINT "COMMENT_AUTHOR_FK" FOREIGN KEY ("AUTHOR") REFERENCES "USER" ("ID") ON DELETE SET NULL
);

