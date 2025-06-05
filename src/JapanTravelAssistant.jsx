import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  MapPin,
  Heart,
  Mountain,
  Sparkles,
  Camera,
  Star,
  Zap,
  Download,
  Menu,
  Search,
} from "lucide-react";

const JapanTravelAssistant = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState("");
  const [apiError, setApiError] = useState("");

  const steps = [
    {
      id: "intro",
      title: "Découvrez le Japon",
      subtitle: "Votre voyage personnalisé commence ici",
      type: "video",
      media:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop&auto=format",
      videoUrl: "https://youtu.be/oNcN0ilrC9g",
      fallback: "from-orange-400 to-pink-500",
    },
    {
      id: "mode",
      title: "Qu'est-ce qui vous inspire ?",
      subtitle: "Choisissez votre style d'aventure",
      type: "choice",
      options: [
        {
          id: "complet",
          title: "Circuit Multi-Villes",
          description: "Tokyo, Kyoto, Osaka et trésors cachés",
          image:
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop&auto=format",
          icon: MapPin,
          gradient: "from-orange-500 to-pink-500",
          fallback: "from-orange-400 to-red-500",
        },
        {
          id: "ville",
          title: "Immersion Urbaine",
          description: "Explorez une destination en profondeur",
          image:
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop&auto=format",
          icon: Camera,
          gradient: "from-purple-500 to-blue-500",
          fallback: "from-purple-400 to-blue-500",
        },
      ],
    },
    {
      id: "companion",
      title: "Avec qui voyagez-vous ?",
      subtitle: "Personnalisons votre expérience",
      type: "visual-choice",
      options: [
        {
          id: "solo",
          title: "Voyage en Solo",
          image:
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop&auto=format",
          emoji: "🧘",
          fallback: "from-blue-400 to-cyan-500",
        },
        {
          id: "couple",
          title: "Voyage Romantique",
          image:
            "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=300&h=300&fit=crop&auto=format",
          emoji: "💕",
          fallback: "from-pink-400 to-rose-500",
        },
        {
          id: "famille",
          title: "Aventure en Famille",
          image:
            "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=300&fit=crop&auto=format",
          emoji: "👨‍👩‍👧‍👦",
          fallback: "from-green-400 to-emerald-500",
        },
        {
          id: "amis",
          title: "Escapade entre Amis",
          image:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop&auto=format",
          emoji: "🎉",
          fallback: "from-yellow-400 to-orange-500",
        },
      ],
    },
    {
      id: "style",
      title: "Quel est votre style de voyage ?",
      subtitle: "L'ambiance que vous recherchez",
      type: "multi-style",
      options: [
        {
          id: "inspirationnel",
          title: "Inspirant",
          description: "Découvertes qui changent la vie",
          image:
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=200&fit=crop&auto=format",
          fallback: "from-purple-400 to-indigo-500",
        },
        {
          id: "professionnel",
          title: "Professionnel",
          description: "Voyages optimisés pour le travail",
          image:
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=200&fit=crop&auto=format",
          fallback: "from-gray-400 to-slate-500",
        },
        {
          id: "authentique",
          title: "Authentique",
          description: "Vivre comme un local",
          image:
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=300&h=200&fit=crop&auto=format",
          fallback: "from-orange-400 to-red-500",
        },
        {
          id: "classique",
          title: "Classique",
          description: "Les incontournables",
          image:
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop&auto=format",
          fallback: "from-rose-400 to-pink-500",
        },
        {
          id: "hors des sentiers battus",
          title: "Hors des Sentiers Battus",
          description: "Découvertes secrètes",
          image:
            "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=300&h=200&fit=crop&auto=format",
          fallback: "from-teal-400 to-cyan-500",
        },
        {
          id: "luxe",
          title: "Luxe",
          description: "Expériences haut de gamme",
          image:
            "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=300&h=200&fit=crop&auto=format",
          fallback: "from-amber-400 to-yellow-500",
        },
      ],
    },
    {
      id: "interests",
      title: "Quelles sont vos passions ?",
      subtitle: "Sélectionnez ce qui vous attire le plus",
      type: "multi-visual",
      options: [
        {
          id: "temples",
          title: "Temples & Spiritualité",
          image:
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=300&h=200&fit=crop&auto=format",
          color: "from-orange-400 to-red-500",
          emoji: "⛩️",
        },
        {
          id: "gastronomie",
          title: "Gastronomie",
          image:
            "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=200&fit=crop&auto=format",
          color: "from-yellow-400 to-orange-500",
          emoji: "🍜",
        },
        {
          id: "nature",
          title: "Nature & Paysages",
          image:
            "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=300&h=200&fit=crop&auto=format",
          color: "from-green-400 to-blue-500",
          emoji: "🌸",
        },
        {
          id: "musées",
          title: "Musées",
          image:
            "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=300&h=200&fit=crop&auto=format",
          color: "from-purple-400 to-pink-500",
          emoji: "🏛️",
        },
        {
          id: "artisanat",
          title: "Arts & Artisanat",
          image:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&auto=format",
          color: "from-indigo-400 to-purple-500",
          emoji: "🎨",
        },
        {
          id: "manga",
          title: "Manga & Culture Pop",
          image:
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop&auto=format",
          color: "from-pink-400 to-purple-500",
          emoji: "🎌",
        },
        {
          id: "spiritualité",
          title: "Méditation",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&auto=format",
          color: "from-cyan-400 to-blue-500",
          emoji: "🧘",
        },
      ],
    },
    {
      id: "rythme",
      title: "Quel est votre rythme de voyage ?",
      subtitle: "Trouvez votre tempo idéal",
      type: "rhythm-choice",
      options: [
        {
          id: "tranquille",
          title: "Contemplatif",
          description: "Prenez le temps, savourez chaque instant",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&auto=format",
          icon: Heart,
          fallback: "from-green-400 to-teal-500",
        },
        {
          id: "modéré",
          title: "Équilibré",
          description: "Découverte et détente en harmonie",
          image:
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=300&h=300&fit=crop&auto=format",
          icon: Star,
          fallback: "from-blue-400 to-indigo-500",
        },
        {
          id: "intense",
          title: "Dynamique",
          description: "Maximisez les découvertes",
          image:
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=300&fit=crop&auto=format",
          icon: Zap,
          fallback: "from-orange-400 to-red-500",
        },
      ],
    },
    {
      id: "experience",
      title: "Êtes-vous déjà allé au Japon ?",
      subtitle: "Adaptation de nos recommandations",
      type: "experience-choice",
      options: [
        {
          id: "oui",
          title: "Oui, j'y suis déjà allé",
          description: "Montrez-moi des expériences spécialisées",
          image:
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=200&fit=crop&auto=format",
          fallback: "from-purple-400 to-pink-500",
        },
        {
          id: "non",
          title: "Non, c'est ma première fois",
          description: "Guide vers les incontournables",
          image:
            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=200&fit=crop&auto=format",
          fallback: "from-orange-400 to-red-500",
        },
      ],
    },
    {
      id: "details",
      title: "Détails finaux",
      subtitle: "Personnalisons votre expérience",
      type: "form",
    },
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Fonction pour obtenir les informations météo selon la date
  const getIntroHtmlFromDate = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    const mois = date.getMonth();
    if (isNaN(mois)) return "";

    const moisNom = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ][mois];

    const meteo = {
      0: {
        t: "0-10°C",
        icon: "❄️",
        tips: "Prévoir vêtements chauds et imperméables.",
      },
      1: { t: "3-12°C", icon: "🌬️", tips: "Encore froid. Restez couvert." },
      2: { t: "6-15°C", icon: "🌱", tips: "Premiers signes du printemps." },
      3: { t: "10-20°C", icon: "🌸", tips: "Saison des cerisiers en fleurs." },
      4: {
        t: "15-25°C",
        icon: "🌤️",
        tips: "Températures douces et floraisons.",
      },
      5: { t: "18-27°C", icon: "🌦️", tips: "Début de la saison des pluies." },
      6: { t: "23-32°C", icon: "🌞", tips: "Chaleur et humidité marquées." },
      7: { t: "25-33°C", icon: "☀️", tips: "Très chaud, bien s'hydrater." },
      8: { t: "22-30°C", icon: "🍂", tips: "Fin de l'été, premiers typhons." },
      9: {
        t: "17-25°C",
        icon: "🍁",
        tips: "Temps agréable, début de l'automne.",
      },
      10: {
        t: "10-20°C",
        icon: "🍂",
        tips: "Feuilles rouges, frais le matin.",
      },
      11: { t: "5-12°C", icon: "🎄", tips: "Froid sec, fêtes lumineuses." },
    }[mois];

    if (!meteo) return "";

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
            {meteo.icon} Météo en {moisNom}
          </h3>
          <div className="space-y-2 text-sm text-blue-700">
            <div>Températures moyennes : {meteo.t}</div>
            <div>{meteo.tips}</div>
            <div>Vêtements : couches légères + pull / veste</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
          <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
            🚆 Transport
          </h3>
          <div className="space-y-2 text-sm text-green-700">
            <div>
              <strong>Japan Rail Pass</strong> : achetez avant le départ
            </div>
            <div>
              <strong>Hakone Pass</strong> ou <strong>Kamakura Pass</strong>
            </div>
            <div>
              <strong>IC Cards</strong> : Suica, Pasmo (métro / achats)
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
          <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">
            💡 Conseils pratiques
          </h3>
          <div className="space-y-2 text-sm text-orange-700">
            <div>
              <strong>Devise</strong> : yen (¥), prévoir du liquide
            </div>
            <div>
              <strong>Internet</strong> : pocket WiFi ou carte SIM
            </div>
            <div>
              <strong>Électricité</strong> : 100V Type A / B
            </div>
            <div>
              <strong>Langue</strong> : appli de traduction utile
            </div>
            <div>
              <strong>Étiquette</strong> : pas de pourboire, déchaussage
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Composant d'image avec fallback coloré
  const ImageWithFallback = ({
    src,
    alt,
    className,
    fallback,
    emoji,
    ...props
  }) => {
    const [imageError, setImageError] = useState(false);

    if (imageError || !src) {
      return (
        <div
          className={`${className} bg-gradient-to-br ${fallback} flex items-center justify-center`}
          {...props}
        >
          {emoji && <div className="text-6xl opacity-80">{emoji}</div>}
          {!emoji && <div className="text-white text-4xl">🏮</div>}
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setImageError(true)}
        loading="lazy"
        {...props}
      />
    );
  };

  const handleAnswer = (key, value) => {
    setAnswers((prev) => {
      if (key === "style" || key === "interests") {
        const currentArray = prev[key] || [];
        const newArray = currentArray.includes(value)
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value];
        return { ...prev, [key]: newArray };
      }
      return { ...prev, [key]: value };
    });
  };

  const nextStep = () => {
    if (isLastStep) {
      generateItinerary();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const generateItinerary = async () => {
    setIsLoading(true);
    setApiError("");

    try {
      // Préparer les données au format attendu par l'API
      const apiData = {
        username: answers.username || "voyageur",
        mode: answers.mode || "complet",
        type: answers.type || "solo",
        style: Array.isArray(answers.style)
          ? answers.style
          : [answers.style].filter(Boolean),
        rythme: answers.rythme || "modéré",
        deja: answers.deja || "non",
        interests: Array.isArray(answers.interests) ? answers.interests : [],
        remarques: answers.remarques || "",
        conclusion: answers.conclusion || "non",
      };

      // Ajouter les champs spécifiques selon le mode
      if (answers.mode === "complet") {
        apiData.start = answers.start || "";
        apiData.duration = answers.duration || "7";
        apiData.budget = answers.budget || "";
        apiData.villesSouhaitees =
          answers.villesSouhaitees || "Tokyo, Kyoto, Osaka";
        apiData.lieuxAeviter = answers.lieuxAeviter || "";
      } else if (answers.mode === "ville") {
        apiData.ville = answers.ville || "Tokyo";
        apiData.periodeVille = answers.periodeVille || "";
        apiData.joursVille = answers.joursVille || "3";
      }

      console.log("Données envoyées à l'API:", apiData);

      const response = await fetch(
        "https://assistant-voyage-japon.onrender.com/api/planificateur",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log("Réponse de l'API:", result);

      if (result && result.result) {
        setGeneratedItinerary(result.result);
        setShowResult(true);
      } else {
        throw new Error("Format de réponse inattendu de l'API");
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API:", error);
      setApiError(`Erreur: ${error.message}`);

      // Fallback avec un itinéraire générique en cas d'erreur
      const fallbackItinerary = `# Erreur de connexion

Nous rencontrons actuellement des difficultés pour générer votre itinéraire personnalisé.

## En attendant, voici quelques suggestions générales :

### Pour ${answers.username || "votre voyage"} au Japon

**Type de voyage :** ${answers.type || "À définir"}
**Rythme :** ${answers.rythme || "À définir"}
**Durée :** ${answers.duration || answers.joursVille || "À définir"} jours

### Destinations recommandées :
- **Tokyo** : Moderne et traditionnel
- **Kyoto** : Temples et culture
- **Osaka** : Gastronomie
- **Nara** : Cerfs et temples

Veuillez réessayer dans quelques instants.`;

      setGeneratedItinerary(fallbackItinerary);
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour convertir le markdown en HTML simple
  const formatMarkdownToHTML = (markdown) => {
    return markdown
      .replace(
        /^# (.*$)/gm,
        '<h1 class="text-3xl font-bold text-orange-600 mb-6">$1</h1>'
      )
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-2xl font-bold text-orange-600 mt-8 mb-4">$1</h2>'
      )
      .replace(
        /^### (.*$)/gm,
        '<h3 class="text-lg font-semibold text-gray-800 mt-6 mb-3">$1</h3>'
      )
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-orange-700">$1</strong>'
      )
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1 text-gray-700">$1</li>')
      .replace(/### 🍵 Matin/g, "### 🍵 Matin")
      .replace(/### 🍽️ Midi/g, "### 🍽️ Midi")
      .replace(/### ☀️ Après-midi/g, "### ☀️ Après-midi")
      .replace(/### 🌙 Soir/g, "### 🌙 Soir")
      .split("\n\n")
      .map((paragraph) => {
        if (paragraph.includes("<li")) {
          return `<ul class="list-disc list-inside mb-4 space-y-1">${paragraph}</ul>`;
        } else if (paragraph.includes("<h")) {
          return paragraph;
        } else if (paragraph.trim()) {
          return `<p class="mb-4 leading-relaxed text-gray-700">${paragraph}</p>`;
        }
        return "";
      })
      .join("");
  };

  const renderStep = () => {
    switch (currentStepData.type) {
      case "video":
        return (
          <div className="text-center space-y-12">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">JapanGo</span>
              </div>
              <div className="flex items-center space-x-4">
                <Search className="w-6 h-6 text-gray-600" />
                <Menu className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto border border-gray-200">
              {isPlaying ? (
                <iframe
                  src={currentStepData.videoUrl}
                  className="w-full h-96"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Japan Travel Video"
                />
              ) : (
                <>
                  <ImageWithFallback
                    src={currentStepData.media}
                    alt="Japan intro"
                    className="w-full h-96 object-cover"
                    fallback={currentStepData.fallback}
                    emoji="🏮"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  </div>
                </>
              )}

              {!isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent p-8">
                  <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    {currentStepData.title}
                  </h1>
                  <p className="text-xl text-gray-200 drop-shadow">
                    {currentStepData.subtitle}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="flex justify-center space-x-8">
                {[
                  { emoji: "🗾", text: "Culture ancienne" },
                  { emoji: "🍜", text: "Cuisine unique" },
                  { emoji: "🌸", text: "Beauté naturelle" },
                  { emoji: "🏮", text: "Traditions vivantes" },
                ].map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                      {item.emoji}
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={nextStep}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-12 py-4 rounded-2xl text-lg font-semibold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-3 mx-auto"
              >
                Commencer mon voyage <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case "choice":
        return (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-800">
                {currentStepData.title}
              </h2>
              <p className="text-xl text-gray-600">
                {currentStepData.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {currentStepData.options.map((option, index) => (
                <div
                  key={option.id}
                  onClick={() => {
                    handleAnswer("mode", option.id);
                    setTimeout(nextStep, 500);
                  }}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl transform hover:scale-105 transition-all duration-500 bg-white/90 backdrop-blur border border-gray-200 hover:border-orange-400 shadow-lg hover:shadow-xl"
                >
                  <ImageWithFallback
                    src={option.image}
                    alt={option.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    fallback={option.fallback}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${option.gradient} rounded-2xl flex items-center justify-center mb-4 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}
                    >
                      <option.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                      {option.title}
                    </h3>
                    <p className="text-gray-200 text-lg drop-shadow">
                      {option.description}
                    </p>

                    <div className="mt-4 flex items-center text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Choisissez cette option</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "visual-choice":
        return (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-800">
                {currentStepData.title}
              </h2>
              <p className="text-xl text-gray-600">
                {currentStepData.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {currentStepData.options.map((option, index) => (
                <div
                  key={option.id}
                  onClick={() => {
                    handleAnswer("type", option.id);
                    setTimeout(nextStep, 300);
                  }}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl aspect-square transform hover:scale-105 transition-all duration-300 bg-white/90 backdrop-blur border border-gray-200 hover:border-orange-400 shadow-lg hover:shadow-xl"
                >
                  <ImageWithFallback
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    fallback={option.fallback}
                    emoji={option.emoji}
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-5 transition-all duration-300" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                      {option.emoji}
                    </div>
                    <h3 className="text-white font-bold text-lg drop-shadow-lg">
                      {option.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "multi-style":
        return (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-800">
                {currentStepData.title}
              </h2>
              <p className="text-xl text-gray-600">
                {currentStepData.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {currentStepData.options.map((option, index) => {
                const isSelected = answers.style?.includes(option.id);
                return (
                  <div
                    key={option.id}
                    onClick={() => handleAnswer("style", option.id)}
                    className={`group cursor-pointer relative overflow-hidden rounded-2xl aspect-[4/3] transform transition-all duration-300 bg-white/90 backdrop-blur border-2 ${
                      isSelected
                        ? "scale-105 ring-4 ring-orange-400 border-orange-400 shadow-2xl"
                        : "hover:scale-105 border-gray-200 hover:border-orange-400 shadow-lg"
                    }`}
                  >
                    <ImageWithFallback
                      src={option.image}
                      alt={option.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      fallback={option.fallback}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg">
                        {option.title}
                      </h3>
                      <p className="text-gray-200 text-sm drop-shadow">
                        {option.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={nextStep}
                disabled={!answers.style?.length}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );

      case "multi-visual":
        return (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-800">
                {currentStepData.title}
              </h2>
              <p className="text-xl text-gray-600">
                {currentStepData.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {currentStepData.options.map((option, index) => {
                const isSelected = answers.interests?.includes(option.id);
                return (
                  <div
                    key={option.id}
                    onClick={() => handleAnswer("interests", option.id)}
                    className={`group cursor-pointer relative overflow-hidden rounded-2xl aspect-[4/3] transform transition-all duration-300 bg-white/90 backdrop-blur border-2 ${
                      isSelected
                        ? "scale-105 ring-4 ring-orange-400 border-orange-400 shadow-2xl"
                        : "hover:scale-105 border-gray-200 hover:border-orange-400 shadow-lg"
                    }`}
                  >
                    <ImageWithFallback
                      src={option.image}
                      alt={option.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      fallback={option.color}
                      emoji={option.emoji}
                    />

                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${option.color} opacity-20`}
                    />

                    <div className="absolute inset-0 flex items-end p-4">
                      <h3 className="text-white font-bold text-lg drop-shadow-lg">
                        {option.title}
                      </h3>
                    </div>

                    {isSelected && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={nextStep}
                disabled={!answers.interests?.length}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );

      case "rhythm-choice":
        return (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-light text-gray-800 tracking-wide">
                {currentStepData.title}
              </h2>
              <p className="text-xl text-gray-600 font-light">
                {currentStepData.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currentStepData.options.map((option, index) => (
                <div
                  key={option.id}
                  onClick={() => {
                    handleAnswer("rythme", option.id);
                    setTimeout(nextStep, 400);
                  }}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl h-80 transform hover:scale-[1.02] transition-all duration-500 bg-white/90 backdrop-blur border border-gray-200 hover:border-orange-400 shadow-lg hover:shadow-xl"
                >
                  <ImageWithFallback
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    fallback={option.fallback}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="w-12 h-12 bg-orange-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                      <option.icon className="w-6 h-6 text-orange-600" />
                    </div>

                    <h3 className="text-xl font-medium text-white mb-2 drop-shadow-lg">
                      {option.title}
                    </h3>
                    <p className="text-gray-200 font-light text-sm leading-relaxed drop-shadow">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "experience-choice":
        return (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-800">
                {currentStepData.title}
              </h2>
              <p className="text-xl text-gray-600">
                {currentStepData.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {currentStepData.options.map((option, index) => (
                <div
                  key={option.id}
                  onClick={() => {
                    handleAnswer("deja", option.id);
                    setTimeout(nextStep, 500);
                  }}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl h-64 transform hover:scale-105 transition-all duration-500 bg-white/90 backdrop-blur border border-gray-200 hover:border-orange-400 shadow-lg hover:shadow-xl"
                >
                  <ImageWithFallback
                    src={option.image}
                    alt={option.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    fallback={option.fallback}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                      {option.title}
                    </h3>
                    <p className="text-gray-200 drop-shadow">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "form":
        return (
          <div className="space-y-12 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-800">
                {currentStepData.title}
              </h2>
              <p className="text-xl text-gray-600">
                {currentStepData.subtitle}
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-3xl p-8 space-y-6 border border-gray-200 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Votre prénom"
                    onChange={(e) => handleAnswer("username", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Durée (jours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ex : 10"
                    onChange={(e) =>
                      handleAnswer(
                        answers.mode === "complet" ? "duration" : "joursVille",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              {answers.mode === "complet" && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Date d'arrivée au Japon
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      onChange={(e) => handleAnswer("start", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Budget estimé (€)
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="Total du voyage"
                      onChange={(e) => handleAnswer("budget", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Villes à inclure
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="Tokyo, Kyoto..."
                      onChange={(e) =>
                        handleAnswer("villesSouhaitees", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Villes à éviter
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="Optionnel"
                      onChange={(e) =>
                        handleAnswer("lieuxAeviter", e.target.value)
                      }
                    />
                  </div>
                </>
              )}

              {answers.mode === "ville" && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Ville à explorer
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="Ex : Tokyo"
                      onChange={(e) => handleAnswer("ville", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Période souhaitée
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="Printemps, automne..."
                      onChange={(e) =>
                        handleAnswer("periodeVille", e.target.value)
                      }
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Remarques particulières
                </label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="Souhaits, contraintes..."
                  onChange={(e) => handleAnswer("remarques", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-4">
                  Souhaitez-vous une conclusion personnalisée ?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="conclusion"
                      value="oui"
                      onChange={(e) =>
                        handleAnswer("conclusion", e.target.value)
                      }
                      className="mr-2 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-700">Oui</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="conclusion"
                      value="non"
                      defaultChecked
                      onChange={(e) =>
                        handleAnswer("conclusion", e.target.value)
                      }
                      className="mr-2 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-700">Non</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-3 ${
                isLoading
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:from-orange-600 hover:to-pink-600 transform hover:scale-105"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  <span>Création en cours...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Créer mon itinéraire magique
                  <Zap className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎌</div>
            <h1 className="text-3xl font-bold text-orange-600 mb-4">
              Bonjour {answers.username || "voyageur"}-san! 👋
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Voici votre itinéraire personnalisé au Japon. Laissez-vous guider,
              étape par étape…
            </p>
          </div>

          {isLoading && (
            <div className="text-center my-12">
              <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-700 text-lg">
                Veuillez patienter, nous préparons votre itinéraire...
              </p>
            </div>
          )}

          {apiError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
              <p className="text-red-700 text-center">{apiError}</p>
            </div>
          )}

          {generatedItinerary && !isLoading && (
            <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-3xl p-8 shadow-lg">
              {getIntroHtmlFromDate(answers.start || answers.periodeVille)}

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: formatMarkdownToHTML(generatedItinerary),
                }}
              />

              <div className="mt-8 text-center border-t border-gray-200 pt-6">
                <button
                  onClick={() => {
                    const element = document.createElement("a");
                    const file = new Blob([generatedItinerary], {
                      type: "text/plain",
                    });
                    element.href = URL.createObjectURL(file);
                    element.download = "japan-itinerary.txt";
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-colors flex items-center gap-2 mx-auto font-semibold"
                >
                  <Download className="w-5 h-5" />
                  📄 Télécharger l'itinéraire
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={() => {
                setCurrentStep(0);
                setAnswers({});
                setShowResult(false);
                setGeneratedItinerary("");
                setIsLoading(false);
                setApiError("");
              }}
              className="bg-gray-300 text-gray-700 px-8 py-3 rounded-2xl hover:bg-gray-400 transition-colors font-semibold"
            >
              Créer un nouveau voyage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-orange-300/40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {["🌸", "🏮", "⛩️", "🎋", "🍜"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-500"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center p-6 pt-12">
        <div className="max-w-7xl mx-auto w-full">{renderStep()}</div>

        {currentStep > 0 && (
          <div className="fixed bottom-8 left-8">
            <button
              onClick={prevStep}
              className="bg-white/90 backdrop-blur text-gray-600 p-4 rounded-full hover:bg-white transition-all duration-300 border border-gray-200 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="fixed bottom-8 right-8 text-gray-600 text-sm bg-white/90 backdrop-blur px-4 py-2 rounded-full border border-gray-200 shadow-lg">
          {currentStep + 1} / {steps.length}
        </div>
      </div>
    </div>
  );
};
export default JapanTravelAssistant;
