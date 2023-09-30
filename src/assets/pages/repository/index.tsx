import styles from "./repository.module.css";

import { HiExternalLink } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { BiLogoGithub } from "react-icons/bi";
import { BsChevronLeft } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

import { ProfileStatistic } from "../../components/profileStatistic";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface RepositoryProps {
    name: string;
    description: string;
    login: string;
    created_at: string;
    watchers: number;
    html_url: string;
}

export function Repository() {
    const { repository } = useParams();
    const [repositoryData, setRepositoryData] = useState<
        RepositoryProps | undefined
    >();
    const [readmeContent, setReadmeContent] = useState("");

    useEffect(() => {
        function getDataRepository() {
            fetch(`https://api.github.com/repos/vhpaula/${repository}`)
                .then((response) => response.json())
                .then((data: RepositoryProps) => {
                    console.log(data);
                    const createdDate: Date = new Date(data.created_at);
                    const currentDate: Date = new Date();
                    const timeDifference =
                        currentDate.getTime() - createdDate.getTime();
                    const daysDifference = Math.floor(
                        timeDifference / (1000 * 60 * 60 * 24)
                    );

                    const resultData: RepositoryProps = {
                        ...data,
                        created_at: `${daysDifference} dias atrás`, // Converte a data para "dias atrás"
                    };

                    setRepositoryData(resultData);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getDataRepository();
    }, []);

    useEffect(() => {
        function getDataReadMe() {
            fetch(`https://api.github.com/repos/vhpaula/${repository}/readme`)
                .then((response) => response.json())
                .then((data) => {
                    // O conteúdo do arquivo README.md estará em data.content
                    const content = decodeURIComponent(
                        escape(window.atob(data.content))
                    );
                    setReadmeContent(content);
                })
                .catch((error) => {
                    console.error("Erro ao buscar o README:", error);
                });
        }

        getDataReadMe();
    }, []);

    return (
        <div className={styles.repository}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.githubProfileInfo}>
                        <div className={styles.githubProfileName}>
                            <Link to={"/"}>
                                <BsChevronLeft
                                    className={styles.customIconLink}
                                />
                                VOLTAR
                            </Link>
                            <Link
                                to={repositoryData?.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                VER NO GITHUB
                                <HiExternalLink
                                    className={styles.customIconLink}
                                />
                            </Link>
                        </div>
                        <h1>{repositoryData?.name}</h1>
                        <p className={styles.githubProfileDescription}>
                            {repositoryData?.description}
                        </p>
                        <div className={styles.githubProfileStatistics}>
                            <ul>
                                <ProfileStatistic
                                    statistc={repositoryData?.owner?.login}
                                >
                                    <BiLogoGithub
                                        className={styles.customIcon}
                                    />
                                </ProfileStatistic>

                                <ProfileStatistic
                                    statistc={repositoryData?.created_at}
                                >
                                    <MdDateRange
                                        className={styles.customIcon}
                                    />
                                </ProfileStatistic>

                                <ProfileStatistic
                                    statistc={`${repositoryData?.watchers} visualizações`}
                                >
                                    <IoEyeSharp className={styles.customIcon} />
                                </ProfileStatistic>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <div className={styles.main}>
                {/* Utilize rehype-raw e rehype-sanitize para renderizar HTML */}
                <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                    {readmeContent}
                </ReactMarkdown>
            </div>
        </div>
    );
}
