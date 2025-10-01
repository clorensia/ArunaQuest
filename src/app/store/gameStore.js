import { create } from 'zustand';

// DATA & KONSTANTA (Akan dipindah ke API nanti)
const GAME_STATES = {
  DASHBOARD: 'dashboard',
  LOADING: 'loading',
  PLAYING: 'playing',
  FEEDBACK: 'feedback',
  REPORT: 'report',
  MINIGAME: 'minigame',
};

const STATS = {
  TEKNIS: 'teknis',
  SOSIAL: 'sosial',
  INISIATIF: 'inisiatif'
};

const quests = {
    'backend-engineer-day-v2': {
        id: 'backend-engineer-day-v2',
        title: 'A Day as a Back-End Engineer',
        description: "Hadapi dilema antara kecepatan dan kualitas saat membangun sebuah fitur, lalu komunikasikan risikonya kepada tim.",
        totalScenarios: 4,
        startScenarioId: 'SCENE_1',
        initialStats: { [STATS.TEKNIS]: 10, [STATS.SOSIAL]: 10, [STATS.INISIATIF]: 10 },
        recommendations: [
            { icon: '📖', title: 'Baca: System Design Fundamentals', description: 'Pelajari dasar-dasar merancang sistem yang scalable dan andal.', link: '#' },
            { icon: '📺', title: 'Tonton: Communicating Technical Decisions', description: 'Tingkatkan kemampuan Anda dalam menjelaskan trade-off teknis kepada stakeholder non-teknis.', link: '#' }
        ],
        scenarios: {
            'SCENE_1': { id: 'SCENE_1', type: 'narrative', title: "09:30 - The Technical Brief", narrative: "Rina, sang PM, menjelaskan fitur baru yang harus dibuat: 'Sistem Notifikasi'. Kamu melihat ada dua cara untuk membangunnya:", choices: [ { id: 'c1-1', text: "Mengusulkan solusi cepat: 'Kita bisa pakai servis eksternal yang sudah jadi. Implementasinya cepat, tapi biayanya per notifikasi dan kita kurang punya kontrol.'", effect: { [STATS.INISIATIF]: 1, [STATS.TEKNIS]: -1 }, feedback: "Rina terlihat tertarik dengan kecepatannya. 'Menarik, coba kamu eksplorasi lebih lanjut.' Kamu memilih jalur kecepatan.", nextSceneId: 'SCENE_2A' }, { id: 'c1-2', text: "Mengusulkan solusi jangka panjang: 'Lebih baik kita bangun servis notifikasi sendiri. Butuh waktu lebih lama, tapi lebih hemat dan fleksibel di masa depan.'", effect: { [STATS.TEKNIS]: 2, [STATS.INISIATIF]: 1 }, feedback: "Rina mengerti argumenmu. 'Oke, itu masuk akal untuk jangka panjang. Coba kamu rancang arsitekturnya.' Kamu memilih jalur kualitas.", nextSceneId: 'SCENE_2B' }, ], },
            'SCENE_2A': { id: 'SCENE_2A', type: 'minigame', title: "11:00 - Mini-Game: Debugging Cepat", narrative: "Saat mencoba integrasi dengan servis eksternal, kamu mendapat pesan error yang tidak jelas. Berdasarkan potongan pseudo-kode berikut, temukan baris mana yang kemungkinan besar menjadi penyebab error autentikasi.", minigameData: { type: 'spot_the_error', code: [ '1 function sendNotification(message) {', '2   const API_KEY = getApiKeyFromEnv();', '3   const headers = { "Content-Type": "application/json" };', '4   const body = { "message": message };', '5   post("https://external.service/api/send", body, headers);', '6 }' ], correctAnswer: '3' }, nextSceneId: 'SCENE_3', effect: { [STATS.TEKNIS]: 3 }, feedback: "Tepat sekali! Kamu menyadari bahwa API Key lupa dimasukkan ke dalam header. Masalah teratasi dengan cepat." },
            'SCENE_2B': { id: 'SCENE_2B', type: 'minigame', title: "11:00 - Mini-Game: Desain Sistem", narrative: "Kamu mulai merancang arsitektur untuk servis notifikasi internal. Susun komponen-komponen berikut menjadi sebuah alur arsitektur *event-driven* yang logis.", minigameData: { type: 'flow_chart', items: [ { id: 'item-1', text: 'API Gateway' }, { id: 'item-2', text: 'Message Broker (e.g., RabbitMQ)' }, { id: 'item-3', text: 'Notification Service' }, { id: 'item-4', text: 'User Service' }, ], correctOrder: ['4', '1', '2', '3'] }, nextSceneId: 'SCENE_3', effect: { [STATS.TEKNIS]: 4 }, feedback: "Desainmu sangat solid! Menggunakan Message Broker akan membuat sistem lebih tangguh dan mudah dikembangkan di masa depan." },
            'SCENE_3': { id: 'SCENE_3', type: 'narrative', title: "15:00 - Code Review", narrative: "Seorang engineer senior me-review pekerjaan/rencana-mu. Dia berkomentar, 'Pendekatanmu menarik, tapi apakah kamu sudah mempertimbangkan trade-off-nya? Coba jelaskan.'", choices: [ { id: 'c3-1', text: "Menerima masukannya dan berterima kasih, lalu berjanji akan mencatat risiko/trade-off tersebut dalam dokumentasi.", effect: { [STATS.SOSIAL]: 2, [STATS.TEKNIS]: 1 }, feedback: "Senior tersebut menghargai sikap dewasamu dalam menerima umpan balik.", nextSceneId: 'SCENE_4' }, { id: 'c3-2', text: "Berdebat dan mempertahankan pendekatanmu karena merasa itu yang paling benar saat ini.", effect: { [STATS.SOSIAL]: -1, [STATS.INISIATIF]: 1 }, feedback: "Kamu memang teguh pada pendirianmu, tapi diskusi menjadi sedikit defensif.", nextSceneId: 'SCENE_4' }, ] },
            'SCENE_4': { id: 'SCENE_4', type: 'narrative', title: "16:30 - Mengkomunikasikan Risiko", narrative: "Kamu perlu memberi update ke Rina (PM) tentang progres dan juga potensi risiko/trade-off dari pendekatan yang kamu pilih.", choices: [ { id: 'c4-1', text: "Menjelaskan progres dan secara transparan menyebutkan risikonya (misal: 'Biaya jangka panjang dari servis eksternal' atau 'Potensi delay karena kompleksitas').", effect: { [STATS.SOSIAL]: 3, [STATS.INISIATIF]: 1 }, feedback: "Rina sangat menghargai transparansimu. 'Terima kasih sudah memberitahu risikonya dari sekarang. Ini sangat membantu untuk perencanaan ke depan.'", nextSceneId: null }, { id: 'c4-2', text: "Hanya melaporkan progres yang baik dan tidak menyebutkan potensi risikonya untuk menghindari keributan.", effect: { [STATS.SOSIAL]: -2, [STATS.TEKNIS]: -1 }, feedback: "Untuk saat ini semua terlihat baik-baik saja. Namun, menyembunyikan risiko bisa menjadi masalah besar di kemudian hari.", nextSceneId: null }, ], },
        }
    },
    'ui-ux-designer-day-v2': {
        id: 'ui-ux-designer-day-v2',
        title: 'A Day as a UI/UX Designer',
        description: "Hadapi brief yang tidak jelas, sintesis data riset, dan negosiasi kendala teknis saat merancang fitur baru.",
        totalScenarios: 4,
        startScenarioId: 'SCENE_1',
        initialStats: { [STATS.TEKNIS]: 10, [STATS.SOSIAL]: 10, [STATS.INISIATIF]: 10 },
        recommendations: [
            { icon: '📖', title: 'Baca: About Face: The Essentials of Interaction Design', description: 'Buku fundamental tentang desain interaksi dan proses desain yang berpusat pada pengguna.', link: '#' },
            { icon: '📺', title: 'Tonton: How to run an effective feedback session', description: 'Pelajari cara memfasilitasi sesi umpan balik yang konstruktif dengan tim.', link: '#' }
        ],
        scenarios: {
            'SCENE_1': { id: 'SCENE_1', type: 'narrative', title: "09:30 - The Vague Brief", narrative: "Kamu bertemu Rina, sang PM. 'Aku butuh desain untuk fitur 'Project Showcase'. Intinya, halaman portofolio untuk pengguna. Aku percaya kreativitasmu!' Brief-nya sangat terbuka dan kurang detail.", choices: [ { id: 'c1-1', text: "Mendorong untuk melakukan riset pengguna singkat terlebih dahulu untuk memvalidasi masalah.", effect: { [STATS.TEKNIS]: 2, [STATS.INISIATIF]: 1 }, feedback: "Rina setuju, meskipun sedikit khawatir dengan waktu. 'Oke, tapi kita butuh hasilnya cepat ya.' Kamu memilih jalur yang lebih mendalam.", nextSceneId: 'SCENE_2A' }, { id: 'c1-2', text: "Langsung mulai membuat sketsa beberapa ide desain berdasarkan asumsimu.", effect: { [STATS.INISIATIF]: 1, [STATS.TEKNIS]: -1 }, feedback: "Rina terlihat senang dengan kecepatanmu. 'Mantap! Tidak sabar lihat hasilnya.' Kamu memilih jalur yang lebih cepat namun berisiko.", nextSceneId: 'SCENE_2B' }, ], },
            'SCENE_2A': { id: 'SCENE_2A', type: 'minigame', title: "11:00 - Mini-Game: Sintesis Riset", narrative: "Kamu berhasil mengumpulkan beberapa kutipan dari hasil wawancara singkat dengan pengguna. Sekarang, kelompokkan masukan-masukan ini ke dalam kategori yang tepat untuk menemukan pola (Affinity Mapping).", minigameData: { type: 'categorization', categories: ['Kebutuhan Utama', 'Hambatan', 'Motivasi'], items: [ { id: 'item-1', text: '"Saya kesulitan menunjukkan proyek non-digital saya."', category: 'Hambatan' }, { id: 'item-2', text: '"Saya ingin dilirik oleh rekruter dari perusahaan besar."', category: 'Motivasi' }, { id: 'item-3', text: '"Platform lain terlalu rumit untuk membuat portofolio."', category: 'Hambatan' }, { id: 'item-4', text: '"Penting bagi saya untuk bisa menjelaskan proses di balik setiap proyek."', category: 'Kebutuhan Utama' }, ] }, nextSceneId: 'SCENE_3', effect: { [STATS.TEKNIS]: 3 }, feedback: "Kamu berhasil menemukan pola yang jelas dari riset: pengguna butuh cara yang mudah untuk menceritakan proses di balik proyek mereka." },
            'SCENE_2B': { id: 'SCENE_2B', type: 'minigame', title: "11:00 - Mini-Game: Wireframing Cepat", narrative: "Tanpa riset mendalam, kamu mengandalkan intuisimu untuk membuat struktur halaman. Susun komponen-komponen UI dasar berikut menjadi sebuah layout wireframe yang logis untuk halaman portofolio.", minigameData: { type: 'layouting', canvasAreas: ['Header', 'Main Content', 'Sidebar', 'Footer'], items: [ { id: 'item-1', text: 'Gambar Proyek Utama' }, { id: 'item-2', text: 'Judul & Deskripsi Proyek' }, { id: 'item-3', text: 'Tombol "Hubungi Saya"' }, { id: 'item-4', text: 'Galeri Gambar Pendukung' }, ] }, nextSceneId: 'SCENE_3', effect: { [STATS.INISIATIF]: 2, [STATS.TEKNIS]: 1 }, feedback: "Kamu dengan cepat berhasil membuat sebuah layout yang terlihat bagus secara visual." },
            'SCENE_3': { id: 'SCENE_3', type: 'narrative', title: "15:00 - The Feedback Session", narrative: "Kamu mempresentasikan hasil kerjamu (temuan riset atau wireframe) kepada Rina (PM) dan Budi (Engineer). Budi langsung merespons, 'Visinya bagus, tapi fitur galeri gambar interaktif ini sepertinya butuh waktu development yang lama.'", choices: [ { id: 'c3-1', text: "Mendengarkan masukannya dan menawarkan untuk mencari solusi desain alternatif yang lebih sederhana.", effect: { [STATS.SOSIAL]: 3, [STATS.TEKNIS]: 1 }, feedback: "Tim menghargai pendekatan kolaboratifmu. Kalian pun mulai berdiskusi mencari jalan tengah.", nextSceneId: 'SCENE_4' }, { id: 'c3-2', text: "Mempertahankan desain/ide awal karena itu yang terbaik untuk pengguna, dan meminta tim teknis untuk mencari cara mengatasinya.", effect: { [STATS.INISIATIF]: 1, [STATS.SOSIAL]: -2 }, feedback: "Kamu memang memperjuangkan pengguna, tapi tim teknis merasa kurang didengarkan dan mulai melihatmu sebagai 'desainer menara gading'.", nextSceneId: 'SCENE_4' }, ] },
            'SCENE_4': { id: 'SCENE_4', type: 'narrative', title: "16:30 - Next Steps", narrative: "Meeting selesai dengan beberapa masukan. Rina bertanya, 'Jadi, apa rencanamu selanjutnya untuk besok?'", choices: [ { id: 'c4-1', text: "Oke, berdasarkan masukan tadi, aku akan membuat iterasi desain/prototipe yang lebih detail dan menjadwalkan sesi tes singkat dengan 2-3 pengguna.", effect: { [STATS.INISIATIF]: 2, [STATS.TEKNIS]: 1 }, feedback: "Rina terkesan. 'Langkah yang sangat jelas dan proaktif. Ditunggu hasilnya!'", nextSceneId: null }, { id: 'c4-2', text: "Aku akan pikirkan dulu semua masukannya dan kabari besok.", effect: { [STATS.INISIATIF]: -1 }, feedback: "Rina mengangguk. 'Oke.' Kamu tidak memberikan kepastian, yang membuat progres selanjutnya menjadi abu-abu.", nextSceneId: null }, ], },
        }
    },
    'product-manager-day-v2': {
        id: 'product-manager-day-v2',
        title: 'A Day as a Product Manager',
        description: "Navigasi permintaan mendadak dari CEO, dilema prioritas, dan konflik tim untuk menjaga roadmap tetap berjalan.",
        totalScenarios: 4,
        startScenarioId: 'SCENE_1',
        initialStats: { [STATS.TEKNIS]: 10, [STATS.SOSIAL]: 10, [STATS.INISIATIF]: 10 },
        recommendations: [
            { icon: '📖', title: 'Baca: Inspired: How to Create Tech Products Customers Love', description: 'Panduan esensial tentang peran manajer produk di perusahaan teknologi modern.', link: '#' },
            { icon: '📺', title: 'Tonton: The Art of Product Roadmapping', description: 'Pelajari cara membuat dan mengkomunikasikan roadmap produk yang efektif.', link: '#' }
        ],
        scenarios: {
            'SCENE_1': { id: 'SCENE_1', title: "09:00 - The Unexpected Request", narrative: "Kamu sedang memimpin sprint planning. Tiba-tiba, CEO bergabung dalam panggilan. 'Tim, aku baru dapat ide brilian semalam! Kita harus menambahkan fitur 'Social Feed' di aplikasi kita secepatnya!' Ide ini tidak ada dalam roadmap kuartal ini.", choices: [ { id: 'c1-1', text: "Menyanggupi permintaan CEO dan menjadikannya prioritas.", effect: { [STATS.INISIATIF]: -3, [STATS.TEKNIS]: -2, [STATS.SOSIAL]: 2 }, feedback: "CEO terlihat sangat senang. Namun, tim developer terlihat bingung dan kecewa karena rencana yang sudah disusun menjadi berantakan.", nextSceneId: 'SCENE_2A' }, { id: 'c1-2', text: "Menghargai ide CEO dan menjanjikan riset, namun tetap pada rencana sprint.", effect: { [STATS.INISIATIF]: 2, [STATS.SOSIAL]: 2 }, feedback: "CEO mengerti. 'Oke, saya percaya penilaianmu. Tolong beri saya update hasil risetnya ya.' Kamu berhasil menjaga fokus dan moral tim.", nextSceneId: 'SCENE_2B' }, ], },
            'SCENE_2A': { id: 'SCENE_2A', type: 'minigame', title: "10:30 - Brainstorming Cepat", narrative: "CEO ingin ide 'Social Feed' segera diwujudkan. Untuk mempresentasikannya, kamu harus memetakan fitur-fitur utamanya. Seret dan urutkan (drag-and-drop) daftar fitur berikut dari yang 'Paling Penting' hingga 'Kurang Penting' untuk MVP.", minigameData: { type: 'prioritization', items: [ { id: 'item-1', text: 'Post Teks & Gambar' }, { id: 'item-2', text: 'Sistem Komentar' }, { id: 'item-3', text: 'Fitur Like' }, { id: 'item-4', text: 'Fitur Video Upload' }, { id: 'item-5', text: 'Integrasi GIF' }, ], correctOrder: ['item-1', 'item-3', 'item-2', 'item-5', 'item-4'] }, nextSceneId: 'SCENE_3A',  effect: { [STATS.TEKNIS]: 2, [STATS.INISIATIF]: 1 }, feedback: "Kamu berhasil menyusun prioritas fitur MVP yang masuk akal untuk didiskusikan lebih lanjut." },
            'SCENE_3A': { id: 'SCENE_3A', title: "14:00 - Konfrontasi Tim", narrative: "Budi, Lead Engineer, menghampirimu secara pribadi. 'Aku lihat kita tiba-tiba ganti prioritas. Tim jadi bingung dan demotivasi. Selain itu, ini akan menunda perbaikan technical debt yang penting.'", choices: [ { id: 'c3a-1', text: "Aku mengerti, Bud. Ini permintaan mendadak. Mari kita adakan sesi singkat dengan tim untuk menjelaskan konteks dari CEO dan menyusun ulang rencana bersama.", effect: { [STATS.SOSIAL]: 3, [STATS.TEKNIS]: 1 }, feedback: "Budi mengapresiasi pendekatanmu. 'Oke, itu akan sangat membantu. Terima kasih.' Kamu berhasil meredakan ketegangan.", nextSceneId: 'SCENE_4' }, { id: 'c3a-2', text: "Ini keputusan dari atas, kita harus menjalankannya. Tolong sampaikan saja ke tim untuk beradaptasi.", effect: { [STATS.SOSIAL]: -3, [STATS.INISIATIF]: 1 }, feedback: "Budi menghela napas. 'Oke, kalau begitu.' Kamu merasakan ada jarak yang tercipta antara kamu dan tim teknis.", nextSceneId: 'SCENE_4' }, ] },
            'SCENE_2B': { id: 'SCENE_2B', title: "11:00 - The Prioritization Dilemma", narrative: "Setelah meeting, kamu harus finalisasi prioritas sprint. Tim engineer hanya punya kapasitas untuk mengerjakan SATU dari dua hal berikut:", choices: [ { id: 'c2b-1', text: "Mengerjakan fitur baru yang paling banyak diminta oleh pengguna.", effect: { [STATS.TEKNIS]: 2, [STATS.INISIATIF]: 1 }, feedback: "Keputusan yang kuat. Ini akan membuat pengguna senang dan menunjukkan bahwa kamu mendengarkan.", nextSceneId: 'SCENE_3B' }, { id: 'c2b-2', text: "Mengerjakan perbaikan technical debt yang diminta oleh tim engineer.", effect: { [STATS.TEKNIS]: 2, [STATS.SOSIAL]: 1 }, feedback: "Keputusan yang bijak. Ini akan membuat aplikasi lebih sehat dan tim developer lebih produktif di masa depan.", nextSceneId: 'SCENE_3B' }, ] },
            'SCENE_3B': { id: 'SCENE_3B', title: "14:00 - Mediasi Konflik", narrative: "Di sesi diskusi, desainer UI/UX dan lead engineer berdebat. Desainer ingin animasi yang kompleks, sementara engineer mengatakan itu akan menunda fitur inti.", choices: [ { id: 'c3b-1', text: "Menengahi dan mencari jalan tengah: 'Bisakah kita gunakan animasi yang lebih sederhana untuk MVP ini, dan versi kompleksnya kita masukkan ke backlog?'", effect: { [STATS.SOSIAL]: 3, [STATS.INISIATIF]: 1 }, feedback: "Kedua belah pihak setuju. Kamu berhasil menyelesaikan konflik dan menjaga proyek tetap berjalan.", nextSceneId: 'SCENE_4' }, { id: 'c3b-2', text: "Memihak pada engineer: 'Benar, kita tidak punya waktu. Lupakan animasinya, fokus pada fungsi.'", effect: { [STATS.SOSIAL]: -2, [STATS.INISIATIF]: 1 }, feedback: "Tim engineer merasa didukung, tapi tim desainer merasa kerja mereka tidak dihargai. Ini bisa merusak moral tim.", nextSceneId: 'SCENE_4' }, ] },
            'SCENE_4': { id: 'SCENE_4', title: "16:00 - The Roadmap Update", narrative: "Kamu harus mengirim email update mingguan ke para stakeholder (termasuk CEO) mengenai apa yang akan dikerjakan tim dalam sprint ini.", choices: [ { id: 'c4-1', text: "Menulis email yang jelas dan transparan, menjelaskan keputusan prioritas dan alasannya, serta rencana untuk ide/tugas yang tertunda.", effect: { [STATS.SOSIAL]: 3 }, feedback: "Emailmu sangat jelas dan proaktif. Para stakeholder tahu apa yang diharapkan dan mengapa keputusan itu dibuat. Ini membangun kepercayaan.", nextSceneId: null }, { id: 'c4-2', text: "Menulis email singkat yang hanya menyebutkan apa yang akan dikerjakan, tanpa konteks.", effect: { [STATS.SOSIAL]: -1 }, feedback: "Emailmu menimbulkan pertanyaan lanjutan dari stakeholder, 'Bagaimana dengan isu X? Apakah dilupakan?' Kamu harus mengirim email klarifikasi.", nextSceneId: null }, ], },
        }
    },
};

