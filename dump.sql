--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.urls DROP CONSTRAINT IF EXISTS "urls_userId_fkey";
ALTER TABLE IF EXISTS ONLY public.login DROP CONSTRAINT IF EXISTS "login_userId_fkey";
ALTER TABLE IF EXISTS ONLY public.urls DROP CONSTRAINT IF EXISTS urls_pkey;
ALTER TABLE IF EXISTS ONLY public.registered DROP CONSTRAINT IF EXISTS registered_pkey;
ALTER TABLE IF EXISTS ONLY public.registered DROP CONSTRAINT IF EXISTS registered_email_key;
ALTER TABLE IF EXISTS ONLY public.login DROP CONSTRAINT IF EXISTS login_pkey;
ALTER TABLE IF EXISTS public.urls ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.registered ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.login ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.urls_id_seq;
DROP TABLE IF EXISTS public.urls;
DROP SEQUENCE IF EXISTS public.registered_id_seq;
DROP TABLE IF EXISTS public.registered;
DROP SEQUENCE IF EXISTS public.login_id_seq;
DROP TABLE IF EXISTS public.login;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: login; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.login (
    id integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "userId" integer
);


--
-- Name: login_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: login_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.login_id_seq OWNED BY public.login.id;


--
-- Name: registered; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.registered (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: registered_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.registered_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: registered_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.registered_id_seq OWNED BY public.registered.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "visitCount" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: login id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login ALTER COLUMN id SET DEFAULT nextval('public.login_id_seq'::regclass);


--
-- Name: registered id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registered ALTER COLUMN id SET DEFAULT nextval('public.registered_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: registered; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.registered VALUES (1, 'Lorena', 'lorena1@driven.com.br', '$2b$10$A0q0HpE9u.0k2Dr3y7lDuOOUWDxSXpK04A0Uzp2aLldgMdKGTCsuC', '2023-05-22 20:29:51.605238');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: login_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.login_id_seq', 1, false);


--
-- Name: registered_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.registered_id_seq', 1, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 1, false);


--
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);


--
-- Name: registered registered_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registered
    ADD CONSTRAINT registered_email_key UNIQUE (email);


--
-- Name: registered registered_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registered
    ADD CONSTRAINT registered_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: login login_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT "login_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.registered(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.registered(id);


--
-- PostgreSQL database dump complete
--

