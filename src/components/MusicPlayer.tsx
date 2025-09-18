import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Heart, SkipBack, SkipForward, Shuffle, Search, Volume2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const MusicPlayer: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isShuffled, setIsShuffled] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const songs = [
    
    
    {
      "title": "Sadakny Khalas",
      "artist": "Amr Diab",
      "duration": "3:51",
      "src": `${import.meta.env.BASE_URL}songs/08.Sadakny_Khalas.mp3`
    },
    {
      "title": "Habibty Mlak",
      "artist": "Amr Diab",
      "duration": "4:15",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_amrw_dyab_hbیbty_mlak.mp3`
    },
    {
      "title": "Aghla Min Omry",
      "artist": "Amr Diab",
      "duration": "4:46",
      "src": `${import.meta.env.BASE_URL}songs/10_Aghla_Min_Omry.mp3`
    },
        {
    "title": "We Maloh",
    "artist": "Amr Diab",
    "duration": "4:48",
    "src": `${import.meta.env.BASE_URL}songs/02.We_Maloh.mp3`
  },
  {
    "title": "Khalina Lewahdina",
    "artist": "Amr Diab",
    "duration": "5:19",
    "src": `${import.meta.env.BASE_URL}songs/07_Khalina_Lewahdina.mp3`
  },
  {
    "title": "Tamally Maak",
    "artist": "Amr Diab",
    "duration": "4:31",
    "src": `${import.meta.env.BASE_URL}songs/02.Tamally_Maak.mp3`
  },
  {
    "title": "Ray2ah",
    "artist": "Amr Diab",
    "duration": "4:06",
    "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_Amr_Diab_Ray2ah.mp3`
  },
    {
      "title": "Lama 2abeltak",
      "artist": "Amr Diab",
      "duration": "3:52",
      "src": `${import.meta.env.BASE_URL}songs/Nghmat.Com_Amr.Diab_lama.2abeltak.mp3`
      
    },
    {
      "title": "Abtdyna",
      "artist": "Amr Diab",
      "duration": "3:53",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_amrw_dyab_abtdyna.mp3`
    },
    {
      "title": "Baba",
      "artist": "Amr Diab",
      "duration": "3:18",
      "src":`${import.meta.env.BASE_URL}songs/Albumaty.Com_amrw_dyab_baba.mp3`
    },
    {
      "title": "Btmn Alyk",
      "artist": "Amr Diab",
      "duration": "4:02",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_amrw_dyab_btmn_alyk.mp3`
    },

    {
      "title": "Khtfwny",
      "artist": "Amr Diab",
      "duration": "4:20",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_amrw_dyab_khtfwny.mp3`
    },
    {
      "title": "Ma tklksh",
      "artist": "Amr Diab",
      "duration": "4:14",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_amrw_dyab_ma_tklksh.mp3`
    },
    

  {
    "title": "Banadeek Taala",
    "artist": "Amr Diab",
    "duration": "3:15",
    "src": `${import.meta.env.BASE_URL}songs/01_Banadeek_Taala.mp3`
  },

    {
      "title": "Khalleeny Ganbak",
      "artist": "Amr Diab",
      "duration": "5:17",
      "src": `${import.meta.env.BASE_URL}songs/13.Khalleeny_Ganbak.mp3`
    },
    {
      "title": "Odam Merayetha",
      "artist": "Amr Diab",
      "duration": "3:42",
      "src": `${import.meta.env.BASE_URL}songs/14._Odam_Merayetha.mp3`
    },
    {
      "title": "Ayesh Ma3ak",
      "artist": "Amr Diab",
      "duration": "3:58",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Amr.Diab.Ayesh.Ma3ak.mp3`
    },
    {
      "title": "Tehayark",
      "artist": "Amr Diab",
      "duration": "3:31",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Amr.Diab.Tehayark.mp3`
    },
    {
      "title": "Yahob Dwbna",
      "artist": "Amr Diab",
      "duration": "3:24",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Amr.Diab.Yahob.Dwbna.mp3`
    }, 
    {
    "title": "Shokran mn hnalbkra",
    "artist": "Amr Diab",
    "duration": "2:52",
    "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_amrw_dyab_shkra_mn_hna_lbkra___aalan_fwdafwn___rmdan_2023.mp3`
  },

  
  {
    "title": "Bahebo",
    "artist": "Amr Diab",
    "duration": "3:55",
    "src": `${import.meta.env.BASE_URL}songs/13._Bahebo.mp3`
  },
  {
      "title": "Aktar Wahed",
      "artist": "Amr Diab",
      "duration": "4:31",
      "src": `${import.meta.env.BASE_URL}songs/02.Aktar_Wahed.mp3`
    },


    {
      "title": "Andy Suwal",
      "artist": "Amr Diab",
      "duration": "3:38",
      "src": `${import.meta.env.BASE_URL}songs/03_Andy_Suwal.mp3`
    },
    {
      "title": "Allah Ala Hobak",
      "artist": "Amr Diab",
      "duration": "3:41",
      "src": `${import.meta.env.BASE_URL}songs/04.Allah_Ala_Hobak.mp3`
    },
    {
      "title": "Maak Alby",
      "artist": "Amr Diab",
      "duration": "3:18",
      "src": `${import.meta.env.BASE_URL}songs/04_-_Maak_Alby.mp3`
    },
    {
      "title": "Tameny",
      "artist": "Amr Diab",
      "duration": "2:50",
      "src": `${import.meta.env.BASE_URL}songs/07.Tameny.mp3`
    },
    {
      "title": "Allemny Hawak",
      "artist": "Amr Diab",
      "duration": "3:20",
      "src": `${import.meta.env.BASE_URL}songs/08.Allemny_Hawak.mp3`
    },
    {
      "title": "We Fehemt Einak",
      "artist": "Amr Diab",
      "duration": "3:41",
      "src": `${import.meta.env.BASE_URL}songs/08.We_Fehemt_Einak.mp3`
    },
    {
      "title": "Helwa El Ayam",
      "artist": "Amr Diab",
      "duration": "3:49",
      "src": `${import.meta.env.BASE_URL}songs/06.Helwa_El_Ayam.mp3`
    },
        {
      "title": "Khalik Maaaya",
      "artist": "Amr Diab",
      "duration": "3:54",
      "src": `${import.meta.env.BASE_URL}songs/10.Khalik_Maaaya.mp3`
    },
        {
      "title": "Youm Matbelna",
      "artist": "Amr Diab",
      "duration": "3:25",
      "src": `${import.meta.env.BASE_URL}songs/09_Youm_Matbelna.mp3`
    },
        {
      "title": "Ya Ahla Haga",
      "artist": "Amr Diab",
      "duration": "5:46",
      "src": `${import.meta.env.BASE_URL}songs/10_Ahla_Haga.mp3`
    },
        {
      "title": "Taali",
      "artist": " Amr Diab",
      "duration": "3:17",
      "src":`${import.meta.env.BASE_URL}songs/13._Taali.mp3`
    },



















    {
      "title": "Ehsas Ghareb",
      "artist": "Ur Favourite Film",
      "duration": "3:16",
      "src": `${import.meta.env.BASE_URL}songs/828B26xq.mp3`
    },
        {
      "title": "Elly Msbrny",
      "artist": "Ur Favourite Film",
      "duration": "3:26",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Ahmed.Fahmy.Elly.Msbrny.mp3`
    },
    {
      "title": "Handoos",
      "artist": "Ur Favourite Film",
      "duration": "3:37",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Ahmed.Fahmy.Handoos.mp3`
    },
        {
      "title": "Ghabt Shamsna",
      "artist": "Ur Favourite Film",
      "duration": "4:43",
      "src": `${import.meta.env.BASE_URL}songs/40Z884Iu.mp3`
    },






  {
    "title": "Mn Alby Baghany",
    "artist": "Hamaki",
    "duration": "4:43",
    "src": `${import.meta.env.BASE_URL}songs/12.Mn_Alby_Baghany.mp3`
  },
  {
    "title": "Ewediny",
    "artist": "Hamaki",
    "duration": "5:43",
    "src": `${import.meta.env.BASE_URL}songs/01_-_Ewediny.mp3`
  },
      {
      "title": "Haga Mestakhabeya",
      "artist": "Hamaki",
      "duration": "4:47",
      "src": `${import.meta.env.BASE_URL}songs/04.Haga_Mestakhabeya.mp3`
    },
    {
      "title": "Ahla Haga Feeky",
      "artist": "Hamaki",
      "duration": "3:41",
      "src": `${import.meta.env.BASE_URL}songs/12._Ahla_Haga_Feeky.mp3`
    },











    {
      "title": "Y5lek Leya",
      "artist": "Ramy Gamal",
      "duration": "4:07",
      "src": `${import.meta.env.BASE_URL}songs/09.Y5lek_Leya.mp3`
    },
        {
      "title": "Behom Kolohom",
      "artist": "Ramy Gamal",
      "duration": "4:02",
      "src": `${import.meta.env.BASE_URL}songs/Behom_Kolohom_Albumaty.Com.mp3`
  },
    {
      "title": "Zay El-Shams",
      "artist": "Ramy Gamal",
      "duration": "4:29",
      "src": `${import.meta.env.BASE_URL}songs/07.Zay_El-Shams.mp3`
    },
    {
    "title": "Ewediny",
    "artist": "Ramy Gamal",
    "duration": "5:43",
    "src": `${import.meta.env.BASE_URL}songs/01_-_Ewediny.mp3`
  },











      {
      "title": "Ghaly",
      "artist": "Ramy Sabry",
      "duration": "5:01",
      "src": `${import.meta.env.BASE_URL}songs/06.Ghaly_Nghmaty.Com.mp3`
    },

    {
      "title": "Ma3 El Ayam",
      "artist": "Ramy Sabry",
      "duration": "3:56",
      "src": `${import.meta.env.BASE_URL}songs/10_-_Ma3_El_Ayam.mp3`
    },
        {
      "title": "Kelma",
      "artist": "Ramy Sabry",
      "duration": "4:08",
      "src": `${import.meta.env.BASE_URL}songs/04.Kelma.mp3`
    },
        {
      "title": "Kol Sana",
      "artist": "Ramy Sabry",
      "duration": "3:03",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_ramy_sbri_kl_snt.mp3`
    },















        {
      "title": "Khalini",
      "artist": "Tamer Ashour",
      "duration": "3:16",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_Tamer_Ashour_Khalini.mp3`
    },
      {
    "title": "Men Gherak",
    "artist": "Tamer Ashour",
    "duration": "4:20",
    "src": `${import.meta.env.BASE_URL}songs/10_-_Men_Gherak.mp3`

  },
    {
      "title": "Elrak 3l Neia",
      "artist": "Tamer Ashour",
      "duration": "4:19",
      "src": `${import.meta.env.BASE_URL}songs/06_-_Elrak_3l_Neia.mp3`
    },

{
      "title": "Ana Mn Gherak",
      "artist": "Bahaa Sultan",
      "duration": "3:41",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_bhaa_sltan_ana_mn_ghyrk_-_mn_fylm_alhwi_sltan.mp3`
    },
    {
      "title": "Ana Msh Aayz Ghyrk",
      "artist": "Bahaa Sultan",
      "duration": "3:27",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_bhaa_sltan_ana_msh_aayz_ghyrk_-_ealan_enrshya.mp3`
    },
    {
      "title": "Ganna Tekfeina",
      "artist": "El Esseily",
      "duration": "4:16",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_Mahmoud_El_Esseily_Ganna_Tekfeina.mp3`
    },
    {
      "title": "Dlmt Dlmt",
      "artist": "El Esseily",
      "duration": "3:38",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_mhmwd_alasyly_dlmt_dlmt.mp3`
    },
    {
      "title": "Kol Sana W Ana Lazek Feek",
      "artist": "El Esseily",
      "duration": "2:26",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_mhmwd_alasyly_kl_snt_-_ealan_wady_dglt_llttwyr_alakary.mp3`
    },
        {
      "title": "7elm b3eed",
      "artist": "Elessily",
      "duration": "5:20",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Mahmoud.El.Esseily.7elm.b3eed.mp3`
    },
    {
      "title": "Ya Nas",
      "artist": "Elessily",
      "duration": "3:24",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Mahmoud.Elessily.Ya.Nas.mp3`
    },
  {
    "title": "Hbyby want gmby",
    "artist": "El Esseily",
    "duration": "3:42",
    "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_mhmwd_alasyly_hbyby_want_gmby (1).mp3`
    
  },
      {
      "title": "Ha2olak Kelma",
      "artist": "Tamer Hosny",
      "duration": "3:52",
      "src": `${import.meta.env.BASE_URL}songs/هقولك كلمه تامر حسني.mp3`
    },
        {
      "title": "Bahbk",
      "artist": "Tamer Hosny",
      "duration": "4:06",
      "src":`${import.meta.env.BASE_URL}songs/Albumaty.Com_tamr_hsni_ant_akhtyar_-_mn_fylm_bhbk.mp3`
    },
        {
      "title": "Meen Momken",
      "artist": "Tamer Hosny",
      "duration": "4:27",
      "src": `${import.meta.env.BASE_URL}songs/01.Meen_Momken.mp3`
    },

    {
      "title": "W Ahlam Leeh",
      "artist": "Tamer Hosny",
      "duration": "4:57",
      "src": `${import.meta.env.BASE_URL}songs/05.W_Ahlam_Leeh.mp3`
    },
    
        {
          "title": "Dayman Maaak",
          "artist": "Tamer Hosny",
          "duration": "4:57",
          "src": `${import.meta.env.BASE_URL}songs/04.Dayman_Maaak.mp3`
        },

    {
      "title": "Bagheer Aleeha",
      "artist": "Tamer Hosny",
      "duration": "4:39",
      "src": `${import.meta.env.BASE_URL}songs/06.Bagheer_Aleeha (1).mp3`
    },
    {
  title: "Enta Ekhtyar -  Bahebk",
  artist: "Tamer Hosny",
  duration: "4:06",
  src: `${import.meta.env.BASE_URL}songs/Enta.Ekhtyar-Tamer.Hosny-MaTb3aa.Com.mp3`
},
{
  title: "Habitha Ya Nas -  Bahebk",
  artist: "Tamer Hosny",
  duration: "2:34",
  src: `${import.meta.env.BASE_URL}songs/Habitha.YaNas-Tamer.Hosny-MaTb3aa.Com.mp3`
},
{
  title: "Hadal3ny -  Bahebk",
  artist: "Tamer Hosny",
  duration: "3:28",
  src: `${import.meta.env.BASE_URL}songs/Hadal3ny-Tamer.Hosny-MaTb3aa.Com.mp3`
},
{
  title: "Hatgawzek -  Bahebk",
  artist: "Tamer Hosny",
  duration: "3:05",
  src: `${import.meta.env.BASE_URL}songs/Hatgawzek-Tamer.Hosny-MaTb3aa.Com.mp3`
},
{
  title: "Haytna -  Bahebk",
  artist: "Tamer Hosny",
  duration: "4:51",
  src: `${import.meta.env.BASE_URL}songs/Haytna-Tamer.Hosny-MaTb3aa.Com.mp3`
},
{
  title: "Wa Enta B3eed -  Bahebk",
  artist: "Tamer Hosny",
  duration: "3:41",
  src: `${import.meta.env.BASE_URL}songs/Wa.enta.b3eed-Tamer.Hosny-MaTb3aa.Com.mp3`
},

    

        {
      "title": "Malesh Ba3dak",
      "artist": "Karim Mo7sen",
      "duration": "3:39",
      "src": `${import.meta.env.BASE_URL}songs/Karim Mo7sen.ft.Tamer 7osne - Malesh Ba3dak.mp3`
    },

  {
    "title": "Wla Myn",
    "artist": "Ziad Zaza",
    "duration": "3:13",
    "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_zyad_zaza_wla_myn_-_ma__lygy_sy.mp3`
  },
    {
      "title": "Hesyny",
      "artist": "Tul8te",
      "duration": "3:33",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_tww_lyt_hsyny.mp3`
    },
    {
      "title": "Whhkylk Hkawy",
      "artist": "Tul8te",
      "duration": "2:21",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_tww_lyt_whhkylk_hkawy.mp3`
    },
        {
      "title": "L3baly F Dmaghy",
      "artist": "Tul8te",
      "duration": "1:33",
      "src": `${import.meta.env.BASE_URL}songs/Mahrgan.L3baly.F.Dmaghy-MaTb3aa.Com.mp3`
    },
        {
      "title": "a3ml",
      "artist": "Mohab",
      "duration": "2:41",
      "src": `${import.meta.env.BASE_URL}songs/ytmp3free.cc_mohab-a3ml-eh-official-audio-youtubemp3free.org.mp3`
    },
    {
      "title": "Ba3d Elhanane",
      "artist": "Reda Albahrawy",
      "duration": "4:35",
      "src": `${import.meta.env.BASE_URL}songs/Ba3d.Elhanane-Rada.Albahrawy-MaTb3aa.Com.mp3`
    },
        {
      "title": "Dk Alhwa Dkh",
      "artist": "Reda Elbahrawy",
      "duration": "4:34",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_rda_albhrawi_dk_alhwa_dkh.mp3`
    },
      {
      "title": "Fe Zenznty",
      "artist": "Essam SaSa",
      "duration": "3:45",
      "src": `${import.meta.env.BASE_URL}songs/Mahrgan.Fe.Zenznty-MaTb3aa.Com.mp3`
    },
  {
    "title": "Samoray",
    "artist": "Cairoke",
    "duration": "2:55",
    "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_kayrwky_samwray.mp3`
  },
    {
    "title": "Fstank Alabyd",
    "artist": "Hussien Al Jassmi",
    "duration": "4:52",
    "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_hsyn_algsmy_fstank_alabyd.mp3`
  },
    {
      "title": "Seta El Sobah",
      "artist": "Hussien Al Jassmi",
      "duration": "4:26",
      "src": `${import.meta.env.BASE_URL}songs/06.Seta_El_Sobah.mp3`
    },
    {
      "title": "Ma yeswa",
      "artist": "Hussein Al Jassmi",
      "duration": "3:24",
      "src": `${import.meta.env.BASE_URL}songs/11.Mayeswa.mp3`
    },
        {
      "title": "Ana Wel Amar",
      "artist": "Hussein Al Jasmi",
      "duration": "4:33",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_hsyn_algsmy_ana_walkmr.mp3`
    },
    
    {
      "title": "Khalek Be Alby",
      "artist": "Assi El Helani",
      "duration": "5:10",
      "src": `${import.meta.env.BASE_URL}songs/10.Khalek Be Alby.mp3`
    },
        {
      "title": "Bahbek W Bghar",
      "artist": "Assi El Helani",
      "duration": "5:55",
      "src": `${import.meta.env.BASE_URL}songs/بحبك وبغار عاصي الحلاني.mp3`
    },
  
    {
      "title": "Khabyni",
      "artist": "Mohamed Fouad",
      "duration": "3:57",
      "src": `${import.meta.env.BASE_URL}songs/07.Khabyni.mp3`
    },
    {
      "title": "Lama El Nasim",
      "artist": "Mohamed Mounir",
      "duration": "5:39",
      "src":`${import.meta.env.BASE_URL}songs/07.Lama_El_Nasim.mp3`
    },
    {
      "title": "Aseebak Laa",
      "artist": "Hossam Habib",
      "duration": "3:38",
      "src": `${import.meta.env.BASE_URL}songs/10.Aseebak_Laa.mp3`
    },
    {
      "title": "Nseet Elnass",
      "artist": "Hossam Habib",
      "duration": "3:22",
      "src": `${import.meta.env.BASE_URL}songs/04.Nseet_Elnass.mp3`
    },

          {
    "title": "Shedni Ghmorni",
    "artist": "Adham Nabulsi",
    "duration": "4:28",
    "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Adham.Nabulsi.Shedni.Ghmorni (1).mp3`
  },
      {
      "title": "Wla Fy Alahlam",
      "artist": "Wael Jassar",
      "duration": "4:23",
      "src":`${import.meta.env.BASE_URL}songs/Albumaty.Com_wail_gsar_wla_fy_alahlam.mp3`
    },
    {
      "title": "Maleket Gamal ElKon",
      "artist": "AlShami",
      "duration": "2:50",
      "src": `${import.meta.env.BASE_URL}songs/Maleket.Gamal.ElKon-AlShami-MaTb3aa.Com.mp3`
    },
    
    {
      "title": "Baashak Rouhik",
      "artist": "Marawan Khory",
      "duration": "4:13",
      "src":`${import.meta.env.BASE_URL}songs/Marawan.Khory_Baashak.Rouhik.mp3`
    },

    {
      "title": "Esmy",
      "artist": "Adham Soliman",
      "duration": "7:11",
      "src":`${import.meta.env.BASE_URL}songs/04_-_Esmy.mp3`
    },
    {
      "title": "Siilawy",
      "artist": "3alshank",
      "duration": "3:07",
      "src": `${import.meta.env.BASE_URL}songs/3alshank-Siilawy-MaTb3aa.Com.mp3`
    },

    {
      "title": "Aghla Mn 3enaya",
      "artist": "Hassan Alasmar",
      "duration": "5:11",
      "src": `${import.meta.env.BASE_URL}songs/Aghla.Mn.3enaya-Hassan.Alasmar-MaTb3aa.Com.mp3`
    },
        {
      "title": "Shou Mahssoudin",
      "artist": "Saad Ramadan",
      "duration": "3:20",
      "src":`${import.meta.env.BASE_URL}songs/Albumaty.Com.Saad.Ramadan.Shou.Mahssoudin.mp3`
    },
    {
      "title": "ya hlw",
      "artist": "Adam",
      "duration": "3:27",
      "src":`${import.meta.env.BASE_URL}songs/Albumaty.Com_adm_ya_hlw.mp3`
    },
    {
      "title": "Skaba",
      "artist": "Akhras",
      "duration": "3:15",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_alakhrs__skaba.mp3`
    },

    {
      "title": "Da Hob",
      "artist": "Medhat Saleh",
      "duration": "2:58",
      "src":`${import.meta.env.BASE_URL}songs/Albumaty.Com_mdht_salh_da_hb.mp3`
    },
    {
      "title": "Kol Kalam Alhob",
      "artist": "Medhat Saleh",
      "duration": "3:14",
      "src":`${import.meta.env.BASE_URL}songs/Albumaty.Com_mdht_salh_kl_klam_alhb_-_mn_mslsl_hgmt_mrtdt.mp3`
    },
    {
      "title": "Balahlam",
      "artist": "Nassef Zeytoun",
      "duration": "2:46",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_nasyf_zytwn_balahlam.mp3`
    },
            {
      "title": "Qesset Hob",
      "artist": "Ramy Ayach",
      "duration": "3:33",
      "src": `${import.meta.env.BASE_URL}songs/09_-_Qesset_Hob.mp3`
    },
    {
      "title": "At7ada El Aalam",
      "artist": "Saber Al Roba3y",
      "duration": "4:57",
      "src": `${import.meta.env.BASE_URL}songs/03.At7ada El Aalam.mp3`
    },

    {
      "title": "Ya Malak",
      "artist": "Amer Muneeb",
      "duration": "5:00",
      "src":`${import.meta.env.BASE_URL}songs/يا ملاك عامر منيب.mp3`
    },
    {
      "title": "muneeb",
      "artist": "Ameer Muneeb",
      "duration": "3:58",
      "src": `${import.meta.env.BASE_URL}songs/ytmp3free.cc_amir-muneeb-leil-wnahar-youtubemp3free.org.mp3`
    },

    {
      "title": "Lakol 3asheq Watan",
      "artist": "Khaled Selim",
      "duration": "3:20",
      "src": `${import.meta.env.BASE_URL}songs/لكل عاشق وطن خالد سليم.mp3`
    },
    {
    "title": "Ana 7ebet",
    "artist": "Khaled Selim",
    "duration": "4:46",
    "src": `${import.meta.env.BASE_URL}songs/63zb502N.mp3`
  },
    {
      "title": "Men Awel Youm",
      "artist": "Mostafa Kamar",
      "duration": "3:17",
      "src":`${import.meta.env.BASE_URL}songs/من اول يوم مصطفي قمر.mp3`
    },
    {
      "title": "Namy",
      "artist": "Melhem Zein",
      "duration": "5:52",
      "src":`${import.meta.env.BASE_URL}songs/نامي - دندنها.mp3`
    },

    {
      "title": "Qasr El shoq",
      "artist": "Marwan Khory",
      "duration": "3:47",
      "src": `${import.meta.env.BASE_URL}songs/93fo364g.mp3`
    },
  {
    "title": "Bahebek Leh",
    "artist": "Moustafa Elshoaiby",
    "duration": "4:00",
    "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Moustafa.Elshoaiby.Bahebek.Leh.mp3`
  },






  {
    "title": "Maliket El Ehsas",
    "artist": "Elissa",
    "duration": "4:43",
    "src": `${import.meta.env.BASE_URL}songs/04._Maliket_El_Ehsas.mp3`

  },
    {
      "title": "7ob kol 7ayaty",
      "artist": "Elissa",
      "duration": "3:34",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Elissa.7ob.kol.7ayaty.mp3`
    },
    {
      "title": "Ajmal Ihssas",
      "artist": "Elissa",
      "duration": "5:54",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Elissa.Ajmal.Ihssas.mp3`
    },
    {
      "title": "Ayshalak",
      "artist": "Elissa",
      "duration": "4:38",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Elissa.Ayshalak.mp3`
    },
    {
      "title": "Betmoun",
      "artist": "Elissa",
      "duration": "4:05",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Elissa.Betmoun.mp3`
    },
    {
      "title": "Chafouna Tneyn",
      "artist": "Elissa",
      "duration": "4:23",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Elissa.Chafouna_Tneyn.mp3`
    },
        {
      "title": "Asad Wahda",
      "artist": "Elissa",
      "duration": "4:34",
      "src": `${import.meta.env.BASE_URL}songs/65lJ53jH.mp3`
    },
    {
      "title": "Kol Youm Fi Omry",
      "artist": "Elissa",
      "duration": "5:23",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Elissa.Kol_Youm_Fi_Omry.mp3`
    },
        {
      "title": "Ayami Biek",
      "artist": "Elissa",
      "duration": "4:40",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_Elissa_Ayami_Biek.mp3`
    },
        {
      "title": "Lessa Fiha Kalam",
      "artist": "Elissa",
      "duration": "4:50",
      "src": `${import.meta.env.BASE_URL}songs/06._Lessa_Fiha_Kalam.mp3`
    },
    {
      "title": "foowk",
      "artist": "Asala",
      "duration": "3:08",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_asalt_fwk.mp3`
    },
    {
      "title": "60 De2e2a Hayah",
      "artist": "Asala",
      "duration": "5:55",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Asala.60_De2e2a_Hayah.mp3`
    },
    
    {
      "title": "Asl hyaty",
      "artist": "Sherine",
      "duration": "4:54",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_shyryn_asl_hyaty.mp3`
    },
        {
      "title": "Tariqy",
      "artist": "Sherine",
      "duration": "4:26",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Sherin.Tariqy.mp3`
    },
    {
      "title": "Ya Layali",
      "artist": "Sherine",
      "duration": "5:00",
      "src": `${import.meta.env.BASE_URL}songs/04_-_Ya_Layali.mp3`
    },
        {
      "title": "Koly Melkak",
      "artist": "Sherine",
      "duration": "4:50",
      "src": `${import.meta.env.BASE_URL}songs/11_-_Koly_Melkak.mp3`
    },
        {
      "title": "Kalam Eneih",
      "artist": "Sherine",
      "duration": "3:55",
      "src": `${import.meta.env.BASE_URL}songs/07._Kalam_Eneih.mp3`
    },
        {
      "title": "Habeet",
      "artist": "Sherine",
      "duration": "4:19",
      "src": `${import.meta.env.BASE_URL}songs/10.Habeet.mp3`
    },
      {
    "title": "Bekilma Minak",
    "artist": "Sherine",
    "duration": "4:17",
    "src": `${import.meta.env.BASE_URL}songs/02.Bekilma_Minak.mp3`
  },
        {
      "title": "Omry Maak",
      "artist": "Angham",
      "duration": "5:30",
      "src": `${import.meta.env.BASE_URL}songs/01._Omry_Maak.mp3`
    },
    {
      "title": "Ana Aysha Hala",
      "artist": "Angham",
      "duration": "4:28",
      "src": `${import.meta.env.BASE_URL}songs/03.Ana.Aysha.Hala.mp3`
    },
    
    {
      "title": "Mettamena",
      "artist": "Angham",
      "duration": "4:54",
      "src": `${import.meta.env.BASE_URL}songs/12._Mettamena.mp3`
    },
        {
      "title": "Ayeshni Aktar",
      "artist": "Gannat",
      "duration": "4:47",
      "src": `${import.meta.env.BASE_URL}songs/06-_Ayeshni_Aktar.mp3`
    },
    {
      "title": "Bahibak",
      "artist": "Ganat",
      "duration": "4:07",
      "src": `${import.meta.env.BASE_URL}songs/02.Bahibak.mp3`
    },
    

    {
      "title": "7lwa ya balady",
      "artist": "Dalida",
      "duration": "3:34",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com.Dalida.7lwa.ya.balady.mp3`
    },
      {
    "title": "Ma Trohsh B3ed",
    "artist": "Latifa",
    "duration": "4:29",
      "src": `${import.meta.env.BASE_URL}songs/01_-_Ma_Trohsh_B3ed.mp3`
  },
    {
      "title": "Bsraha",
      "artist": "Abeer Ne3ma",
      "duration": "3:18",
      "src": `${import.meta.env.BASE_URL}songs/Albumaty.Com_abyr_namt_bsraht.mp3`
    },
  ];


