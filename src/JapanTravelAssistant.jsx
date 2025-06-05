import React, { useState, useEffect } from "react";
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
  MessageCircle,
  X,
  Send,
  Bot,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const JapanTravelAssistant = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState("");
  const [apiError, setApiError] = useState("");

  // États IA & Personnalisation
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [smartSuggestions, setSmartSuggestions] = useState([]);

  const steps = [
    {
      id: "intro",
      title: "Découvrez le Japon",
      subtitle: "Votre voyage personnalisé commence ici",
      type: "video",
      media:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop&auto=format",
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
          id: "artisanat",
          title: "Arts & Artisanat",
          image:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&auto=format",
          color: "from-indigo-400 to-purple-500",
          emoji: "🎨",
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
      id: "details",
      title: "Détails finaux",
      subtitle: "Personnalisons votre expérience",
      type: "form",
    },
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // IA - Génération de suggestions intelligentes
  const generateSmartSuggestions = (currentAnswers) => {
    const suggestions = [];

    if (
      currentAnswers.mode === "complet" &&
      currentAnswers.type === "famille"
    ) {
      suggestions.push({
        type: "destination",
        title: "Tokyo Disneyland recommandé",
        reason: "Parfait pour les familles avec enfants",
        confidence: 95,
        icon: "🎢",
      });
    }

    if (
      currentAnswers.style?.includes("authentique") &&
      currentAnswers.rythme === "tranquille"
    ) {
      suggestions.push({
        type: "experience",
        title: "Cérémonie du thé traditionnelle",
        reason: "Allié parfaitement à votre style authentique",
        confidence: 88,
        icon: "🍵",
      });
    }

    if (currentAnswers.interests?.includes("nature")) {
      suggestions.push({
        type: "destination",
        title: "Mont Fuji et lac Kawaguchi",
        reason: "Incontournable pour les amoureux de nature",
        confidence: 92,
        icon: "🗻",
      });
    }

    return suggestions;
  };

  const getAIRecommendations = (stepId, currentAnswers) => {
    const recommendations = [];

    switch (stepId) {
      case "interests":
        if (currentAnswers.type === "solo") {
          recommendations.push("Méditation dans les temples zen");
          recommendations.push("Ateliers d'artisanat traditionnel");
        }
        if (currentAnswers.style?.includes("authentique")) {
          recommendations.push("Marchés locaux matinaux");
        }
        break;

      case "style":
        if (currentAnswers.type === "famille") {
          recommendations.push("Parcs à thème et aquariums");
        }
        break;

      default:
        break;
    }

    return recommendations;
  };

  const handleAIChat = (message) => {
    setChatMessages((prev) => [...prev, { type: "user", content: message }]);
    setChatInput("");

    setTimeout(() => {
      let aiResponse = "";

      if (message.toLowerCase().includes("budget")) {
        aiResponse =
          "Pour un voyage au Japon, je recommande 100-150€/jour pour un budget moyen. Cela inclut hébergement, repas et transports locaux.";
      } else if (message.toLowerCase().includes("saison")) {
        aiResponse =
          "Le printemps (mars-mai) et l'automne (septembre-novembre) sont idéaux ! Évitez juillet-août (très chaud et humide).";
      } else if (message.toLowerCase().includes("transport")) {
        aiResponse =
          "Le JR Pass est parfait pour les circuits multi-villes. Pour Tokyo uniquement, privilégiez la carte Suica.";
      } else {
        aiResponse =
          "Excellente question ! Je peux vous aider avec les détails sur le Japon. N'hésitez pas à être plus spécifique.";
      }

      setChatMessages((prev) => [...prev, { type: "ai", content: aiResponse }]);
    }, 1000);
  };

  // Mise à jour des suggestions quand les réponses changent
  useEffect(() => {
    const suggestions = generateSmartSuggestions(answers);
    setSmartSuggestions(suggestions);

    const recommendations = getAIRecommendations(currentStepData?.id, answers);
    setAiRecommendations(recommendations);
  }, [answers, currentStep]);

  // Composant d'image avec fallback
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

  // Composant Chat IA
  const AIChat = () => (
    <div
      className={`fixed bottom-20 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 transform transition-all duration-300 z-50 ${
        showAIChat
          ? "scale-100 opacity-100"
          : "scale-95 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">Assistant IA Japon</span>
        </div>
        <button
          onClick={() => setShowAIChat(false)}
          className="p-1 hover:bg-white/20 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {chatMessages.length === 0 && (
          <div className="text-gray-500 text-sm text-center py-4">
            👋 Bonjour ! Je suis là pour répondre à vos questions sur le Japon !
          </div>
        )}
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-2xl text-sm ${
                msg.type === "user"
                  ? "bg-orange-500 text-white ml-4"
                  : "bg-gray-100 text-gray-800 mr-4"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && chatInput.trim() && handleAIChat(chatInput)
            }
            placeholder="Posez votre question..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={() => chatInput.trim() && handleAIChat(chatInput)}
            className="bg-purple-500 text-white p-2 rounded-xl hover:bg-purple-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Composant Suggestions Intelligentes
  const SmartSuggestions = () =>
    smartSuggestions.length > 0 && (
      <div className="fixed top-20 right-6 w-72 bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-orange-200 p-4 z-40">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-orange-500" />
          <span className="font-semibold text-gray-800">Suggestions IA</span>
        </div>
        <div className="space-y-3">
          {smartSuggestions.slice(0, 2).map((suggestion, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-orange-50 to-pink-50 p-3 rounded-xl border border-orange-100"
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">{suggestion.icon}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">
                    {suggestion.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {suggestion.reason}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">
                      {suggestion.confidence}% match
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  // Bouton Chat IA Flottant
  const AIChatButton = () => (
    <button
      onClick={() => setShowAIChat(true)}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );

  const handleAnswer = (key, value) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };

      if (key === "style" || key === "interests") {
        const currentArray = prev[key] || [];
        const newArray = currentArray.includes(value)
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value];
        newAnswers[key] = newArray;
      } else {
        newAnswers[key] = value;
      }

      // Génération de suggestions basées sur la nouvelle réponse
      setTimeout(() => {
        const newSuggestions = generateSmartSuggestions(newAnswers);
        setSmartSuggestions(newSuggestions);

        // Notification IA si suggestion importante
        if (newSuggestions.length > 0 && newSuggestions[0].confidence > 90) {
          setChatMessages((prev) => [
            ...prev,
            {
              type: "ai",
              content: `💡 J'ai une suggestion parfaite pour vous : ${newSuggestions[0].title}! ${newSuggestions[0].reason}`,
            },
          ]);
        }
      }, 500);

      return newAnswers;
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

  const generateItinerary = () => {
    setIsLoading(true);
    setApiError("");

    // Simulation de génération d'itinéraire
    setTimeout(() => {
      const itinerary = `# Votre Voyage au Japon

## Pour ${answers.username || "voyageur"}

**Type de voyage :** ${answers.type || "À définir"}
**Style :** ${answers.style?.join(", ") || "À définir"}
**Rythme :** ${answers.rythme || "À définir"}

### Jour 1 - Arrivée à Tokyo
- **Matin** : Arrivée à l'aéroport de Narita
- **Après-midi** : Installation à l'hôtel à Shibuya
- **Soir** : Première exploration du quartier

### Jour 2 - Tokyo Traditionnel
- **Matin** : Visite du temple Sensoji à Asakusa
- **Midi** : Déjeuner dans un restaurant traditionnel
- **Après-midi** : Promenade dans les jardins impériaux
- **Soir** : Dîner à Ginza

Votre itinéraire a été personnalisé selon vos préférences !`;

      setGeneratedItinerary(itinerary);
      setShowResult(true);
      setIsLoading(false);
    }, 2000);
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
                <span className="text-xl font-bold text-gray-800">
                  JapanGo IA
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Search className="w-6 h-6 text-gray-600" />
                <Menu className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto border border-gray-200">
              <ImageWithFallback
                src={currentStepData.media}
                alt="Japan intro"
                className="w-full h-96 object-cover"
                fallback={currentStepData.fallback}
                emoji="🏮"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent p-8">
                <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {currentStepData.title}
                </h1>
                <p className="text-xl text-gray-200 drop-shadow">
                  {currentStepData.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex justify-center space-x-8">
                {[
                  { emoji: "🗾", text: "Culture ancienne" },
                  { emoji: "🍜", text: "Cuisine unique" },
                  { emoji: "🌸", text: "Beauté naturelle" },
                  { emoji: "🤖", text: "Assistant IA" },
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
                Commencer avec l'IA <ArrowRight className="w-5 h-5" />
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
              {currentStepData.options.map((option) => (
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
                      className={`w-16 h-16 bg-gradient-to-r ${option.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <option.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                      {option.title}
                    </h3>
                    <p className="text-gray-200 text-lg drop-shadow">
                      {option.description}
                    </p>
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
              {currentStepData.options.map((option) => (
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

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {currentStepData.options.map((option) => {
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

              {/* Recommandations IA */}
              {aiRecommendations.length > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-2xl border border-purple-200 max-w-2xl mx-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">
                      Recommandations IA
                    </span>
                  </div>
                  <div className="text-sm text-purple-700 space-y-1">
                    {aiRecommendations.map((rec, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {currentStepData.options.map((option) => {
                const isSelected = answers.interests?.includes(option.id);
                const isAIRecommended = aiRecommendations.some((rec) =>
                  rec
                    .toLowerCase()
                    .includes(option.title.toLowerCase().split(" ")[0])
                );

                return (
                  <div
                    key={option.id}
                    onClick={() => handleAnswer("interests", option.id)}
                    className={`group cursor-pointer relative overflow-hidden rounded-2xl aspect-[4/3] transform transition-all duration-300 bg-white/90 backdrop-blur border-2 ${
                      isSelected
                        ? "scale-105 ring-4 ring-orange-400 border-orange-400 shadow-2xl"
                        : "hover:scale-105 border-gray-200 hover:border-orange-400 shadow-lg"
                    } ${
                      isAIRecommended
                        ? "ring-2 ring-purple-300 border-purple-300"
                        : ""
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

                    {isAIRecommended && !isSelected && (
                      <div className="absolute top-3 left-3 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center animate-bounce">
                        <Bot className="w-4 h-4 text-white" />
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
              {currentStepData.options.map((option) => (
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

            <div className="bg-white rounded-3xl p-8 space-y-6 border border-gray-200 shadow-lg">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  value={answers.username || ""}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
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
                  value={answers.duration || ""}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
                  placeholder="Ex : 10"
                  onChange={(e) => handleAnswer("duration", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Remarques particulières
                </label>
                <textarea
                  rows="3"
                  value={answers.remarques || ""}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none transition-all duration-200"
                  placeholder="Souhaits, contraintes..."
                  onChange={(e) => handleAnswer("remarques", e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-3 ${
                isLoading
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:from-orange-600 hover:to-pink-600"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Génération IA en cours...
                </>
              ) : (
                <>
                  Générer avec l'IA
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
              Voici votre itinéraire personnalisé par IA au Japon
            </p>
          </div>

          {isLoading && (
            <div className="text-center my-12">
              <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-700 text-lg">
                L'IA prépare votre itinéraire...
              </p>
            </div>
          )}

          {generatedItinerary && !isLoading && (
            <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-3xl p-8 shadow-lg">
              <div className="prose prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: generatedItinerary.replace(/\n/g, "<br/>"),
                  }}
                />
              </div>

              <div className="mt-8 text-center border-t border-gray-200 pt-6">
                <button
                  onClick={() => {
                    const element = document.createElement("a");
                    const file = new Blob([generatedItinerary], {
                      type: "text/plain",
                    });
                    element.href = URL.createObjectURL(file);
                    element.download = "japan-itinerary-ia.txt";
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-colors flex items-center gap-2 mx-auto font-semibold"
                >
                  <Download className="w-5 h-5" />
                  📄 Télécharger l'itinéraire IA
                </button>
              </div>

              {/* Section feedback IA */}
              <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-2xl border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">
                    Analyse IA de votre profil
                  </span>
                </div>
                <p className="text-sm text-purple-700">
                  Itinéraire optimisé : {answers.style?.join(", ")} •{" "}
                  {answers.type} • {answers.rythme}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {smartSuggestions.slice(0, 3).map((suggestion, index) => (
                    <span
                      key={index}
                      className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                    >
                      {suggestion.icon} {suggestion.title}
                    </span>
                  ))}
                </div>
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
                setChatMessages([]);
                setSmartSuggestions([]);
                setAiRecommendations([]);
              }}
              className="bg-gray-300 text-gray-700 px-8 py-3 rounded-2xl hover:bg-gray-400 transition-colors font-semibold flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Nouveau voyage avec IA
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
            {
              ["🌸", "🏮", "⛩️", "🎋", "🍜", "🤖"][
                Math.floor(Math.random() * 6)
              ]
            }
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

        {/* Composants IA */}
        <SmartSuggestions />
        <AIChat />
        {!showAIChat && <AIChatButton />}
      </div>
    </div>
  );
};

export default JapanTravelAssistant;
