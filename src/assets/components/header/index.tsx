import { useEffect, useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import { MdPeopleAlt } from "react-icons/md";
import { BiLogoGithub, BiBuildings } from "react-icons/bi";
import { ProfileStatistic } from "../../components/profileStatistic";
import styles from "./header.module.css";

import { Link } from "react-router-dom";

interface ProfileProp {
    name: string;
    bio: string;
    html_url: string;
    avatar_url: string;
    company: string;
    followers: number; // Corrigido de 'integer' para 'number'
    login: string;
}

export function Header() {
    const [profile, setProfile] = useState<ProfileProp | undefined>();

    useEffect(() => {
        function getDataProfile() {
            fetch("https://api.github.com/users/vhpaula")
                .then((response) => response.json())
                .then((data: ProfileProp) => {
                    const resultData = {
                        ...data,
                    };
                    console.log(data);
                    setProfile(resultData);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getDataProfile();
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div>
                    <img
                        src={profile?.avatar_url}
                        alt="Imagem do usuário no Github"
                        className={styles.githubUserImage}
                    />
                </div>
                <div className={styles.githubProfileInfo}>
                    <div className={styles.githubProfileName}>
                        <h1>{profile?.name}</h1>
                        <Link
                            to={profile?.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GITHUB
                            <HiExternalLink className={styles.customIconLink} />
                        </Link>
                    </div>
                    <p className={styles.githubProfileDescription}>
                        {profile?.bio}
                    </p>
                    <div className={styles.githubProfileStatistics}>
                        <ul>
                            {profile && (
                                <>
                                    <ProfileStatistic statistc={profile.login}>
                                        <BiLogoGithub
                                            className={styles.customIcon}
                                        />
                                    </ProfileStatistic>
                                    <ProfileStatistic
                                        statistc={profile.company}
                                    >
                                        <BiBuildings
                                            className={styles.customIcon}
                                        />
                                    </ProfileStatistic>
                                    <ProfileStatistic
                                        statistc={`${profile.followers} seguidores`}
                                    >
                                        <MdPeopleAlt
                                            className={styles.customIcon}
                                        />
                                    </ProfileStatistic>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