const filteredSongs = songs.filter(song =>
  song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  song.artist.toLowerCase().includes(searchTerm.toLowerCase())
);

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const togglePlay = () => {
  if (audioRef.current) {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    setIsPlaying(!isPlaying);
  }
};

const selectSong = (index: number) => {
  const actualIndex = songs.findIndex(song => song === filteredSongs[index]);
  setCurrentSong(actualIndex);
  setIsPlaying(true); // نحدّد إن الأغنية دلوقتي شغّالة
};

const nextSong = () => {
  const nextIndex = isShuffled 
    ? Math.floor(Math.random() * songs.length)
    : (currentSong + 1) % songs.length;
  setCurrentSong(nextIndex);
  setIsPlaying(true);
};

const prevSong = () => {
  const prevIndex = isShuffled 
    ? Math.floor(Math.random() * songs.length)
    : (currentSong - 1 + songs.length) % songs.length;
  setCurrentSong(prevIndex);
  setIsPlaying(true);
};

const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newVolume = parseFloat(e.target.value);
  setVolume(newVolume);
  if (audioRef.current) {
    audioRef.current.volume = newVolume;
  }
};

const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newTime = parseFloat(e.target.value);
  setCurrentTime(newTime);
  if (audioRef.current) {
    audioRef.current.currentTime = newTime;
  }
};

