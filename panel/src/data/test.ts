const dataBoxCompany = [
    {
        name: "بهین علم فراجهان",
        technicalExpertise: "علم داده",
        lvlExpert: "زیاد",
        lvlCompany: "شرکت بزرگ",
        teamWork: "به عنوان عضو یک تیم مشغول به کار خواهد شد.",
        gender: "مرد",
        price: "ماهانه",
        age: 24,
        hAge: 28,
        days: 60,
        fanavar: [
            { name: "power point", lvl: "زیاد" },
            { name: "office", lvl: "متوسط" },
            { name: "word", lvl: "کم" },
        ],
        takeTask: false,
        locationWork: true,
        descWork: "تمام وقت",
        desc: "توضیحات خاصی در رابطه با پروژه وجود ندارد لطفا خوب فکر کنید.",
        score: 4.2,
        totalScore: 35,
        id: 2291,
        image: "/company.jpg"
    },
    {
        name: "شستا",
        technicalExpertise: "هوانوردی",
        lvlCompany: "Start-up",
        lvlExpert: "متوسط",
        fanavar: [
            { name: "pwa", lvl: "زیاد" },
            { name: "Next js", lvl: "متوسط" },
            { name: "express", lvl: "کم" },
        ],
        locationWork: false,
        descWork: "به صورت جلسات آنلاین برگزار میشود.",
        days: 90,
        gender: "تفاوتی ندارد",
        price: "بر اساس پیشرفت",
        age: 35,
        hAge: 44,
        takeTask: false,
        desc: "باید متخصص به نرم افزار های اشاره شده مسلط باشد و هرگونه مشکلی که دارد درخواست همکاری ندهد..",
        score: 4.7,
        totalScore: 22,
        teamWork: "به صورت فردی کار انجام میدهد.",
        id: 221,
        image: "/company.jpg"
    },
]
const dataBoxExpert = [
    {
        name: "محمد جواد یزدانی",
        age: 36,
        phone: "شرکت بزرگ",
        technicalExpertise: [
            { name: "office", lvl: "متوسط", desc: "بسیار حرفه ای آموزش دیده ام.", url: "" },
            { name: "react", lvl: "بالا", desc: "آموزش و تجره بسیار زیاد در طول همکاری های مختلف کسب کردم.", url: "" },
            { name: "word", lvl: "کم", desc: "تنها نرم افزاری که میشه  گفت توش ایراد دارم.", url: "" },
        ],
        province: "تهران",
        city: "تهران",
        gender: "مرد",
        image: "/user.jpg",
        education: [
            { lvl: "کاردانی", major: "الکترونیک عمومی", university: "علم و فرهنگ" },
            { lvl: "کارشناسی", major: "مهندسي الكترونيك و مخابرات دريايي.", university: "امیر کبیر" },
            { lvl: "کارشناسی ارشد", major: "الكترونيك پالایشگاه", university: "امیر کبیر" },
            { lvl: "دکترا", major: "الكترونيك GRM", university: "University of Saskatchewan" },
        ],
        software: [
            {
                name: "React",
                lvl: "متوسط"
            },
            {
                name: "Word",
                lvl: "مقدماتی"
            },
            {
                name: "Office",
                lvl: "پیشرفته"
            }
        ],
        score: "4.8",
        countScore: 86,
        jobStatus: false,
        jobLocation: "",
        jobTitle: "",
        jobTime: ""

    },
    {
        name: "علی ستایش پرور",
        age: 28,
        phone: "شرکت بزرگ",
        technicalExpertise: [
            { name: "powerpoint", lvl: "متوسط", desc: "بسیار حرفه ای آموزش دیده ام.", url: "" },
            { name: "holo", lvl: "بالا", desc: "آموزش و تجره بسیار زیاد در طول همکاری های مختلف کسب کردم.", url: "" },
            { name: "office", lvl: "کم", desc: "تنها نرم افزاری که میشه  گفت توش ایراد دارم.", url: "" },
        ],
        province: "البرز",
        city: "شهر جدید هشتگرد",
        gender: "مرد",
        image: "/user.jpg",
        education: [
            { lvl: "کارشناسی", major: "مهندسي کامپیوتر", university: "علی آباد کتول" },
            { lvl: "کارشناسی ارشد", major: "الكترونيك پالایشگاه", university: "پژوهشکده امام خمینی(ره) و انقلاب اسلامی" },
        ],
        software: [
            {
                name: "Power point",
                lvl: "متوسط"
            },
            {
                name: "Photoshop",
                lvl: "مقدماتی"
            },
            {
                name: "Haxe",
                lvl: "پیشرفته"
            }
        ],
        score: "4.2",
        countScore: 56,
        jobStatus: true,
        jobLocation: "تهران",
        jobTitle: "بخش پشتیبانی",
        jobTime: "12 سال"
    },
]
const lastEmployment = [
    {
        nameExpert: "علی منصوری",
        cityExpert: "تهران",
        typePrice: "بر اساس پیشرفت",
        technicalExpertise: "هوانوردی",
        lvlExpert: "متوسط",
        startWork: "Mon Jan 13 2025 14:14:19 GMT+0330 (Iran Standard Time)",
        creadetAt: "Mon Jan 13 2025 14:14:19 GMT+0330 (Iran Standard Time)",
    }, {
        nameExpert: "سعید مطهریان",
        cityExpert: "شیراز",
        typePrice: "بر اساس پیشرفت",
        technicalExpertise: "مهندسی صنایع",
        lvlExpert: "پیشرفته",
        startWork: "Mon Jan 13 2025 14:14:19 GMT+0330 (Iran Standard Time)",
        creadetAt: "Mon Jan 13 2025 14:14:19 GMT+0330 (Iran Standard Time)",
    },
]
export { dataBoxExpert, lastEmployment,dataBoxCompany }