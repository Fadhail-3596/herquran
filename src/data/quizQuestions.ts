import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Status atau fase kehidupan yang sedang kamu jalani saat ini?',
    description: 'Pilih situasi yang paling menggambarkan posisi dan dinamika keseharianmu sekarang.',
    category: 'Life Phase',
    options: [
      {
        id: 'q1_student',
        label: 'Mahasiswi / Pelajar',
        sublabel: 'Sedang sibuk menuntut ilmu, eksplorasi jati diri, dan menata mimpi masa depan.',
        characterScores: {
          'maryam': 3,
          'madyan-women': 4,
          'sister-of-musa': 4
        }
      },
      {
        id: 'q1_career',
        label: 'First-Jobber / Wanita Karir / Profesional',
        sublabel: 'Aktif di dunia kerja, mengasah kompetensi, dan menghadapi dinamika profesional.',
        characterScores: {
          'bilqis': 5,
          'asiyah': 4,
          'madyan-women': 3
        }
      },
      {
        id: 'q1_gapyear',
        label: 'Sedang Re-evaluasi Hidup / Mencari Arah Baru',
        sublabel: 'Sedang jeda (quarter-life crisis), mencari ketenangan hati, atau mendefinisikan ulang tujuan.',
        characterScores: {
          'maryam': 5,
          'sarah': 4,
          'wife-of-al-aziz': 3
        }
      },
      {
        id: 'q1_family',
        label: 'Ibu Muda / Mengemban Amanah Keluarga',
        sublabel: 'Mendedikasikan waktu merawat buah hati, keluarga, dan mendidik generasi penerus.',
        characterScores: {
          'mother-of-musa': 5,
          'mother-of-maryam': 5,
          'sarah': 3
        }
      }
    ]
  },
  {
    id: 2,
    question: 'Kalau hidup sedang tidak baik-baik saja (overthinking atau lelah mental), apa yang biasanya kamu lakukan?',
    description: 'Bagaimana mekanisme kopingmu saat menghadapi badai emosi atau tekanan?',
    category: 'Coping Mechanism',
    options: [
      {
        id: 'q2_prayer',
        label: 'Menepi dalam keheningan, sujud panjang, dan me-time spiritual',
        sublabel: 'Menangis di atas sajadah dan curhat pada Allah sampai hati kembali tenang.',
        characterScores: {
          'maryam': 5,
          'mother-of-musa': 4,
          'mother-of-maryam': 3
        }
      },
      {
        id: 'q2_strategy',
        label: 'Menganalisis masalah dengan kepala dingin dan menyusun langkah taktis',
        sublabel: 'Mencari akar penyebab, berdiskusi dengan orang terpercaya, dan mencari jalan keluar terukur.',
        characterScores: {
          'bilqis': 5,
          'sister-of-musa': 4,
          'madyan-women': 3
        }
      },
      {
        id: 'q2_express',
        label: 'Menyuarakan unek-unek dan mencari kejelasan secara terbuka',
        sublabel: 'Tidak bisa diam memendam; ingin kepastian dan keadilan diselesaikan secepatnya.',
        characterScores: {
          'khaulah': 5,
          'asiyah': 4,
          'sister-of-musa': 2
        }
      },
      {
        id: 'q2_struggle',
        label: 'Sempat denial, scrolling medsos, tapi kemudian tersadar untuk berbenah',
        sublabel: 'Menghadapi tarik-menarik antara rasa cemas manusiawi dan tekad untuk kembali bangkit.',
        characterScores: {
          'wife-of-al-aziz': 4,
          'sarah': 3,
          'mother-of-musa': 2
        }
      }
    ]
  },
  {
    id: 3,
    question: 'Pernahkah kamu merasa harus memilih antara prinsip moral/agama dan keinginan pribadi/lingkungan?',
    description: 'Ketika jalan yang benar terasa asing atau bertentangan dengan tren sekitar.',
    category: 'Integrity & Ethics',
    options: [
      {
        id: 'q3_unyielding',
        label: 'Teguh memegang prinsip meski harus terasing atau dipandang aneh',
        sublabel: 'Bagi saya, ridha Allah dan integritas diri tidak bisa ditawar oleh tren apapun.',
        characterScores: {
          'asiyah': 5,
          'maryam': 4,
          'madyan-women': 4
        }
      },
      {
        id: 'q3_diplomacy',
        label: 'Mencari cara cerdas dan bernegosiasi tanpa mengorbankan hal esensial',
        sublabel: 'Menggunakan diplomasi dan fleksibilitas taktis demi mempertahankan nilai inti.',
        characterScores: {
          'bilqis': 5,
          'sister-of-musa': 4,
          'madyan-women': 2
        }
      },
      {
        id: 'q3_speakup',
        label: 'Berani protes dan memperjuangkan hak ketika aturan yang ada merugikan',
        sublabel: 'Menolak diam jika ada ketidakadilan atau standar ganda yang dipaksakan.',
        characterScores: {
          'khaulah': 5,
          'asiyah': 3,
          'bilqis': 2
        }
      },
      {
        id: 'q3_repent',
        label: 'Pernah goyah atau salah langkah, tapi segera menyesal dan memperbaiki diri',
        sublabel: 'Menyadari kerapuhan diri dan memilih jujur bertaubat daripada terus berpura-pura suci.',
        characterScores: {
          'wife-of-al-aziz': 5,
          'sarah': 2,
          'maryam': 1
        }
      }
    ]
  },
  {
    id: 4,
    question: 'Kalau kamu tidak sengaja melakukan kesalahan atau keputusanmu keliru, bagaimana respons pertamamu?',
    description: 'Sikap batin kita saat menghadapi kegagalan atau khilaf pribadi.',
    category: 'Accountability',
    options: [
      {
        id: 'q4_humble',
        label: 'Langsung mengakui dengan jujur di hadapan Allah dan manusia, tanpa gengsi',
        sublabel: 'Minta maaf tulus dan segera bertanggung jawab atas dampak yang ditimbulkan.',
        characterScores: {
          'wife-of-al-aziz': 5,
          'bilqis': 4,
          'maryam': 3
        }
      },
      {
        id: 'q4_silent_fix',
        label: 'Menjaga ketenangan, memperbaiki secara diam-diam dan terarah',
        sublabel: 'Fokus pada tindakan perbaikan nyata daripada drama berkepanjangan.',
        characterScores: {
          'sister-of-musa': 4,
          'madyan-women': 4,
          'bilqis': 3
        }
      },
      {
        id: 'q4_tawakkal',
        label: 'Menyerahkan penyesalan mendalam dalam istighfar dan pasrah total pada rahmat-Nya',
        sublabel: 'Meminta Allah melapangkan hati dan menuntun langkah berikutnya.',
        characterScores: {
          'mother-of-musa': 4,
          'maryam': 4,
          'sarah': 3
        }
      },
      {
        id: 'q4_assertive',
        label: 'Mengevaluasi secara rasional apa yang terjadi dan menjelaskan konteksnya dengan adil',
        sublabel: 'Memisahkan mana kesalahan saya dan mana faktor lingkungan yang tidak adil.',
        characterScores: {
          'khaulah': 4,
          'asiyah': 4,
          'bilqis': 3
        }
      }
    ]
  },
  {
    id: 5,
    question: 'Apa ketakutan atau kekhawatiran terbesar yang paling sering menghantui pikiranmu?',
    description: 'Kekhawatiran terdalam yang sering kali memicu rasa cemas atau overthinking.',
    category: 'Vulnerability',
    options: [
      {
        id: 'q5_reputation',
        label: 'Dihakimi, difitnah, atau kehilangan nama baik padahal sudah berniat baik',
        sublabel: 'Takut opini negatif publik dan penilaian orang yang salah paham.',
        characterScores: {
          'maryam': 5,
          'sister-of-musa': 3,
          'wife-of-al-aziz': 3
        }
      },
      {
        id: 'q5_uncertainty',
        label: 'Ketidakpastian masa depan dan keselamatan orang-orang yang saya sayangi',
        sublabel: 'Cemas membayangkan skenario terburuk bagi orang tua, anak, atau pasangan.',
        characterScores: {
          'mother-of-musa': 5,
          'sarah': 4,
          'mother-of-maryam': 3
        }
      },
      {
        id: 'q5_compromise',
        label: 'Kehilangan jati diri dan terseret arus lingkungan yang toksik atau materialistis',
        sublabel: 'Takut iman dan idealismeku luntur demi mengejar standar kesuksesan duniawi.',
        characterScores: {
          'asiyah': 5,
          'madyan-women': 3,
          'maryam': 3
        }
      },
      {
        id: 'q5_helpless',
        label: 'Merasa tidak berdaya, tidak didengar suaranya, atau diperlakukan tidak adil',
        sublabel: 'Frustrasi saat dihadapkan pada sistem atau relasi yang menindas hak.',
        characterScores: {
          'khaulah': 5,
          'asiyah': 3,
          'bilqis': 3
        }
      }
    ]
  },
  {
    id: 6,
    question: 'Bagaimana gayamu dalam menghadapi tekanan lingkungan sosial atau peer pressure?',
    description: 'Ketika ekspektasi masyarakat atau teman sebaya mendesakmu bersikap tertentu.',
    category: 'Social Boundaries',
    options: [
      {
        id: 'q6_graceful',
        label: 'Menjaga batasan (healthy boundaries) dengan anggun dan tidak perlu membalas kasar',
        sublabel: 'Tegas pada batas pribadi sambil tetap menjaga tutur kata yang santun dan beradab.',
        characterScores: {
          'madyan-women': 5,
          'maryam': 4,
          'sister-of-musa': 3
        }
      },
      {
        id: 'q6_lead',
        label: 'Menghadapi dengan logika, bukti kuat, dan kemampuan diplomasi yang elegan',
        sublabel: 'Mampu mempengaruhi dan mengubah pandangan orang lain dengan kecerdasan komunikasi.',
        characterScores: {
          'bilqis': 5,
          'sister-of-musa': 4,
          'khaulah': 3
        }
      },
      {
        id: 'q6_courage',
        label: 'Berani berbeda secara total meskipun menjadi satu-satunya orang yang bertahan',
        sublabel: 'Tidak gentar menentang arus mayoritas jika mayoritas tersebut menuju kesesatan.',
        characterScores: {
          'asiyah': 5,
          'maryam': 3,
          'mother-of-musa': 3
        }
      },
      {
        id: 'q6_hope',
        label: 'Tersenyum dan bersabar menunggu pertolongan Allah seraya mendoakan kebaikan',
        sublabel: 'Memilih optimisme spiritual daripada larut dalam kepahitan sinisme sosial.',
        characterScores: {
          'sarah': 5,
          'mother-of-maryam': 4,
          'mother-of-musa': 3
        }
      }
    ]
  },
  {
    id: 7,
    question: 'Nilai (core value) apa yang paling ingin kamu tinggalkan sebagai warisan hidupmu?',
    description: 'Intisari makna hidup yang ingin kamu pegang erat hingga akhir hayat.',
    category: 'Core Value',
    options: [
      {
        id: 'q7_purity',
        label: 'Kemurnian hati, ketulusan ibadah, dan kedekatan batin dengan Allah SWT',
        sublabel: 'Hidup tenang dalam keridhaan Ilahi tanpa terikat riya atau sanjungan dunia.',
        characterScores: {
          'maryam': 5,
          'mother-of-maryam': 4,
          'asiyah': 3
        }
      },
      {
        id: 'q7_justice',
        label: 'Keberanian menegakkan kebenaran dan membela kaum yang tidak berdaya',
        sublabel: 'Menjadi pelindung dan pembawa keadilan di manapun kaki berpijak.',
        characterScores: {
          'asiyah': 5,
          'khaulah': 4,
          'sister-of-musa': 3
        }
      },
      {
        id: 'q7_wisdom',
        label: 'Kebijaksanaan, pemikiran visioner, dan kepemimpinan yang berempati',
        sublabel: 'Membimbing orang banyak menuju pencerahan melalui kecerdasan budi dan dialog.',
        characterScores: {
          'bilqis': 5,
          'madyan-women': 3,
          'sister-of-musa': 3
        }
      },
      {
        id: 'q7_love_tawakkal',
        label: 'Kasih sayang mendalam, pengorbanan tulus, dan tawakkal yang tak bersyarat',
        sublabel: 'Menjadi sumber keteduhan, doa yang tak putus, dan inspirasi bagi generasi berikutnya.',
        characterScores: {
          'mother-of-musa': 5,
          'mother-of-maryam': 4,
          'sarah': 4
        }
      }
    ]
  }
];
