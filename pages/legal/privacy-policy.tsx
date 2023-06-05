import Head from 'next/head';

const PrivacyPolicy = () => {
  const lightMode = 'dark';
  const maxWith = '900px';
  const styles = {
    h2: 'py-4 text-3xl font-medium border-b-2',
    h3: 'py-0 text-lg font-medium normal-case',
    ul: 'list-disc list-outside pl-3 space-y-1',
  };

  return (
    <>
      <Head>
        <title>JackGPT</title>
        <meta
          name="description"
          content="ChatGPT's Lefebvre Sarrut interface"
        />
        <meta
          name="viewport"
          content="height=device-height ,width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${lightMode}`}>
        <div className="flex flex-col w-full h-full text-base text-black dark:text-white bg-white dark:bg-[#202123]">
          <header className="bg-gray-500/10 dark:bg-black">
            <h1
              className={`mx-auto px-4 pt-24 pb-20 text-center text-5xl font-medium sm:max-w-[${maxWith}]`}
            >
              Principes fondamentaux d’utilisation
            </h1>
          </header>

          <div
            className={`flex flex-col mx-auto space-y-4 md:space-y-4 px-4 pt-16 pb-12 md:pt-16 md:pb-12 sm:max-w-[${maxWith}]`}
          >
            <h2 className={styles.h2}>Préambule</h2>

            <p>
              Tout contenu inséré dans le fil de discussion avec JackGPT-ChatGPT
              doit être considéré comme du contenu public, susceptible d’être
              réutilisé à d’autres fins (commerciales, éditoriales etc…) voire
              publié sur d’autres plateformes Web publiques, privées ou
              concurrentielles.
            </p>

            <p>
              ChatGPT collecte toutes les données personnelles qui lui sont «
              présentées » et conserve par défaut l’historique de ces
              conversations.
            </p>

            <p>
              Bien qu’annoncé conforme à la loi californienne (CCPR Act),
              ChatGPT n’offre aucune des garanties demandées par le RGPD.
            </p>

            <p>
              En France, la CNIL enquête sur plusieurs plaintes déposées à
              l’encontre de ChatGPT pour non-respect de la protection et de la
              confidentialité des données à caractère personnel.
            </p>

            <p>
              Au niveau européen, le Comité européen de la protection des
              données, qui regroupe l’ensemble des autorités nationales de
              contrôle, a lancé une task force destinée à favoriser la
              coopération autour des conditions d’utilisation de ChatGPT.
            </p>

            <h2 className={styles.h2}>Guide d’utilisation</h2>

            <h3 className={styles.h3}>En particulier à ne pas faire</h3>
            <ul className={styles.ul}>
              <li>
                Ne pas insérer de données à caractère personnel (Email,
                téléphone etc…) ou relevant de la vie privée
              </li>
              <li>
                Ne jamais insérer dans une conversation nom + prénom afin
                d’éviter une « Google-isation » qui pourrait enrichir l’IA et/ou
                aboutir à de fausses informations du fait d’homonymes, etc.
              </li>
              <li>
                Ne pas insérer de contenus couverts par nos abonnements
                éditoriaux ou pédagogiques
              </li>
              <li>
                Ne pas insérer d’informations confidentielles, restreintes ou
                internes Lefebvre-Dalloz : celles-ci peuvent être de nature
                technique tout comme de nature non technique
              </li>
              <li>
                Ne pas insérer de codes source issus de programmes internes et
                dans tous les cas incluant de la logique métier
              </li>
              <li>
                Ne pas considérer les réponses de ChatGPT comme une vérité
                absolue : elles doivent faire systématiquement l’objet d’une
                vérification a posteriori
              </li>
            </ul>
            <h3 className={styles.h3}>A faire</h3>
            <ul className={styles.ul}>
              <li>
                Se poser systématiquement la question de savoir si le contenu
                inséré peut être accepté en diffusion publique
              </li>
              <li>
                Supprimer régulièrement l’historique des conversations (à noter
                : il est désormais possible de désactiver les paramètres «
                historique des discussions » de ChatGPT voir ci-dessous)
              </li>
            </ul>
            <h2 className={styles.h2}>Fonctionnement de ChatGPT</h2>

            <h3 className={styles.h3}>Historique des conversations</h3>

            <p>
              En cas de désactivation de l’historique, les nouvelles
              conversations seront supprimées dans les 30 jours et ne seront pas
              utilisées pour l’entraînement des modèles. Toutefois, les
              conversations existantes seront toujours sauvegardées et pourront
              être utilisées pour l’entraînement des modèles si l’utilisateur ne
              choisit pas de les exclure. Si l’historique est désactivé, les
              conversations ne peuvent être récupérées une fois qu’elles sont
              fermées.
            </p>

            <h3 className={styles.h3}>
              Note sur la cybercriminalité liée à ChatGPT
            </h3>

            <p>
              Cette note concerne spécifiquement l’usage personnel de ChatGPT
              via un compte personnel et via le Web public (c’est-à-dire en
              dehors du cadre de JackGPT)
            </p>

            <p>
              L&apos;utilisation de fausses applications ChatGPT pour notamment
              voler des informations d&apos;identification personnelles est une
              tactique récente et connue, utilisée par les cybercriminels.
            </p>

            <p>
              Il existe actuellement une prolifération de fausses applications
              ChatGPT (« extension Google Chrome », « ChatGPT pour Windows »…)
              ainsi que des sites Web et des pages Web frauduleuses (fausses URL
              comme « chat-gpt-pc[.]online »). ChatGPT est en train de déployer
              ses applications mobile iOS et Android, il conviendra de
              s’assurer, lorsqu’elles seront disponibles en France, d’utiliser
              les applications officielles ChatGPT.
            </p>

            <p>
              ChatGPT est uniquement disponible sur la page Web officielle
              d&apos;OpenAI :{' '}
              <a
                href="https://openai.com/blog/chatgpt"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 font-bold hover:underline"
              >
                https://openai.com/blog/chatgpt
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;