// Fungsi utilitas seperti safeLocalStorage, validateMiniGame, getBadge
// tidak perlu diubah.
const safeLocalStorage = {
    getItem(key) {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
      return null;
    },
    setItem(key, value) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    },
    removeItem(key) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    }
  };
  
  const validateMiniGame = (type, userAnswer, minigameData) => {
      switch (type) {
          case 'spot_the_error':
              return userAnswer.selectedLine.toString() === minigameData.correctAnswer;
          case 'prioritization':
          case 'flow_chart':
              const userOrder = userAnswer.items.map(item => item.id);
              return JSON.stringify(userOrder) === JSON.stringify(minigameData.correctOrder);
          case 'categorization':
              return Object.entries(userAnswer.categorizedItems).every(([category, items]) => {
                  const correctItemsForCategory = minigameData.items.filter(i => i.category === category);
                  if (items.length !== correctItemsForCategory.length) return false;
                  const userItemIds = items.map(i => i.id).sort();
                  const correctItemIds = correctItemsForCategory.map(i => i.id).sort();
                  return JSON.stringify(userItemIds) === JSON.stringify(correctItemIds);
              });
          case 'layouting':
               return userAnswer.layout['Main Content']?.length > 0;
          default:
              return false;
      }
  };
  
  const getBadge = (stats) => {
      const sortedStats = Object.entries(stats).sort(([,a],[,b]) => b - a);
      if (!sortedStats.length) return { name: 'Pencapai Misterius', icon: '❓' };
      const topStat = sortedStats[0][0];
      switch(topStat) {
        case STATS.TEKNIS: return { name: 'Problem Solver Strategis', icon: '🧠' };
        case STATS.SOSIAL: return { name: 'Komunikator Andal', icon: '🤝' };
        case STATS.INISIATIF: return { name: 'Pemimpin Proaktif', icon: '🚀' };
        default: return { name: 'Pencapai Seimbang', icon: '🌟' };
      }
  };

