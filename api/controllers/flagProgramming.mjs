import Flag from "../model/UserSchema/Flag.mjs"
import { catchAsync } from "../utils/catchAsync.mjs"

export const flagsProg = catchAsync(async (req, res) => {
  // Données des langages et frameworks populaires
  const popularTechnologies = [
    // Langages de programmation
    {
      name: "JavaScript",
      description:
        "JavaScript est un langage de programmation polyvalent, principalement utilisé pour le développement web côté client et côté serveur.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "Python",
      description:
        "Python est un langage de programmation populaire pour le développement web, les applications scientifiques, l'intelligence artificielle, et plus encore.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Java",
      description:
        "Java est un langage de programmation orienté objet couramment utilisé pour le développement d'applications web et mobiles.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "C++",
      description:
        "C++ est une extension du langage C, souvent utilisé pour les logiciels systèmes, les jeux, et les applications nécessitant de hautes performances.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    },
    {
      name: "Ruby",
      description:
        "Ruby est un langage de programmation dynamique, principalement utilisé pour le développement web avec le framework Ruby on Rails.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
    },
    {
      name: "PHP",
      description:
        "PHP est un langage de script largement utilisé pour le développement de sites web dynamiques et d'applications web.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    },
    {
      name: "Go",
      description:
        "Go est un langage de programmation open source développé par Google, conçu pour être efficace, simple et fiable.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    },
    {
      name: "Swift",
      description:
        "Swift est un langage de programmation développé par Apple pour le développement d'applications iOS et macOS.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    },
    {
      name: "TypeScript",
      description:
        "TypeScript est un sur-ensemble de JavaScript qui ajoute un typage statique, améliorant ainsi la maintenabilité et l'évolutivité des applications JavaScript.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Kotlin",
      description:
        "Kotlin est un langage de programmation moderne pour le développement Android et le backend, entièrement interopérable avec Java.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    },
    // Frameworks populaires
    {
      name: "React",
      description:
        "React est une bibliothèque JavaScript pour construire des interfaces utilisateur interactives, développée par Facebook.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Vue.js",
      description:
        "Vue.js est un framework JavaScript progressif pour construire des interfaces utilisateur et des applications web.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    },
    {
      name: "Angular",
      description:
        "Angular est un framework web open-source pour le développement de single-page applications, maintenu par Google.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    },
    {
      name: "Django",
      description:
        "Django est un framework web Python de haut niveau qui encourage le développement rapide et une conception propre et pragmatique.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg",
    },
    {
      name: "Ruby on Rails",
      description:
        "Ruby on Rails est un framework de développement web écrit en Ruby qui suit le pattern MVC et favorise le développement rapide.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg",
    },
    {
      name: "Laravel",
      description:
        "Laravel est un framework PHP élégant et expressif qui simplifie le développement d'applications web robustes.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
    },
    {
      name: "Spring",
      description:
        "Spring est un framework Java puissant pour le développement d'applications d'entreprise et web.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    },
    {
      name: "Express",
      description:
        "Express est un framework minimaliste pour Node.js, principalement utilisé pour construire des APIs et applications web.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
    {
      name: "Flutter",
      description:
        "Flutter est un framework UI open-source de Google pour créer des applications natives pour iOS et Android.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    },
    {
      name: "ASP.NET",
      description:
        "ASP.NET est un framework de développement web de Microsoft pour construire des applications web dynamiques.",
      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
    },
  ]

  // Insertion dans la base de données
  try {
    // Insère les langages et frameworks populaires dans la collection Flag
    await Flag.insertMany(popularTechnologies)
    res.json({
      success: true,
      message: "Langages et frameworks insérés avec succès !",
    })
    console.log("Langages et frameworks populaires insérés avec succès !")
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'insertion des technologies.",
    })
    console.error("Erreur lors de l'insertion des technologies :", error)
  }
})
