--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.sessions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.urls ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.urls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 3, '80522eb2-31d2-4373-a2cf-d4af88efb8fa', '2023-03-03 00:22:51.699864');
INSERT INTO public.sessions VALUES (2, 11, '7d028a75-92a6-4adf-92be-2ac694099bc8', '2023-03-03 00:25:12.17565');
INSERT INTO public.sessions VALUES (3, 11, '9ef073dc-a192-4155-80a0-2b5cb9b8a8d0', '2023-03-03 00:31:22.648808');
INSERT INTO public.sessions VALUES (4, 12, '885378d0-de13-4fb8-898d-31c68f1bc361', '2023-03-03 00:32:04.798973');
INSERT INTO public.sessions VALUES (5, 12, '3377395d-e446-4dbf-966a-0fec8a8aa85a', '2023-03-03 00:36:25.989139');
INSERT INTO public.sessions VALUES (6, 13, 'be873267-28c9-4958-b642-06e80848db0e', '2023-03-03 00:38:24.88185');
INSERT INTO public.sessions VALUES (7, 11, '08d1c3f0-0b69-4301-843f-efc2bfa17507', '2023-03-03 01:19:04.963181');
INSERT INTO public.sessions VALUES (8, 11, 'd944e0f5-3048-4e29-a978-cc0004fdee05', '2023-03-03 01:19:44.777524');
INSERT INTO public.sessions VALUES (9, 11, 'c0ad61e3-91cf-4b1b-9300-1e18a6c37b20', '2023-03-03 01:22:50.702171');
INSERT INTO public.sessions VALUES (10, 11, '994cafc0-c058-4015-9cff-96f6f44454b0', '2023-03-03 01:24:29.565342');
INSERT INTO public.sessions VALUES (11, 11, '869b9529-1597-4878-b12c-e95398c6b587', '2023-03-03 01:27:17.081256');
INSERT INTO public.sessions VALUES (12, 11, 'a4318743-a0e7-4aab-89f0-f27c8d11ff59', '2023-03-03 01:52:10.162686');
INSERT INTO public.sessions VALUES (13, 11, 'd59d3694-ab57-412e-a5bd-13b7dbb80973', '2023-03-03 01:57:45.583868');
INSERT INTO public.sessions VALUES (14, 11, 'ce273f81-fcaa-4ff0-b9cf-99c216dacb00', '2023-03-03 01:59:13.191723');



--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 3, 'https://www.google.com', '-vIIGli5', 0, '2023-03-03 02:48:58.534238');
INSERT INTO public.urls VALUES (2, 3, 'https://www.google.com', '_RhwZLiS', 0, '2023-03-03 02:51:19.222332');
INSERT INTO public.urls VALUES (3, NULL, 'https://www.google.com', 'Tul3cJFV', 0, '2023-03-03 02:52:12.712963');
INSERT INTO public.urls VALUES (4, NULL, 'https://www.google.com', 'k7kMoa7u', 0, '2023-03-03 02:54:30.629062');
INSERT INTO public.urls VALUES (5, NULL, 'https://www.google.com', 'zayuu4Xl', 0, '2023-03-03 02:55:07.287924');
INSERT INTO public.urls VALUES (6, NULL, 'https://www.google.com', '6Cq-LZqx', 0, '2023-03-03 02:57:13.406417');



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'gabriel', 'gabriel@ga.com', 'gabriel', '2023-03-02');
INSERT INTO public.users VALUES (2, 'gabriela', 'gabriela@ga.com', 'gabriela', '2023-03-02');
INSERT INTO public.users VALUES (3, 'gabriel', 'gabriel@as.com', '$2b$10$X9jx8rsbw7yZyWD.UNEF4.PRdmpK2.066sIQ/rWOWe0oq3mdr3apm', '2023-03-02');
INSERT INTO public.users VALUES (5, 'gabriel', 'gabriels.com', '$2b$10$vLy7Mw/E5d2fOlcdDFAahOLARtEmb.rcb/Sf8h.vkRNvxYZsjlX96', '2023-03-02');
INSERT INTO public.users VALUES (8, 'gabriel', 'gabriela.com', '$2b$10$EtgpC.G2NsW.XVKJW.0YuOpLhmiRGaPcAk2z4zV4i0uj4IeiX3SFG', '2023-03-03');
INSERT INTO public.users VALUES (11, 'teste', 'teste@teste.com', '$2b$10$t8.DAtf.3jm26n1BHm1z7O40E1/N4U1MNxshcd6zwm6jHAYJjmwgy', '2023-03-03');
INSERT INTO public.users VALUES (12, 'aaa', 'aaa@teste.com', '$2b$10$tT0ZKV/r1d0ChjaQqUv.ZeggV1nfscS1zyxom.DJOSkUhhlnBiMCm', '2023-03-03');
INSERT INTO public.users VALUES (13, 'aaa', 'abc@teste.com', '$2b$10$YixsXwQIgArj25tishGitObPPc8VUv/eeiyFU6w25A2lwoUW7NS2K', '2023-03-03');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 58, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

