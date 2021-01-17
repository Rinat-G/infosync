--liquibase formatted sql

--changeset gimaletdinov-rr:infosync_ddl_initial_001 runonchange:true failonerror:true
--precondition-sql-check expectedresult:0 select count(*) from pg_tables where  schemaname = 'infosync'
CREATE SCHEMA infosync;

--changeset gimaletdinov-rr:infosync_ddl_initial_001 runonchange:true failonerror:true
--precondition-sql-check expectedresult:0 select count(*) from pg_tables where  schemaname = 'infosync' and tablename  = 'group'
CREATE TABLE ifs_group
(
    id   BIGINT GENERATED BY DEFAULT AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT group_pk PRIMARY KEY (id),
    CONSTRAINT group_name_u UNIQUE (name)
);

--changeset gimaletdinov-rr:infosync_ddl_initial_001 runonchange:true failonerror:true
CREATE TABLE ifs_user
(
    id         BIGINT GENERATED BY DEFAULT AS IDENTITY,
    first_name VARCHAR      NOT NULL,
    last_name  VARCHAR      NOT NULL,
    patronymic VARCHAR,
    full_name  VARCHAR GENERATED ALWAYS AS ( first_name || ' ' || last_name || coalesce(' ' || patronymic, '') ) STORED,
    email      VARCHAR      NOT NULL,
    pass_hash  VARCHAR      NOT NULL,
    group_id   BIGINT,
    role       VARCHAR(100) NOT NULL DEFAULT 'student',
    CONSTRAINT user_pk PRIMARY KEY (id),
    CONSTRAINT user_group_id_fk FOREIGN KEY (group_id) REFERENCES ifs_group (id) ON DELETE SET NULL,
    CONSTRAINT user_email_u UNIQUE (email),
    CONSTRAINT user_full_name_group_u UNIQUE (full_name, group_id)
);


--changeset gimaletdinov-rr:infosync_ddl_initial_001 runonchange:true failonerror:true
CREATE TABLE ifs_post
(
    id                     BIGINT GENERATED BY DEFAULT AS IDENTITY,
    title                  VARCHAR NOT NULL,
    post_link              VARCHAR NOT NULL,
    post_body              VARCHAR NOT NULL,
    group_id               BIGINT  NOT NULL,
    recommended_by_user_id BIGINT  NOT NULL,
    CONSTRAINT post_pk PRIMARY KEY (id),
    CONSTRAINT post_group_id_fk FOREIGN KEY (group_id) REFERENCES ifs_group (id),
    CONSTRAINT post_recommended_by_user_id_fk FOREIGN KEY (recommended_by_user_id) REFERENCES ifs_user (id) ON DELETE SET NULL,

    /******************
    ПОПРАВИТЬ КОД В ДАО
    ******************/
    /*На случай повтроной отправки или отправки другим преподом той же статьи*/
    CONSTRAINT no_duplicate_for_group_and_link UNIQUE (group_id, post_link),

    /*На случай дубликата с этого или другого сайта*/
    CONSTRAINT no_duplicate_for_group_and_body UNIQUE (group_id, post_body)
);


--changeset gimaletdinov-rr:infosync_ddl_initial_001 runonchange:true failonerror:true
CREATE TABLE ifs_essay
(
    id        BIGINT GENERATED BY DEFAULT AS IDENTITY,
    post_id   BIGINT  NOT NULL,
    author_id BIGINT  NOT NULL,
    essay_text VARCHAR NOT NULL,
    CONSTRAINT essay_pk PRIMARY KEY (id),
    CONSTRAINT essay_post_id_fk FOREIGN KEY (post_id) REFERENCES ifs_post (id) ON DELETE CASCADE,
    CONSTRAINT essay_author_id_fk FOREIGN KEY (author_id) REFERENCES ifs_user (id) ON DELETE SET NULL,
    CONSTRAINT essay_post_author_u UNIQUE (post_id, author_id)
);


--changeset gimaletdinov-rr:infosync_ddl_initial_001 runonchange:true failonerror:true
CREATE TABLE ifs_post_status
(
    user_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,
    CONSTRAINT post_status_pk PRIMARY KEY (user_id, post_id),
    CONSTRAINT post_status_user_id_fk FOREIGN KEY (user_id) REFERENCES ifs_user (id) ON DELETE CASCADE,
    CONSTRAINT post_status_post_id_fk FOREIGN KEY (post_id) REFERENCES ifs_post (id) ON DELETE CASCADE
);


--changeset gimaletdinov-rr:infosync_ddl_initial_001 runonchange:true failonerror:true
CREATE TABLE ifs_rating
(
    id              BIGINT GENERATED BY DEFAULT AS IDENTITY,
    essay_id        BIGINT NOT NULL,
    mark            INT    NOT NULL,
    mark_by_user_id BIGINT NOT NULL,
    CONSTRAINT rating_pk PRIMARY KEY (id),
    CONSTRAINT rating_essay_id_fk FOREIGN KEY (essay_id) REFERENCES ifs_essay (id) ON DELETE CASCADE,
    CONSTRAINT rating_mark_by_user_id_fk FOREIGN KEY (mark_by_user_id) REFERENCES ifs_user (id) ON DELETE SET NULL,
    CONSTRAINT rating_essay_mark_by_u UNIQUE (essay_id, mark_by_user_id)
);


--changeset gimaletdinov-rr:infosync_ddl_initial_001 runonchange:true failonerror:true
CREATE TABLE ifs_comment
(
    id        BIGINT GENERATED BY DEFAULT AS IDENTITY,
    essay_id  BIGINT  NOT NULL,
    author_id BIGINT  NOT NULL,
    text      VARCHAR NOT NULL,
    CONSTRAINT comment_pk PRIMARY KEY (id),
    CONSTRAINT comment_essay_id_fk FOREIGN KEY (essay_id) REFERENCES ifs_essay (id) ON DELETE CASCADE,
    CONSTRAINT comment_author_id_fk FOREIGN KEY (author_id) REFERENCES ifs_user (id) ON DELETE SET NULL
);

