import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { CardPublicacao } from "../../components/cardPublicacao";
import styles from "./home.module.css";

interface RepositoriesProps {
    id: number;
    name: string;
    created_at: string;
    description: string;
    daysSinceCreation: number;
}

export function Home() {
    const [repositories, setRepositories] = useState<RepositoriesProps[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        function getDataRepositories() {
            fetch("https://api.github.com/users/vhpaula/repos")
                .then((response) => response.json())
                .then((data: RepositoriesProps[]) => {
                    // Adicionar uma nova propriedade 'daysSinceCreation' a cada repositório
                    const repositoriesWithDays = data.map((repository) => {
                        const createdDate: Date = new Date(
                            repository.created_at
                        ); // Tipagem de createdDate
                        const currentDate: Date = new Date(); // Tipagem de currentDate
                        const timeDifference: number =
                            currentDate.getTime() - createdDate.getTime(); // Tipagem de timeDifference
                        const daysDifference: number = Math.floor(
                            timeDifference / (1000 * 60 * 60 * 24)
                        );
                        return {
                            ...repository,
                            daysSinceCreation: daysDifference,
                        };
                    });
                    setRepositories(repositoriesWithDays);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getDataRepositories();
    }, []);

    // Obter o número total de repositórios
    const totalRepositories = repositories.length;

    const filteredRepositories = repositories.filter((repository) => {
        // Converte o nome e a descrição para minúsculas para uma comparação sem distinção entre maiúsculas e minúsculas
        const repositoryName = repository.name.toLowerCase();
        const description = repository.description.toLowerCase();
        // Converte o termo de busca para minúsculas
        const searchTermLower = searchTerm.toLowerCase();

        // Verifica se o nome ou a descrição do repositório contém o termo de busca
        return (
            repositoryName.includes(searchTermLower) ||
            description.includes(searchTermLower)
        );
    });

    return (
        <div className={styles.home}>
            <Header />
            <section className={styles.sectionPublicacoes}>
                <div className={styles.sectionHeader}>
                    <p>Publicações</p>
                    <span>{totalRepositories} publicações</span>
                </div>
                <input
                    type="text"
                    placeholder="Buscar conteúdo"
                    className={styles.inputSearch}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className={styles.sectionBody}>
                    {filteredRepositories.map((repository) => (
                        <CardPublicacao
                            key={repository.id}
                            title={repository.name}
                            timestemp={`Há ${repository.daysSinceCreation} dias`}
                            description={repository.description}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