// useEffect لمزامنة الصوت مع currentSong و isPlaying
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  audio.src = songs[currentSong]?.src || '';
  audio.load();

  if (isPlaying) {
    audio.play().catch(e => console.log('Audio play failed:', e));
  } else {
    audio.pause();
  }

  const updateTime = () => setCurrentTime(audio.currentTime);
  const updateDuration = () => setDuration(audio.duration);
  const handleEnded = () => {
    setIsPlaying(false);
    nextSong();
  };

  audio.addEventListener('timeupdate', updateTime);
  audio.addEventListener('loadedmetadata', updateDuration);
  audio.addEventListener('ended', handleEnded);
  audio.volume = volume;

  return () => {
    audio.removeEventListener('timeupdate', updateTime);
    audio.removeEventListener('loadedmetadata', updateDuration);
    audio.removeEventListener('ended', handleEnded);
  };
}, [currentSong, isPlaying, volume]);

return (
  <section id="playlist" className="py-20">
    <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
      <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
        Our Playlist
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          <p className="text-center text-white/80 mb-8 text-lg">Songs that tell our story</p>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            <input
              type="text"
              placeholder="Search songs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
            />
          </div>

          {/* Current Song Display */}
          <div className="text-center mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-2">{songs[currentSong]?.title || 'No Song Selected'}</h3>
            <p className="text-white/60 mb-4">{songs[currentSong]?.artist || 'Unknown Artist'}</p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-white/60 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <button
                onClick={() => setIsShuffled(!isShuffled)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isShuffled ? 'bg-pink-400 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                <Shuffle size={20} />
              </button>
              
              <button
                onClick={prevSong}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 text-white"
              >
                <SkipBack size={24} />
              </button>
              
              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
              >
                {isPlaying ? (
                  <Pause size={24} className="text-white" />
                ) : (
                  <Play size={24} className="text-white ml-1" />
                )}
              </button>
              
              <button
                onClick={nextSong}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 text-white"
              >
                <SkipForward size={24} />
              </button>

              <div className="flex items-center space-x-2">
                <Volume2 size={20} className="text-white/60" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
          
          {/* Playlist */}
          <div className="max-h-96 overflow-y-auto space-y-2 custom-scrollbar">
            {filteredSongs.map((song, index) => {
              const actualIndex = songs.findIndex(s => s === song);
              return (
                <div
                  key={`${song.src}-${index}`}
                  onClick={() => selectSong(index)}
                  className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 ${
                    currentSong === actualIndex ? 'bg-white/10 border border-pink-400/30' : 'hover:translate-x-2'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    currentSong === actualIndex ? 'bg-pink-400' : 'bg-white/10'
                  }`}>
                    <span className="text-white font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{song.title}</h4>
                    <p className="text-white/60 text-sm truncate">{song.artist}</p>
                  </div>
                  <div className="text-white/40 text-sm mr-4">{song.duration}</div>
                  <Heart size={16} className="text-pink-400 flex-shrink-0" />
                </div>
              );
            })}
          </div>
          
          {filteredSongs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-white/60">No songs found matching your search.</p>
            </div>
          )}
          
          {/* Hidden audio element */}
          <audio 
            ref={audioRef} 
            className="hidden"
            src={songs[currentSong]?.src}
          />
        </div>
      </div>
    </div>

    <style jsx>{`
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 107, 107, 0.6);
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 107, 107, 0.8);
      }
      
      .slider::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ff6b6b;
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      }
      
      .slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ff6b6b;
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      }
    `}</style>
  </section>
);
};
export default MusicPlayer;