// Inisialisasi Zustand Store
export const useGameStore = create((set, get) => ({
    gameState: GAME_STATES.DASHBOARD,
    allQuests: quests, // Data hardcode untuk sekarang
    questData: null,
    currentScenarioId: null,
    currentScenarioIndex: 0,
    stats: {},
    error: null,
    lastChoiceFeedback: '',
    transientEffect: null,
  
    startQuest: (questId) => {
      set({ gameState: GAME_STATES.LOADING, error: null });
      setTimeout(() => { // Simulasi loading
        const questData = get().allQuests[questId];
        if (!questData) {
          set({ error: 'Quest tidak ditemukan', gameState: GAME_STATES.DASHBOARD });
          return;
        }
        const newState = {
          questData,
          stats: { ...questData.initialStats },
          currentScenarioId: questData.startScenarioId,
          currentScenarioIndex: 1,
          gameState: GAME_STATES.PLAYING,
        };
        set(newState);
        safeLocalStorage.setItem('arunaquest-save', JSON.stringify(newState));
      }, 500);
    },
  
    handleChoice: (choice) => {
        set({ transientEffect: choice.effect });
    
        setTimeout(() => {
          set({ transientEffect: null });
          const { stats, questData, currentScenarioIndex } = get();
          const newStats = { ...stats };
    
          Object.entries(choice.effect).forEach(([statKey, value]) => {
              if (newStats[statKey] !== undefined) {
                newStats[statKey] += value;
              }
          });
    
          set({
              stats: newStats,
              lastChoiceFeedback: choice.feedback,
              gameState: GAME_STATES.FEEDBACK
          });
    
          setTimeout(() => {
              const nextScenario = questData.scenarios[choice.nextSceneId];
              const nextGameState = nextScenario?.type === 'minigame' ? GAME_STATES.MINIGAME : GAME_STATES.PLAYING;
              const newState = {
                  currentScenarioId: choice.nextSceneId,
                  currentScenarioIndex: currentScenarioIndex + 1,
                  gameState: choice.nextSceneId ? nextGameState : GAME_STATES.REPORT,
              };
              set(newState);
    
              if (!choice.nextSceneId) get().endQuest();
              
              const currentState = get();
              safeLocalStorage.setItem('arunaquest-save', JSON.stringify({
                  ...currentState,
                  ...newState,
                  lastChoiceFeedback: '',
                  transientEffect: null
              }));
          }, 2500);
        }, 1500);
      },
    
      completeMinigame: (userAnswer, minigameData) => {
          const { stats, questData, currentScenarioIndex, currentScenarioId } = get();
          const scenario = questData.scenarios[currentScenarioId];
          const isCorrect = validateMiniGame(minigameData.type, userAnswer, minigameData);
    
          if (!isCorrect) {
              set({ lastChoiceFeedback: "Hmm, sepertinya ada yang kurang tepat. Coba kita lihat lagi.", gameState: GAME_STATES.FEEDBACK });
              setTimeout(() => {
                  set({ gameState: GAME_STATES.MINIGAME, lastChoiceFeedback: '' });
              }, 2500);
              return;
          }
    
          set({ transientEffect: scenario.effect });
    
          setTimeout(() => {
              set({ transientEffect: null });
              const newStats = { ...stats };
              Object.entries(scenario.effect).forEach(([statKey, value]) => {
                  if (newStats[statKey] !== undefined) newStats[statKey] += value;
              });
    
              set({
                  stats: newStats,
                  lastChoiceFeedback: scenario.feedback,
                  gameState: GAME_STATES.FEEDBACK
              });
    
              setTimeout(() => {
                  const nextScenarioId = scenario.nextSceneId;
                  const nextScenario = questData.scenarios[nextScenarioId];
                  const nextGameState = nextScenario?.type === 'minigame' ? GAME_STATES.MINIGAME : GAME_STATES.PLAYING;
                  const newState = {
                      currentScenarioId: nextScenarioId,
                      currentScenarioIndex: currentScenarioIndex + 1,
                      gameState: nextGameState,
                  };
                  set(newState);
                  
                  if (!nextScenarioId) get().endQuest();
    
                  const currentState = get();
                  safeLocalStorage.setItem('arunaquest-save', JSON.stringify({
                      ...currentState,
                      ...newState,
                      lastChoiceFeedback: '',
                      transientEffect: null
                  }));
              }, 2500);
          }, 1500);
      },
  
    endQuest: () => {
      set({ gameState: GAME_STATES.REPORT });
      safeLocalStorage.removeItem('arunaquest-save');
    },
  
    resetQuest: () => {
      safeLocalStorage.removeItem('arunaquest-save');
      set({
        gameState: GAME_STATES.DASHBOARD,
        questData: null,
        currentScenarioId: null,
        currentScenarioIndex: 0,
        stats: {},
        error: null,
      });
    },
  
    loadSavedGame: () => {
        const saved = safeLocalStorage.getItem('arunaquest-save');
        if (saved) {
          const savedState = JSON.parse(saved);
          // Re-attach allQuests from the initial state
          savedState.allQuests = quests;
          set(savedState);
        }
      }
  }));

export { GAME_STATES };