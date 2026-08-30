// src/content/g6/topics-a.ts
var G6_TOPICS_A = [
  /* ================================================================= */
  {
    id: "g6-t1",
    grade: 6,
    term: "HK1",
    strand: "SO_DAI_SO",
    order: 1,
    name: "T\u1EADp h\u1EE3p \u2014 S\u1ED1 t\u1EF1 nhi\xEAn & L\u0169y th\u1EEBa",
    summary: "Ng\xF4n ng\u1EEF t\u1EADp h\u1EE3p, h\u1EC7 th\u1EADp ph\xE2n, b\u1ED1n ph\xE9p t\xEDnh, l\u0169y th\u1EEBa v\u1EDBi s\u1ED1 m\u0169 t\u1EF1 nhi\xEAn v\xE0 th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh.",
    outcomes: [
      "S\u1EED d\u1EE5ng \u0111\u01B0\u1EE3c k\xFD hi\u1EC7u t\u1EADp h\u1EE3p: $\\in$, $\\notin$, c\xE1ch li\u1EC7t k\xEA v\xE0 c\xE1ch ch\u1EC9 ra t\xEDnh ch\u1EA5t \u0111\u1EB7c tr\u01B0ng.",
      "Th\u1EF1c hi\u1EC7n th\xE0nh th\u1EA1o b\u1ED1n ph\xE9p t\xEDnh tr\xEAn t\u1EADp s\u1ED1 t\u1EF1 nhi\xEAn, v\u1EADn d\u1EE5ng t\xEDnh ch\u1EA5t \u0111\u1EC3 t\xEDnh nhanh.",
      "Hi\u1EC3u v\xE0 t\xEDnh \u0111\u01B0\u1EE3c l\u0169y th\u1EEBa v\u1EDBi s\u1ED1 m\u0169 t\u1EF1 nhi\xEAn; nh\xE2n, chia hai l\u0169y th\u1EEBa c\xF9ng c\u01A1 s\u1ED1.",
      "Th\u1EF1c hi\u1EC7n \u0111\xFAng th\u1EE9 t\u1EF1 ph\xE9p t\xEDnh trong bi\u1EC3u th\u1EE9c c\xF3 ngo\u1EB7c v\xE0 l\u0169y th\u1EEBa."
    ],
    theory: [
      {
        heading: "1. T\u1EADp h\u1EE3p v\xE0 ph\u1EA7n t\u1EED",
        body: [
          "T\u1EADp h\u1EE3p l\xE0 m\u1ED9t nh\xF3m c\xE1c \u0111\u1ED1i t\u01B0\u1EE3ng \u0111\u01B0\u1EE3c x\xE1c \u0111\u1ECBnh r\xF5 r\xE0ng. M\u1ED7i \u0111\u1ED1i t\u01B0\u1EE3ng trong t\u1EADp h\u1EE3p g\u1ECDi l\xE0 m\u1ED9t **ph\u1EA7n t\u1EED**.",
          "C\xF3 hai c\xE1ch vi\u1EBFt t\u1EADp h\u1EE3p: **li\u1EC7t k\xEA** c\xE1c ph\u1EA7n t\u1EED, ho\u1EB7c **ch\u1EC9 ra t\xEDnh ch\u1EA5t \u0111\u1EB7c tr\u01B0ng** c\u1EE7a ph\u1EA7n t\u1EED."
        ],
        formulas: [
          "$A=\\{0;1;2;3;4\\}$  (c\xE1ch li\u1EC7t k\xEA)",
          "$A=\\{x\\in\\N\\mid x<5\\}$  (c\xE1ch n\xEAu t\xEDnh ch\u1EA5t \u0111\u1EB7c tr\u01B0ng)",
          "$3\\in A$ ; $7\\notin A$"
        ],
        caution: [
          "Trong t\u1EADp h\u1EE3p, m\u1ED7i ph\u1EA7n t\u1EED **ch\u1EC9 li\u1EC7t k\xEA m\u1ED9t l\u1EA7n** v\xE0 **kh\xF4ng k\u1EC3 th\u1EE9 t\u1EF1**.",
          "D\xF9ng d\u1EA5u ch\u1EA5m ph\u1EA9y \u201C;\u201D \u0111\u1EC3 ng\u0103n c\xE1ch c\xE1c ph\u1EA7n t\u1EED l\xE0 s\u1ED1, tr\xE1nh nh\u1EA7m v\u1EDBi d\u1EA5u ph\u1EA9y th\u1EADp ph\xE2n.",
          "Ph\xE2n bi\u1EC7t $\\N=\\{0;1;2;\\dots\\}$ v\xE0 $\\Nstar=\\{1;2;3;\\dots\\}$ \u2014 sai l\u1EA7m ph\u1ED5 bi\u1EBFn l\xE0 qu\xEAn s\u1ED1 0."
        ],
        examples: [
          {
            prompt: "Vi\u1EBFt t\u1EADp h\u1EE3p $B$ c\xE1c s\u1ED1 t\u1EF1 nhi\xEAn l\u1EDBn h\u01A1n 4 v\xE0 kh\xF4ng v\u01B0\u1EE3t qu\xE1 9 b\u1EB1ng hai c\xE1ch.",
            solve: [
              "\u201CKh\xF4ng v\u01B0\u1EE3t qu\xE1 9\u201D ngh\u0129a l\xE0 $\\le 9$ (bao g\u1ED3m c\u1EA3 9).",
              "C\xE1ch li\u1EC7t k\xEA: $B=\\{5;6;7;8;9\\}$.",
              "C\xE1ch n\xEAu t\xEDnh ch\u1EA5t: $B=\\{x\\in\\N\\mid 4<x\\le 9\\}$."
            ]
          }
        ]
      },
      {
        heading: "2. B\u1ED1n ph\xE9p t\xEDnh v\xE0 t\xEDnh ch\u1EA5t t\xEDnh nhanh",
        body: [
          "N\u1EAFm ch\u1EAFc t\xEDnh ch\u1EA5t giao ho\xE1n, k\u1EBFt h\u1EE3p, ph\xE2n ph\u1ED1i l\xE0 ch\xECa kho\xE1 \u0111\u1EC3 **t\xEDnh nhanh** thay v\xEC t\xEDnh th\u1EB3ng."
        ],
        formulas: [
          "$a+b=b+a$ ; $(a+b)+c=a+(b+c)$",
          "$a\\cdot b=b\\cdot a$ ; $(a\\cdot b)\\cdot c=a\\cdot(b\\cdot c)$",
          "$a(b+c)=ab+ac$ ; $a(b-c)=ab-ac$",
          "$a+0=a$ ; $a\\cdot 1=a$ ; $a\\cdot 0=0$"
        ],
        caution: ["Ph\xE9p tr\u1EEB v\xE0 ph\xE9p chia **kh\xF4ng** giao ho\xE1n, **kh\xF4ng** k\u1EBFt h\u1EE3p."],
        examples: [
          {
            prompt: "T\xEDnh nhanh $37\\cdot 25+63\\cdot 25$.",
            solve: [
              "Th\u1EA5y th\u1EEBa s\u1ED1 chung 25 \u2192 d\xF9ng t\xEDnh ch\u1EA5t ph\xE2n ph\u1ED1i theo chi\u1EC1u ng\u01B0\u1EE3c l\u1EA1i.",
              "$37\\cdot25+63\\cdot25=25(37+63)=25\\cdot100=2500$."
            ]
          }
        ]
      },
      {
        heading: "3. L\u0169y th\u1EEBa v\u1EDBi s\u1ED1 m\u0169 t\u1EF1 nhi\xEAn",
        body: [
          "L\u0169y th\u1EEBa l\xE0 c\xE1ch vi\u1EBFt g\u1ECDn c\u1EE7a ph\xE9p nh\xE2n nhi\u1EC1u th\u1EEBa s\u1ED1 b\u1EB1ng nhau."
        ],
        formulas: [
          "$a^{n}=\\underbrace{a\\cdot a\\cdots a}$ ($n$ th\u1EEBa s\u1ED1 $a$), v\u1EDBi $n\\in\\Nstar$",
          "$a^{m}\\cdot a^{n}=a^{m+n}$",
          "$a^{m}:a^{n}=a^{m-n}$ (v\u1EDBi $a\\ne0$, $m\\ge n$)",
          "$a^{1}=a$ ; $a^{0}=1$ (v\u1EDBi $a\\ne0$)"
        ],
        caution: [
          "Nh\xE2n hai l\u0169y th\u1EEBa **c\xF9ng c\u01A1 s\u1ED1** th\xEC **c\u1ED9ng** s\u1ED1 m\u0169 \u2014 r\u1EA5t nhi\u1EC1u b\u1EA1n nh\u1EA7m th\xE0nh nh\xE2n s\u1ED1 m\u0169.",
          "$2^{3}\\ne 2\\cdot3$. Ph\u1EA3i hi\u1EC3u $2^{3}=2\\cdot2\\cdot2=8$.",
          "$3^{2}\\cdot 3^{2}=3^{4}=81$, kh\xF4ng ph\u1EA3i $9^{4}$."
        ]
      },
      {
        heading: "4. Th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh",
        body: [
          "Quy t\u1EAFc b\u1EA5t di b\u1EA5t d\u1ECBch, \xE1p d\u1EE5ng cho m\u1ECDi bi\u1EC3u th\u1EE9c s\u1ED1 \u1EDF m\u1ECDi c\u1EA5p h\u1ECDc."
        ],
        formulas: [
          "C\xF3 ngo\u1EB7c: $(;)\\to[;]\\to\\{;\\}$",
          "Kh\xF4ng ngo\u1EB7c: L\u0169y th\u1EEBa $\\to$ Nh\xE2n, chia $\\to$ C\u1ED9ng, tr\u1EEB",
          "C\xF9ng m\u1EE9c \u01B0u ti\xEAn: th\u1EF1c hi\u1EC7n **t\u1EEB tr\xE1i sang ph\u1EA3i**"
        ],
        caution: ["$100-40:2$ ph\u1EA3i b\u1EB1ng $100-20=80$, kh\xF4ng ph\u1EA3i $60:2=30$."]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 c\xF3 c\u1EE5m \u201Ct\xEDnh nhanh\u201D, \u201Ct\xEDnh h\u1EE3p l\xED\u201D", action: "T\xECm c\u1EB7p s\u1ED1 tr\xF2n ch\u1EE5c/tr\xF2n tr\u0103m ho\u1EB7c th\u1EEBa s\u1ED1 chung \u0111\u1EC3 nh\xF3m, d\xF9ng t\xEDnh ch\u1EA5t ph\xE2n ph\u1ED1i.", why: "\u0110\u1EC1 \u0111\xE3 c\xE0i s\u1EB5n c\u1EA5u tr\xFAc \u0111\u1EB9p; t\xEDnh th\u1EB3ng l\xE0 r\u01A1i v\xE0o b\u1EABy m\u1EA5t th\u1EDDi gian." },
      { signal: "Xu\u1EA5t hi\u1EC7n l\u0169y th\u1EEBa c\xF9ng c\u01A1 s\u1ED1 nh\xE2n/chia nhau", action: "C\u1ED9ng ho\u1EB7c tr\u1EEB s\u1ED1 m\u0169, kh\xF4ng khai tri\u1EC3n ra s\u1ED1.", why: "Gi\u1EEF d\u1EA1ng l\u0169y th\u1EEBa gi\xFAp r\xFAt g\u1ECDn nhanh v\xE0 tr\xE1nh sai s\u1ED1 h\u1ECDc." },
      { signal: "Bi\u1EC3u th\u1EE9c nhi\u1EC1u t\u1EA7ng ngo\u1EB7c", action: "Gi\u1EA3i t\u1EEB ngo\u1EB7c trong c\xF9ng ra ngo\xE0i: $(;)\\to[;]\\to\\{;\\}$.", why: "Sai th\u1EE9 t\u1EF1 l\xE0 sai to\xE0n b\u1ED9, d\xF9 m\u1ED7i b\u01B0\u1EDBc t\xEDnh \u0111\u1EC1u \u0111\xFAng." },
      { signal: "\u0110\u1EC1 cho \u201Ct\u1EADp h\u1EE3p c\xE1c s\u1ED1 t\u1EF1 nhi\xEAn tho\u1EA3 m\xE3n\u2026\u201D", action: "D\u1ECBch \u0111i\u1EC1u ki\u1EC7n th\xE0nh b\u1EA5t \u0111\u1EB3ng th\u1EE9c r\u1ED3i li\u1EC7t k\xEA, ki\u1EC3m tra k\u1EF9 hai \u0111\u1EA7u m\xFAt.", why: "\u201CNh\u1ECF h\u01A1n\u201D kh\xE1c \u201Ckh\xF4ng v\u01B0\u1EE3t qu\xE1\u201D; sai m\u1ED9t \u0111\u1EA7u m\xFAt l\xE0 m\u1EA5t tr\u1ECDn \u0111i\u1EC3m." },
      { signal: "T\xECm $x$ d\u1EA1ng $a\\pm x=b$ ho\u1EB7c $a\\cdot x=b$", action: "D\xF9ng quy t\u1EAFc t\xECm th\xE0nh ph\u1EA7n ch\u01B0a bi\u1EBFt, l\xE0m ng\u01B0\u1EE3c t\u1EEB ngo\xE0i v\xE0o trong.", why: "Bi\u1EC3u th\u1EE9c l\xE0 m\u1ED9t d\xE2y chuy\u1EC1n ph\xE9p t\xEDnh; g\u1EE1 theo chi\u1EC1u ng\u01B0\u1EE3c m\u1EDBi \u0111\xFAng." }
    ],
    mindmap: {
      root: "T\u1EACP H\u1EE2P \u2014 S\u1ED0 T\u1EF0 NHI\xCAN \u2014 L\u0168Y TH\u1EEAA",
      branches: [
        { title: "T\u1EADp h\u1EE3p", items: ["K\xFD hi\u1EC7u $\\in$, $\\notin$", "Li\u1EC7t k\xEA / n\xEAu t\xEDnh ch\u1EA5t", "S\u1ED1 ph\u1EA7n t\u1EED", "$\\N$ v\xE0 $\\Nstar$"] },
        { title: "B\u1ED1n ph\xE9p t\xEDnh", items: ["Giao ho\xE1n, k\u1EBFt h\u1EE3p", "Ph\xE2n ph\u1ED1i $a(b+c)$", "T\xEDnh nhanh b\u1EB1ng nh\xF3m s\u1ED1 tr\xF2n", "Ph\xE9p tr\u1EEB, chia c\xF3 \u0111i\u1EC1u ki\u1EC7n"] },
        { title: "L\u0169y th\u1EEBa", items: ["$a^{n}$ ngh\u0129a l\xE0 g\xEC", "$a^{m}a^{n}=a^{m+n}$", "$a^{m}:a^{n}=a^{m-n}$", "S\u1ED1 ch\xEDnh ph\u01B0\u01A1ng, l\u1EADp ph\u01B0\u01A1ng"] },
        { title: "Th\u1EE9 t\u1EF1 ph\xE9p t\xEDnh", items: ["Ngo\u1EB7c tr\u01B0\u1EDBc", "L\u0169y th\u1EEBa", "Nh\xE2n chia", "C\u1ED9ng tr\u1EEB, tr\xE1i sang ph\u1EA3i"] },
        { title: "\u1EE8ng d\u1EE5ng", items: ["T\xECm $x$", "B\xE0i to\xE1n th\u1EF1c t\u1EBF \u0111\u1EBFm s\u1ED1", "So s\xE1nh l\u0169y th\u1EEBa", "T\xEDnh gi\xE1 tr\u1ECB bi\u1EC3u th\u1EE9c"] }
      ]
    },
    practiceSkills: [
      {
        title: "K\u1EF9 n\u0103ng t\xEDnh nhanh \u2014 \u201Cnh\xECn th\u1EA5y s\u1ED1 tr\xF2n\u201D",
        detail: [
          "Qu\xE9t c\u1EA3 bi\u1EC3u th\u1EE9c tr\u01B0\u1EDBc khi \u0111\u1EB7t b\xFAt: t\xECm c\u1EB7p c\u1ED9ng l\u1EA1i th\xE0nh 10, 100, 1000.",
          "T\xECm th\u1EEBa s\u1ED1 chung \u0111\u1EC3 \u0111\u01B0a v\u1EC1 d\u1EA1ng $a(b+c)$.",
          "V\u1EDBi ph\xE9p nh\xE2n: t\xE1ch $25\\cdot4=100$, $125\\cdot8=1000$, $50\\cdot2=100$."
        ]
      },
      {
        title: "K\u1EF9 n\u0103ng tr\xECnh b\xE0y b\xE0i \u201CT\xECm x\u201D",
        detail: [
          "X\xE1c \u0111\u1ECBnh $x$ \u0111ang n\u1EB1m \u1EDF v\u1ECB tr\xED n\xE0o (s\u1ED1 h\u1EA1ng, th\u1EEBa s\u1ED1, s\u1ED1 b\u1ECB tr\u1EEB\u2026).",
          "M\u1ED7i d\xF2ng g\u1EE1 \u0111\xFAng m\u1ED9t l\u1EDBp, lu\xF4n vi\u1EBFt d\u1EA5u \u201C=\u201D th\u1EB3ng c\u1ED9t.",
          "K\u1EBFt lu\u1EADn: \u201CV\u1EADy $x=\\dots$\u201D v\xE0 th\u1EED l\u1EA1i v\xE0o \u0111\u1EC1."
        ]
      }
    ],
    types: [
      {
        id: "g6-t1-d1",
        name: "D\u1EA1ng 1. Vi\u1EBFt t\u1EADp h\u1EE3p, x\xE1c \u0111\u1ECBnh ph\u1EA7n t\u1EED",
        level: "NB",
        method: [
          "\u0110\u1ECDc k\u1EF9 \u0111i\u1EC1u ki\u1EC7n, d\u1ECBch sang b\u1EA5t \u0111\u1EB3ng th\u1EE9c s\u1ED1 h\u1ECDc.",
          "Li\u1EC7t k\xEA l\u1EA7n l\u01B0\u1EE3t c\xE1c s\u1ED1 t\u1EF1 nhi\xEAn tho\u1EA3 m\xE3n, ki\u1EC3m tra k\u1EF9 hai \u0111\u1EA7u m\xFAt.",
          "Tr\xECnh b\xE0y theo y\xEAu c\u1EA7u: li\u1EC7t k\xEA ho\u1EB7c n\xEAu t\xEDnh ch\u1EA5t \u0111\u1EB7c tr\u01B0ng."
        ],
        pitfalls: ["Qu\xEAn s\u1ED1 0 khi t\u1EADp h\u1EE3p b\u1EAFt \u0111\u1EA7u t\u1EEB $\\N$.", "Nh\u1EA7m \u201Cnh\u1ECF h\u01A1n\u201D v\u1EDBi \u201Ckh\xF4ng l\u1EDBn h\u01A1n\u201D."],
        worked: [
          {
            prompt: "Cho $A=\\{x\\in\\N\\mid 12\\le x<17\\}$. Vi\u1EBFt $A$ b\u1EB1ng c\xE1ch li\u1EC7t k\xEA v\xE0 t\xEDnh t\u1ED5ng c\xE1c ph\u1EA7n t\u1EED c\u1EE7a $A$.",
            thinking: [
              "D\u1EA5u $\\le$ \u1EDF b\xEAn tr\xE1i: **l\u1EA5y** 12. D\u1EA5u $<$ \u1EDF b\xEAn ph\u1EA3i: **kh\xF4ng l\u1EA5y** 17.",
              "V\u1EADy c\xE1c s\u1ED1 ch\u1EA1y t\u1EEB 12 \u0111\u1EBFn 16."
            ],
            solution: [
              "$A=\\{12;13;14;15;16\\}$.",
              "T\u1ED5ng $=12+13+14+15+16=(12+16)+(13+15)+14=28+28+14=70$."
            ],
            remark: "Nh\xF3m hai \u0111\u1EA7u v\xE0o gi\u1EEFa l\xE0 k\u1EF9 thu\u1EADt t\xEDnh t\u1ED5ng d\xE3y s\u1ED1 c\xE1ch \u0111\u1EC1u \u2014 s\u1EBD d\xF9ng l\u1EA1i r\u1EA5t nhi\u1EC1u."
          }
        ]
      },
      {
        id: "g6-t1-d2",
        name: "D\u1EA1ng 2. T\xEDnh nhanh, t\xEDnh h\u1EE3p l\xED",
        level: "TH",
        method: [
          "Quan s\xE1t to\xE0n bi\u1EC3u th\u1EE9c \u0111\u1EC3 ph\xE1t hi\u1EC7n th\u1EEBa s\u1ED1 chung ho\u1EB7c c\u1EB7p s\u1ED1 tr\xF2n.",
          "D\xF9ng t\xEDnh ch\u1EA5t giao ho\xE1n \u2013 k\u1EBFt h\u1EE3p \u0111\u1EC3 nh\xF3m l\u1EA1i.",
          "\xC1p d\u1EE5ng $a(b+c)=ab+ac$ theo chi\u1EC1u thu\u1EADn ho\u1EB7c ng\u01B0\u1EE3c."
        ],
        skills: ["Nh\u1EADn di\u1EC7n c\u1EB7p b\xF9 10/100", "\u0110\u1EB7t nh\xE2n t\u1EED chung"],
        pitfalls: ["\u0110\u1ED5i ch\u1ED7 s\u1ED1 h\u1EA1ng m\xE0 qu\xEAn mang theo d\u1EA5u tr\u1EEB."],
        worked: [
          {
            prompt: "T\xEDnh h\u1EE3p l\xED: $A=125\\cdot 8\\cdot 17 + 125\\cdot 8\\cdot 83$.",
            thinking: [
              "Hai h\u1EA1ng t\u1EED \u0111\u1EC1u c\xF3 $125\\cdot8$ \u2192 \u0111\u1EB7t l\xE0m nh\xE2n t\u1EED chung.",
              "$125\\cdot8=1000$ v\xE0 $17+83=100$ \u2014 \u0111\u1EC1 \u0111\xE3 c\xE0i s\u1EB5n s\u1ED1 tr\xF2n."
            ],
            solution: [
              "$A=125\\cdot8\\cdot(17+83)$",
              "$A=1000\\cdot100=100\\,000$."
            ]
          }
        ]
      },
      {
        id: "g6-t1-d3",
        name: "D\u1EA1ng 3. L\u0169y th\u1EEBa \u2014 nh\xE2n, chia, so s\xE1nh",
        level: "TH",
        method: [
          "\u0110\u01B0a c\xE1c l\u0169y th\u1EEBa v\u1EC1 **c\xF9ng c\u01A1 s\u1ED1** (ho\u1EB7c c\xF9ng s\u1ED1 m\u0169) r\u1ED3i m\u1EDBi so s\xE1nh/r\xFAt g\u1ECDn.",
          "\xC1p d\u1EE5ng $a^{m}\\cdot a^{n}=a^{m+n}$, $a^{m}:a^{n}=a^{m-n}$.",
          "Khi so s\xE1nh: c\xF9ng c\u01A1 s\u1ED1 th\xEC so s\u1ED1 m\u0169; c\xF9ng s\u1ED1 m\u0169 th\xEC so c\u01A1 s\u1ED1."
        ],
        pitfalls: ["Nh\xE2n s\u1ED1 m\u0169 khi nh\xE2n hai l\u0169y th\u1EEBa.", "Vi\u1EBFt $a^{m}+a^{n}=a^{m+n}$ \u2014 ho\xE0n to\xE0n sai, ph\xE9p c\u1ED9ng kh\xF4ng c\xF3 quy t\u1EAFc n\xE0y."],
        worked: [
          {
            prompt: "So s\xE1nh $2^{30}$ v\xE0 $3^{20}$.",
            thinking: [
              "Kh\xE1c c\u01A1 s\u1ED1, kh\xE1c s\u1ED1 m\u0169 \u2192 t\xECm s\u1ED1 m\u0169 chung. \u01AF\u1EDBc chung l\u1EDBn nh\u1EA5t c\u1EE7a 30 v\xE0 20 l\xE0 10.",
              "Vi\u1EBFt $2^{30}=(2^{3})^{10}$ v\xE0 $3^{20}=(3^{2})^{10}$ \u0111\u1EC3 \u0111\u01B0a v\u1EC1 c\xF9ng s\u1ED1 m\u0169 10."
            ],
            solution: [
              "$2^{30}=(2^{3})^{10}=8^{10}$.",
              "$3^{20}=(3^{2})^{10}=9^{10}$.",
              "V\xEC $8<9$ n\xEAn $8^{10}<9^{10}$, suy ra $2^{30}<3^{20}$."
            ],
            remark: "Chi\u1EBFn thu\u1EADt \u201C\u0111\u01B0a v\u1EC1 c\xF9ng s\u1ED1 m\u0169\u201D l\xE0 c\xF4ng c\u1EE5 ch\xEDnh khi so s\xE1nh l\u0169y th\u1EEBa l\u1EDBn."
          }
        ]
      },
      {
        id: "g6-t1-d4",
        name: "D\u1EA1ng 4. Th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh c\xF3 ngo\u1EB7c v\xE0 l\u0169y th\u1EEBa",
        level: "TH",
        method: [
          "\u0110\xE1nh d\u1EA5u th\u1EE9 t\u1EF1 c\xE1c b\u01B0\u1EDBc ngay tr\xEAn nh\xE1p: ngo\u1EB7c trong \u2192 ngo\u1EB7c ngo\xE0i \u2192 l\u0169y th\u1EEBa \u2192 nh\xE2n chia \u2192 c\u1ED9ng tr\u1EEB.",
          "M\u1ED7i d\xF2ng ch\u1EC9 th\u1EF1c hi\u1EC7n m\u1ED9t lo\u1EA1i ph\xE9p t\xEDnh \u0111\u1EC3 d\u1EC5 so\xE1t l\u1ED7i.",
          "N\u1EBFu ra k\u1EBFt qu\u1EA3 \u201Cx\u1EA5u\u201D (chia kh\xF4ng h\u1EBFt) th\xEC d\u1EEBng l\u1EA1i r\xE0 ng\u01B0\u1EE3c t\u1EEBng b\u01B0\u1EDBc, \u0111\u1EEBng l\xE0m li\u1EC1u."
        ],
        pitfalls: [
          "B\u1ECF qua ngo\u1EB7c vu\xF4ng / ngo\u1EB7c nh\u1ECDn.",
          "T\xEDnh nh\xE2n tr\u01B0\u1EDBc khi t\xEDnh l\u0169y th\u1EEBa.",
          "T\xEDnh $100-40:2$ th\xE0nh $60:2=30$ (\u0111\xFAng ph\u1EA3i l\xE0 $100-20=80$)."
        ],
        worked: [
          {
            prompt: "T\xEDnh $B=120-{[3^{3}+(4^{2}+2)]:5}$.",
            thinking: [
              "Ngo\u1EB7c tr\xF2n trong c\xF9ng tr\u01B0\u1EDBc: $4^{2}+2$. Trong ngo\u1EB7c tr\xF2n l\u1EA1i c\xF3 l\u0169y th\u1EEBa n\xEAn t\xEDnh $4^{2}$ tr\u01B0\u1EDBc.",
              "Sau \u0111\xF3 t\u1EDBi ngo\u1EB7c vu\xF4ng, r\u1ED3i ph\xE9p chia trong ngo\u1EB7c nh\u1ECDn, cu\u1ED1i c\xF9ng m\u1EDBi tr\u1EEB."
            ],
            solution: [
              "$4^{2}+2=16+2=18$.",
              "$[3^{3}+18]=27+18=45$.",
              "${45:5}=9$.",
              "$B=120-9=111$."
            ],
            remark: "Vi\u1EBFt m\u1ED7i d\xF2ng m\u1ED9t l\u1EDBp ngo\u1EB7c \u2014 c\xE1ch tr\xECnh b\xE0y n\xE0y gi\xFAp gi\xE1m kh\u1EA3o th\u1EA5y r\xF5 quy tr\xECnh v\xE0 gi\xFAp em t\u1EF1 so\xE1t l\u1ED7i nhanh."
          },
          {
            prompt: "T\xEDnh $C=5cdot 2^{4}-18:3^{2}+7$.",
            thinking: ["Kh\xF4ng c\xF3 ngo\u1EB7c \u2192 \u01B0u ti\xEAn l\u0169y th\u1EEBa, r\u1ED3i nh\xE2n chia, cu\u1ED1i c\xF9ng c\u1ED9ng tr\u1EEB t\u1EEB tr\xE1i sang ph\u1EA3i."],
            solution: [
              "L\u0169y th\u1EEBa: $2^{4}=16$; $3^{2}=9$.",
              "Nh\xE2n chia: $5cdot16=80$; $18:9=2$.",
              "C\u1ED9ng tr\u1EEB: $C=80-2+7=85$."
            ]
          }
        ]
      },
      {
        id: "g6-t1-d5",
        name: "D\u1EA1ng 5. T\xECm x trong bi\u1EC3u th\u1EE9c nhi\u1EC1u l\u1EDBp",
        level: "VD",
        method: [
          "X\xE1c \u0111\u1ECBnh $x$ n\u1EB1m trong l\u1EDBp n\xE0o, g\u1EE1 t\u1EEB l\u1EDBp ngo\xE0i c\xF9ng v\xE0o trong.",
          "M\u1ED7i b\u01B0\u1EDBc d\xF9ng \u0111\xFAng m\u1ED9t quy t\u1EAFc t\xECm th\xE0nh ph\u1EA7n ch\u01B0a bi\u1EBFt.",
          "Th\u1EED l\u1EA1i nghi\u1EC7m v\xE0o \u0111\u1EC1."
        ],
        pitfalls: ["G\u1EE1 nh\u1EA7m th\u1EE9 t\u1EF1 (g\u1EE1 trong ra ngo\xE0i).", "Qu\xEAn \u0111i\u1EC1u ki\u1EC7n $x\\in\\N$ khi k\u1EBFt lu\u1EADn."],
        worked: [
          {
            prompt: "T\xECm s\u1ED1 t\u1EF1 nhi\xEAn $x$, bi\u1EBFt $2\\cdot(3^{x}+5)=64$.",
            thinking: [
              "$x$ n\u1EB1m s\xE2u nh\u1EA5t, b\xEAn ngo\xE0i l\u1EA7n l\u01B0\u1EE3t l\xE0 \u201C+5\u201D r\u1ED3i \u201Cnh\xE2n 2\u201D.",
              "G\u1EE1 ng\u01B0\u1EE3c: chia 2 tr\u01B0\u1EDBc, r\u1ED3i tr\u1EEB 5, cu\u1ED1i c\xF9ng \u0111\u01B0a v\u1EC1 so s\xE1nh l\u0169y th\u1EEBa c\xF9ng c\u01A1 s\u1ED1."
            ],
            solution: [
              "$3^{x}+5=64:2=32$.",
              "$3^{x}=32-5=27$.",
              "$27=3^{3}$ n\xEAn $3^{x}=3^{3}\\Rightarrow x=3$.",
              "Th\u1EED l\u1EA1i: $2(3^{3}+5)=2(27+5)=2\\cdot32=64$ (\u0111\xFAng). V\u1EADy $x=3$."
            ]
          }
        ]
      },
      {
        id: "g6-t1-d6",
        name: "D\u1EA1ng 6. V\u1EADn d\u1EE5ng cao \u2014 so s\xE1nh v\xE0 t\xEDnh t\u1ED5ng l\u0169y th\u1EEBa",
        level: "VDC",
        method: [
          "V\u1EDBi t\u1ED5ng $S=1+a+a^{2}+\\dots+a^{n}$: nh\xE2n hai v\u1EBF v\u1EDBi $a$ r\u1ED3i tr\u1EEB theo v\u1EBF \u0111\u1EC3 tri\u1EC7t ti\xEAu.",
          "V\u1EDBi so s\xE1nh: \u0111\u01B0a v\u1EC1 c\xF9ng c\u01A1 s\u1ED1/s\u1ED1 m\u0169 ho\u1EB7c ch\u1EB7n gi\u1EEFa b\u1EB1ng m\u1ED9t s\u1ED1 trung gian."
        ],
        pitfalls: ["Tr\u1EEB theo v\u1EBF nh\u01B0ng vi\u1EBFt l\u1EC7ch s\u1ED1 h\u1EA1ng, d\u1EABn t\u1EDBi tri\u1EC7t ti\xEAu sai."],
        worked: [
          {
            prompt: "T\xEDnh $S=1+3+3^{2}+3^{3}+\\dots+3^{10}$.",
            thinking: [
              "\u0110\xE2y l\xE0 t\u1ED5ng c\xE1c l\u0169y th\u1EEBa li\xEAn ti\u1EBFp c\xF9ng c\u01A1 s\u1ED1 3 \u2192 d\xF9ng k\u1EF9 thu\u1EADt nh\xE2n c\u01A1 s\u1ED1 r\u1ED3i tr\u1EEB."
            ],
            solution: [
              "$3S=3+3^{2}+3^{3}+\\dots+3^{11}$.",
              "$3S-S=3^{11}-1$ (m\u1ECDi s\u1ED1 h\u1EA1ng \u1EDF gi\u1EEFa tri\u1EC7t ti\xEAu).",
              "$2S=3^{11}-1\\Rightarrow S=\\f{3^{11}-1}{2}$.",
              "V\u1EDBi $3^{11}=177\\,147$ ta \u0111\u01B0\u1EE3c $S=\\f{177146}{2}=88\\,573$."
            ],
            remark: "K\u1EF9 thu\u1EADt \u201Cnh\xE2n c\u01A1 s\u1ED1 r\u1ED3i tr\u1EEB theo v\u1EBF\u201D l\xE0 ch\xECa kho\xE1 cho m\u1ECDi t\u1ED5ng l\u0169y th\u1EEBa \u2014 d\xF9ng l\u1EA1i su\u1ED1t t\u1EDBi l\u1EDBp 9."
          }
        ]
      }
    ],
    bank: ["g6.tap-hop", "g6.tinh-nhanh", "g6.luy-thua", "g6.thu-tu-phep-tinh", "g6.tim-x"]
  },
  /* ================================================================= */
  {
    id: "g6-t2",
    grade: 6,
    term: "HK1",
    strand: "SO_DAI_SO",
    order: 2,
    name: "T\xEDnh chia h\u1EBFt \u2014 S\u1ED1 nguy\xEAn t\u1ED1 \u2014 \u01AFCLN & BCNN",
    summary: "Quan h\u1EC7 chia h\u1EBFt, d\u1EA5u hi\u1EC7u chia h\u1EBFt cho 2, 3, 5, 9; ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1; \u01AFCLN, BCNN v\xE0 c\xE1c b\xE0i to\xE1n th\u1EF1c t\u1EBF.",
    outcomes: [
      "Nh\u1EADn bi\u1EBFt quan h\u1EC7 chia h\u1EBFt, t\xEDnh ch\u1EA5t chia h\u1EBFt c\u1EE7a m\u1ED9t t\u1ED5ng, m\u1ED9t hi\u1EC7u.",
      "V\u1EADn d\u1EE5ng d\u1EA5u hi\u1EC7u chia h\u1EBFt cho 2, 5, 9, 3 \u0111\u1EC3 x\xE9t v\xE0 t\xECm ch\u1EEF s\u1ED1 ch\u01B0a bi\u1EBFt.",
      "Ph\xE2n t\xEDch m\u1ED9t s\u1ED1 ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1, t\xECm \u01AFCLN v\xE0 BCNN.",
      "Gi\u1EA3i b\xE0i to\xE1n th\u1EF1c ti\u1EC5n d\u1EABn t\u1EDBi \u01AFCLN, BCNN."
    ],
    theory: [
      {
        heading: "1. Quan h\u1EC7 chia h\u1EBFt v\xE0 t\xEDnh ch\u1EA5t",
        body: ["V\u1EDBi $a,b\\in\\N$, $b\\ne0$: n\u1EBFu c\xF3 s\u1ED1 t\u1EF1 nhi\xEAn $q$ sao cho $a=bq$ th\xEC ta n\xF3i $a$ chia h\u1EBFt cho $b$."],
        formulas: [
          "$a;\\vdots;b$ \u0111\u1ECDc l\xE0 \u201C$a$ chia h\u1EBFt cho $b$\u201D",
          "N\u1EBFu $a;\\vdots;m$ v\xE0 $b;\\vdots;m$ th\xEC $(a+b);\\vdots;m$ v\xE0 $(a-b);\\vdots;m$",
          "N\u1EBFu $a;\\vdots;m$ v\xE0 $b$ kh\xF4ng chia h\u1EBFt cho $m$ th\xEC $(a+b)$ **kh\xF4ng** chia h\u1EBFt cho $m$"
        ],
        caution: ["T\xEDnh ch\u1EA5t ch\u1EC9 \u0111\xFAng khi **m\u1ECDi** s\u1ED1 h\u1EA1ng c\xF9ng x\xE9t v\u1EDBi m\u1ED9t s\u1ED1 chia $m$."]
      },
      {
        heading: "2. D\u1EA5u hi\u1EC7u chia h\u1EBFt",
        body: ["\u0110\xE2y l\xE0 b\u1ED9 c\xF4ng c\u1EE5 ki\u1EC3m tra nhanh, b\u1EAFt bu\u1ED9c thu\u1ED9c l\xF2ng."],
        formulas: [
          "Chia h\u1EBFt cho 2: ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng l\xE0 $0;2;4;6;8$",
          "Chia h\u1EBFt cho 5: ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng l\xE0 $0$ ho\u1EB7c $5$",
          "Chia h\u1EBFt cho 9: **t\u1ED5ng c\xE1c ch\u1EEF s\u1ED1** chia h\u1EBFt cho 9",
          "Chia h\u1EBFt cho 3: **t\u1ED5ng c\xE1c ch\u1EEF s\u1ED1** chia h\u1EBFt cho 3",
          "Chia h\u1EBFt cho 4: hai ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng t\u1EA1o th\xE0nh s\u1ED1 chia h\u1EBFt cho 4",
          "Chia h\u1EBFt cho 25: hai ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng l\xE0 $00;25;50;75$"
        ],
        caution: ["S\u1ED1 chia h\u1EBFt cho 9 th\xEC ch\u1EAFc ch\u1EAFn chia h\u1EBFt cho 3, nh\u01B0ng \u0111i\u1EC1u ng\u01B0\u1EE3c l\u1EA1i kh\xF4ng \u0111\xFAng."]
      },
      {
        heading: "3. S\u1ED1 nguy\xEAn t\u1ED1 \u2014 H\u1EE3p s\u1ED1 \u2014 Ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1",
        body: [
          "S\u1ED1 nguy\xEAn t\u1ED1 l\xE0 s\u1ED1 t\u1EF1 nhi\xEAn l\u1EDBn h\u01A1n 1, ch\u1EC9 c\xF3 **hai** \u01B0\u1EDBc l\xE0 1 v\xE0 ch\xEDnh n\xF3.",
          "H\u1EE3p s\u1ED1 l\xE0 s\u1ED1 t\u1EF1 nhi\xEAn l\u1EDBn h\u01A1n 1 c\xF3 **nhi\u1EC1u h\u01A1n hai** \u01B0\u1EDBc."
        ],
        formulas: [
          "C\xE1c s\u1ED1 nguy\xEAn t\u1ED1 nh\u1ECF h\u01A1n 30: $2;3;5;7;11;13;17;19;23;29$",
          "D\u1EA1ng ph\xE2n t\xEDch: $n=p_1^{a_1}\\cdot p_2^{a_2}\\cdots p_k^{a_k}$",
          "S\u1ED1 \u01B0\u1EDBc c\u1EE7a $n$: $(a_1+1)(a_2+1)\\cdots(a_k+1)$"
        ],
        caution: ["S\u1ED1 0 v\xE0 s\u1ED1 1 **kh\xF4ng** l\xE0 s\u1ED1 nguy\xEAn t\u1ED1, c\u0169ng **kh\xF4ng** l\xE0 h\u1EE3p s\u1ED1.", "2 l\xE0 s\u1ED1 nguy\xEAn t\u1ED1 ch\u1EB5n duy nh\u1EA5t."]
      },
      {
        heading: "4. \u01AFCLN v\xE0 BCNN",
        body: ["Quy tr\xECnh ba b\u01B0\u1EDBc th\u1ED1ng nh\u1EA5t: ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 \u2192 ch\u1ECDn th\u1EEBa s\u1ED1 \u2192 nh\xE2n l\u1EA1i."],
        formulas: [
          "\u01AFCLN: ch\u1ECDn th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 **chung**, m\u1ED7i th\u1EEBa s\u1ED1 l\u1EA5y s\u1ED1 m\u0169 **nh\u1ECF nh\u1EA5t**",
          "BCNN: ch\u1ECDn th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 **chung v\xE0 ri\xEAng**, m\u1ED7i th\u1EEBa s\u1ED1 l\u1EA5y s\u1ED1 m\u0169 **l\u1EDBn nh\u1EA5t**",
          "$\\text{\u01AFCLN}(a,b)\\cdot\\text{BCNN}(a,b)=a\\cdot b$",
          "Hai s\u1ED1 nguy\xEAn t\u1ED1 c\xF9ng nhau $\\Leftrightarrow$ \u01AFCLN$(a,b)=1$"
        ],
        caution: ["Nh\u1EDB m\u1EB9o: **\u01AF**CLN \u2014 **\u01AF**t (chung, m\u0169 nh\u1ECF); **B**CNN \u2014 **B**\u1EF1 (chung + ri\xEAng, m\u0169 l\u1EDBn)."]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Cchia \u0111\u1EC1u\u201D, \u201Cchia th\xE0nh c\xE1c ph\u1EA7n b\u1EB1ng nhau nhi\u1EC1u nh\u1EA5t\u201D", action: "B\xE0i to\xE1n \u01AFCLN.", why: "S\u1ED1 ph\u1EA7n l\u1EDBn nh\u1EA5t m\xE0 m\u1ECDi nh\xF3m \u0111\u1EC1u chia h\u1EBFt ch\xEDnh l\xE0 \u01B0\u1EDBc chung l\u1EDBn nh\u1EA5t." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Cc\xF9ng l\xFAc l\u1EB7p l\u1EA1i\u201D, \u201C\xEDt nh\u1EA5t bao nhi\xEAu \u0111\u1EC3 c\u1EA3 hai c\xF9ng\u2026\u201D", action: "B\xE0i to\xE1n BCNN.", why: "Th\u1EDDi \u0111i\u1EC3m chung g\u1EA7n nh\u1EA5t l\xE0 b\u1ED9i chung nh\u1ECF nh\u1EA5t c\u1EE7a c\xE1c chu k\u1EF3." },
      { signal: "\u0110\u1EC1 cho \u201Cx\u1EBFp h\xE0ng 4, h\xE0ng 6 \u0111\u1EC1u d\u01B0 1\u201D", action: "\u0110\u1EB7t $n-1$ l\xE0 b\u1ED9i chung, t\xECm BCNN r\u1ED3i c\u1ED9ng l\u1EA1i ph\u1EA7n d\u01B0.", why: "Tr\u1EEB \u0111i ph\u1EA7n d\u01B0 \u0111\u1EC3 \u0111\u01B0a v\u1EC1 b\xE0i to\xE1n chia h\u1EBFt chu\u1EA9n." },
      { signal: "Xu\u1EA5t hi\u1EC7n d\u1EA5u $*$ trong s\u1ED1 $\\ov{a*b}$", action: "D\xF9ng d\u1EA5u hi\u1EC7u chia h\u1EBFt, x\xE9t t\u1ED5ng ch\u1EEF s\u1ED1 ho\u1EB7c ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng.", why: "D\u1EA5u hi\u1EC7u chia h\u1EBFt bi\u1EBFn b\xE0i t\xECm ch\u1EEF s\u1ED1 th\xE0nh b\xE0i gi\u1EA3i \u0111i\u1EC1u ki\u1EC7n \u0111\u01A1n gi\u1EA3n." },
      { signal: "H\u1ECFi \u201Cs\u1ED1 \u0111\xF3 c\xF3 bao nhi\xEAu \u01B0\u1EDBc\u201D", action: "Ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 r\u1ED3i nh\xE2n c\xE1c (s\u1ED1 m\u0169 + 1).", why: "M\u1ED7i \u01B0\u1EDBc t\u01B0\u01A1ng \u1EE9ng m\u1ED9t c\xE1ch ch\u1ECDn s\u1ED1 m\u0169 cho t\u1EEBng th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1." }
    ],
    mindmap: {
      root: "T\xCDNH CHIA H\u1EBET \u2014 S\u1ED0 NGUY\xCAN T\u1ED0 \u2014 \u01AFCLN, BCNN",
      branches: [
        { title: "Chia h\u1EBFt", items: ["\u0110\u1ECBnh ngh\u0129a $a;\\vdots;b$", "T\xEDnh ch\u1EA5t t\u1ED5ng, hi\u1EC7u", "\u01AF\u1EDBc v\xE0 b\u1ED9i"] },
        { title: "D\u1EA5u hi\u1EC7u", items: ["Cho 2, 5: ch\u1EEF s\u1ED1 cu\u1ED1i", "Cho 3, 9: t\u1ED5ng ch\u1EEF s\u1ED1", "Cho 4, 25: hai ch\u1EEF s\u1ED1 cu\u1ED1i"] },
        { title: "S\u1ED1 nguy\xEAn t\u1ED1", items: ["\u0110\u1ECBnh ngh\u0129a", "B\u1EA3ng nguy\xEAn t\u1ED1 < 100", "Ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1", "\u0110\u1EBFm s\u1ED1 \u01B0\u1EDBc"] },
        { title: "\u01AFCLN", items: ["Chung \u2014 m\u0169 nh\u1ECF", "Nguy\xEAn t\u1ED1 c\xF9ng nhau", "B\xE0i to\xE1n chia \u0111\u1EC1u"] },
        { title: "BCNN", items: ["Chung & ri\xEAng \u2014 m\u0169 l\u1EDBn", "B\xE0i to\xE1n g\u1EB7p l\u1EA1i", "\u01AFCLN\xB7BCNN = t\xEDch"] }
      ]
    },
    practiceSkills: [
      {
        title: "K\u1EF9 n\u0103ng ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 nhanh",
        detail: [
          "Chia l\u1EA7n l\u01B0\u1EE3t cho 2, 3, 5, 7, 11\u2026 theo c\u1ED9t d\u1ECDc, d\u1EEBng khi th\u01B0\u01A1ng b\u1EB1ng 1.",
          "Ch\u1EC9 c\u1EA7n th\u1EED \u01B0\u1EDBc nguy\xEAn t\u1ED1 t\u1EDBi $\\s{n}$.",
          "Vi\u1EBFt k\u1EBFt qu\u1EA3 d\u01B0\u1EDBi d\u1EA1ng l\u0169y th\u1EEBa, s\u1EAFp c\u01A1 s\u1ED1 t\u0103ng d\u1EA7n."
        ]
      },
      {
        title: "K\u1EF9 n\u0103ng \u0111\u1ECDc \u0111\u1EC1 b\xE0i to\xE1n th\u1EF1c t\u1EBF \u01AFCLN/BCNN",
        detail: [
          "G\u1EA1ch ch\xE2n t\u1EEB kho\xE1: \u201Cnhi\u1EC1u nh\u1EA5t/l\u1EDBn nh\u1EA5t\u201D \u2192 \u01AFCLN; \u201C\xEDt nh\u1EA5t/nh\u1ECF nh\u1EA5t, c\xF9ng l\xFAc\u201D \u2192 BCNN.",
          "\u0110\u1EB7t \u1EA9n r\xF5 r\xE0ng: g\u1ECDi $n$ l\xE0 s\u1ED1\u2026 ($n\\in\\Nstar$).",
          "Lu\xF4n vi\u1EBFt c\xE2u k\u1EBFt lu\u1EADn \u0111\u1EE7 \u0111\u01A1n v\u1ECB."
        ]
      }
    ],
    types: [
      {
        id: "g6-t2-d1",
        name: "D\u1EA1ng 1. X\xE9t t\xEDnh chia h\u1EBFt c\u1EE7a m\u1ED9t t\u1ED5ng, hi\u1EC7u",
        level: "NB",
        method: ["X\xE9t t\u1EEBng s\u1ED1 h\u1EA1ng c\xF3 chia h\u1EBFt cho $m$ kh\xF4ng.", "\xC1p d\u1EE5ng t\xEDnh ch\u1EA5t chia h\u1EBFt c\u1EE7a t\u1ED5ng/hi\u1EC7u.", "K\u1EBFt lu\u1EADn r\xF5 r\xE0ng."],
        pitfalls: ["K\u1EBFt lu\u1EADn \u201Ckh\xF4ng chia h\u1EBFt\u201D khi c\xF3 hai s\u1ED1 h\u1EA1ng c\xF9ng kh\xF4ng chia h\u1EBFt \u2014 tr\u01B0\u1EDDng h\u1EE3p n\xE0y ph\u1EA3i c\u1ED9ng ph\u1EA7n d\u01B0 r\u1ED3i m\u1EDBi k\u1EBFt lu\u1EADn."],
        worked: [
          {
            prompt: "Kh\xF4ng t\xEDnh t\u1ED5ng, x\xE9t xem $A=48+120+27$ c\xF3 chia h\u1EBFt cho 6 kh\xF4ng.",
            thinking: ["X\xE9t t\u1EEBng s\u1ED1 h\u1EA1ng v\u1EDBi s\u1ED1 chia 6.", "48 v\xE0 120 chia h\u1EBFt cho 6; 27 th\xEC kh\xF4ng."],
            solution: [
              "$48;\\vdots;6$ v\xE0 $120;\\vdots;6$.",
              "$27$ kh\xF4ng chia h\u1EBFt cho 6 (v\xEC $27=6\\cdot4+3$).",
              "T\u1ED5ng c\u1EE7a m\u1ED9t s\u1ED1 chia h\u1EBFt cho 6 v\u1EDBi m\u1ED9t s\u1ED1 kh\xF4ng chia h\u1EBFt cho 6 th\xEC **kh\xF4ng** chia h\u1EBFt cho 6.",
              "V\u1EADy $A$ kh\xF4ng chia h\u1EBFt cho 6."
            ]
          }
        ]
      },
      {
        id: "g6-t2-d2",
        name: "D\u1EA1ng 2. T\xECm ch\u1EEF s\u1ED1 ch\u01B0a bi\u1EBFt theo d\u1EA5u hi\u1EC7u chia h\u1EBFt",
        level: "TH",
        method: [
          "X\xE1c \u0111\u1ECBnh d\u1EA5u hi\u1EC7u t\u01B0\u01A1ng \u1EE9ng v\u1EDBi s\u1ED1 chia.",
          "V\u1EDBi 2, 5: x\xE9t ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng. V\u1EDBi 3, 9: l\u1EADp \u0111i\u1EC1u ki\u1EC7n cho t\u1ED5ng c\xE1c ch\u1EEF s\u1ED1.",
          "Gi\u1EDBi h\u1EA1n \u1EA9n l\xE0 ch\u1EEF s\u1ED1 $0\\le *\\le 9$, li\u1EC7t k\xEA c\xE1c gi\xE1 tr\u1ECB tho\u1EA3 m\xE3n."
        ],
        pitfalls: ["Qu\xEAn \u0111i\u1EC1u ki\u1EC7n ch\u1EEF s\u1ED1 \u0111\u1EA7u ti\xEAn kh\xE1c 0.", "Ch\u1EC9 t\xECm m\u1ED9t gi\xE1 tr\u1ECB r\u1ED3i d\u1EEBng, trong khi \u0111\u1EC1 c\xF3 nhi\u1EC1u \u0111\xE1p s\u1ED1."],
        worked: [
          {
            prompt: "T\xECm ch\u1EEF s\u1ED1 $a$ \u0111\u1EC3 s\u1ED1 $\\ov{3a52}$ chia h\u1EBFt cho 9.",
            thinking: ["Chia h\u1EBFt cho 9 \u2192 d\xF9ng t\u1ED5ng c\xE1c ch\u1EEF s\u1ED1.", "T\u1ED5ng l\xE0 $3+a+5+2=a+10$."],
            solution: [
              "S\u1ED1 chia h\u1EBFt cho 9 $\\Leftrightarrow (a+10);\\vdots;9$.",
              "V\xEC $0\\le a\\le9$ n\xEAn $10\\le a+10\\le19$; trong kho\u1EA3ng n\xE0y ch\u1EC9 c\xF3 $18;\\vdots;9$.",
              "$a+10=18\\Rightarrow a=8$.",
              "V\u1EADy $a=8$, s\u1ED1 c\u1EA7n t\xECm l\xE0 $3852$."
            ],
            remark: "Lu\xF4n ch\u1EB7n mi\u1EC1n gi\xE1 tr\u1ECB c\u1EE7a t\u1ED5ng tr\u01B0\u1EDBc \u2014 \u0111\xF3 l\xE0 c\xE1ch lo\u1EA1i nhanh c\xE1c tr\u01B0\u1EDDng h\u1EE3p th\u1EEBa."
          }
        ]
      },
      {
        id: "g6-t2-d3",
        name: "D\u1EA1ng 3. Ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1, \u0111\u1EBFm \u01B0\u1EDBc",
        level: "TH",
        method: ["Chia d\u1EA7n cho c\xE1c s\u1ED1 nguy\xEAn t\u1ED1 t\u0103ng d\u1EA7n.", "Vi\u1EBFt d\u1EA1ng l\u0169y th\u1EEBa.", "S\u1ED1 \u01B0\u1EDBc $=(a_1+1)(a_2+1)\\cdots$"],
        pitfalls: ["B\u1ECF s\xF3t th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 l\u1EDBn c\xF2n l\u1EA1i \u1EDF b\u01B0\u1EDBc cu\u1ED1i."],
        worked: [
          {
            prompt: "Ph\xE2n t\xEDch 360 ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 v\xE0 cho bi\u1EBFt 360 c\xF3 bao nhi\xEAu \u01B0\u1EDBc.",
            thinking: ["360 ch\u1EB5n \u2192 chia 2 li\xEAn ti\u1EBFp; sau \u0111\xF3 chia 3; cu\u1ED1i c\xF9ng c\xF2n 5."],
            solution: [
              "$360:2=180$; $180:2=90$; $90:2=45$; $45:3=15$; $15:3=5$; $5:5=1$.",
              "V\u1EADy $360=2^{3}\\cdot3^{2}\\cdot5$.",
              "S\u1ED1 \u01B0\u1EDBc $=(3+1)(2+1)(1+1)=4\\cdot3\\cdot2=24$ \u01B0\u1EDBc."
            ]
          }
        ]
      },
      {
        id: "g6-t2-d4",
        name: "D\u1EA1ng 4. B\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EC1 \u01AFCLN",
        level: "VD",
        method: [
          "G\u1ECDi \u1EA9n l\xE0 s\u1ED1 ph\u1EA7n/s\u1ED1 nh\xF3m c\u1EA7n t\xECm.",
          "Nh\u1EADn ra \u1EA9n l\xE0 **\u01B0\u1EDBc chung** c\u1EE7a c\xE1c s\u1ED1 \u0111\xE3 cho, y\xEAu c\u1EA7u \u201Cnhi\u1EC1u nh\u1EA5t\u201D \u2192 \u01AFCLN.",
          "T\xEDnh \u01AFCLN r\u1ED3i tr\u1EA3 l\u1EDDi \u0111\u1EE7 \xFD ph\u1EE5 (m\u1ED7i ph\u1EA7n c\xF3 bao nhi\xEAu\u2026)."
        ],
        pitfalls: ["Nh\u1EA7m sang BCNN v\xEC kh\xF4ng \u0111\u1ECDc k\u1EF9 t\u1EEB kho\xE1."],
        worked: [
          {
            prompt: "C\xF4 gi\xE1o c\xF3 48 quy\u1EC3n v\u1EDF, 60 chi\u1EBFc b\xFAt v\xE0 72 c\u1EE5c t\u1EA9y, mu\u1ED1n chia \u0111\u1EC1u v\xE0o c\xE1c ph\u1EA7n qu\xE0. H\u1ECFi chia \u0111\u01B0\u1EE3c nhi\u1EC1u nh\u1EA5t bao nhi\xEAu ph\u1EA7n qu\xE0? M\u1ED7i ph\u1EA7n c\xF3 bao nhi\xEAu v\u1EDF?",
            thinking: [
              "\u201CChia \u0111\u1EC1u\u201D cho c\u1EA3 ba lo\u1EA1i \u2192 s\u1ED1 ph\u1EA7n qu\xE0 l\xE0 **\u01B0\u1EDBc chung** c\u1EE7a 48, 60, 72.",
              "\u201CNhi\u1EC1u nh\u1EA5t\u201D \u2192 l\u1EA5y \u01AFCLN."
            ],
            solution: [
              "$48=2^{4}\\cdot3$; $60=2^{2}\\cdot3\\cdot5$; $72=2^{3}\\cdot3^{2}$.",
              "Th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 chung: 2 (m\u0169 nh\u1ECF nh\u1EA5t l\xE0 2) v\xE0 3 (m\u0169 nh\u1ECF nh\u1EA5t l\xE0 1).",
              "\u01AFCLN$(48;60;72)=2^{2}\\cdot3=12$.",
              "V\u1EADy chia \u0111\u01B0\u1EE3c nhi\u1EC1u nh\u1EA5t **12 ph\u1EA7n qu\xE0**; m\u1ED7i ph\u1EA7n c\xF3 $48:12=4$ quy\u1EC3n v\u1EDF, $60:12=5$ b\xFAt, $72:12=6$ c\u1EE5c t\u1EA9y."
            ]
          }
        ]
      },
      {
        id: "g6-t2-d5",
        name: "D\u1EA1ng 5. B\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EC1 BCNN (c\xF3 d\u01B0)",
        level: "VD",
        method: [
          "N\u1EBFu chia \u0111\u1EC1u kh\xF4ng d\u01B0: \u1EA9n l\xE0 b\u1ED9i chung \u2192 BCNN.",
          "N\u1EBFu \u201C\u0111\u1EC1u d\u01B0 $r$\u201D: x\xE9t $n-r$ l\xE0 b\u1ED9i chung, t\xECm BCNN r\u1ED3i c\u1ED9ng $r$.",
          "\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n ch\u1EB7n c\u1EE7a \u0111\u1EC1 \u0111\u1EC3 ch\u1ECDn nghi\u1EC7m."
        ],
        pitfalls: ["Qu\xEAn c\u1ED9ng l\u1EA1i ph\u1EA7n d\u01B0.", "Qu\xEAn \u0111\u1ED1i chi\u1EBFu kho\u1EA3ng gi\xE1 tr\u1ECB \u0111\u1EC1 cho."],
        worked: [
          {
            prompt: "S\u1ED1 h\u1ECDc sinh kh\u1ED1i 6 khi x\u1EBFp h\xE0ng 12, h\xE0ng 15, h\xE0ng 18 \u0111\u1EC1u th\u1EEBa 5 em. Bi\u1EBFt s\u1ED1 h\u1ECDc sinh trong kho\u1EA3ng t\u1EEB 300 \u0111\u1EBFn 400. T\xEDnh s\u1ED1 h\u1ECDc sinh.",
            thinking: [
              "\u201C\u0110\u1EC1u th\u1EEBa 5\u201D \u2192 n\u1EBFu b\u1EDBt \u0111i 5 em th\xEC chia h\u1EBFt cho c\u1EA3 12, 15, 18.",
              "\u0110\u1EB7t $n$ l\xE0 s\u1ED1 h\u1ECDc sinh, khi \u0111\xF3 $n-5$ l\xE0 b\u1ED9i chung c\u1EE7a 12, 15, 18."
            ],
            solution: [
              "G\u1ECDi $n$ l\xE0 s\u1ED1 h\u1ECDc sinh kh\u1ED1i 6 ($n\\in\\Nstar$, $300\\le n\\le400$).",
              "Theo \u0111\u1EC1: $(n-5);\\vdots;12$, $(n-5);\\vdots;15$, $(n-5);\\vdots;18$ n\xEAn $n-5\\in$ BC$(12;15;18)$.",
              "$12=2^{2}\\cdot3$; $15=3\\cdot5$; $18=2\\cdot3^{2}$ $\\Rightarrow$ BCNN $=2^{2}\\cdot3^{2}\\cdot5=180$.",
              "BC$(12;15;18)=\\{0;180;360;540;\\dots\\}$, suy ra $n\\in\\{5;185;365;545;\\dots\\}$.",
              "\u0110\u1ED1i chi\u1EBFu $300\\le n\\le400$ ta \u0111\u01B0\u1EE3c $n=365$.",
              "V\u1EADy kh\u1ED1i 6 c\xF3 **365 h\u1ECDc sinh**."
            ]
          }
        ]
      },
      {
        id: "g6-t2-d6",
        name: "D\u1EA1ng 6. V\u1EADn d\u1EE5ng cao \u2014 ch\u1EE9ng minh chia h\u1EBFt, hai s\u1ED1 nguy\xEAn t\u1ED1 c\xF9ng nhau",
        level: "VDC",
        method: [
          "\u0110\u1EB7t $d=$ \u01AFCLN c\u1EE7a hai bi\u1EC3u th\u1EE9c, suy ra m\u1ED7i bi\u1EC3u th\u1EE9c chia h\u1EBFt cho $d$.",
          "T\u1ED5 h\u1EE3p tuy\u1EBFn t\xEDnh hai bi\u1EC3u th\u1EE9c \u0111\u1EC3 tri\u1EC7t ti\xEAu \u1EA9n, thu \u0111\u01B0\u1EE3c m\u1ED9t h\u1EB1ng s\u1ED1 chia h\u1EBFt cho $d$.",
          "Ch\u1EB7n $d$ v\xE0 k\u1EBFt lu\u1EADn."
        ],
        pitfalls: ["Ch\u1ECDn h\u1EC7 s\u1ED1 t\u1ED5 h\u1EE3p ch\u01B0a tri\u1EC7t ti\xEAu h\u1EBFt \u1EA9n."],
        worked: [
          {
            prompt: "Ch\u1EE9ng minh v\u1EDBi m\u1ECDi s\u1ED1 t\u1EF1 nhi\xEAn $n$, hai s\u1ED1 $2n+3$ v\xE0 $3n+4$ l\xE0 hai s\u1ED1 nguy\xEAn t\u1ED1 c\xF9ng nhau.",
            thinking: [
              "Mu\u1ED1n ch\u1EE9ng minh nguy\xEAn t\u1ED1 c\xF9ng nhau t\u1EE9c l\xE0 ch\u1EE9ng minh \u01AFCLN c\u1EE7a ch\xFAng b\u1EB1ng 1.",
              "\u0110\u1EB7t $d$ l\xE0 \u01B0\u1EDBc chung, t\xECm c\xE1ch kh\u1EED $n$: nh\xE2n ch\xE9o h\u1EC7 s\u1ED1 $3$ v\xE0 $2$."
            ],
            solution: [
              "G\u1ECDi $d=$ \u01AFCLN$(2n+3;\\,3n+4)$, $d\\in\\Nstar$.",
              "Khi \u0111\xF3 $(2n+3);\\vdots;d$ v\xE0 $(3n+4);\\vdots;d$.",
              "Suy ra $3(2n+3);\\vdots;d$ v\xE0 $2(3n+4);\\vdots;d$, t\u1EE9c $(6n+9);\\vdots;d$ v\xE0 $(6n+8);\\vdots;d$.",
              "Hi\u1EC7u: $(6n+9)-(6n+8)=1;\\vdots;d\\Rightarrow d=1$.",
              "V\u1EADy $2n+3$ v\xE0 $3n+4$ nguy\xEAn t\u1ED1 c\xF9ng nhau v\u1EDBi m\u1ECDi $n\\in\\N$."
            ],
            remark: "K\u1EF9 thu\u1EADt \u201Ckh\u1EED \u1EA9n b\u1EB1ng t\u1ED5 h\u1EE3p tuy\u1EBFn t\xEDnh\u201D l\xE0 m\u1EABu chu\u1EA9n cho m\u1ECDi b\xE0i ch\u1EE9ng minh nguy\xEAn t\u1ED1 c\xF9ng nhau."
          }
        ]
      }
    ],
    bank: ["g6.chia-het", "g6.dau-hieu", "g6.nguyen-to", "g6.ucln", "g6.bcnn"]
  }
];

// src/content/g6/topics-b.ts
var G6_TOPICS_B = [
  {
    id: "g6-t3",
    grade: 6,
    term: "HK1",
    strand: "SO_DAI_SO",
    order: 3,
    name: "S\u1ED1 nguy\xEAn \u2014 Quy t\u1EAFc d\u1EA5u",
    summary: "T\u1EADp h\u1EE3p s\u1ED1 nguy\xEAn, th\u1EE9 t\u1EF1 tr\xEAn tr\u1EE5c s\u1ED1, b\u1ED1n ph\xE9p t\xEDnh v\u1EDBi s\u1ED1 nguy\xEAn, quy t\u1EAFc d\u1EA5u ngo\u1EB7c, b\u1ED9i v\xE0 \u01B0\u1EDBc c\u1EE7a s\u1ED1 nguy\xEAn.",
    outcomes: [
      "Nh\u1EADn bi\u1EBFt s\u1ED1 nguy\xEAn \xE2m, bi\u1EC3u di\u1EC5n s\u1ED1 nguy\xEAn tr\xEAn tr\u1EE5c s\u1ED1, so s\xE1nh hai s\u1ED1 nguy\xEAn.",
      "Th\u1EF1c hi\u1EC7n th\xE0nh th\u1EA1o c\u1ED9ng, tr\u1EEB, nh\xE2n, chia s\u1ED1 nguy\xEAn v\xE0 v\u1EADn d\u1EE5ng quy t\u1EAFc d\u1EA5u.",
      "V\u1EADn d\u1EE5ng quy t\u1EAFc d\u1EA5u ngo\u1EB7c, quy t\u1EAFc chuy\u1EC3n v\u1EBF \u0111\u1EC3 t\xEDnh h\u1EE3p l\xED v\xE0 t\xECm $x$.",
      "Gi\u1EA3i b\xE0i to\xE1n th\u1EF1c ti\u1EC5n c\xF3 s\u1ED1 \xE2m: nhi\u1EC7t \u0111\u1ED9, \u0111\u1ED9 cao, thu \u2013 chi."
    ],
    theory: [
      {
        heading: "1. T\u1EADp h\u1EE3p s\u1ED1 nguy\xEAn v\xE0 th\u1EE9 t\u1EF1",
        body: ["$\\Z=\\{\\dots;-3;-2;-1;0;1;2;3;\\dots\\}$ g\u1ED3m s\u1ED1 nguy\xEAn \xE2m, s\u1ED1 0 v\xE0 s\u1ED1 nguy\xEAn d\u01B0\u01A1ng."],
        formulas: [
          "Tr\xEAn tr\u1EE5c s\u1ED1 n\u1EB1m ngang, s\u1ED1 b\xEAn **tr\xE1i** lu\xF4n **nh\u1ECF h\u01A1n** s\u1ED1 b\xEAn ph\u1EA3i.",
          "M\u1ECDi s\u1ED1 nguy\xEAn \xE2m \u0111\u1EC1u nh\u1ECF h\u01A1n 0 v\xE0 nh\u1ECF h\u01A1n m\u1ECDi s\u1ED1 nguy\xEAn d\u01B0\u01A1ng.",
          "$\\abs{a}$ l\xE0 kho\u1EA3ng c\xE1ch t\u1EEB \u0111i\u1EC3m $a$ t\u1EDBi \u0111i\u1EC3m 0 tr\xEAn tr\u1EE5c s\u1ED1, lu\xF4n $\\ge 0$."
        ],
        caution: ["$-10<-2$ v\xEC c\xE0ng \u201C\xE2m s\xE2u\u201D c\xE0ng nh\u1ECF \u2014 \u0111\xE2y l\xE0 l\u1ED7i so s\xE1nh ph\u1ED5 bi\u1EBFn nh\u1EA5t."]
      },
      {
        heading: "2. C\u1ED9ng, tr\u1EEB s\u1ED1 nguy\xEAn",
        body: ["Ch\u1EC9 c\u1EA7n nh\u1EDB hai tr\u01B0\u1EDDng h\u1EE3p: c\xF9ng d\u1EA5u v\xE0 kh\xE1c d\u1EA5u."],
        formulas: [
          "C\xF9ng d\u1EA5u: c\u1ED9ng hai gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i, gi\u1EEF nguy\xEAn d\u1EA5u chung.",
          "Kh\xE1c d\u1EA5u: l\u1EA5y gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i l\u1EDBn tr\u1EEB gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i nh\u1ECF, d\u1EA5u theo s\u1ED1 c\xF3 gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i l\u1EDBn h\u01A1n.",
          "$a-b=a+(-b)$",
          "$a+(-a)=0$ (hai s\u1ED1 \u0111\u1ED1i nhau)"
        ]
      },
      {
        heading: "3. Nh\xE2n, chia s\u1ED1 nguy\xEAn \u2014 quy t\u1EAFc d\u1EA5u",
        body: ["Quy t\u1EAFc d\u1EA5u l\xE0 c\xF4ng c\u1EE5 d\xF9ng su\u1ED1t t\u1EEB l\u1EDBp 6 \u0111\u1EBFn l\u1EDBp 12."],
        formulas: [
          "$(+)\\cdot(+)=(+)$ ; $(-)\\cdot(-)=(+)$",
          "$(+)\\cdot(-)=(-)$ ; $(-)\\cdot(+)=(-)$",
          "T\xEDch c\xF3 **ch\u1EB5n** th\u1EEBa s\u1ED1 \xE2m th\xEC mang d\u1EA5u d\u01B0\u01A1ng; c\xF3 **l\u1EBB** th\u1EEBa s\u1ED1 \xE2m th\xEC mang d\u1EA5u \xE2m."
        ],
        caution: ["$(-2)^{4}=16$ nh\u01B0ng $-2^{4}=-16$ \u2014 d\u1EA5u ngo\u1EB7c quy\u1EBFt \u0111\u1ECBnh t\u1EA5t c\u1EA3."]
      },
      {
        heading: "4. Quy t\u1EAFc d\u1EA5u ngo\u1EB7c v\xE0 chuy\u1EC3n v\u1EBF",
        body: [],
        formulas: [
          "B\u1ECF ngo\u1EB7c \u0111\u1EB1ng tr\u01B0\u1EDBc c\xF3 d\u1EA5u \u201C$+$\u201D: gi\u1EEF nguy\xEAn d\u1EA5u m\u1ECDi s\u1ED1 h\u1EA1ng.",
          "B\u1ECF ngo\u1EB7c \u0111\u1EB1ng tr\u01B0\u1EDBc c\xF3 d\u1EA5u \u201C$-$\u201D: **\u0111\u1ED5i d\u1EA5u** m\u1ECDi s\u1ED1 h\u1EA1ng b\xEAn trong.",
          "Chuy\u1EC3n m\u1ED9t s\u1ED1 h\u1EA1ng t\u1EEB v\u1EBF n\xE0y sang v\u1EBF kia th\xEC ph\u1EA3i **\u0111\u1ED5i d\u1EA5u** s\u1ED1 h\u1EA1ng \u0111\xF3."
        ]
      }
    ],
    decode: [
      { signal: "C\xF3 nhi\u1EC1u d\u1EA5u ngo\u1EB7c l\u1ED3ng v\xE0 d\u1EA5u tr\u1EEB \u0111\u1EE9ng tr\u01B0\u1EDBc ngo\u1EB7c", action: "B\u1ECF ngo\u1EB7c theo quy t\u1EAFc d\u1EA5u, \u0111\u1ED5i d\u1EA5u to\xE0n b\u1ED9 s\u1ED1 h\u1EA1ng b\xEAn trong.", why: "S\xF3t m\u1ED9t d\u1EA5u l\xE0 sai c\u1EA3 b\xE0i \u2014 n\xEAn b\u1ECF ngo\u1EB7c t\u1EEBng l\u1EDBp m\u1ED9t." },
      { signal: "T\u1ED5ng c\xF3 nhi\u1EC1u s\u1ED1 \u0111\u1ED1i nhau", action: "Nh\xF3m c\xE1c c\u1EB7p \u0111\u1ED1i nhau cho tri\u1EC7t ti\xEAu tr\u01B0\u1EDBc.", why: "\u0110\u1EC1 lu\xF4n c\xE0i s\u1EB5n c\u1EB7p $a$ v\xE0 $-a$ \u0111\u1EC3 r\xFAt ng\u1EAFn ph\xE9p t\xEDnh." },
      { signal: "\u0110\u1EC1 n\xF3i \u201Cgi\u1EA3m\u201D, \u201Cl\u1ED7\u201D, \u201Cd\u01B0\u1EDBi m\u1EF1c n\u01B0\u1EDBc bi\u1EC3n\u201D, \u201Ctr\u01B0\u1EDBc C\xF4ng nguy\xEAn\u201D", action: "Bi\u1EC3u di\u1EC5n b\u1EB1ng s\u1ED1 nguy\xEAn \xE2m.", why: "D\u1ECBch \u0111\xFAng ng\xF4n ng\u1EEF th\u1EF1c t\u1EBF sang s\u1ED1 \xE2m l\xE0 n\u1EEDa l\u1EDDi gi\u1EA3i." },
      { signal: "T\xEDch nhi\u1EC1u th\u1EEBa s\u1ED1 \xE2m", action: "\u0110\u1EBFm s\u1ED1 th\u1EEBa s\u1ED1 \xE2m: ch\u1EB5n \u2192 d\u01B0\u01A1ng, l\u1EBB \u2192 \xE2m; sau \u0111\xF3 nh\xE2n c\xE1c gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i.", why: "T\xE1ch ri\xEAng d\u1EA5u v\xE0 \u0111\u1ED9 l\u1EDBn gi\xFAp kh\xF4ng sai d\u1EA5u." }
    ],
    mindmap: {
      root: "S\u1ED0 NGUY\xCAN",
      branches: [
        { title: "T\u1EADp h\u1EE3p $\\Z$", items: ["S\u1ED1 \xE2m, 0, s\u1ED1 d\u01B0\u01A1ng", "Tr\u1EE5c s\u1ED1", "S\u1ED1 \u0111\u1ED1i", "Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i"] },
        { title: "C\u1ED9ng \u2014 Tr\u1EEB", items: ["C\xF9ng d\u1EA5u / kh\xE1c d\u1EA5u", "$a-b=a+(-b)$", "T\xEDnh ch\u1EA5t giao ho\xE1n, k\u1EBFt h\u1EE3p"] },
        { title: "Nh\xE2n \u2014 Chia", items: ["Quy t\u1EAFc d\u1EA5u", "\u0110\u1EBFm th\u1EEBa s\u1ED1 \xE2m", "L\u0169y th\u1EEBa s\u1ED1 \xE2m"] },
        { title: "Quy t\u1EAFc", items: ["D\u1EA5u ngo\u1EB7c", "Chuy\u1EC3n v\u1EBF", "T\xECm $x$"] },
        { title: "\u1EE8ng d\u1EE5ng", items: ["Nhi\u1EC7t \u0111\u1ED9", "\u0110\u1ED9 cao", "Thu \u2013 chi, l\xE3i \u2013 l\u1ED7"] }
      ]
    },
    practiceSkills: [
      { title: "K\u1EF9 n\u0103ng t\xE1ch d\u1EA5u v\xE0 \u0111\u1ED9 l\u1EDBn", detail: ["B\u01B0\u1EDBc 1: x\xE1c \u0111\u1ECBnh d\u1EA5u c\u1EE7a k\u1EBFt qu\u1EA3.", "B\u01B0\u1EDBc 2: t\xEDnh v\u1EDBi c\xE1c gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i.", "B\u01B0\u1EDBc 3: gh\xE9p d\u1EA5u v\xE0o k\u1EBFt qu\u1EA3."] },
      { title: "K\u1EF9 n\u0103ng t\xEDnh h\u1EE3p l\xED v\u1EDBi s\u1ED1 nguy\xEAn", detail: ["Nh\xF3m s\u1ED1 \u0111\u1ED1i nhau tr\u01B0\u1EDBc.", "Nh\xF3m s\u1ED1 c\xF9ng d\u1EA5u l\u1EA1i r\u1ED3i c\u1ED9ng m\u1ED9t l\u1EA7n.", "\u0110\u01B0a v\u1EC1 d\u1EA1ng $a(b+c)$ khi c\xF3 th\u1EEBa s\u1ED1 chung."] }
    ],
    types: [
      {
        id: "g6-t3-d1",
        name: "D\u1EA1ng 1. So s\xE1nh v\xE0 s\u1EAFp th\u1EE9 t\u1EF1 s\u1ED1 nguy\xEAn",
        level: "NB",
        method: ["\u0110\u01B0a v\u1EC1 c\xF9ng d\u1EA1ng, d\xF9ng tr\u1EE5c s\u1ED1 ho\u1EB7c quy t\u1EAFc: \xE2m < 0 < d\u01B0\u01A1ng.", "V\u1EDBi hai s\u1ED1 \xE2m: s\u1ED1 n\xE0o c\xF3 gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i l\u1EDBn h\u01A1n th\xEC nh\u1ECF h\u01A1n."],
        pitfalls: ["So s\xE1nh hai s\u1ED1 \xE2m theo \u0111\u1ED9 l\u1EDBn gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i."],
        worked: [{
          prompt: "S\u1EAFp x\u1EBFp theo th\u1EE9 t\u1EF1 t\u0103ng d\u1EA7n: $-7;\\ 3;\\ 0;\\ -12;\\ 5;\\ -1$.",
          thinking: ["T\xE1ch nh\xF3m \xE2m v\xE0 nh\xF3m d\u01B0\u01A1ng. Trong nh\xF3m \xE2m, gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i c\xE0ng l\u1EDBn th\xEC s\u1ED1 c\xE0ng nh\u1ECF."],
          solution: ["Nh\xF3m \xE2m: $-12;-7;-1$ (v\xEC $12>7>1$).", "Sau \u0111\xF3 l\xE0 0, r\u1ED3i nh\xF3m d\u01B0\u01A1ng: $3;5$.", "K\u1EBFt qu\u1EA3: $-12<-7<-1<0<3<5$."]
        }]
      },
      {
        id: "g6-t3-d2",
        name: "D\u1EA1ng 2. T\xEDnh h\u1EE3p l\xED bi\u1EC3u th\u1EE9c s\u1ED1 nguy\xEAn",
        level: "TH",
        method: ["B\u1ECF ngo\u1EB7c \u0111\xFAng quy t\u1EAFc d\u1EA5u.", "Nh\xF3m c\u1EB7p s\u1ED1 \u0111\u1ED1i v\xE0 nh\xF3m s\u1ED1 c\xF9ng d\u1EA5u.", "C\u1ED9ng m\u1ED9t l\u1EA7n cho m\u1ED7i nh\xF3m."],
        pitfalls: ["Qu\xEAn \u0111\u1ED5i d\u1EA5u khi b\u1ECF ngo\u1EB7c c\xF3 d\u1EA5u tr\u1EEB ph\xEDa tr\u01B0\u1EDBc."],
        worked: [{
          prompt: "T\xEDnh h\u1EE3p l\xED: $A=(-125)+118+(-75)+82$.",
          thinking: ["$-125$ v\xE0 $-75$ c\xF9ng d\u1EA5u, c\u1ED9ng l\u1EA1i tr\xF2n tr\u0103m. $118+82=200$ c\u0169ng tr\xF2n tr\u0103m."],
          solution: ["$A=[(-125)+(-75)]+(118+82)$", "$A=(-200)+200=0$."]
        }]
      },
      {
        id: "g6-t3-d3",
        name: "D\u1EA1ng 3. T\xECm x v\u1EDBi s\u1ED1 nguy\xEAn",
        level: "TH",
        method: ["Thu g\u1ECDn hai v\u1EBF.", "Chuy\u1EC3n v\u1EBF \u0111\u1ED5i d\u1EA5u \u0111\u1EC3 \u0111\u01B0a \u1EA9n v\u1EC1 m\u1ED9t v\u1EBF.", "Chia h\u1EC7 s\u1ED1, k\u1EBFt lu\u1EADn v\xE0 th\u1EED l\u1EA1i."],
        pitfalls: ["Chuy\u1EC3n v\u1EBF m\xE0 qu\xEAn \u0111\u1ED5i d\u1EA5u.", "Chia cho s\u1ED1 \xE2m m\xE0 gi\u1EEF nguy\xEAn d\u1EA5u."],
        worked: [{
          prompt: "T\xECm $x\\in\\Z$: $-3x+15=-2x-4$.",
          thinking: ["\u0110\u01B0a c\xE1c h\u1EA1ng t\u1EED ch\u1EE9a $x$ v\u1EC1 v\u1EBF tr\xE1i, h\u1EB1ng s\u1ED1 v\u1EC1 v\u1EBF ph\u1EA3i."],
          solution: ["$-3x+2x=-4-15$", "$-x=-19$", "$x=19$.", "Th\u1EED l\u1EA1i: $-3\\cdot19+15=-42$ v\xE0 $-2\\cdot19-4=-42$ (\u0111\xFAng)."]
        }]
      },
      {
        id: "g6-t3-d4",
        name: "D\u1EA1ng 4. B\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EDBi s\u1ED1 \xE2m",
        level: "VD",
        method: ["Ch\u1ECDn chi\u1EC1u d\u01B0\u01A1ng, quy \u01B0\u1EDBc d\u1EA5u cho t\u1EEBng \u0111\u1EA1i l\u01B0\u1EE3ng.", "L\u1EADp bi\u1EC3u th\u1EE9c theo tr\xECnh t\u1EF1 th\u1EDDi gian/s\u1EF1 ki\u1EC7n.", "T\xEDnh v\xE0 tr\u1EA3 l\u1EDDi b\u1EB1ng ng\xF4n ng\u1EEF th\u1EF1c t\u1EBF."],
        worked: [{
          prompt: "Nhi\u1EC7t \u0111\u1ED9 \u1EDF Sa Pa l\xFAc 6 gi\u1EDD l\xE0 $-3\\deg C$, \u0111\u1EBFn 12 gi\u1EDD t\u0103ng th\xEAm $7\\deg C$, \u0111\u1EBFn 22 gi\u1EDD l\u1EA1i gi\u1EA3m $5\\deg C$. T\xEDnh nhi\u1EC7t \u0111\u1ED9 l\xFAc 22 gi\u1EDD.",
          thinking: ["\u201CT\u0103ng\u201D l\xE0 c\u1ED9ng, \u201Cgi\u1EA3m\u201D l\xE0 tr\u1EEB. C\u1EE9 \u0111i theo d\xF2ng th\u1EDDi gian."],
          solution: ["L\xFAc 12 gi\u1EDD: $-3+7=4\\ (\\deg C)$.", "L\xFAc 22 gi\u1EDD: $4-5=-1\\ (\\deg C)$.", "V\u1EADy l\xFAc 22 gi\u1EDD nhi\u1EC7t \u0111\u1ED9 l\xE0 $-1\\deg C$."]
        }]
      },
      {
        id: "g6-t3-d5",
        name: "D\u1EA1ng 5. V\u1EADn d\u1EE5ng cao \u2014 t\xECm x nguy\xEAn \u0111\u1EC3 bi\u1EC3u th\u1EE9c nh\u1EADn gi\xE1 tr\u1ECB nguy\xEAn",
        level: "VDC",
        method: ["T\xE1ch bi\u1EC3u th\u1EE9c th\xE0nh ph\u1EA7n nguy\xEAn c\u1ED9ng ph\u1EA7n ph\xE2n.", "\u0110i\u1EC1u ki\u1EC7n: m\u1EABu l\xE0 **\u01B0\u1EDBc** c\u1EE7a t\u1EED c\xF2n l\u1EA1i.", "Li\u1EC7t k\xEA \u01B0\u1EDBc, gi\u1EA3i t\u1EEBng tr\u01B0\u1EDDng h\u1EE3p, \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n."],
        worked: [{
          prompt: "T\xECm c\xE1c s\u1ED1 nguy\xEAn $x$ \u0111\u1EC3 $A=\\f{2x+7}{x+1}$ nh\u1EADn gi\xE1 tr\u1ECB nguy\xEAn.",
          thinking: [
            "T\u1EED v\xE0 m\u1EABu c\xF9ng b\u1EADc nh\u1EA5t \u2192 t\xE1ch t\u1EED theo m\u1EABu \u0111\u1EC3 l\u1ED9 ph\u1EA7n d\u01B0.",
            "$2x+7=2(x+1)+5$."
          ],
          solution: [
            "\u0110i\u1EC1u ki\u1EC7n: $x\\ne-1$.",
            "$A=\\f{2(x+1)+5}{x+1}=2+\\f{5}{x+1}$.",
            "$A\\in\\Z\\Leftrightarrow (x+1)$ l\xE0 \u01B0\u1EDBc c\u1EE7a 5 $\\Rightarrow x+1\\in\\{-5;-1;1;5\\}$.",
            "$x\\in\\{-6;-2;0;4\\}$ (\u0111\u1EC1u tho\u1EA3 $x\\ne-1$).",
            "V\u1EADy $x\\in\\{-6;-2;0;4\\}$."
          ],
          remark: "K\u1EF9 thu\u1EADt \u201Ct\xE1ch ph\u1EA7n nguy\xEAn\u201D d\xF9ng l\u1EA1i r\u1EA5t nhi\u1EC1u \u1EDF l\u1EDBp 8, l\u1EDBp 9 khi r\xFAt g\u1ECDn ph\xE2n th\u1EE9c."
        }]
      }
    ],
    bank: ["g6.so-nguyen-ss", "g6.so-nguyen-tinh", "g6.so-nguyen-timx", "g6.so-nguyen-tt"]
  },
  {
    id: "g6-t4",
    grade: 6,
    term: "HK2",
    strand: "SO_DAI_SO",
    order: 4,
    name: "Ph\xE2n s\u1ED1 \u2014 C\xE1c ph\xE9p t\xEDnh v\xE0 hai b\xE0i to\xE1n c\u01A1 b\u1EA3n",
    summary: "Ph\xE2n s\u1ED1 v\u1EDBi t\u1EED v\xE0 m\u1EABu nguy\xEAn, r\xFAt g\u1ECDn, quy \u0111\u1ED3ng, b\u1ED1n ph\xE9p t\xEDnh, h\u1ED7n s\u1ED1 v\xE0 hai b\xE0i to\xE1n c\u01A1 b\u1EA3n v\u1EC1 ph\xE2n s\u1ED1.",
    outcomes: [
      "R\xFAt g\u1ECDn, quy \u0111\u1ED3ng, so s\xE1nh ph\xE2n s\u1ED1.",
      "Th\u1EF1c hi\u1EC7n th\xE0nh th\u1EA1o b\u1ED1n ph\xE9p t\xEDnh v\u1EDBi ph\xE2n s\u1ED1, t\xEDnh h\u1EE3p l\xED.",
      "T\xECm gi\xE1 tr\u1ECB ph\xE2n s\u1ED1 c\u1EE7a m\u1ED9t s\u1ED1 cho tr\u01B0\u1EDBc v\xE0 t\xECm m\u1ED9t s\u1ED1 bi\u1EBFt gi\xE1 tr\u1ECB ph\xE2n s\u1ED1 c\u1EE7a n\xF3.",
      "Gi\u1EA3i b\xE0i to\xE1n th\u1EF1c ti\u1EC5n li\xEAn quan \u0111\u1EBFn ph\xE2n s\u1ED1."
    ],
    theory: [
      {
        heading: "1. Ph\xE2n s\u1ED1 b\u1EB1ng nhau \u2014 r\xFAt g\u1ECDn \u2014 quy \u0111\u1ED3ng",
        body: ["Ph\xE2n s\u1ED1 $\\f{a}{b}$ v\u1EDBi $a,b\\in\\Z$, $b\\ne0$."],
        formulas: [
          "$\\f{a}{b}=\\f{c}{d}\\Leftrightarrow ad=bc$",
          "$\\f{a}{b}=\\f{a\\cdot m}{b\\cdot m}$ ($m\\ne0$) v\xE0 $\\f{a}{b}=\\f{a:n}{b:n}$ ($n$ l\xE0 \u01B0\u1EDBc chung)",
          "R\xFAt g\u1ECDn t\u1ED1i gi\u1EA3n: chia c\u1EA3 t\u1EED v\xE0 m\u1EABu cho \u01AFCLN$(\\abs{a},\\abs{b})$",
          "M\u1EABu chung n\xEAn ch\u1ECDn: BCNN c\u1EE7a c\xE1c m\u1EABu"
        ],
        caution: ["Ch\u1EC9 \u0111\u01B0\u1EE3c r\xFAt g\u1ECDn theo **th\u1EEBa s\u1ED1 chung**, kh\xF4ng r\xFAt g\u1ECDn theo s\u1ED1 h\u1EA1ng."]
      },
      {
        heading: "2. B\u1ED1n ph\xE9p t\xEDnh v\u1EDBi ph\xE2n s\u1ED1",
        body: [],
        formulas: [
          "$\\f{a}{m}+\\f{b}{m}=\\f{a+b}{m}$ (c\xF9ng m\u1EABu)",
          "$\\f{a}{b}\\cdot\\f{c}{d}=\\f{ac}{bd}$",
          "$\\f{a}{b}:\\f{c}{d}=\\f{a}{b}\\cdot\\f{d}{c}$ ($c\\ne0$)",
          "S\u1ED1 \u0111\u1ED1i: $-\\f{a}{b}$ ; S\u1ED1 ngh\u1ECBch \u0111\u1EA3o: $\\f{b}{a}$ ($a\\ne0$)"
        ],
        caution: ["Chia ph\xE2n s\u1ED1 l\xE0 **nh\xE2n v\u1EDBi ngh\u1ECBch \u0111\u1EA3o**, kh\xF4ng ph\u1EA3i ngh\u1ECBch \u0111\u1EA3o c\u1EA3 hai."]
      },
      {
        heading: "3. Hai b\xE0i to\xE1n c\u01A1 b\u1EA3n v\u1EC1 ph\xE2n s\u1ED1",
        body: ["\u0110\xE2y l\xE0 hai c\xF4ng th\u1EE9c tr\u1EE5 c\u1ED9t, chi ph\u1ED1i ph\u1EA7n l\u1EDBn b\xE0i to\xE1n th\u1EF1c t\u1EBF l\u1EDBp 6."],
        formulas: [
          "T\xECm gi\xE1 tr\u1ECB ph\xE2n s\u1ED1 c\u1EE7a m\u1ED9t s\u1ED1: $\\f{m}{n}$ c\u1EE7a $a$ l\xE0 $a\\cdot\\f{m}{n}$",
          "T\xECm m\u1ED9t s\u1ED1 bi\u1EBFt gi\xE1 tr\u1ECB ph\xE2n s\u1ED1 c\u1EE7a n\xF3: n\u1EBFu $\\f{m}{n}$ c\u1EE7a $x$ b\u1EB1ng $b$ th\xEC $x=b:\\f{m}{n}$",
          "T\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m c\u1EE7a $a$ v\xE0 $b$: $\\f{a}{b}\\cdot100\\percent$"
        ],
        caution: ["\u0110\u1ECDc k\u1EF9: \u201Cc\u1EE7a\u201D \u2192 nh\xE2n; \u201Cbi\u1EBFt \u2026 b\u1EB1ng\u201D \u2192 chia. Nh\u1EA7m hai chi\u1EC1u n\xE0y l\xE0 m\u1EA5t tr\u1ECDn \u0111i\u1EC3m."]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 c\xF3 ch\u1EEF \u201Cc\u1EE7a\u201D gi\u1EEFa ph\xE2n s\u1ED1 v\xE0 m\u1ED9t s\u1ED1", action: "Nh\xE2n: $a\\cdot\\f{m}{n}$.", why: "\u0110\xE2y l\xE0 b\xE0i to\xE1n t\xECm gi\xE1 tr\u1ECB ph\xE2n s\u1ED1 c\u1EE7a m\u1ED9t s\u1ED1." },
      { signal: "\u0110\u1EC1 cho \u201C\u2026 b\u1EB1ng 24 quy\u1EC3n\u201D v\xE0 h\u1ECFi t\u1ED5ng s\u1ED1 ban \u0111\u1EA7u", action: "Chia: $x=b:\\f{m}{n}$.", why: "\u0110\xE2y l\xE0 b\xE0i to\xE1n t\xECm m\u1ED9t s\u1ED1 bi\u1EBFt gi\xE1 tr\u1ECB ph\xE2n s\u1ED1 c\u1EE7a n\xF3." },
      { signal: "T\u1ED5ng nhi\u1EC1u ph\xE2n s\u1ED1 c\xF3 m\u1EABu d\u1EA1ng $n(n+1)$", action: "T\xE1ch $\\f{1}{n(n+1)}=\\f{1}{n}-\\f{1}{n+1}$ r\u1ED3i kh\u1EED li\xEAn ti\u1EBFp.", why: "K\u1EF9 thu\u1EADt sai ph\xE2n bi\u1EBFn t\u1ED5ng d\xE0i th\xE0nh hi\u1EC7u hai s\u1ED1 h\u1EA1ng \u0111\u1EA7u \u2013 cu\u1ED1i." },
      { signal: "Bi\u1EC3u th\u1EE9c c\xF3 th\u1EEBa s\u1ED1 chung \u1EDF nhi\u1EC1u h\u1EA1ng t\u1EED", action: "\u0110\u1EB7t nh\xE2n t\u1EED chung r\u1ED3i t\xEDnh trong ngo\u1EB7c.", why: "R\xFAt ng\u1EAFn ph\xE9p t\xEDnh, h\u1EA1n ch\u1EBF quy \u0111\u1ED3ng m\u1EABu l\u1EDBn." }
    ],
    mindmap: {
      root: "PH\xC2N S\u1ED0",
      branches: [
        { title: "Kh\xE1i ni\u1EC7m", items: ["$\\f{a}{b}$, $b\\ne0$", "Ph\xE2n s\u1ED1 b\u1EB1ng nhau", "R\xFAt g\u1ECDn t\u1ED1i gi\u1EA3n", "H\u1ED7n s\u1ED1"] },
        { title: "So s\xE1nh", items: ["Quy \u0111\u1ED3ng m\u1EABu", "Quy \u0111\u1ED3ng t\u1EED", "So v\u1EDBi 1", "D\xF9ng ph\xE2n s\u1ED1 trung gian"] },
        { title: "Ph\xE9p t\xEDnh", items: ["C\u1ED9ng, tr\u1EEB c\xF9ng/kh\xE1c m\u1EABu", "Nh\xE2n, chia", "T\xEDnh ch\u1EA5t giao ho\xE1n, k\u1EBFt h\u1EE3p, ph\xE2n ph\u1ED1i"] },
        { title: "Hai b\xE0i to\xE1n c\u01A1 b\u1EA3n", items: ["Gi\xE1 tr\u1ECB ph\xE2n s\u1ED1 c\u1EE7a m\u1ED9t s\u1ED1", "T\xECm s\u1ED1 bi\u1EBFt gi\xE1 tr\u1ECB ph\xE2n s\u1ED1", "T\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m"] },
        { title: "N\xE2ng cao", items: ["T\u1ED5ng sai ph\xE2n", "So s\xE1nh ph\xE2n s\u1ED1 l\u1EDBn", "B\xE0i to\xE1n chuy\u1EC3n \u0111\u1ED9ng, c\xF4ng vi\u1EC7c"] }
      ]
    },
    practiceSkills: [
      { title: "K\u1EF9 n\u0103ng t\xEDnh h\u1EE3p l\xED v\u1EDBi ph\xE2n s\u1ED1", detail: ["\u01AFu ti\xEAn r\xFAt g\u1ECDn tr\u01B0\u1EDBc khi nh\xE2n.", "Nh\xF3m c\xE1c ph\xE2n s\u1ED1 c\xF3 c\xF9ng m\u1EABu.", "\u0110\u1EB7t nh\xE2n t\u1EED chung khi th\u1EA5y ph\xE2n s\u1ED1 l\u1EB7p l\u1EA1i."] },
      { title: "K\u1EF9 n\u0103ng v\u1EBD s\u01A1 \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng", detail: ["V\u1EBD t\u1ED5ng th\u1EC3 l\xE0 m\u1ED9t \u0111o\u1EA1n, chia theo m\u1EABu s\u1ED1.", "\u0110\xE1nh d\u1EA5u ph\u1EA7n \u0111\xE3 bi\u1EBFt v\xE0 ph\u1EA7n c\u1EA7n t\xECm.", "T\u1EEB s\u01A1 \u0111\u1ED3 \u0111\u1ECDc ra ph\xE9p t\xEDnh."] }
    ],
    types: [
      {
        id: "g6-t4-d1",
        name: "D\u1EA1ng 1. R\xFAt g\u1ECDn v\xE0 so s\xE1nh ph\xE2n s\u1ED1",
        level: "NB",
        method: ["R\xFAt g\u1ECDn v\u1EC1 t\u1ED1i gi\u1EA3n.", "Quy \u0111\u1ED3ng m\u1EABu (ho\u1EB7c t\u1EED) r\u1ED3i so s\xE1nh.", "V\u1EDBi ph\xE2n s\u1ED1 \xE2m: nh\u1EDB so s\xE1nh ng\u01B0\u1EE3c."],
        pitfalls: ["So s\xE1nh hai ph\xE2n s\u1ED1 \xE2m theo \u0111\u1ED9 l\u1EDBn."],
        worked: [{
          prompt: "So s\xE1nh $\\f{-7}{12}$ v\xE0 $\\f{-5}{9}$.",
          thinking: ["Quy \u0111\u1ED3ng m\u1EABu: BCNN$(12;9)=36$."],
          solution: ["$\\f{-7}{12}=\\f{-21}{36}$; $\\f{-5}{9}=\\f{-20}{36}$.", "V\xEC $-21<-20$ n\xEAn $\\f{-7}{12}<\\f{-5}{9}$."]
        }]
      },
      {
        id: "g6-t4-d2",
        name: "D\u1EA1ng 2. Th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh, t\xEDnh h\u1EE3p l\xED",
        level: "TH",
        method: ["R\xFAt g\u1ECDn t\u1EEBng ph\xE2n s\u1ED1.", "Nh\xF3m h\u1EA1ng t\u1EED c\xF9ng m\u1EABu ho\u1EB7c c\xF3 nh\xE2n t\u1EED chung.", "\xC1p d\u1EE5ng t\xEDnh ch\u1EA5t ph\xE2n ph\u1ED1i."],
        worked: [{
          prompt: "T\xEDnh h\u1EE3p l\xED: $A=\\f{5}{9}\\cdot\\f{7}{13}+\\f{5}{9}\\cdot\\f{9}{13}-\\f{5}{9}\\cdot\\f{3}{13}$.",
          thinking: ["C\u1EA3 ba h\u1EA1ng t\u1EED \u0111\u1EC1u c\xF3 $\\f{5}{9}$ \u2192 \u0111\u1EB7t nh\xE2n t\u1EED chung."],
          solution: [
            "$A=\\f{5}{9}\\left(\\f{7}{13}+\\f{9}{13}-\\f{3}{13}\\right)$",
            "$A=\\f{5}{9}\\cdot\\f{13}{13}=\\f{5}{9}$."
          ]
        }]
      },
      {
        id: "g6-t4-d3",
        name: "D\u1EA1ng 3. Hai b\xE0i to\xE1n c\u01A1 b\u1EA3n v\u1EC1 ph\xE2n s\u1ED1",
        level: "VD",
        method: ["X\xE1c \u0111\u1ECBnh \u201Cs\u1ED1 \u0111\xE3 bi\u1EBFt\u201D l\xE0 to\xE0n th\u1EC3 hay l\xE0 m\u1ED9t ph\u1EA7n.", "To\xE0n th\u1EC3 \u0111\xE3 bi\u1EBFt \u2192 nh\xE2n; to\xE0n th\u1EC3 ch\u01B0a bi\u1EBFt \u2192 chia.", "V\u1EBD s\u01A1 \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng n\u1EBFu b\xE0i nhi\u1EC1u b\u01B0\u1EDBc."],
        pitfalls: ["Nh\u1EA7m chi\u1EC1u nh\xE2n/chia.", "Qu\xEAn r\u1EB1ng ph\u1EA7n c\xF2n l\u1EA1i \u0111\u01B0\u1EE3c t\xEDnh tr\xEAn ph\u1EA7n **ch\u01B0a \u0111\u1ECDc**, kh\xF4ng ph\u1EA3i tr\xEAn t\u1ED5ng."],
        worked: [{
          prompt: "M\u1ED9t quy\u1EC3n s\xE1ch, ng\xE0y \u0111\u1EA7u An \u0111\u1ECDc $\\f{2}{5}$ s\u1ED1 trang, ng\xE0y th\u1EE9 hai \u0111\u1ECDc $\\f{1}{3}$ s\u1ED1 trang **c\xF2n l\u1EA1i**, ng\xE0y th\u1EE9 ba \u0111\u1ECDc n\u1ED1t 60 trang. H\u1ECFi quy\u1EC3n s\xE1ch c\xF3 bao nhi\xEAu trang?",
          thinking: [
            "Ch\xFA \xFD c\u1EE5m \u201Cs\u1ED1 trang c\xF2n l\u1EA1i\u201D \u2014 m\u1ED1c so s\xE1nh c\u1EE7a ng\xE0y hai l\xE0 ph\u1EA7n ch\u01B0a \u0111\u1ECDc, kh\xF4ng ph\u1EA3i c\u1EA3 quy\u1EC3n.",
            "Ta \u0111i ng\u01B0\u1EE3c t\u1EEB 60 trang cu\u1ED1i c\xF9ng."
          ],
          solution: [
            "Sau ng\xE0y \u0111\u1EA7u, ph\u1EA7n c\xF2n l\u1EA1i l\xE0 $1-\\f{2}{5}=\\f{3}{5}$ quy\u1EC3n s\xE1ch.",
            "Ng\xE0y hai \u0111\u1ECDc $\\f{1}{3}$ c\u1EE7a ph\u1EA7n c\xF2n l\u1EA1i, t\u1EE9c $\\f{1}{3}\\cdot\\f{3}{5}=\\f{1}{5}$ quy\u1EC3n s\xE1ch.",
            "Ng\xE0y ba \u0111\u1ECDc: $1-\\f{2}{5}-\\f{1}{5}=\\f{2}{5}$ quy\u1EC3n s\xE1ch, \u1EE9ng v\u1EDBi 60 trang.",
            "S\u1ED1 trang quy\u1EC3n s\xE1ch: $60:\\f{2}{5}=60\\cdot\\f{5}{2}=150$ (trang).",
            "V\u1EADy quy\u1EC3n s\xE1ch c\xF3 **150 trang**."
          ],
          remark: "B\u1EABy \u201Cc\xF2n l\u1EA1i\u201D xu\u1EA5t hi\u1EC7n g\u1EA7n nh\u01B0 ch\u1EAFc ch\u1EAFn trong \u0111\u1EC1 cu\u1ED1i k\u1EF3 l\u1EDBp 6 \u2014 lu\xF4n quy m\u1ECDi ph\xE2n s\u1ED1 v\u1EC1 c\xF9ng m\u1ED9t m\u1ED1c l\xE0 c\u1EA3 quy\u1EC3n."
        }]
      },
      {
        id: "g6-t4-d4",
        name: "D\u1EA1ng 4. V\u1EADn d\u1EE5ng cao \u2014 t\u1ED5ng d\xE3y ph\xE2n s\u1ED1 c\xF3 quy lu\u1EADt",
        level: "VDC",
        method: ["T\xECm quy lu\u1EADt m\u1EABu s\u1ED1.", "T\xE1ch theo c\xF4ng th\u1EE9c sai ph\xE2n $\\f{k}{n(n+k)}=\\f{1}{n}-\\f{1}{n+k}$.", "Kh\u1EED li\xEAn ti\u1EBFp, ch\u1EC9 c\xF2n s\u1ED1 h\u1EA1ng \u0111\u1EA7u v\xE0 cu\u1ED1i."],
        worked: [{
          prompt: "T\xEDnh $S=\\f{1}{2\\cdot3}+\\f{1}{3\\cdot4}+\\f{1}{4\\cdot5}+\\dots+\\f{1}{49\\cdot50}$.",
          thinking: ["M\u1EABu c\xF3 d\u1EA1ng $n(n+1)$ \u2192 d\xF9ng $\\f{1}{n(n+1)}=\\f{1}{n}-\\f{1}{n+1}$."],
          solution: [
            "$S=\\left(\\f{1}{2}-\\f{1}{3}\\right)+\\left(\\f{1}{3}-\\f{1}{4}\\right)+\\dots+\\left(\\f{1}{49}-\\f{1}{50}\\right)$",
            "C\xE1c s\u1ED1 h\u1EA1ng gi\u1EEFa tri\u1EC7t ti\xEAu t\u1EEBng \u0111\xF4i m\u1ED9t.",
            "$S=\\f{1}{2}-\\f{1}{50}=\\f{25}{50}-\\f{1}{50}=\\f{24}{50}=\\f{12}{25}$."
          ]
        }]
      }
    ],
    bank: ["g6.phan-so-rutgon", "g6.phan-so-tinh", "g6.phan-so-bt", "g6.phan-so-day"]
  },
  {
    id: "g6-t5",
    grade: 6,
    term: "HK2",
    strand: "SO_DAI_SO",
    order: 5,
    name: "S\u1ED1 th\u1EADp ph\xE2n \u2014 T\u1EC9 s\u1ED1 v\xE0 T\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m",
    summary: "S\u1ED1 th\u1EADp ph\xE2n \xE2m, c\xE1c ph\xE9p t\xEDnh, l\xE0m tr\xF2n v\xE0 \u01B0\u1EDBc l\u01B0\u1EE3ng, t\u1EC9 s\u1ED1, t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m v\xE0 b\xE0i to\xE1n th\u1EF1c t\u1EBF.",
    outcomes: [
      "Th\u1EF1c hi\u1EC7n b\u1ED1n ph\xE9p t\xEDnh v\u1EDBi s\u1ED1 th\u1EADp ph\xE2n (k\u1EC3 c\u1EA3 s\u1ED1 \xE2m), t\xEDnh h\u1EE3p l\xED.",
      "L\xE0m tr\xF2n s\u1ED1 v\xE0 \u01B0\u1EDBc l\u01B0\u1EE3ng k\u1EBFt qu\u1EA3 trong t\xECnh hu\u1ED1ng th\u1EF1c t\u1EBF.",
      "T\xEDnh t\u1EC9 s\u1ED1, t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m; gi\u1EA3i ba b\xE0i to\xE1n c\u01A1 b\u1EA3n v\u1EC1 t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m."
    ],
    theory: [
      {
        heading: "1. S\u1ED1 th\u1EADp ph\xE2n v\xE0 l\xE0m tr\xF2n",
        body: ["S\u1ED1 th\u1EADp ph\xE2n \xE2m c\xF3 m\u1ECDi quy t\u1EAFc d\u1EA5u gi\u1ED1ng s\u1ED1 nguy\xEAn."],
        formulas: [
          "L\xE0m tr\xF2n \u0111\u1EBFn h\xE0ng n\xE0o th\xEC x\xE9t ch\u1EEF s\u1ED1 **li\u1EC1n sau** h\xE0ng \u0111\xF3: $\\ge5$ th\xEC t\u0103ng, $<5$ th\xEC gi\u1EEF nguy\xEAn.",
          "L\xE0m tr\xF2n \u0111\u1EBFn $n$ ch\u1EEF s\u1ED1 th\u1EADp ph\xE2n: x\xE9t ch\u1EEF s\u1ED1 th\u1EE9 $n+1$."
        ],
        caution: ["Ch\u1EC9 l\xE0m tr\xF2n \u1EDF **b\u01B0\u1EDBc cu\u1ED1i c\xF9ng**; l\xE0m tr\xF2n gi\u1EEFa ch\u1EEBng s\u1EBD t\xEDch lu\u1EF9 sai s\u1ED1."]
      },
      {
        heading: "2. T\u1EC9 s\u1ED1 v\xE0 t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m",
        body: [],
        formulas: [
          "T\u1EC9 s\u1ED1 c\u1EE7a $a$ v\xE0 $b$ ($b\\ne0$) l\xE0 $\\f{a}{b}$ hay $a:b$",
          "T\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m c\u1EE7a $a$ v\xE0 $b$: $\\f{a}{b}\\cdot100\\percent$",
          "T\xECm $m\\percent$ c\u1EE7a $a$: $a\\cdot\\f{m}{100}$",
          "T\xECm $a$ bi\u1EBFt $m\\percent$ c\u1EE7a $a$ b\u1EB1ng $b$: $a=b:\\f{m}{100}$"
        ]
      },
      {
        heading: "3. B\xE0i to\xE1n t\u0103ng \u2013 gi\u1EA3m ph\u1EA7n tr\u0103m",
        body: ["Xu\u1EA5t hi\u1EC7n d\xE0y \u0111\u1EB7c trong \u0111\u1EC1 thi v\xE0 trong \u0111\u1EDDi s\u1ED1ng (gi\u1EA3m gi\xE1, l\xE3i su\u1EA5t)."],
        formulas: [
          "Gi\xE1 sau khi gi\u1EA3m $m\\percent$: $A(1-\\f{m}{100})$",
          "Gi\xE1 sau khi t\u0103ng $m\\percent$: $A(1+\\f{m}{100})$",
          "Gi\u1EA3m li\xEAn ti\u1EBFp $m\\percent$ r\u1ED3i $n\\percent$: $A(1-\\f{m}{100})(1-\\f{n}{100})$"
        ],
        caution: ["Gi\u1EA3m 20% r\u1ED3i gi\u1EA3m ti\u1EBFp 10% **kh\xF4ng** b\u1EB1ng gi\u1EA3m 30%, v\xEC m\u1ED1c so s\xE1nh \u0111\xE3 thay \u0111\u1ED5i."]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Cchi\u1EBFm bao nhi\xEAu ph\u1EA7n tr\u0103m\u201D", action: "L\u1EA5y ph\u1EA7n chia cho t\u1ED5ng r\u1ED3i nh\xE2n 100%.", why: "\u0110\xE2y l\xE0 b\xE0i to\xE1n t\xEDnh t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m." },
      { signal: "\u0110\u1EC1 cho gi\xE1 sau gi\u1EA3m v\xE0 h\u1ECFi gi\xE1 g\u1ED1c", action: "Chia cho $(1-\\f{m}{100})$.", why: "Gi\xE1 g\u1ED1c l\xE0 to\xE0n th\u1EC3 ch\u01B0a bi\u1EBFt \u2192 ph\xE9p chia." },
      { signal: "Gi\u1EA3m gi\xE1 hai l\u1EA7n li\xEAn ti\u1EBFp", action: "Nh\xE2n hai h\u1EC7 s\u1ED1, kh\xF4ng c\u1ED9ng hai ph\u1EA7n tr\u0103m.", why: "L\u1EA7n gi\u1EA3m th\u1EE9 hai t\xEDnh tr\xEAn gi\xE1 \u0111\xE3 gi\u1EA3m." },
      { signal: "\u0110\u1EC1 y\xEAu c\u1EA7u \u201Cl\xE0m tr\xF2n \u0111\u1EBFn h\xE0ng ph\u1EA7n tr\u0103m\u201D", action: "Gi\u1EEF 2 ch\u1EEF s\u1ED1 th\u1EADp ph\xE2n, x\xE9t ch\u1EEF s\u1ED1 th\u1EE9 ba.", why: "Sai v\u1ECB tr\xED l\xE0m tr\xF2n l\xE0 m\u1EA5t \u0111i\u1EC3m d\xF9 t\xEDnh \u0111\xFAng." }
    ],
    mindmap: {
      root: "S\u1ED0 TH\u1EACP PH\xC2N \u2014 T\u1EC8 S\u1ED0 PH\u1EA6N TR\u0102M",
      branches: [
        { title: "S\u1ED1 th\u1EADp ph\xE2n", items: ["S\u1ED1 th\u1EADp ph\xE2n \xE2m", "B\u1ED1n ph\xE9p t\xEDnh", "T\xEDnh h\u1EE3p l\xED", "Chuy\u1EC3n \u0111\u1ED5i ph\xE2n s\u1ED1 \u2194 th\u1EADp ph\xE2n"] },
        { title: "L\xE0m tr\xF2n", items: ["Quy t\u1EAFc x\xE9t ch\u1EEF s\u1ED1 li\u1EC1n sau", "L\xE0m tr\xF2n \u1EDF b\u01B0\u1EDBc cu\u1ED1i", "\u01AF\u1EDBc l\u01B0\u1EE3ng k\u1EBFt qu\u1EA3"] },
        { title: "T\u1EC9 s\u1ED1", items: ["$a:b$", "T\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m", "T\u1EC9 l\u1EC7 b\u1EA3n \u0111\u1ED3"] },
        { title: "3 b\xE0i to\xE1n %", items: ["T\xECm $m\\percent$ c\u1EE7a $a$", "T\xECm $a$ bi\u1EBFt $m\\percent$", "T\xEDnh t\u1EC9 s\u1ED1 %"] },
        { title: "Th\u1EF1c t\u1EBF", items: ["Gi\u1EA3m gi\xE1", "L\xE3i su\u1EA5t", "Thu\u1EBF VAT", "T\u0103ng tr\u01B0\u1EDFng"] }
      ]
    },
    types: [
      {
        id: "g6-t5-d1",
        name: "D\u1EA1ng 1. Ph\xE9p t\xEDnh v\u1EDBi s\u1ED1 th\u1EADp ph\xE2n, l\xE0m tr\xF2n",
        level: "NB",
        method: ["\u0110\u1EB7t t\xEDnh th\u1EB3ng h\xE0ng d\u1EA5u ph\u1EA9y.", "\xC1p d\u1EE5ng quy t\u1EAFc d\u1EA5u nh\u01B0 s\u1ED1 nguy\xEAn.", "L\xE0m tr\xF2n \u1EDF b\u01B0\u1EDBc cu\u1ED1i c\xF9ng theo y\xEAu c\u1EA7u."],
        worked: [{
          prompt: "T\xEDnh $(-3{,}75)+8{,}2-1{,}45$ r\u1ED3i l\xE0m tr\xF2n k\u1EBFt qu\u1EA3 \u0111\u1EBFn h\xE0ng ph\u1EA7n m\u01B0\u1EDDi.",
          thinking: ["C\u1ED9ng tr\u1EEB l\u1EA7n l\u01B0\u1EE3t t\u1EEB tr\xE1i sang ph\u1EA3i."],
          solution: ["$(-3{,}75)+8{,}2=4{,}45$.", "$4{,}45-1{,}45=3$.", "K\u1EBFt qu\u1EA3 l\xE0 $3$; l\xE0m tr\xF2n \u0111\u1EBFn h\xE0ng ph\u1EA7n m\u01B0\u1EDDi v\u1EABn l\xE0 $3{,}0$."]
        }]
      },
      {
        id: "g6-t5-d2",
        name: "D\u1EA1ng 2. Ba b\xE0i to\xE1n c\u01A1 b\u1EA3n v\u1EC1 t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m",
        level: "TH",
        method: ["X\xE1c \u0111\u1ECBnh r\xF5 \u0111\xE2u l\xE0 to\xE0n th\u1EC3 (100%), \u0111\xE2u l\xE0 ph\u1EA7n.", "To\xE0n th\u1EC3 \u0111\xE3 bi\u1EBFt \u2192 nh\xE2n; to\xE0n th\u1EC3 ch\u01B0a bi\u1EBFt \u2192 chia."],
        worked: [{
          prompt: "L\u1EDBp 6A c\xF3 40 h\u1ECDc sinh, trong \u0111\xF3 c\xF3 14 h\u1ECDc sinh gi\u1ECFi. T\xEDnh t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m h\u1ECDc sinh gi\u1ECFi c\u1EE7a l\u1EDBp.",
          thinking: ["To\xE0n th\u1EC3 l\xE0 40, ph\u1EA7n l\xE0 14 \u2192 l\u1EA5y ph\u1EA7n chia to\xE0n th\u1EC3."],
          solution: ["T\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m $=\\f{14}{40}\\cdot100\\percent=35\\percent$.", "V\u1EADy h\u1ECDc sinh gi\u1ECFi chi\u1EBFm $35\\percent$ s\u1ED1 h\u1ECDc sinh c\u1EA3 l\u1EDBp."]
        }]
      },
      {
        id: "g6-t5-d3",
        name: "D\u1EA1ng 3. B\xE0i to\xE1n gi\u1EA3m gi\xE1 \u2013 l\xE3i su\u1EA5t",
        level: "VD",
        method: ["Vi\u1EBFt h\u1EC7 s\u1ED1 nh\xE2n cho m\u1ED7i l\u1EA7n t\u0103ng/gi\u1EA3m.", "Nh\xE2n li\xEAn ti\u1EBFp c\xE1c h\u1EC7 s\u1ED1.", "So s\xE1nh v\u1EDBi y\xEAu c\u1EA7u c\u1EE7a \u0111\u1EC1."],
        pitfalls: ["C\u1ED9ng d\u1ED3n ph\u1EA7n tr\u0103m c\u1EE7a hai l\u1EA7n gi\u1EA3m li\xEAn ti\u1EBFp."],
        worked: [{
          prompt: "M\u1ED9t chi\u1EBFc \xE1o gi\xE1 ni\xEAm y\u1EBFt 500 000 \u0111\u1ED3ng, \u0111\u01B0\u1EE3c gi\u1EA3m 20%, sau \u0111\xF3 c\u1EEDa h\xE0ng gi\u1EA3m th\xEAm 10% tr\xEAn gi\xE1 \u0111\xE3 gi\u1EA3m. T\xEDnh gi\xE1 cu\u1ED1i c\xF9ng v\xE0 cho bi\u1EBFt t\u1ED5ng c\u1ED9ng \u0111\xE3 gi\u1EA3m bao nhi\xEAu ph\u1EA7n tr\u0103m so v\u1EDBi gi\xE1 ni\xEAm y\u1EBFt.",
          thinking: ["Hai l\u1EA7n gi\u1EA3m li\xEAn ti\u1EBFp \u2192 nh\xE2n hai h\u1EC7 s\u1ED1 $0{,}8$ v\xE0 $0{,}9$."],
          solution: [
            "Gi\xE1 sau l\u1EA7n gi\u1EA3m th\u1EE9 nh\u1EA5t: $500\\,000\\cdot(1-0{,}2)=400\\,000$ (\u0111\u1ED3ng).",
            "Gi\xE1 sau l\u1EA7n gi\u1EA3m th\u1EE9 hai: $400\\,000\\cdot(1-0{,}1)=360\\,000$ (\u0111\u1ED3ng).",
            "T\u1EC9 s\u1ED1 so v\u1EDBi gi\xE1 g\u1ED1c: $\\f{360\\,000}{500\\,000}=0{,}72=72\\percent$.",
            "V\u1EADy gi\xE1 cu\u1ED1i l\xE0 **360 000 \u0111\u1ED3ng**, t\u1ED5ng c\u1ED9ng gi\u1EA3m $100\\percent-72\\percent=28\\percent$ (kh\xF4ng ph\u1EA3i 30%)."
          ],
          remark: "K\u1EBFt qu\u1EA3 28% ch\u1EE9 kh\xF4ng ph\u1EA3i 30% ch\xEDnh l\xE0 \u0111i\u1EC3m ph\xE2n lo\u1EA1i c\u1EE7a d\u1EA1ng b\xE0i n\xE0y."
        }]
      }
    ],
    bank: ["g6.thap-phan", "g6.phan-tram", "g6.giam-gia"]
  },
  {
    id: "g6-t6",
    grade: 6,
    term: "HK1",
    strand: "HINH_HOC",
    order: 6,
    name: "H\xECnh h\u1ECDc tr\u1EF1c quan \u2014 Chu vi v\xE0 Di\u1EC7n t\xEDch",
    summary: "Tam gi\xE1c \u0111\u1EC1u, h\xECnh vu\xF4ng, l\u1EE5c gi\xE1c \u0111\u1EC1u, h\xECnh ch\u1EEF nh\u1EADt, h\xECnh thoi, h\xECnh b\xECnh h\xE0nh, h\xECnh thang c\xE2n: nh\u1EADn bi\u1EBFt, t\xEDnh chu vi v\xE0 di\u1EC7n t\xEDch.",
    outcomes: [
      "Nh\u1EADn bi\u1EBFt v\xE0 m\xF4 t\u1EA3 c\xE1c y\u1EBFu t\u1ED1 c\u1EE7a tam gi\xE1c \u0111\u1EC1u, h\xECnh vu\xF4ng, l\u1EE5c gi\xE1c \u0111\u1EC1u.",
      "M\xF4 t\u1EA3 v\xE0 v\u1EBD \u0111\u01B0\u1EE3c h\xECnh ch\u1EEF nh\u1EADt, h\xECnh thoi, h\xECnh b\xECnh h\xE0nh, h\xECnh thang c\xE2n.",
      "T\xEDnh chu vi, di\u1EC7n t\xEDch c\xE1c h\xECnh \u0111\xE3 h\u1ECDc v\xE0 gi\u1EA3i b\xE0i to\xE1n th\u1EF1c ti\u1EC5n."
    ],
    theory: [
      {
        heading: "1. C\xF4ng th\u1EE9c chu vi \u2014 di\u1EC7n t\xEDch c\u1EA7n thu\u1ED9c",
        body: ["B\u1EA3ng c\xF4ng th\u1EE9c n\xE0y l\xE0 \u201Cv\u0169 kh\xED\u201D c\u1EE7a to\xE0n b\u1ED9 ch\u01B0\u01A1ng h\xECnh l\u1EDBp 6."],
        formulas: [
          "H\xECnh vu\xF4ng c\u1EA1nh $a$: $C=4a$ ; $S=a^{2}$",
          "H\xECnh ch\u1EEF nh\u1EADt: $C=2(a+b)$ ; $S=ab$",
          "H\xECnh b\xECnh h\xE0nh: $C=2(a+b)$ ; $S=a\\cdot h$ (\u0111\xE1y nh\xE2n chi\u1EC1u cao)",
          "H\xECnh thoi c\u1EA1nh $a$, hai \u0111\u01B0\u1EDDng ch\xE9o $m,n$: $C=4a$ ; $S=\\f{1}{2}mn$",
          "H\xECnh thang: $S=\\f{(a+b)\\cdot h}{2}$",
          "Tam gi\xE1c: $S=\\f{1}{2}a\\cdot h$",
          "L\u1EE5c gi\xE1c \u0111\u1EC1u c\u1EA1nh $a$: $C=6a$ (gh\xE9p t\u1EEB 6 tam gi\xE1c \u0111\u1EC1u c\u1EA1nh $a$)"
        ],
        caution: ["Chi\u1EC1u cao ph\u1EA3i **vu\xF4ng g\xF3c** v\u1EDBi \u0111\xE1y t\u01B0\u01A1ng \u1EE9ng \u2014 nhi\u1EC1u b\u1EA1n l\u1EA5y nh\u1EA7m c\u1EA1nh b\xEAn l\xE0m chi\u1EC1u cao."]
      },
      {
        heading: "2. D\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt nhanh",
        body: [],
        formulas: [
          "H\xECnh vu\xF4ng = h\xECnh ch\u1EEF nh\u1EADt c\xF3 4 c\u1EA1nh b\u1EB1ng nhau = h\xECnh thoi c\xF3 4 g\xF3c vu\xF4ng",
          "H\xECnh thoi: 4 c\u1EA1nh b\u1EB1ng nhau, hai \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c v\xE0 c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m m\u1ED7i \u0111\u01B0\u1EDDng",
          "H\xECnh b\xECnh h\xE0nh: hai c\u1EB7p c\u1EA1nh \u0111\u1ED1i song song v\xE0 b\u1EB1ng nhau, hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m",
          "H\xECnh thang c\xE2n: hai c\u1EA1nh b\xEAn b\u1EB1ng nhau, hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau, hai g\xF3c k\u1EC1 m\u1ED9t \u0111\xE1y b\u1EB1ng nhau"
        ]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 cho hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EE7a m\u1ED9t h\xECnh", action: "Ngh\u0129 ngay t\u1EDBi h\xECnh thoi: $S=\\f{1}{2}mn$.", why: "Ch\u1EC9 h\xECnh thoi (v\xE0 h\xECnh vu\xF4ng) m\u1EDBi c\xF3 c\xF4ng th\u1EE9c di\u1EC7n t\xEDch theo hai \u0111\u01B0\u1EDDng ch\xE9o." },
      { signal: "\u0110\u1EC1 cho \u201Cn\u1EC1n nh\xE0\u201D, \u201Cm\u1EA3nh v\u01B0\u1EDDn\u201D, \u201Cvi\xEAn g\u1EA1ch\u201D", action: "B\xE0i to\xE1n di\u1EC7n t\xEDch; ch\xFA \xFD \u0111\u1ED5i \u0111\u01A1n v\u1ECB v\u1EC1 c\xF9ng m\u1ED9t lo\u1EA1i.", why: "Sai \u0111\u01A1n v\u1ECB l\xE0 l\u1ED7i m\u1EA5t \u0111i\u1EC3m s\u1ED1 1 trong b\xE0i to\xE1n th\u1EF1c t\u1EBF." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Cc\u1EA7n bao nhi\xEAu m\xE9t h\xE0ng r\xE0o\u201D", action: "B\xE0i to\xE1n chu vi, nh\u1EDB tr\u1EEB ph\u1EA7n c\u1ED5ng n\u1EBFu \u0111\u1EC1 c\xF3 n\xF3i.", why: "H\xE0ng r\xE0o ch\u1EA1y quanh m\xE9p \u2192 chu vi." },
      { signal: "H\xECnh ph\u1EE9c t\u1EA1p, gh\xE9p nhi\u1EC1u h\xECnh", action: "Chia nh\u1ECF th\xE0nh h\xECnh c\u01A1 b\u1EA3n ho\u1EB7c l\u1EA5y h\xECnh l\u1EDBn tr\u1EEB h\xECnh kho\xE9t.", why: "Di\u1EC7n t\xEDch c\xF3 t\xEDnh c\u1ED9ng \u2014 m\u1ECDi h\xECnh ph\u1EE9c t\u1EA1p \u0111\u1EC1u quy v\u1EC1 h\xECnh c\u01A1 b\u1EA3n." }
    ],
    mindmap: {
      root: "H\xCCNH H\u1ECCC TR\u1EF0C QUAN L\u1EDAP 6",
      branches: [
        { title: "H\xECnh \u0111\u1EC1u", items: ["Tam gi\xE1c \u0111\u1EC1u", "H\xECnh vu\xF4ng", "L\u1EE5c gi\xE1c \u0111\u1EC1u"] },
        { title: "T\u1EE9 gi\xE1c \u0111\u1EB7c bi\u1EC7t", items: ["H\xECnh ch\u1EEF nh\u1EADt", "H\xECnh thoi", "H\xECnh b\xECnh h\xE0nh", "H\xECnh thang c\xE2n"] },
        { title: "Chu vi", items: ["$C=4a$", "$C=2(a+b)$", "\u0110\u01B0\u1EDDng bao ngo\xE0i"] },
        { title: "Di\u1EC7n t\xEDch", items: ["$S=ab$", "$S=a\\cdot h$", "$S=\\f{1}{2}mn$", "$S=\\f{(a+b)h}{2}$"] },
        { title: "Th\u1EF1c t\u1EBF", items: ["L\xE1t g\u1EA1ch", "S\u01A1n t\u01B0\u1EDDng", "R\xE0o v\u01B0\u1EDDn", "\u0110\u1ED5i \u0111\u01A1n v\u1ECB \u0111o"] }
      ]
    },
    practiceSkills: [
      { title: "K\u1EF9 n\u0103ng chia h\xECnh", detail: ["K\u1EBB th\xEAm \u0111\u01B0\u1EDDng \u0111\u1EC3 t\xE1ch th\xE0nh h\xECnh ch\u1EEF nh\u1EADt + tam gi\xE1c.", "Ho\u1EB7c b\xF9 th\xE0nh h\xECnh l\u1EDBn r\u1ED3i tr\u1EEB ph\u1EA7n th\u1EEBa.", "Ghi r\xF5 s\u1ED1 \u0111o tr\xEAn h\xECnh tr\u01B0\u1EDBc khi t\xEDnh."] },
      { title: "K\u1EF9 n\u0103ng \u0111\u1ED5i \u0111\u01A1n v\u1ECB", detail: ["$1\\,m=100\\,cm$ nh\u01B0ng $1\\,m^{2}=10\\,000\\,cm^{2}$.", "\u0110\u1ED5i h\u1EBFt v\u1EC1 c\xF9ng \u0111\u01A1n v\u1ECB **tr\u01B0\u1EDBc** khi thay v\xE0o c\xF4ng th\u1EE9c."] }
    ],
    types: [
      {
        id: "g6-t6-d1",
        name: "D\u1EA1ng 1. Nh\u1EADn bi\u1EBFt h\xECnh v\xE0 t\xEDnh ch\u1EA5t",
        level: "NB",
        method: ["\u0110\u1ED1i chi\u1EBFu v\u1EDBi d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt.", "Ki\u1EC3m tra l\u1EA7n l\u01B0\u1EE3t: c\u1EA1nh, g\xF3c, \u0111\u01B0\u1EDDng ch\xE9o."],
        worked: [{
          prompt: "H\xECnh thoi $ABCD$ c\xF3 $AC=8\\,cm$, $BD=6\\,cm$. T\xEDnh di\u1EC7n t\xEDch h\xECnh thoi.",
          thinking: ["C\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o \u2192 d\xF9ng c\xF4ng th\u1EE9c $S=\\f{1}{2}mn$."],
          solution: ["$S=\\f{1}{2}\\cdot AC\\cdot BD=\\f{1}{2}\\cdot8\\cdot6=24\\ (cm^{2})$."]
        }]
      },
      {
        id: "g6-t6-d2",
        name: "D\u1EA1ng 2. T\xEDnh chu vi, di\u1EC7n t\xEDch h\xECnh c\u01A1 b\u1EA3n",
        level: "TH",
        method: ["X\xE1c \u0111\u1ECBnh h\xECnh, ghi c\xF4ng th\u1EE9c t\u01B0\u01A1ng \u1EE9ng.", "\u0110\u1ED5i \u0111\u01A1n v\u1ECB (n\u1EBFu c\u1EA7n) r\u1ED3i thay s\u1ED1.", "Ghi \u0111\u1EE7 \u0111\u01A1n v\u1ECB trong k\u1EBFt qu\u1EA3."],
        worked: [{
          prompt: "M\u1ED9t m\u1EA3nh v\u01B0\u1EDDn h\xECnh ch\u1EEF nh\u1EADt c\xF3 chi\u1EC1u d\xE0i $18\\,m$, chi\u1EC1u r\u1ED9ng b\u1EB1ng $\\f{2}{3}$ chi\u1EC1u d\xE0i. T\xEDnh chu vi v\xE0 di\u1EC7n t\xEDch m\u1EA3nh v\u01B0\u1EDDn.",
          thinking: ["T\xECm chi\u1EC1u r\u1ED9ng tr\u01B0\u1EDBc, sau \u0111\xF3 \xE1p c\xF4ng th\u1EE9c."],
          solution: [
            "Chi\u1EC1u r\u1ED9ng: $18\\cdot\\f{2}{3}=12\\ (m)$.",
            "Chu vi: $C=2(18+12)=60\\ (m)$.",
            "Di\u1EC7n t\xEDch: $S=18\\cdot12=216\\ (m^{2})$."
          ]
        }]
      },
      {
        id: "g6-t6-d3",
        name: "D\u1EA1ng 3. B\xE0i to\xE1n th\u1EF1c t\u1EBF gh\xE9p h\xECnh",
        level: "VD",
        method: ["V\u1EBD l\u1EA1i h\xECnh, ghi s\u1ED1 \u0111o.", "Chia ho\u1EB7c b\xF9 h\xECnh.", "T\xEDnh t\u1EEBng ph\u1EA7n r\u1ED3i c\u1ED9ng/tr\u1EEB.", "Tr\u1EA3 l\u1EDDi theo \u0111\xFAng c\xE2u h\u1ECFi (s\u1ED1 vi\xEAn g\u1EA1ch, s\u1ED1 ti\u1EC1n\u2026)."],
        worked: [{
          prompt: "N\u1EC1n m\u1ED9t c\u0103n ph\xF2ng h\xECnh ch\u1EEF nh\u1EADt d\xE0i $6\\,m$, r\u1ED9ng $4{,}5\\,m$. Ng\u01B0\u1EDDi ta l\xE1t b\u1EB1ng g\u1EA1ch h\xECnh vu\xF4ng c\u1EA1nh $30\\,cm$. H\u1ECFi c\u1EA7n bao nhi\xEAu vi\xEAn g\u1EA1ch?",
          thinking: [
            "\u0110\u01A1n v\u1ECB kh\xE1c nhau: ph\xF2ng t\xEDnh b\u1EB1ng m\xE9t, g\u1EA1ch t\xEDnh b\u1EB1ng x\u0103ng-ti-m\xE9t \u2192 ph\u1EA3i \u0111\u1ED5i.",
            "S\u1ED1 vi\xEAn g\u1EA1ch = di\u1EC7n t\xEDch n\u1EC1n : di\u1EC7n t\xEDch m\u1ED9t vi\xEAn."
          ],
          solution: [
            "\u0110\u1ED5i $30\\,cm=0{,}3\\,m$.",
            "Di\u1EC7n t\xEDch n\u1EC1n: $6\\cdot4{,}5=27\\ (m^{2})$.",
            "Di\u1EC7n t\xEDch m\u1ED9t vi\xEAn g\u1EA1ch: $0{,}3\\cdot0{,}3=0{,}09\\ (m^{2})$.",
            "S\u1ED1 vi\xEAn g\u1EA1ch: $27:0{,}09=300$ (vi\xEAn).",
            "V\u1EADy c\u1EA7n **300 vi\xEAn g\u1EA1ch**."
          ],
          remark: "Lu\xF4n \u0111\u1ED5i \u0111\u01A1n v\u1ECB tr\u01B0\u1EDBc khi chia \u2014 \u0111\xE2y l\xE0 b\u1EABy \u0111\u01A1n v\u1ECB kinh \u0111i\u1EC3n c\u1EE7a l\u1EDBp 6."
        }]
      }
    ],
    bank: ["g6.hinh-nhan-biet", "g6.chu-vi-dien-tich", "g6.hinh-thuc-te"]
  },
  {
    id: "g6-t7",
    grade: 6,
    term: "HK2",
    strand: "HINH_HOC",
    order: 7,
    name: "H\xECnh h\u1ECDc ph\u1EB3ng \u2014 \u0110i\u1EC3m, \u0110\u01B0\u1EDDng th\u1EB3ng, \u0110o\u1EA1n th\u1EB3ng, G\xF3c",
    summary: "\u0110i\u1EC3m, \u0111\u01B0\u1EDDng th\u1EB3ng, ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng, tia, \u0111o\u1EA1n th\u1EB3ng, trung \u0111i\u1EC3m, g\xF3c v\xE0 s\u1ED1 \u0111o g\xF3c.",
    outcomes: [
      "Nh\u1EADn bi\u1EBFt \u0111i\u1EC3m thu\u1ED9c/kh\xF4ng thu\u1ED9c \u0111\u01B0\u1EDDng th\u1EB3ng, ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng, \u0111i\u1EC3m n\u1EB1m gi\u1EEFa.",
      "Nh\u1EADn bi\u1EBFt tia, \u0111o\u1EA1n th\u1EB3ng, \u0111\u1ED9 d\xE0i \u0111o\u1EA1n th\u1EB3ng, trung \u0111i\u1EC3m c\u1EE7a \u0111o\u1EA1n th\u1EB3ng.",
      "Nh\u1EADn bi\u1EBFt g\xF3c, \u0111o g\xF3c, ph\xE2n lo\u1EA1i g\xF3c v\xE0 t\xEDnh s\u1ED1 \u0111o g\xF3c."
    ],
    theory: [
      {
        heading: "1. \u0110i\u1EC3m, \u0111\u01B0\u1EDDng th\u1EB3ng, tia, \u0111o\u1EA1n th\u1EB3ng",
        body: [],
        formulas: [
          "Qua hai \u0111i\u1EC3m ph\xE2n bi\u1EC7t c\xF3 **m\u1ED9t v\xE0 ch\u1EC9 m\u1ED9t** \u0111\u01B0\u1EDDng th\u1EB3ng.",
          "N\u1EBFu \u0111i\u1EC3m $M$ n\u1EB1m gi\u1EEFa $A$ v\xE0 $B$ th\xEC $AM+MB=AB$.",
          "Ng\u01B0\u1EE3c l\u1EA1i, n\u1EBFu $AM+MB=AB$ th\xEC $M$ n\u1EB1m gi\u1EEFa $A$ v\xE0 $B$.",
          "$M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $AB$ $\\Leftrightarrow$ $M$ n\u1EB1m gi\u1EEFa $A$, $B$ v\xE0 $MA=MB=\\f{AB}{2}$."
        ],
        caution: ["Hai tia \u0111\u1ED1i nhau ph\u1EA3i **chung g\u1ED1c** v\xE0 t\u1EA1o th\xE0nh m\u1ED9t \u0111\u01B0\u1EDDng th\u1EB3ng."]
      },
      {
        heading: "2. G\xF3c v\xE0 s\u1ED1 \u0111o g\xF3c",
        body: [],
        formulas: [
          "G\xF3c nh\u1ECDn: $0\\deg<\\alpha<90\\deg$ ; G\xF3c vu\xF4ng: $\\alpha=90\\deg$",
          "G\xF3c t\xF9: $90\\deg<\\alpha<180\\deg$ ; G\xF3c b\u1EB9t: $\\alpha=180\\deg$",
          "N\u1EBFu tia $Oy$ n\u1EB1m gi\u1EEFa hai tia $Ox$, $Oz$ th\xEC $\\angle xOy+\\angle yOz=\\angle xOz$."
        ]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 cho $AM+MB=AB$", action: "K\u1EBFt lu\u1EADn $M$ n\u1EB1m gi\u1EEFa $A$ v\xE0 $B$.", why: "\u0110\xE2y l\xE0 d\u1EA5u hi\u1EC7u duy nh\u1EA5t \u0111\u1EC3 ch\u1EE9ng minh \u0111i\u1EC3m n\u1EB1m gi\u1EEFa \u1EDF l\u1EDBp 6." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Cch\u1EE9ng minh $M$ l\xE0 trung \u0111i\u1EC3m\u201D", action: "Ch\u1EE9ng minh \u0111\u1EE7 hai \xFD: $M$ n\u1EB1m gi\u1EEFa v\xE0 $MA=MB$.", why: "Thi\u1EBFu m\u1ED9t \xFD l\xE0 m\u1EA5t n\u1EEDa s\u1ED1 \u0111i\u1EC3m." },
      { signal: "Ba \u0111i\u1EC3m tr\xEAn c\xF9ng m\u1ED9t tia, cho hai \u0111\u1ED9 d\xE0i", action: "So s\xE1nh \u0111\u1ED9 d\xE0i \u0111\u1EC3 x\xE1c \u0111\u1ECBnh \u0111i\u1EC3m n\xE0o n\u1EB1m gi\u1EEFa, r\u1ED3i d\xF9ng h\u1EC7 th\u1EE9c c\u1ED9ng \u0111o\u1EA1n th\u1EB3ng.", why: "Tr\xEAn c\xF9ng m\u1ED9t tia, \u0111i\u1EC3m g\u1EA7n g\u1ED1c h\u01A1n th\xEC n\u1EB1m gi\u1EEFa." },
      { signal: "Tia $Oy$ n\u1EB1m gi\u1EEFa $Ox$ v\xE0 $Oz$", action: "D\xF9ng $\\angle xOy+\\angle yOz=\\angle xOz$.", why: "\u0110\xE2y l\xE0 h\u1EC7 th\u1EE9c c\u1ED9ng g\xF3c, song song v\u1EDBi h\u1EC7 th\u1EE9c c\u1ED9ng \u0111o\u1EA1n th\u1EB3ng." }
    ],
    mindmap: {
      root: "H\xCCNH H\u1ECCC PH\u1EB2NG L\u1EDAP 6",
      branches: [
        { title: "\u0110i\u1EC3m \u2014 \u0110\u01B0\u1EDDng th\u1EB3ng", items: ["$\\in$ / $\\notin$", "Ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng", "\u0110i\u1EC3m n\u1EB1m gi\u1EEFa"] },
        { title: "Tia \u2014 \u0110o\u1EA1n th\u1EB3ng", items: ["Tia, hai tia \u0111\u1ED1i nhau", "\u0110\u1ED9 d\xE0i \u0111o\u1EA1n th\u1EB3ng", "$AM+MB=AB$"] },
        { title: "Trung \u0111i\u1EC3m", items: ["\u0110\u1ECBnh ngh\u0129a 2 \xFD", "$MA=MB=\\f{AB}{2}$", "C\xE1ch v\u1EBD"] },
        { title: "G\xF3c", items: ["\u0110\u1EC9nh, c\u1EA1nh", "\u0110o g\xF3c b\u1EB1ng th\u01B0\u1EDBc \u0111o \u0111\u1ED9", "Nh\u1ECDn \u2013 vu\xF4ng \u2013 t\xF9 \u2013 b\u1EB9t", "C\u1ED9ng g\xF3c"] }
      ]
    },
    types: [
      {
        id: "g6-t7-d1",
        name: "D\u1EA1ng 1. T\xEDnh \u0111\u1ED9 d\xE0i \u0111o\u1EA1n th\u1EB3ng",
        level: "TH",
        method: ["V\u1EBD h\xECnh \u0111\xFAng t\u1EC9 l\u1EC7.", "X\xE1c \u0111\u1ECBnh \u0111i\u1EC3m n\u1EB1m gi\u1EEFa (so s\xE1nh \u0111\u1ED9 d\xE0i tr\xEAn c\xF9ng m\u1ED9t tia).", "\xC1p d\u1EE5ng $AM+MB=AB$."],
        pitfalls: ["Kh\xF4ng l\u1EADp lu\u1EADn \u0111i\u1EC3m n\u1EB1m gi\u1EEFa m\xE0 d\xF9ng lu\xF4n h\u1EC7 th\u1EE9c c\u1ED9ng."],
        worked: [{
          prompt: "Tr\xEAn tia $Ox$ l\u1EA5y hai \u0111i\u1EC3m $A$, $B$ sao cho $OA=3\\,cm$, $OB=7\\,cm$. T\xEDnh $AB$.",
          thinking: ["Hai \u0111i\u1EC3m c\xF9ng thu\u1ED9c tia $Ox$; $OA<OB$ n\xEAn $A$ n\u1EB1m gi\u1EEFa $O$ v\xE0 $B$."],
          solution: [
            "V\xEC $A$, $B$ c\xF9ng thu\u1ED9c tia $Ox$ v\xE0 $OA<OB$ ($3<7$) n\xEAn \u0111i\u1EC3m $A$ n\u1EB1m gi\u1EEFa $O$ v\xE0 $B$.",
            "Do \u0111\xF3 $OA+AB=OB$.",
            "$AB=OB-OA=7-3=4\\ (cm)$."
          ]
        }]
      },
      {
        id: "g6-t7-d2",
        name: "D\u1EA1ng 2. Ch\u1EE9ng minh trung \u0111i\u1EC3m",
        level: "VD",
        method: ["Ch\u1EE9ng minh \u0111i\u1EC3m n\u1EB1m gi\u1EEFa.", "Ch\u1EE9ng minh hai \u0111o\u1EA1n b\u1EB1ng nhau.", "K\u1EBFt lu\u1EADn theo \u0111\u1ECBnh ngh\u0129a."],
        worked: [{
          prompt: "Tr\xEAn tia $Ox$ l\u1EA5y $A$, $B$ v\u1EDBi $OA=4\\,cm$, $OB=8\\,cm$. Ch\u1EE9ng minh $A$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $OB$.",
          thinking: ["C\u1EA7n \u0111\u1EE7 hai \xFD: $A$ n\u1EB1m gi\u1EEFa $O$, $B$ v\xE0 $AO=AB$."],
          solution: [
            "V\xEC $A$, $B$ c\xF9ng thu\u1ED9c tia $Ox$ v\xE0 $OA<OB$ n\xEAn $A$ n\u1EB1m gi\u1EEFa $O$ v\xE0 $B$. (1)",
            "Khi \u0111\xF3 $OA+AB=OB\\Rightarrow AB=8-4=4\\ (cm)$.",
            "Suy ra $OA=AB=4\\,cm$. (2)",
            "T\u1EEB (1) v\xE0 (2), $A$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a \u0111o\u1EA1n th\u1EB3ng $OB$."
          ]
        }]
      },
      {
        id: "g6-t7-d3",
        name: "D\u1EA1ng 3. T\xEDnh s\u1ED1 \u0111o g\xF3c",
        level: "VD",
        method: ["X\xE1c \u0111\u1ECBnh tia n\u1EB1m gi\u1EEFa.", "D\xF9ng h\u1EC7 th\u1EE9c c\u1ED9ng g\xF3c.", "V\u1EDBi tia ph\xE2n gi\xE1c: chia \u0111\xF4i s\u1ED1 \u0111o."],
        worked: [{
          prompt: "Cho $\\angle xOz=110\\deg$, tia $Oy$ n\u1EB1m gi\u1EEFa hai tia $Ox$, $Oz$ v\xE0 $\\angle xOy=45\\deg$. T\xEDnh $\\angle yOz$.",
          thinking: ["Tia $Oy$ n\u1EB1m gi\u1EEFa \u2192 d\xF9ng h\u1EC7 th\u1EE9c c\u1ED9ng g\xF3c."],
          solution: ["V\xEC $Oy$ n\u1EB1m gi\u1EEFa $Ox$ v\xE0 $Oz$ n\xEAn $\\angle xOy+\\angle yOz=\\angle xOz$.", "$\\angle yOz=110\\deg-45\\deg=65\\deg$."]
        }]
      }
    ],
    bank: ["g6.doan-thang", "g6.trung-diem", "g6.goc"]
  },
  {
    id: "g6-t8",
    grade: 6,
    term: "HK2",
    strand: "THONG_KE_XS",
    order: 8,
    name: "Th\u1ED1ng k\xEA v\xE0 X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m",
    summary: "Thu th\u1EADp, ph\xE2n lo\u1EA1i v\xE0 bi\u1EC3u di\u1EC5n d\u1EEF li\u1EC7u b\u1EB1ng b\u1EA3ng, bi\u1EC3u \u0111\u1ED3 tranh, bi\u1EC3u \u0111\u1ED3 c\u1ED9t; x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m.",
    outcomes: [
      "Thu th\u1EADp, ph\xE2n lo\u1EA1i d\u1EEF li\u1EC7u; nh\u1EADn bi\u1EBFt t\xEDnh h\u1EE3p l\xED c\u1EE7a d\u1EEF li\u1EC7u.",
      "\u0110\u1ECDc v\xE0 m\xF4 t\u1EA3 d\u1EEF li\u1EC7u t\u1EEB b\u1EA3ng th\u1ED1ng k\xEA, bi\u1EC3u \u0111\u1ED3 tranh, bi\u1EC3u \u0111\u1ED3 c\u1ED9t, bi\u1EC3u \u0111\u1ED3 c\u1ED9t k\xE9p.",
      "T\xEDnh x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m c\u1EE7a m\u1ED9t s\u1EF1 ki\u1EC7n trong tr\xF2 ch\u01A1i \u0111\u01A1n gi\u1EA3n."
    ],
    theory: [
      {
        heading: "1. Thu th\u1EADp v\xE0 bi\u1EC3u di\u1EC5n d\u1EEF li\u1EC7u",
        body: ["D\u1EEF li\u1EC7u g\u1ED3m hai lo\u1EA1i: d\u1EEF li\u1EC7u **s\u1ED1** (\u0111\u1ECBnh l\u01B0\u1EE3ng) v\xE0 d\u1EEF li\u1EC7u **kh\xF4ng ph\u1EA3i s\u1ED1** (\u0111\u1ECBnh t\xEDnh)."],
        formulas: [
          "B\u1EA3ng th\u1ED1ng k\xEA: c\u1ED9t \u0111\u1ED1i t\u01B0\u1EE3ng \u2014 c\u1ED9t s\u1ED1 li\u1EC7u",
          "Bi\u1EC3u \u0111\u1ED3 tranh: m\u1ED7i bi\u1EC3u t\u01B0\u1EE3ng \u1EE9ng v\u1EDBi m\u1ED9t s\u1ED1 l\u01B0\u1EE3ng c\u1ED1 \u0111\u1ECBnh",
          "Bi\u1EC3u \u0111\u1ED3 c\u1ED9t: chi\u1EC1u cao c\u1ED9t t\u1EC9 l\u1EC7 v\u1EDBi s\u1ED1 li\u1EC7u",
          "Bi\u1EC3u \u0111\u1ED3 c\u1ED9t k\xE9p: so s\xE1nh hai b\u1ED9 d\u1EEF li\u1EC7u tr\xEAn c\xF9ng m\u1ED9t tr\u1EE5c"
        ],
        caution: ["Lu\xF4n \u0111\u1ECDc ch\xFA th\xEDch \u201Cm\u1ED7i bi\u1EC3u t\u01B0\u1EE3ng \u1EE9ng v\u1EDBi \u2026\u201D tr\u01B0\u1EDBc khi t\xEDnh."]
      },
      {
        heading: "2. X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m",
        body: ["X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m ph\u1EA3n \xE1nh k\u1EBFt qu\u1EA3 **\u0111\xE3 quan s\xE1t \u0111\u01B0\u1EE3c**, kh\xE1c v\u1EDBi x\xE1c su\u1EA5t l\xED thuy\u1EBFt."],
        formulas: [
          "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m c\u1EE7a s\u1EF1 ki\u1EC7n $A$ $=\\f{\\text{S\u1ED1 l\u1EA7n A x\u1EA3y ra}}{\\text{T\u1ED5ng s\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n}}$",
          "Gi\xE1 tr\u1ECB lu\xF4n thu\u1ED9c \u0111o\u1EA1n t\u1EEB 0 \u0111\u1EBFn 1."
        ],
        caution: ["S\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n c\xE0ng l\u1EDBn th\xEC x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m c\xE0ng g\u1EA7n x\xE1c su\u1EA5t l\xED thuy\u1EBFt."]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 cho bi\u1EC3u \u0111\u1ED3 tranh", action: "Nh\xE2n s\u1ED1 bi\u1EC3u t\u01B0\u1EE3ng v\u1EDBi gi\xE1 tr\u1ECB quy \u01B0\u1EDBc \u1EDF ch\xFA th\xEDch.", why: "B\u1ECF qua ch\xFA th\xEDch l\xE0 sai to\xE0n b\u1ED9 s\u1ED1 li\u1EC7u." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Cx\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m\u201D", action: "L\u1EA5y s\u1ED1 l\u1EA7n x\u1EA3y ra chia t\u1ED5ng s\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n.", why: "\u0110\xE2y l\xE0 \u0111\u1ECBnh ngh\u0129a tr\u1EF1c ti\u1EBFp, kh\xF4ng c\u1EA7n suy lu\u1EADn th\xEAm." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Cchi\u1EBFm bao nhi\xEAu ph\u1EA7n tr\u0103m\u201D", action: "Chuy\u1EC3n t\u1EC9 s\u1ED1 sang ph\u1EA7n tr\u0103m.", why: "N\u1ED1i chuy\xEAn \u0111\u1EC1 Th\u1ED1ng k\xEA v\u1EDBi chuy\xEAn \u0111\u1EC1 T\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m." }
    ],
    mindmap: {
      root: "TH\u1ED0NG K\xCA & X\xC1C SU\u1EA4T L\u1EDAP 6",
      branches: [
        { title: "D\u1EEF li\u1EC7u", items: ["\u0110\u1ECBnh t\xEDnh / \u0111\u1ECBnh l\u01B0\u1EE3ng", "Thu th\u1EADp", "T\xEDnh h\u1EE3p l\xED c\u1EE7a d\u1EEF li\u1EC7u"] },
        { title: "Bi\u1EC3u di\u1EC5n", items: ["B\u1EA3ng th\u1ED1ng k\xEA", "Bi\u1EC3u \u0111\u1ED3 tranh", "Bi\u1EC3u \u0111\u1ED3 c\u1ED9t", "Bi\u1EC3u \u0111\u1ED3 c\u1ED9t k\xE9p"] },
        { title: "Ph\xE2n t\xEDch", items: ["\u0110\u1ECDc s\u1ED1 li\u1EC7u l\u1EDBn nh\u1EA5t, nh\u1ECF nh\u1EA5t", "So s\xE1nh", "T\xEDnh t\u1ED5ng, trung b\xECnh"] },
        { title: "X\xE1c su\u1EA5t", items: ["S\u1EF1 ki\u1EC7n", "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m", "Tr\xF2 ch\u01A1i tung \u0111\u1ED3ng xu, gieo x\xFAc x\u1EAFc"] }
      ]
    },
    types: [
      {
        id: "g6-t8-d1",
        name: "D\u1EA1ng 1. \u0110\u1ECDc v\xE0 ph\xE2n t\xEDch bi\u1EC3u \u0111\u1ED3",
        level: "NB",
        method: ["\u0110\u1ECDc ti\xEAu \u0111\u1EC1 v\xE0 ch\xFA th\xEDch.", "X\xE1c \u0111\u1ECBnh tr\u1EE5c v\xE0 \u0111\u01A1n v\u1ECB.", "Tr\u1EA3 l\u1EDDi \u0111\xFAng c\xE2u h\u1ECFi, k\xE8m \u0111\u01A1n v\u1ECB."],
        worked: [{
          prompt: "Bi\u1EC3u \u0111\u1ED3 c\u1ED9t cho bi\u1EBFt s\u1ED1 h\u1ECDc sinh y\xEAu th\xEDch c\xE1c m\xF4n th\u1EC3 thao c\u1EE7a l\u1EDBp 6A: B\xF3ng \u0111\xE1 15, C\u1EA7u l\xF4ng 8, B\xF3ng r\u1ED5 10, B\u01A1i 7. M\xF4n n\xE0o \u0111\u01B0\u1EE3c y\xEAu th\xEDch nh\u1EA5t v\xE0 chi\u1EBFm bao nhi\xEAu ph\u1EA7n tr\u0103m s\u1ED1 h\u1ECDc sinh c\u1EA3 l\u1EDBp?",
          thinking: ["T\xECm c\u1ED9t cao nh\u1EA5t, sau \u0111\xF3 t\xEDnh t\u1ED5ng \u0111\u1EC3 l\u1EA5y t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m."],
          solution: [
            "M\xF4n \u0111\u01B0\u1EE3c y\xEAu th\xEDch nh\u1EA5t l\xE0 B\xF3ng \u0111\xE1 (15 h\u1ECDc sinh).",
            "T\u1ED5ng s\u1ED1 h\u1ECDc sinh: $15+8+10+7=40$.",
            "T\u1EC9 l\u1EC7: $\\f{15}{40}\\cdot100\\percent=37{,}5\\percent$."
          ]
        }]
      },
      {
        id: "g6-t8-d2",
        name: "D\u1EA1ng 2. T\xEDnh x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m",
        level: "TH",
        method: ["\u0110\u1EBFm s\u1ED1 l\u1EA7n s\u1EF1 ki\u1EC7n x\u1EA3y ra.", "\u0110\u1EBFm t\u1ED5ng s\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n.", "L\u1EADp t\u1EC9 s\u1ED1 v\xE0 r\xFAt g\u1ECDn."],
        worked: [{
          prompt: "Gieo m\u1ED9t con x\xFAc x\u1EAFc 50 l\u1EA7n, m\u1EB7t 6 ch\u1EA5m xu\u1EA5t hi\u1EC7n 9 l\u1EA7n. T\xEDnh x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m c\u1EE7a s\u1EF1 ki\u1EC7n \u201Cgieo \u0111\u01B0\u1EE3c m\u1EB7t 6 ch\u1EA5m\u201D.",
          thinking: ["\xC1p d\u1EE5ng tr\u1EF1c ti\u1EBFp \u0111\u1ECBnh ngh\u0129a."],
          solution: ["X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m $=\\f{9}{50}=0{,}18=18\\percent$."]
        }]
      }
    ],
    bank: ["g6.thong-ke", "g6.xac-suat"]
  }
];

// src/content/g6/index.ts
var G6_TOPICS = [...G6_TOPICS_A, ...G6_TOPICS_B].sort((a, b) => a.order - b.order);

// src/content/g7/topics.ts
var G7_TOPICS = [
  {
    id: "g7-t1",
    grade: 7,
    term: "HK1",
    strand: "SO_DAI_SO",
    order: 1,
    name: "S\u1ED1 h\u1EEFu t\u1EC9 \u2014 S\u1ED1 th\u1EF1c",
    summary: "T\u1EADp h\u1EE3p $\\Q$ v\xE0 $\\R$, c\xE1c ph\xE9p t\xEDnh, l\u0169y th\u1EEBa, gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i, c\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc v\xE0 l\xE0m tr\xF2n.",
    outcomes: [
      "Nh\u1EADn bi\u1EBFt s\u1ED1 h\u1EEFu t\u1EC9, s\u1ED1 v\xF4 t\u1EC9, s\u1ED1 th\u1EF1c; bi\u1EC3u di\u1EC5n v\xE0 so s\xE1nh tr\xEAn tr\u1EE5c s\u1ED1.",
      "Th\u1EF1c hi\u1EC7n th\xE0nh th\u1EA1o c\xE1c ph\xE9p t\xEDnh v\u1EDBi s\u1ED1 h\u1EEFu t\u1EC9, t\xEDnh h\u1EE3p l\xED.",
      "V\u1EADn d\u1EE5ng c\xE1c quy t\u1EAFc l\u0169y th\u1EEBa v\u1EDBi s\u1ED1 m\u0169 t\u1EF1 nhi\xEAn c\u1EE7a s\u1ED1 h\u1EEFu t\u1EC9.",
      "T\xEDnh c\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc, l\xE0m tr\xF2n v\xE0 \u01B0\u1EDBc l\u01B0\u1EE3ng."
    ],
    theory: [
      {
        heading: "1. T\u1EADp h\u1EE3p s\u1ED1 h\u1EEFu t\u1EC9 v\xE0 s\u1ED1 th\u1EF1c",
        body: ["S\u1ED1 h\u1EEFu t\u1EC9 l\xE0 s\u1ED1 vi\u1EBFt \u0111\u01B0\u1EE3c d\u01B0\u1EDBi d\u1EA1ng $\\f{a}{b}$ v\u1EDBi $a,b\\in\\Z$, $b\\ne0$. S\u1ED1 v\xF4 t\u1EC9 l\xE0 s\u1ED1 th\u1EADp ph\xE2n v\xF4 h\u1EA1n kh\xF4ng tu\u1EA7n ho\xE0n."],
        formulas: [
          "$\\N\\subset\\Z\\subset\\Q\\subset\\R$",
          "S\u1ED1 v\xF4 t\u1EC9: $\\s{2}$, $\\s{3}$, $\\pi$, $1{,}010010001\\dots$",
          "$\\abs{x}=x$ n\u1EBFu $x\\ge0$ ; $\\abs{x}=-x$ n\u1EBFu $x<0$"
        ],
        caution: ["$\\s{9}=3$ (c\u0103n b\u1EADc hai **s\u1ED1 h\u1ECDc** ch\u1EC9 l\u1EA5y gi\xE1 tr\u1ECB kh\xF4ng \xE2m), nh\u01B0ng $x^{2}=9\\Rightarrow x=\\pm3$."]
      },
      {
        heading: "2. L\u0169y th\u1EEBa c\u1EE7a s\u1ED1 h\u1EEFu t\u1EC9",
        body: [],
        formulas: [
          "$x^{m}\\cdot x^{n}=x^{m+n}$ ; $x^{m}:x^{n}=x^{m-n}$ ($x\\ne0$, $m\\ge n$)",
          "$(x^{m})^{n}=x^{mn}$",
          "$(xy)^{n}=x^{n}y^{n}$ ; $\\left(\\f{x}{y}\\right)^{n}=\\f{x^{n}}{y^{n}}$ ($y\\ne0$)",
          "$x^{0}=1$ ($x\\ne0$)"
        ],
        caution: ["$(x^{m})^{n}=x^{mn}$ \u2014 **nh\xE2n** s\u1ED1 m\u0169; c\xF2n $x^{m}\\cdot x^{n}=x^{m+n}$ \u2014 **c\u1ED9ng** s\u1ED1 m\u0169. \u0110\xE2y l\xE0 c\u1EB7p d\u1EC5 nh\u1EA7m nh\u1EA5t."]
      },
      {
        heading: "3. Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i v\xE0 c\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc",
        body: [],
        formulas: [
          "$\\abs{x}\\ge0$ v\u1EDBi m\u1ECDi $x$ ; $\\abs{x}=0\\Leftrightarrow x=0$",
          "$\\abs{x}=a$ ($a>0$) $\\Leftrightarrow x=a$ ho\u1EB7c $x=-a$",
          "$\\s{a}=b\\Leftrightarrow b\\ge0$ v\xE0 $b^{2}=a$ (v\u1EDBi $a\\ge0$)",
          "$\\s{a^{2}}=\\abs{a}$"
        ]
      }
    ],
    decode: [
      { signal: "Bi\u1EC3u th\u1EE9c c\xF3 nhi\u1EC1u ph\xE2n s\u1ED1 c\xF9ng m\u1EABu ho\u1EB7c c\xF3 th\u1EEBa s\u1ED1 chung", action: "Nh\xF3m v\xE0 \u0111\u1EB7t nh\xE2n t\u1EED chung tr\u01B0\u1EDBc khi quy \u0111\u1ED3ng.", why: "Gi\u1EA3m m\u1EABu s\u1ED1 l\u1EDBn, h\u1EA1n ch\u1EBF sai s\u1ED1 h\u1ECDc." },
      { signal: "Xu\u1EA5t hi\u1EC7n $\\abs{A}$ trong ph\u01B0\u01A1ng tr\xECnh", action: "Chia hai tr\u01B0\u1EDDng h\u1EE3p $A\\ge0$ v\xE0 $A<0$, ho\u1EB7c d\xF9ng $\\abs{A}=a\\Rightarrow A=\\pm a$.", why: "Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i lu\xF4n sinh hai nh\xE1nh nghi\u1EC7m." },
      { signal: "T\u1ED5ng c\xE1c bi\u1EC3u th\u1EE9c kh\xF4ng \xE2m b\u1EB1ng 0", action: "Cho t\u1EEBng bi\u1EC3u th\u1EE9c b\u1EB1ng 0.", why: "T\u1ED5ng c\xE1c s\u1ED1 kh\xF4ng \xE2m b\u1EB1ng 0 khi v\xE0 ch\u1EC9 khi m\u1ECDi s\u1ED1 h\u1EA1ng b\u1EB1ng 0 \u2014 k\u1EF9 thu\u1EADt kinh \u0111i\u1EC3n t\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t." },
      { signal: "L\u0169y th\u1EEBa c\xF9ng c\u01A1 s\u1ED1 ho\u1EB7c c\xF9ng s\u1ED1 m\u0169", action: "\u0110\u01B0a v\u1EC1 c\xF9ng c\u01A1 s\u1ED1/s\u1ED1 m\u0169 r\u1ED3i so s\xE1nh ho\u1EB7c r\xFAt g\u1ECDn.", why: "Ch\u1EC9 khi \u0111\u1ED3ng d\u1EA1ng m\u1EDBi so s\xE1nh \u0111\u01B0\u1EE3c tr\u1EF1c ti\u1EBFp." },
      { signal: "Y\xEAu c\u1EA7u t\xECm GTNN c\u1EE7a bi\u1EC3u th\u1EE9c ch\u1EE9a $\\abs{\\ }$ ho\u1EB7c b\xECnh ph\u01B0\u01A1ng", action: "D\xF9ng $\\abs{A}\\ge0$, $A^{2}\\ge0$ \u0111\u1EC3 ch\u1EB7n d\u01B0\u1EDBi, d\u1EA5u b\u1EB1ng khi $A=0$.", why: "Ch\u1EB7n \u2013 ch\u1EC9 ra d\u1EA5u b\u1EB1ng l\xE0 quy tr\xECnh chu\u1EA9n c\u1EE7a b\xE0i c\u1EF1c tr\u1ECB l\u1EDBp 7." }
    ],
    mindmap: {
      root: "S\u1ED0 H\u1EEEU T\u1EC8 \u2014 S\u1ED0 TH\u1EF0C",
      branches: [
        { title: "T\u1EADp h\u1EE3p s\u1ED1", items: ["$\\N\\subset\\Z\\subset\\Q\\subset\\R$", "S\u1ED1 v\xF4 t\u1EC9", "Tr\u1EE5c s\u1ED1 th\u1EF1c", "S\u1ED1 \u0111\u1ED1i, ngh\u1ECBch \u0111\u1EA3o"] },
        { title: "Ph\xE9p t\xEDnh", items: ["C\u1ED9ng, tr\u1EEB, nh\xE2n, chia", "T\xEDnh h\u1EE3p l\xED", "Th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n"] },
        { title: "L\u0169y th\u1EEBa", items: ["$x^{m}x^{n}=x^{m+n}$", "$(x^{m})^{n}=x^{mn}$", "$(xy)^{n}=x^{n}y^{n}$"] },
        { title: "Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i", items: ["\u0110\u1ECBnh ngh\u0129a 2 nh\xE1nh", "$\\abs{x}\\ge0$", "Ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a d\u1EA5u $\\abs{\\ }$"] },
        { title: "C\u0103n b\u1EADc hai", items: ["$\\s{a}\\ge0$", "$\\s{a^{2}}=\\abs{a}$", "L\xE0m tr\xF2n, \u01B0\u1EDBc l\u01B0\u1EE3ng"] }
      ]
    },
    practiceSkills: [
      { title: "K\u1EF9 n\u0103ng t\xEDnh h\u1EE3p l\xED s\u1ED1 h\u1EEFu t\u1EC9", detail: ["Nh\xF3m c\xE1c s\u1ED1 c\xF3 t\u1ED5ng tr\xF2n.", "\u0110\u1EB7t nh\xE2n t\u1EED chung.", "R\xFAt g\u1ECDn tr\u01B0\u1EDBc khi nh\xE2n, kh\xF4ng nh\xE2n bung ra r\u1ED3i m\u1EDBi r\xFAt."] },
      { title: "K\u1EF9 n\u0103ng ch\u1EB7n \u0111\u1EC3 t\xECm c\u1EF1c tr\u1ECB", detail: ["Vi\u1EBFt bi\u1EC3u th\u1EE9c v\u1EC1 d\u1EA1ng $A^{2}+m$ ho\u1EB7c $\\abs{A}+m$.", "Ch\u1EC9 ra $A^{2}\\ge0$ n\xEAn bi\u1EC3u th\u1EE9c $\\ge m$.", "T\xECm \u0111i\u1EC1u ki\u1EC7n d\u1EA5u b\u1EB1ng v\xE0 k\u1EBFt lu\u1EADn."] }
    ],
    types: [
      {
        id: "g7-t1-d1",
        name: "D\u1EA1ng 1. Th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh, t\xEDnh h\u1EE3p l\xED",
        level: "TH",
        method: ["Quan s\xE1t t\xECm nh\xE2n t\u1EED chung / m\u1EABu chung nh\u1ECF.", "Nh\xF3m h\u1EA1ng t\u1EED.", "R\xFAt g\u1ECDn tri\u1EC7t \u0111\u1EC3."],
        worked: [{
          prompt: "T\xEDnh h\u1EE3p l\xED: $A=\\f{5}{7}\\cdot\\f{3}{11}+\\f{5}{7}\\cdot\\f{8}{11}-\\f{5}{7}$.",
          thinking: ["C\u1EA3 ba h\u1EA1ng t\u1EED \u0111\u1EC1u ch\u1EE9a $\\f{5}{7}$."],
          solution: [
            "$A=\\f{5}{7}\\left(\\f{3}{11}+\\f{8}{11}-1\\right)$",
            "$A=\\f{5}{7}(1-1)=\\f{5}{7}\\cdot0=0$."
          ]
        }]
      },
      {
        id: "g7-t1-d2",
        name: "D\u1EA1ng 2. L\u0169y th\u1EEBa \u2014 r\xFAt g\u1ECDn v\xE0 so s\xE1nh",
        level: "TH",
        method: ["\u0110\u01B0a v\u1EC1 c\xF9ng c\u01A1 s\u1ED1 nguy\xEAn t\u1ED1.", "\xC1p d\u1EE5ng c\xF4ng th\u1EE9c l\u0169y th\u1EEBa.", "So s\xE1nh khi \u0111\xE3 \u0111\u1ED3ng d\u1EA1ng."],
        pitfalls: ["Nh\u1EA7m $(x^{m})^{n}$ v\u1EDBi $x^{m}\\cdot x^{n}$."],
        worked: [{
          prompt: "R\xFAt g\u1ECDn $B=\\f{4^{5}\\cdot9^{4}}{2^{10}\\cdot3^{8}}$.",
          thinking: ["\u0110\u01B0a 4 v\xE0 9 v\u1EC1 c\u01A1 s\u1ED1 nguy\xEAn t\u1ED1: $4=2^{2}$, $9=3^{2}$."],
          solution: [
            "$4^{5}=(2^{2})^{5}=2^{10}$; $9^{4}=(3^{2})^{4}=3^{8}$.",
            "$B=\\f{2^{10}\\cdot3^{8}}{2^{10}\\cdot3^{8}}=1$."
          ]
        }]
      },
      {
        id: "g7-t1-d3",
        name: "D\u1EA1ng 3. T\xECm x c\xF3 ch\u1EE9a gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i",
        level: "VD",
        method: ["C\xF4 l\u1EADp $\\abs{A}$ v\u1EC1 m\u1ED9t v\u1EBF.", "Ki\u1EC3m tra v\u1EBF ph\u1EA3i: n\u1EBFu \xE2m th\xEC v\xF4 nghi\u1EC7m.", "Chia hai tr\u01B0\u1EDDng h\u1EE3p $A=a$ v\xE0 $A=-a$."],
        pitfalls: ["Qu\xEAn nh\xE1nh \xE2m.", "Kh\xF4ng ki\u1EC3m tra \u0111i\u1EC1u ki\u1EC7n v\u1EBF ph\u1EA3i kh\xF4ng \xE2m."],
        worked: [{
          prompt: "T\xECm $x$, bi\u1EBFt $3\\abs{2x-1}-5=7$.",
          thinking: ["C\xF4 l\u1EADp d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i tr\u01B0\u1EDBc, sau \u0111\xF3 t\xE1ch hai nh\xE1nh."],
          solution: [
            "$3\\abs{2x-1}=12\\Rightarrow\\abs{2x-1}=4$.",
            "TH1: $2x-1=4\\Rightarrow x=\\f{5}{2}$.",
            "TH2: $2x-1=-4\\Rightarrow x=-\\f{3}{2}$.",
            "V\u1EADy $x\\in\\left\\{\\f{5}{2};-\\f{3}{2}\\right\\}$."
          ]
        }]
      },
      {
        id: "g7-t1-d4",
        name: "D\u1EA1ng 4. V\u1EADn d\u1EE5ng cao \u2014 gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t, nh\u1ECF nh\u1EA5t",
        level: "VDC",
        method: ["\u0110\u01B0a v\u1EC1 d\u1EA1ng ch\u1EE9a $A^{2}$ ho\u1EB7c $\\abs{A}$.", "Ch\u1EB7n: $A^{2}\\ge0$, $\\abs{A}\\ge0$.", "T\xECm d\u1EA5u b\u1EB1ng, k\u1EBFt lu\u1EADn."],
        worked: [{
          prompt: "T\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a $P=\\abs{x-3}+\\abs{x+2}$.",
          thinking: [
            "D\xF9ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c $\\abs{a}+\\abs{b}\\ge\\abs{a+b}$ v\u1EDBi c\xE1ch gh\xE9p kh\xE9o: vi\u1EBFt $\\abs{x+2}=\\abs{-(x+2)}$\u2026 ho\u1EB7c d\xF9ng \xFD ngh\u0129a kho\u1EA3ng c\xE1ch tr\xEAn tr\u1EE5c s\u1ED1.",
            "\xDD ngh\u0129a h\xECnh h\u1ECDc: $P$ l\xE0 t\u1ED5ng kho\u1EA3ng c\xE1ch t\u1EEB $x$ t\u1EDBi hai \u0111i\u1EC3m $3$ v\xE0 $-2$; nh\u1ECF nh\u1EA5t khi $x$ n\u1EB1m gi\u1EEFa."
          ],
          solution: [
            "$P=\\abs{x-3}+\\abs{x+2}=\\abs{3-x}+\\abs{x+2}\\ge\\abs{(3-x)+(x+2)}=5$.",
            "D\u1EA5u \u201C=\u201D x\u1EA3y ra khi $(3-x)$ v\xE0 $(x+2)$ c\xF9ng d\u1EA5u (ho\u1EB7c b\u1EB1ng 0), t\u1EE9c $-2\\le x\\le3$.",
            "V\u1EADy $P_{\\min}=5$ khi $-2\\le x\\le3$."
          ],
          remark: "Nh\u1EDB b\u1EA5t \u0111\u1EB3ng th\u1EE9c $\\abs{a}+\\abs{b}\\ge\\abs{a+b}$ v\xE0 \u0111i\u1EC1u ki\u1EC7n d\u1EA5u b\u1EB1ng \u201Cc\xF9ng d\u1EA5u\u201D \u2014 ch\xECa kho\xE1 c\u1EE7a m\u1ECDi b\xE0i c\u1EF1c tr\u1ECB ch\u1EE9a d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i."
        }]
      }
    ],
    bank: ["g7.so-huu-ti", "g7.luy-thua", "g7.gttd", "g7.can-bac-hai"]
  },
  {
    id: "g7-t2",
    grade: 7,
    term: "HK2",
    strand: "SO_DAI_SO",
    order: 2,
    name: "T\u1EC9 l\u1EC7 th\u1EE9c \u2014 D\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau \u2014 \u0110\u1EA1i l\u01B0\u1EE3ng t\u1EC9 l\u1EC7",
    summary: "T\u1EC9 l\u1EC7 th\u1EE9c, t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau, \u0111\u1EA1i l\u01B0\u1EE3ng t\u1EC9 l\u1EC7 thu\u1EADn v\xE0 t\u1EC9 l\u1EC7 ngh\u1ECBch, b\xE0i to\xE1n chia t\u1EC9 l\u1EC7.",
    outcomes: [
      "Nh\u1EADn bi\u1EBFt t\u1EC9 l\u1EC7 th\u1EE9c, v\u1EADn d\u1EE5ng t\xEDnh ch\u1EA5t c\u1EE7a t\u1EC9 l\u1EC7 th\u1EE9c.",
      "V\u1EADn d\u1EE5ng t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau \u0111\u1EC3 gi\u1EA3i b\xE0i to\xE1n chia ph\u1EA7n.",
      "Nh\u1EADn bi\u1EBFt v\xE0 gi\u1EA3i b\xE0i to\xE1n v\u1EC1 \u0111\u1EA1i l\u01B0\u1EE3ng t\u1EC9 l\u1EC7 thu\u1EADn, t\u1EC9 l\u1EC7 ngh\u1ECBch."
    ],
    theory: [
      {
        heading: "1. T\u1EC9 l\u1EC7 th\u1EE9c v\xE0 t\xEDnh ch\u1EA5t",
        body: [],
        formulas: [
          "$\\f{a}{b}=\\f{c}{d}\\Leftrightarrow ad=bc$ (t\xEDch ch\xE9o)",
          "T\u1EEB $ad=bc$ suy ra \u0111\u01B0\u1EE3c 4 t\u1EC9 l\u1EC7 th\u1EE9c: $\\f{a}{b}=\\f{c}{d}$; $\\f{a}{c}=\\f{b}{d}$; $\\f{d}{b}=\\f{c}{a}$; $\\f{d}{c}=\\f{b}{a}$"
        ]
      },
      {
        heading: "2. T\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau",
        body: ["\u0110\xE2y l\xE0 c\xF4ng c\u1EE5 m\u1EA1nh nh\u1EA5t c\u1EE7a chuy\xEAn \u0111\u1EC1, d\xF9ng \u0111\u1EC3 gi\u1EA3i m\u1ECDi b\xE0i to\xE1n chia ph\u1EA7n."],
        formulas: [
          "$\\f{a}{b}=\\f{c}{d}=\\f{a+c}{b+d}=\\f{a-c}{b-d}$ (v\u1EDBi $b+d\\ne0$, $b-d\\ne0$)",
          "$\\f{a}{b}=\\f{c}{d}=\\f{e}{f}=\\f{a+c+e}{b+d+f}$",
          "C\xF3 h\u1EC7 s\u1ED1: $\\f{a}{b}=\\f{c}{d}=\\f{ma+nc}{mb+nd}$"
        ],
        caution: ["Khi \u0111\u1EC1 cho **t\xEDch** $ab=k$ thay v\xEC t\u1ED5ng, ph\u1EA3i \u0111\u1EB7t $\\f{a}{2}=\\f{b}{3}=t$ r\u1ED3i thay v\xE0o, kh\xF4ng d\xF9ng tr\u1EF1c ti\u1EBFp t\xEDnh ch\u1EA5t c\u1ED9ng."]
      },
      {
        heading: "3. \u0110\u1EA1i l\u01B0\u1EE3ng t\u1EC9 l\u1EC7 thu\u1EADn \u2014 t\u1EC9 l\u1EC7 ngh\u1ECBch",
        body: [],
        formulas: [
          "T\u1EC9 l\u1EC7 thu\u1EADn: $y=kx$ ($k\\ne0$) ; $\\f{y_1}{x_1}=\\f{y_2}{x_2}=k$",
          "T\u1EC9 l\u1EC7 ngh\u1ECBch: $y=\\f{a}{x}$ ($a\\ne0$) ; $x_1y_1=x_2y_2=a$",
          "Chia t\u1EC9 l\u1EC7 thu\u1EADn v\u1EDBi $m;n;p$: $\\f{x}{m}=\\f{y}{n}=\\f{z}{p}$",
          "Chia t\u1EC9 l\u1EC7 ngh\u1ECBch v\u1EDBi $m;n;p$: $mx=ny=pz$, t\u1EE9c $\\f{x}{\\f{1}{m}}=\\f{y}{\\f{1}{n}}=\\f{z}{\\f{1}{p}}$"
        ],
        caution: ["Chia t\u1EC9 l\u1EC7 **ngh\u1ECBch** v\u1EDBi $m;n;p$ ngh\u0129a l\xE0 chia t\u1EC9 l\u1EC7 **thu\u1EADn** v\u1EDBi $\\f{1}{m};\\f{1}{n};\\f{1}{p}$."]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 cho \u201Ct\u1EC9 l\u1EC7 v\u1EDBi 2; 3; 5\u201D v\xE0 t\u1ED5ng", action: "\u0110\u1EB7t $\\f{x}{2}=\\f{y}{3}=\\f{z}{5}$ r\u1ED3i d\xF9ng t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau.", why: "\u0110\xE2y l\xE0 m\xF4 h\xECnh chu\u1EA9n c\u1EE7a b\xE0i to\xE1n chia ph\u1EA7n." },
      { signal: "\u0110\u1EC1 cho t\xEDch $xy$ ho\u1EB7c $x\\cdot y\\cdot z$", action: "\u0110\u1EB7t t\u1EC9 s\u1ED1 chung b\u1EB1ng $t$, bi\u1EC3u di\u1EC5n t\u1EEBng \u1EA9n theo $t$ r\u1ED3i thay v\xE0o t\xEDch.", why: "T\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau ch\u1EC9 \xE1p d\u1EE5ng cho t\u1ED5ng/hi\u1EC7u, kh\xF4ng cho t\xEDch." },
      { signal: "\u201CC\xE0ng nhi\u1EC1u ng\u01B0\u1EDDi, c\xE0ng \xEDt th\u1EDDi gian\u201D", action: "Hai \u0111\u1EA1i l\u01B0\u1EE3ng t\u1EC9 l\u1EC7 ngh\u1ECBch: d\xF9ng $x_1y_1=x_2y_2$.", why: "T\u1ED5ng kh\u1ED1i l\u01B0\u1EE3ng c\xF4ng vi\u1EC7c l\xE0 h\u1EB1ng s\u1ED1." },
      { signal: "\u201CC\xF9ng v\u1EADn t\u1ED1c, qu\xE3ng \u0111\u01B0\u1EDDng t\u1EC9 l\u1EC7 v\u1EDBi th\u1EDDi gian\u201D", action: "T\u1EC9 l\u1EC7 thu\u1EADn: $\\f{s_1}{t_1}=\\f{s_2}{t_2}$.", why: "H\u1EC7 s\u1ED1 t\u1EC9 l\u1EC7 ch\xEDnh l\xE0 v\u1EADn t\u1ED1c." },
      { signal: "\u0110\u1EC1 cho hi\u1EC7u hai \u0111\u1EA1i l\u01B0\u1EE3ng", action: "D\xF9ng $\\f{a-c}{b-d}$ thay cho $\\f{a+c}{b+d}$.", why: "T\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau \u0111\xFAng cho c\u1EA3 hi\u1EC7u." }
    ],
    mindmap: {
      root: "T\u1EC8 L\u1EC6 TH\u1EE8C \u2014 \u0110\u1EA0I L\u01AF\u1EE2NG T\u1EC8 L\u1EC6",
      branches: [
        { title: "T\u1EC9 l\u1EC7 th\u1EE9c", items: ["$\\f{a}{b}=\\f{c}{d}$", "T\xEDch ch\xE9o $ad=bc$", "B\u1ED1n t\u1EC9 l\u1EC7 th\u1EE9c t\u1EEB m\u1ED9t \u0111\u1EB3ng th\u1EE9c"] },
        { title: "D\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau", items: ["C\u1ED9ng t\u1EED, c\u1ED9ng m\u1EABu", "Tr\u1EEB t\u1EED, tr\u1EEB m\u1EABu", "Nh\xE2n h\u1EC7 s\u1ED1 $\\f{ma+nc}{mb+nd}$"] },
        { title: "T\u1EC9 l\u1EC7 thu\u1EADn", items: ["$y=kx$", "Chia t\u1EC9 l\u1EC7 thu\u1EADn", "B\xE0i to\xE1n n\u0103ng su\u1EA5t"] },
        { title: "T\u1EC9 l\u1EC7 ngh\u1ECBch", items: ["$y=\\f{a}{x}$", "$x_1y_1=x_2y_2$", "B\xE0i to\xE1n ng\u01B0\u1EDDi \u2013 vi\u1EC7c \u2013 th\u1EDDi gian"] },
        { title: "\u1EE8ng d\u1EE5ng", items: ["Chia l\u1EE3i nhu\u1EADn", "Chia ph\u1EA7n th\u01B0\u1EDFng", "B\xE0i to\xE1n chuy\u1EC3n \u0111\u1ED9ng"] }
      ]
    },
    practiceSkills: [
      { title: "K\u1EF9 n\u0103ng \u0111\u1EB7t \u1EA9n v\xE0 d\u1EF1ng d\xE3y t\u1EC9 s\u1ED1", detail: ["G\u1ECDi \u1EA9n k\xE8m \u0111\u01A1n v\u1ECB v\xE0 \u0111i\u1EC1u ki\u1EC7n.", "D\u1ECBch \u201Ct\u1EC9 l\u1EC7 v\u1EDBi\u201D th\xE0nh d\xE3y t\u1EC9 s\u1ED1.", "D\u1ECBch d\u1EEF ki\u1EC7n c\xF2n l\u1EA1i th\xE0nh t\u1ED5ng/hi\u1EC7u.", "\xC1p t\xEDnh ch\u1EA5t, t\xEDnh t\u1EEBng \u1EA9n, \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n."] },
      { title: "K\u1EF9 n\u0103ng ph\xE2n bi\u1EC7t thu\u1EADn \u2013 ngh\u1ECBch", detail: ["H\u1ECFi: \u0111\u1EA1i l\u01B0\u1EE3ng n\xE0y t\u0103ng th\xEC \u0111\u1EA1i l\u01B0\u1EE3ng kia t\u0103ng hay gi\u1EA3m?", "T\u0103ng c\xF9ng chi\u1EC1u \u2192 thu\u1EADn; ng\u01B0\u1EE3c chi\u1EC1u \u2192 ngh\u1ECBch.", "Ki\u1EC3m tra b\u1EB1ng c\xE1ch th\u1EED m\u1ED9t c\u1EB7p gi\xE1 tr\u1ECB."] }
    ],
    types: [
      {
        id: "g7-t2-d1",
        name: "D\u1EA1ng 1. T\xECm x, y t\u1EEB t\u1EC9 l\u1EC7 th\u1EE9c",
        level: "TH",
        method: ["D\xF9ng t\xEDch ch\xE9o ho\u1EB7c d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau.", "Thay ng\u01B0\u1EE3c \u0111\u1EC3 ki\u1EC3m tra."],
        worked: [{
          prompt: "T\xECm $x,y$ bi\u1EBFt $\\f{x}{3}=\\f{y}{5}$ v\xE0 $x+y=32$.",
          thinking: ["C\xF3 t\u1ED5ng \u2192 d\xF9ng ngay t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau."],
          solution: [
            "$\\f{x}{3}=\\f{y}{5}=\\f{x+y}{3+5}=\\f{32}{8}=4$.",
            "$x=3\\cdot4=12$; $y=5\\cdot4=20$."
          ]
        }]
      },
      {
        id: "g7-t2-d2",
        name: "D\u1EA1ng 2. B\xE0i to\xE1n chia t\u1EC9 l\u1EC7 th\u1EF1c t\u1EBF",
        level: "VD",
        method: ["G\u1ECDi \u1EA9n k\xE8m \u0111\u01A1n v\u1ECB, \u0111i\u1EC1u ki\u1EC7n.", "L\u1EADp d\xE3y t\u1EC9 s\u1ED1 theo d\u1EEF ki\u1EC7n \u201Ct\u1EC9 l\u1EC7 v\u1EDBi\u201D.", "D\xF9ng t\u1ED5ng/hi\u1EC7u \u0111\u1EC3 t\xECm gi\xE1 tr\u1ECB chung.", "K\u1EBFt lu\u1EADn \u0111\u1EA7y \u0111\u1EE7."],
        worked: [{
          prompt: "Ba l\u1EDBp 7A, 7B, 7C tr\u1ED3ng c\xE2y, s\u1ED1 c\xE2y t\u1EC9 l\u1EC7 v\u1EDBi 4; 5; 6. Bi\u1EBFt l\u1EDBp 7C tr\u1ED3ng nhi\u1EC1u h\u01A1n l\u1EDBp 7A l\xE0 18 c\xE2y. T\xEDnh s\u1ED1 c\xE2y m\u1ED7i l\u1EDBp tr\u1ED3ng.",
          thinking: ["C\xF3 hi\u1EC7u (7C h\u01A1n 7A) \u2192 d\xF9ng t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau v\u1EDBi ph\xE9p tr\u1EEB."],
          solution: [
            "G\u1ECDi s\u1ED1 c\xE2y ba l\u1EDBp l\u1EA7n l\u01B0\u1EE3t l\xE0 $a,b,c$ ($a,b,c\\in\\Nstar$).",
            "Theo \u0111\u1EC1: $\\f{a}{4}=\\f{b}{5}=\\f{c}{6}$ v\xE0 $c-a=18$.",
            "$\\f{a}{4}=\\f{b}{5}=\\f{c}{6}=\\f{c-a}{6-4}=\\f{18}{2}=9$.",
            "$a=36$; $b=45$; $c=54$.",
            "V\u1EADy ba l\u1EDBp tr\u1ED3ng l\u1EA7n l\u01B0\u1EE3t 36, 45 v\xE0 54 c\xE2y."
          ]
        }]
      },
      {
        id: "g7-t2-d3",
        name: "D\u1EA1ng 3. B\xE0i to\xE1n t\u1EC9 l\u1EC7 ngh\u1ECBch",
        level: "VD",
        method: ["X\xE1c \u0111\u1ECBnh t\xEDch kh\xF4ng \u0111\u1ED5i.", "L\u1EADp ph\u01B0\u01A1ng tr\xECnh $x_1y_1=x_2y_2$.", "V\u1EDBi chia t\u1EC9 l\u1EC7 ngh\u1ECBch: chuy\u1EC3n th\xE0nh chia t\u1EC9 l\u1EC7 thu\u1EADn v\u1EDBi ngh\u1ECBch \u0111\u1EA3o."],
        worked: [{
          prompt: "Ba \u0111\u1ED9i m\xE1y c\xE0y c\xF9ng c\xE0y xong ba c\xE1nh \u0111\u1ED3ng c\xF3 di\u1EC7n t\xEDch b\u1EB1ng nhau. \u0110\u1ED9i m\u1ED9t ho\xE0n th\xE0nh trong 4 ng\xE0y, \u0111\u1ED9i hai trong 6 ng\xE0y, \u0111\u1ED9i ba trong 8 ng\xE0y. Bi\u1EBFt \u0111\u1ED9i m\u1ED9t c\xF3 nhi\u1EC1u h\u01A1n \u0111\u1ED9i hai 2 m\xE1y v\xE0 n\u0103ng su\u1EA5t m\u1ED7i m\xE1y nh\u01B0 nhau. T\xEDnh s\u1ED1 m\xE1y m\u1ED7i \u0111\u1ED9i.",
          thinking: [
            "C\xF9ng kh\u1ED1i l\u01B0\u1EE3ng c\xF4ng vi\u1EC7c \u2192 s\u1ED1 m\xE1y v\xE0 s\u1ED1 ng\xE0y t\u1EC9 l\u1EC7 **ngh\u1ECBch**.",
            "V\u1EADy s\u1ED1 m\xE1y t\u1EC9 l\u1EC7 thu\u1EADn v\u1EDBi $\\f{1}{4};\\f{1}{6};\\f{1}{8}$."
          ],
          solution: [
            "G\u1ECDi s\u1ED1 m\xE1y ba \u0111\u1ED9i l\xE0 $x,y,z$ ($x,y,z\\in\\Nstar$).",
            "V\xEC c\xF9ng di\u1EC7n t\xEDch, s\u1ED1 m\xE1y t\u1EC9 l\u1EC7 ngh\u1ECBch v\u1EDBi s\u1ED1 ng\xE0y: $4x=6y=8z$.",
            "Suy ra $\\f{x}{\\f{1}{4}}=\\f{y}{\\f{1}{6}}=\\f{z}{\\f{1}{8}}$ v\xE0 $x-y=2$.",
            "$\\f{x}{\\f{1}{4}}=\\f{y}{\\f{1}{6}}=\\f{x-y}{\\f{1}{4}-\\f{1}{6}}=\\f{2}{\\f{1}{12}}=24$.",
            "$x=24\\cdot\\f{1}{4}=6$; $y=24\\cdot\\f{1}{6}=4$; $z=24\\cdot\\f{1}{8}=3$.",
            "V\u1EADy ba \u0111\u1ED9i c\xF3 l\u1EA7n l\u01B0\u1EE3t 6, 4 v\xE0 3 m\xE1y."
          ],
          remark: "Quy t\u1EAFc v\xE0ng: \u201Ct\u1EC9 l\u1EC7 ngh\u1ECBch v\u1EDBi $m;n;p$\u201D = \u201Ct\u1EC9 l\u1EC7 thu\u1EADn v\u1EDBi $\\f{1}{m};\\f{1}{n};\\f{1}{p}$\u201D."
        }]
      },
      {
        id: "g7-t2-d4",
        name: "D\u1EA1ng 4. V\u1EADn d\u1EE5ng cao \u2014 d\xE3y t\u1EC9 s\u1ED1 k\xE8m t\xEDch",
        level: "VDC",
        method: ["\u0110\u1EB7t t\u1EC9 s\u1ED1 chung b\u1EB1ng $t$.", "Bi\u1EC3u di\u1EC5n c\xE1c \u1EA9n theo $t$.", "Thay v\xE0o \u0111i\u1EC1u ki\u1EC7n t\xEDch, gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh theo $t$.", "X\xE9t \u0111\u1EE7 hai gi\xE1 tr\u1ECB $t$ khi b\u1EADc ch\u1EB5n."],
        worked: [{
          prompt: "T\xECm $x,y$ bi\u1EBFt $\\f{x}{2}=\\f{y}{5}$ v\xE0 $xy=90$.",
          thinking: ["\u0110i\u1EC1u ki\u1EC7n l\xE0 **t\xEDch**, kh\xF4ng d\xF9ng \u0111\u01B0\u1EE3c t\xEDnh ch\u1EA5t c\u1ED9ng \u2192 \u0111\u1EB7t tham s\u1ED1 $t$."],
          solution: [
            "\u0110\u1EB7t $\\f{x}{2}=\\f{y}{5}=t\\Rightarrow x=2t$, $y=5t$.",
            "$xy=2t\\cdot5t=10t^{2}=90\\Rightarrow t^{2}=9\\Rightarrow t=\\pm3$.",
            "V\u1EDBi $t=3$: $x=6$, $y=15$. V\u1EDBi $t=-3$: $x=-6$, $y=-15$.",
            "V\u1EADy $(x;y)\\in\\{(6;15);(-6;-15)\\}$."
          ],
          remark: "R\u1EA5t nhi\u1EC1u b\u1EA1n qu\xEAn nghi\u1EC7m \xE2m \u2014 m\u1EA5t m\u1ED9t n\u1EEDa s\u1ED1 \u0111i\u1EC3m \u1EDF c\xE2u n\xE0y."
        }]
      }
    ],
    bank: ["g7.ti-le-thuc", "g7.day-ti-so", "g7.ti-le-thuan", "g7.ti-le-nghich"]
  },
  {
    id: "g7-t3",
    grade: 7,
    term: "HK2",
    strand: "SO_DAI_SO",
    order: 3,
    name: "Bi\u1EC3u th\u1EE9c \u0111\u1EA1i s\u1ED1 v\xE0 \u0110a th\u1EE9c m\u1ED9t bi\u1EBFn",
    summary: "Bi\u1EC3u th\u1EE9c \u0111\u1EA1i s\u1ED1, \u0111\u01A1n th\u1EE9c, \u0111a th\u1EE9c m\u1ED9t bi\u1EBFn, c\u1ED9ng tr\u1EEB nh\xE2n chia \u0111a th\u1EE9c, nghi\u1EC7m c\u1EE7a \u0111a th\u1EE9c.",
    outcomes: [
      "T\xEDnh gi\xE1 tr\u1ECB bi\u1EC3u th\u1EE9c \u0111\u1EA1i s\u1ED1 t\u1EA1i gi\xE1 tr\u1ECB cho tr\u01B0\u1EDBc c\u1EE7a bi\u1EBFn.",
      "Thu g\u1ECDn, s\u1EAFp x\u1EBFp, x\xE1c \u0111\u1ECBnh b\u1EADc, h\u1EC7 s\u1ED1 c\u1EE7a \u0111a th\u1EE9c m\u1ED9t bi\u1EBFn.",
      "C\u1ED9ng, tr\u1EEB, nh\xE2n, chia \u0111a th\u1EE9c m\u1ED9t bi\u1EBFn.",
      "X\xE1c \u0111\u1ECBnh nghi\u1EC7m c\u1EE7a \u0111a th\u1EE9c m\u1ED9t bi\u1EBFn."
    ],
    theory: [
      {
        heading: "1. \u0110a th\u1EE9c m\u1ED9t bi\u1EBFn",
        body: ["\u0110a th\u1EE9c m\u1ED9t bi\u1EBFn l\xE0 t\u1ED5ng c\u1EE7a nh\u1EEFng \u0111\u01A1n th\u1EE9c c\xF9ng m\u1ED9t bi\u1EBFn."],
        formulas: [
          "D\u1EA1ng thu g\u1ECDn: $P(x)=a_nx^{n}+a_{n-1}x^{n-1}+\\dots+a_1x+a_0$ v\u1EDBi $a_n\\ne0$",
          "B\u1EADc c\u1EE7a $P(x)$ l\xE0 $n$ ; $a_n$ l\xE0 h\u1EC7 s\u1ED1 cao nh\u1EA5t ; $a_0$ l\xE0 h\u1EC7 s\u1ED1 t\u1EF1 do"
        ],
        caution: ["Ph\u1EA3i **thu g\u1ECDn** tr\u01B0\u1EDBc khi x\xE1c \u0111\u1ECBnh b\u1EADc.", "\u0110a th\u1EE9c 0 kh\xF4ng c\xF3 b\u1EADc."]
      },
      {
        heading: "2. Ph\xE9p t\xEDnh v\u1EDBi \u0111a th\u1EE9c m\u1ED9t bi\u1EBFn",
        body: [],
        formulas: [
          "C\u1ED9ng/tr\u1EEB: c\u1ED9ng tr\u1EEB c\xE1c h\u1EC7 s\u1ED1 c\u1EE7a nh\u1EEFng h\u1EA1ng t\u1EED **\u0111\u1ED3ng d\u1EA1ng**.",
          "Nh\xE2n: nh\xE2n t\u1EEBng h\u1EA1ng t\u1EED r\u1ED3i thu g\u1ECDn; $ax^{m}\\cdot bx^{n}=abx^{m+n}$",
          "Chia h\u1EBFt: $A(x)=B(x)\\cdot Q(x)$",
          "Chia c\xF3 d\u01B0: $A(x)=B(x)\\cdot Q(x)+R(x)$ v\u1EDBi b\u1EADc $R<$ b\u1EADc $B$"
        ]
      },
      {
        heading: "3. Nghi\u1EC7m c\u1EE7a \u0111a th\u1EE9c",
        body: [],
        formulas: [
          "$x=a$ l\xE0 nghi\u1EC7m c\u1EE7a $P(x)$ $\\Leftrightarrow P(a)=0$",
          "\u0110a th\u1EE9c b\u1EADc $n$ c\xF3 **kh\xF4ng qu\xE1** $n$ nghi\u1EC7m.",
          "N\u1EBFu $P(x)$ chia h\u1EBFt cho $(x-a)$ th\xEC $x=a$ l\xE0 nghi\u1EC7m c\u1EE7a $P(x)$ (v\xE0 ng\u01B0\u1EE3c l\u1EA1i)."
        ]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Ct\xECm nghi\u1EC7m c\u1EE7a \u0111a th\u1EE9c\u201D", action: "Cho $P(x)=0$ r\u1ED3i gi\u1EA3i; n\u1EBFu b\u1EADc cao th\xEC ph\xE2n t\xEDch th\xE0nh nh\xE2n t\u1EED.", why: "Nghi\u1EC7m l\xE0 gi\xE1 tr\u1ECB l\xE0m \u0111a th\u1EE9c tri\u1EC7t ti\xEAu." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Ct\xECm $m$ \u0111\u1EC3 $x=2$ l\xE0 nghi\u1EC7m\u201D", action: "Thay $x=2$ v\xE0o, cho bi\u1EC3u th\u1EE9c b\u1EB1ng 0, gi\u1EA3i theo $m$.", why: "\u0110i\u1EC1u ki\u1EC7n nghi\u1EC7m bi\u1EBFn b\xE0i to\xE1n v\u1EC1 ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t theo tham s\u1ED1." },
      { signal: "\u0110\u1EC1 y\xEAu c\u1EA7u \u201Ct\xEDnh $P(x)+Q(x)$\u201D", action: "S\u1EAFp x\u1EBFp c\xF9ng th\u1EE9 t\u1EF1 gi\u1EA3m d\u1EA7n c\u1EE7a b\u1EADc r\u1ED3i c\u1ED9ng theo c\u1ED9t.", why: "C\u1ED9ng theo c\u1ED9t h\u1EA1n ch\u1EBF s\xF3t h\u1EA1ng t\u1EED." },
      { signal: "\u0110\u1EC1 n\xF3i \u201C$A(x)$ chia h\u1EBFt cho $x-a$\u201D", action: "D\xF9ng $A(a)=0$ thay v\xEC th\u1EF1c hi\u1EC7n ph\xE9p chia.", why: "\u0110\u1ECBnh l\xED B\xE9zout r\xFAt ng\u1EAFn b\xE0i to\xE1n r\u1EA5t nhi\u1EC1u." }
    ],
    mindmap: {
      root: "BI\u1EC2U TH\u1EE8C \u0110\u1EA0I S\u1ED0 \u2014 \u0110A TH\u1EE8C M\u1ED8T BI\u1EBEN",
      branches: [
        { title: "Bi\u1EC3u th\u1EE9c", items: ["Gi\xE1 tr\u1ECB c\u1EE7a bi\u1EC3u th\u1EE9c", "\u0110\u01A1n th\u1EE9c, h\u1EC7 s\u1ED1, b\u1EADc", "\u0110\u01A1n th\u1EE9c \u0111\u1ED3ng d\u1EA1ng"] },
        { title: "\u0110a th\u1EE9c", items: ["Thu g\u1ECDn", "S\u1EAFp x\u1EBFp", "B\u1EADc, h\u1EC7 s\u1ED1 cao nh\u1EA5t, h\u1EC7 s\u1ED1 t\u1EF1 do"] },
        { title: "Ph\xE9p t\xEDnh", items: ["C\u1ED9ng, tr\u1EEB theo c\u1ED9t", "Nh\xE2n", "Chia h\u1EBFt, chia c\xF3 d\u01B0"] },
        { title: "Nghi\u1EC7m", items: ["$P(a)=0$", "S\u1ED1 nghi\u1EC7m t\u1ED1i \u0111a", "T\xECm tham s\u1ED1 $m$"] }
      ]
    },
    types: [
      {
        id: "g7-t3-d1",
        name: "D\u1EA1ng 1. Thu g\u1ECDn, s\u1EAFp x\u1EBFp, x\xE1c \u0111\u1ECBnh b\u1EADc",
        level: "NB",
        method: ["C\u1ED9ng c\xE1c h\u1EA1ng t\u1EED \u0111\u1ED3ng d\u1EA1ng.", "S\u1EAFp x\u1EBFp theo l\u0169y th\u1EEBa gi\u1EA3m d\u1EA7n.", "\u0110\u1ECDc b\u1EADc, h\u1EC7 s\u1ED1."],
        worked: [{
          prompt: "Thu g\u1ECDn v\xE0 s\u1EAFp x\u1EBFp $P(x)=3x^{2}-5x+7x^{2}+2-4x^{3}+x$.",
          thinking: ["Gom c\xE1c h\u1EA1ng t\u1EED c\xF9ng b\u1EADc."],
          solution: [
            "$P(x)=-4x^{3}+(3x^{2}+7x^{2})+(-5x+x)+2$",
            "$P(x)=-4x^{3}+10x^{2}-4x+2$.",
            "B\u1EADc 3; h\u1EC7 s\u1ED1 cao nh\u1EA5t $-4$; h\u1EC7 s\u1ED1 t\u1EF1 do $2$."
          ]
        }]
      },
      {
        id: "g7-t3-d2",
        name: "D\u1EA1ng 2. C\u1ED9ng, tr\u1EEB, nh\xE2n \u0111a th\u1EE9c",
        level: "TH",
        method: ["S\u1EAFp x\u1EBFp c\xF9ng th\u1EE9 t\u1EF1.", "\u0110\u1EB7t ph\xE9p t\xEDnh theo c\u1ED9t.", "Thu g\u1ECDn k\u1EBFt qu\u1EA3."],
        worked: [{
          prompt: "Cho $P(x)=2x^{3}-x+5$, $Q(x)=x^{3}+3x^{2}-4$. T\xEDnh $P(x)-Q(x)$.",
          thinking: ["Tr\u1EEB t\u1EE9c l\xE0 \u0111\u1ED5i d\u1EA5u to\xE0n b\u1ED9 $Q(x)$ r\u1ED3i c\u1ED9ng."],
          solution: [
            "$P(x)-Q(x)=(2x^{3}-x+5)-(x^{3}+3x^{2}-4)$",
            "$=2x^{3}-x+5-x^{3}-3x^{2}+4$",
            "$=x^{3}-3x^{2}-x+9$."
          ]
        }]
      },
      {
        id: "g7-t3-d3",
        name: "D\u1EA1ng 3. Nghi\u1EC7m c\u1EE7a \u0111a th\u1EE9c, t\xECm tham s\u1ED1",
        level: "VD",
        method: ["Cho $P(x)=0$.", "Ph\xE2n t\xEDch th\xE0nh nh\xE2n t\u1EED n\u1EBFu b\u1EADc $\\ge2$.", "V\u1EDBi tham s\u1ED1: thay nghi\u1EC7m \u0111\xE3 cho v\xE0o r\u1ED3i gi\u1EA3i."],
        worked: [{
          prompt: "T\xECm $m$ \u0111\u1EC3 \u0111a th\u1EE9c $P(x)=x^{2}-(m+1)x+6$ nh\u1EADn $x=2$ l\xE0m nghi\u1EC7m.",
          thinking: ["$x=2$ l\xE0 nghi\u1EC7m ngh\u0129a l\xE0 $P(2)=0$."],
          solution: [
            "$P(2)=4-2(m+1)+6=0$",
            "$4-2m-2+6=0\\Rightarrow 8-2m=0\\Rightarrow m=4$.",
            "V\u1EADy $m=4$."
          ]
        }]
      },
      {
        id: "g7-t3-d4",
        name: "D\u1EA1ng 4. V\u1EADn d\u1EE5ng cao \u2014 x\xE1c \u0111\u1ECBnh \u0111a th\u1EE9c, chia c\xF3 d\u01B0",
        level: "VDC",
        method: ["D\xF9ng $A(a)=0$ v\u1EDBi \u0111i\u1EC1u ki\u1EC7n chia h\u1EBFt.", "V\u1EDBi chia d\u01B0 $r$: $A(a)=r$.", "L\u1EADp h\u1EC7 theo c\xE1c tham s\u1ED1."],
        worked: [{
          prompt: "T\xECm $a,b$ \u0111\u1EC3 \u0111a th\u1EE9c $P(x)=x^{3}+ax^{2}+bx-6$ chia h\u1EBFt cho c\u1EA3 $(x-1)$ v\xE0 $(x-2)$.",
          thinking: ["Chia h\u1EBFt cho $(x-1)$ v\xE0 $(x-2)$ ngh\u0129a l\xE0 $P(1)=0$ v\xE0 $P(2)=0$ \u2192 h\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh."],
          solution: [
            "$P(1)=1+a+b-6=0\\Rightarrow a+b=5$. (1)",
            "$P(2)=8+4a+2b-6=0\\Rightarrow 4a+2b=-2\\Rightarrow 2a+b=-1$. (2)",
            "L\u1EA5y (2) tr\u1EEB (1): $a=-6$; thay l\u1EA1i (1): $b=11$.",
            "V\u1EADy $a=-6$, $b=11$."
          ]
        }]
      }
    ],
    bank: ["g7.da-thuc-thugon", "g7.da-thuc-tinh", "g7.nghiem-da-thuc"]
  },
  {
    id: "g7-t4",
    grade: 7,
    term: "HK1",
    strand: "HINH_HOC",
    order: 4,
    name: "G\xF3c v\xE0 \u0110\u01B0\u1EDDng th\u1EB3ng song song",
    summary: "Hai g\xF3c k\u1EC1 b\xF9, hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh, tia ph\xE2n gi\xE1c, hai \u0111\u01B0\u1EDDng th\u1EB3ng song song, ti\xEAn \u0111\u1EC1 Euclid, \u0111\u1ECBnh l\xED.",
    outcomes: [
      "Nh\u1EADn bi\u1EBFt hai g\xF3c k\u1EC1 b\xF9, hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh v\xE0 t\xEDnh ch\u1EA5t c\u1EE7a ch\xFAng.",
      "Nh\u1EADn bi\u1EBFt d\u1EA5u hi\u1EC7u hai \u0111\u01B0\u1EDDng th\u1EB3ng song song v\xE0 t\xEDnh ch\u1EA5t c\u1EE7a hai \u0111\u01B0\u1EDDng th\u1EB3ng song song.",
      "V\u1EADn d\u1EE5ng ti\xEAn \u0111\u1EC1 Euclid; hi\u1EC3u c\u1EA5u tr\xFAc gi\u1EA3 thi\u1EBFt \u2013 k\u1EBFt lu\u1EADn c\u1EE7a m\u1ED9t \u0111\u1ECBnh l\xED."
    ],
    theory: [
      {
        heading: "1. C\xE1c c\u1EB7p g\xF3c c\u01A1 b\u1EA3n",
        body: [],
        formulas: [
          "Hai g\xF3c k\u1EC1 b\xF9: c\xF3 t\u1ED5ng b\u1EB1ng $180\\deg$",
          "Hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh th\xEC **b\u1EB1ng nhau**",
          "Tia ph\xE2n gi\xE1c chia g\xF3c th\xE0nh hai g\xF3c b\u1EB1ng nhau, m\u1ED7i g\xF3c b\u1EB1ng n\u1EEDa g\xF3c \u0111\xE3 cho"
        ]
      },
      {
        heading: "2. D\u1EA5u hi\u1EC7u v\xE0 t\xEDnh ch\u1EA5t hai \u0111\u01B0\u1EDDng th\u1EB3ng song song",
        body: ["V\u1EDBi hai \u0111\u01B0\u1EDDng th\u1EB3ng b\u1ECB c\u1EAFt b\u1EDFi m\u1ED9t c\xE1t tuy\u1EBFn:"],
        formulas: [
          "**D\u1EA5u hi\u1EC7u** (ch\u1EE9ng minh song song): c\xF3 m\u1ED9t c\u1EB7p g\xF3c so le trong b\u1EB1ng nhau, ho\u1EB7c m\u1ED9t c\u1EB7p g\xF3c \u0111\u1ED3ng v\u1ECB b\u1EB1ng nhau, ho\u1EB7c m\u1ED9t c\u1EB7p g\xF3c trong c\xF9ng ph\xEDa b\xF9 nhau.",
          "**T\xEDnh ch\u1EA5t** (\u0111\xE3 c\xF3 song song, suy ra g\xF3c): hai g\xF3c so le trong b\u1EB1ng nhau; hai g\xF3c \u0111\u1ED3ng v\u1ECB b\u1EB1ng nhau; hai g\xF3c trong c\xF9ng ph\xEDa b\xF9 nhau.",
          "Ti\xEAn \u0111\u1EC1 Euclid: qua m\u1ED9t \u0111i\u1EC3m \u1EDF ngo\xE0i m\u1ED9t \u0111\u01B0\u1EDDng th\u1EB3ng, c\xF3 **duy nh\u1EA5t** m\u1ED9t \u0111\u01B0\u1EDDng th\u1EB3ng song song v\u1EDBi \u0111\u01B0\u1EDDng th\u1EB3ng \u0111\xF3.",
          "N\u1EBFu $a\\perp c$ v\xE0 $b\\perp c$ th\xEC $a\\para b$.",
          "N\u1EBFu $a\\para b$ v\xE0 $c\\perp a$ th\xEC $c\\perp b$."
        ],
        caution: ["Ph\xE2n bi\u1EC7t r\xF5 chi\u1EC1u d\xF9ng: t\u1EEB **g\xF3c b\u1EB1ng nhau** suy ra **song song** (d\u1EA5u hi\u1EC7u) hay t\u1EEB **song song** suy ra **g\xF3c b\u1EB1ng nhau** (t\xEDnh ch\u1EA5t)."]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 cho hai \u0111\u01B0\u1EDDng th\u1EB3ng song song v\xE0 m\u1ED9t c\xE1t tuy\u1EBFn", action: "Truy ngay ba c\u1EB7p g\xF3c: so le trong, \u0111\u1ED3ng v\u1ECB, trong c\xF9ng ph\xEDa.", why: "Song song l\xE0 \u201Cm\xE1y ph\xE1t\u201D sinh ra quan h\u1EC7 gi\u1EEFa c\xE1c g\xF3c." },
      { signal: "\u0110\u1EC1 y\xEAu c\u1EA7u ch\u1EE9ng minh hai \u0111\u01B0\u1EDDng th\u1EB3ng song song", action: "\u0110i t\xECm m\u1ED9t c\u1EB7p g\xF3c so le trong (ho\u1EB7c \u0111\u1ED3ng v\u1ECB) b\u1EB1ng nhau.", why: "\u0110\xF3 l\xE0 d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt duy nh\u1EA5t \u1EDF l\u1EDBp 7." },
      { signal: "H\xECnh c\xF3 \u0111\u01B0\u1EDDng th\u1EB3ng c\u1EAFt hai \u0111\u01B0\u1EDDng kh\xF4ng c\xF9ng v\u1ECB tr\xED", action: "K\u1EBB th\xEAm \u0111\u01B0\u1EDDng song song \u0111i qua \u0111i\u1EC3m g\xE3y.", why: "\u0110\u01B0\u1EDDng ph\u1EE5 t\u1EA1o ra c\u1EB7p g\xF3c so le trong \u0111\u1EC3 t\xE1ch g\xF3c l\u1EDBn th\xE0nh hai g\xF3c d\u1EC5 t\xEDnh." },
      { signal: "\u0110\u1EC1 nh\u1EAFc \u201Cc\xF9ng vu\xF4ng g\xF3c v\u1EDBi m\u1ED9t \u0111\u01B0\u1EDDng th\u1EB3ng\u201D", action: "K\u1EBFt lu\u1EADn hai \u0111\u01B0\u1EDDng \u0111\xF3 song song.", why: "Quan h\u1EC7 vu\xF4ng g\xF3c \u2013 song song." }
    ],
    mindmap: {
      root: "G\xD3C \u2014 \u0110\u01AF\u1EDCNG TH\u1EB2NG SONG SONG",
      branches: [
        { title: "C\u1EB7p g\xF3c", items: ["K\u1EC1 b\xF9 $=180\\deg$", "\u0110\u1ED1i \u0111\u1EC9nh b\u1EB1ng nhau", "Tia ph\xE2n gi\xE1c"] },
        { title: "Song song", items: ["D\u1EA5u hi\u1EC7u: so le trong, \u0111\u1ED3ng v\u1ECB", "Trong c\xF9ng ph\xEDa b\xF9 nhau", "Ti\xEAn \u0111\u1EC1 Euclid"] },
        { title: "Vu\xF4ng g\xF3c", items: ["$a\\perp c$, $b\\perp c$ \u27F9 $a\\para b$", "$a\\para b$, $c\\perp a$ \u27F9 $c\\perp b$", "\u0110\u01B0\u1EDDng trung tr\u1EF1c"] },
        { title: "\u0110\u1ECBnh l\xED", items: ["Gi\u1EA3 thi\u1EBFt \u2013 K\u1EBFt lu\u1EADn", "C\xE1ch vi\u1EBFt GT/KL", "Ch\u1EE9ng minh \u0111\u1ECBnh l\xED"] }
      ]
    },
    types: [
      {
        id: "g7-t4-d1",
        name: "D\u1EA1ng 1. T\xEDnh s\u1ED1 \u0111o g\xF3c t\u1EA1o b\u1EDFi hai \u0111\u01B0\u1EDDng song song",
        level: "TH",
        method: ["X\xE1c \u0111\u1ECBnh c\u1EB7p g\xF3c thu\u1ED9c lo\u1EA1i n\xE0o.", "\xC1p d\u1EE5ng t\xEDnh ch\u1EA5t t\u01B0\u01A1ng \u1EE9ng.", "Tr\xECnh b\xE0y c\xF3 c\u0103n c\u1EE9."],
        worked: [{
          prompt: "Cho $a\\para b$, \u0111\u01B0\u1EDDng th\u1EB3ng $c$ c\u1EAFt $a$ t\u1EA1i $A$, c\u1EAFt $b$ t\u1EA1i $B$. Bi\u1EBFt $\\angle A_1=65\\deg$. T\xEDnh g\xF3c $\\angle B_1$ so le trong v\u1EDBi $\\angle A_1$ v\xE0 g\xF3c $\\angle B_2$ trong c\xF9ng ph\xEDa v\u1EDBi $\\angle A_1$.",
          thinking: ["C\xF3 s\u1EB5n song song \u2192 d\xF9ng t\xEDnh ch\u1EA5t."],
          solution: [
            "V\xEC $a\\para b$ n\xEAn $\\angle B_1=\\angle A_1=65\\deg$ (hai g\xF3c so le trong).",
            "C\u0169ng v\xEC $a\\para b$ n\xEAn $\\angle A_1+\\angle B_2=180\\deg$ (hai g\xF3c trong c\xF9ng ph\xEDa).",
            "$\\angle B_2=180\\deg-65\\deg=115\\deg$."
          ]
        }]
      },
      {
        id: "g7-t4-d2",
        name: "D\u1EA1ng 2. Ch\u1EE9ng minh hai \u0111\u01B0\u1EDDng th\u1EB3ng song song",
        level: "VD",
        method: ["T\xEDnh ho\u1EB7c ch\u1EC9 ra m\u1ED9t c\u1EB7p g\xF3c so le trong / \u0111\u1ED3ng v\u1ECB b\u1EB1ng nhau.", "K\u1EBFt lu\u1EADn theo d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt."],
        worked: [{
          prompt: "Cho h\xECnh c\xF3 $\\angle xAB=70\\deg$ v\xE0 $\\angle ABy=70\\deg$, hai g\xF3c n\xE0y \u1EDF v\u1ECB tr\xED so le trong \u0111\u1ED1i v\u1EDBi hai tia $Ax$, $By$ v\xE0 c\xE1t tuy\u1EBFn $AB$. Ch\u1EE9ng minh $Ax\\para By$.",
          thinking: ["C\xF3 s\u1EB5n c\u1EB7p g\xF3c so le trong b\u1EB1ng nhau \u2192 d\xF9ng d\u1EA5u hi\u1EC7u."],
          solution: [
            "$\\angle xAB$ v\xE0 $\\angle ABy$ l\xE0 hai g\xF3c so le trong t\u1EA1o b\u1EDFi $Ax$, $By$ v\xE0 c\xE1t tuy\u1EBFn $AB$.",
            "M\xE0 $\\angle xAB=\\angle ABy=70\\deg$.",
            "V\u1EADy $Ax\\para By$ (d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt hai \u0111\u01B0\u1EDDng th\u1EB3ng song song)."
          ]
        }]
      },
      {
        id: "g7-t4-d3",
        name: "D\u1EA1ng 3. V\u1EADn d\u1EE5ng \u2014 k\u1EBB \u0111\u01B0\u1EDDng ph\u1EE5 song song",
        level: "VDC",
        method: ["Qua \u0111i\u1EC3m \u201Cg\xE3y\u201D, k\u1EBB \u0111\u01B0\u1EDDng th\u1EB3ng song song v\u1EDBi hai \u0111\u01B0\u1EDDng \u0111\xE3 cho.", "T\xE1ch g\xF3c l\u1EDBn th\xE0nh hai g\xF3c so le trong.", "C\u1ED9ng l\u1EA1i \u0111\u1EC3 t\xECm k\u1EBFt qu\u1EA3."],
        worked: [{
          prompt: "Cho $Ax\\para By$, \u0111i\u1EC3m $C$ n\u1EB1m gi\u1EEFa hai \u0111\u01B0\u1EDDng sao cho $\\angle xAC=40\\deg$, $\\angle yBC=35\\deg$. T\xEDnh $\\angle ACB$.",
          thinking: [
            "G\xF3c $\\angle ACB$ n\u1EB1m gi\u1EEFa hai \u0111\u01B0\u1EDDng song song, kh\xF4ng so s\xE1nh tr\u1EF1c ti\u1EBFp \u0111\u01B0\u1EE3c.",
            "K\u1EBB $Cz\\para Ax$ (do \u0111\xF3 c\u0169ng $\\para By$) \u0111\u1EC3 t\xE1ch $\\angle ACB$ th\xE0nh hai g\xF3c."
          ],
          solution: [
            "Qua $C$ k\u1EBB tia $Cz\\para Ax$. V\xEC $Ax\\para By$ n\xEAn $Cz\\para By$.",
            "Do $Cz\\para Ax$: $\\angle ACz=\\angle xAC=40\\deg$ (so le trong).",
            "Do $Cz\\para By$: $\\angle zCB=\\angle yBC=35\\deg$ (so le trong).",
            "V\xEC tia $Cz$ n\u1EB1m gi\u1EEFa hai tia $CA$, $CB$ n\xEAn $\\angle ACB=\\angle ACz+\\angle zCB=40\\deg+35\\deg=75\\deg$."
          ],
          remark: "K\u1EBB \u0111\u01B0\u1EDDng ph\u1EE5 song song l\xE0 k\u1EF9 thu\u1EADt \u201Cm\u1EDF kho\xE1\u201D s\u1ED1 1 cho m\u1ECDi b\xE0i g\xF3c gi\u1EEFa hai \u0111\u01B0\u1EDDng song song."
        }]
      }
    ],
    bank: ["g7.goc-song-song", "g7.cm-song-song"]
  },
  {
    id: "g7-t5",
    grade: 7,
    term: "HK2",
    strand: "HINH_HOC",
    order: 5,
    name: "Tam gi\xE1c \u2014 C\xE1c tr\u01B0\u1EDDng h\u1EE3p b\u1EB1ng nhau v\xE0 quan h\u1EC7 trong tam gi\xE1c",
    summary: "T\u1ED5ng ba g\xF3c, c\xE1c tr\u01B0\u1EDDng h\u1EE3p b\u1EB1ng nhau c\u1EE7a tam gi\xE1c (th\u01B0\u1EDDng v\xE0 vu\xF4ng), tam gi\xE1c c\xE2n, \u0111\u01B0\u1EDDng trung tr\u1EF1c, b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c, c\xE1c \u0111\u01B0\u1EDDng \u0111\u1ED3ng quy.",
    outcomes: [
      "V\u1EADn d\u1EE5ng \u0111\u1ECBnh l\xED t\u1ED5ng ba g\xF3c, g\xF3c ngo\xE0i c\u1EE7a tam gi\xE1c.",
      "Ch\u1EE9ng minh hai tam gi\xE1c b\u1EB1ng nhau theo c\xE1c tr\u01B0\u1EDDng h\u1EE3p c.c.c, c.g.c, g.c.g v\xE0 c\xE1c tr\u01B0\u1EDDng h\u1EE3p c\u1EE7a tam gi\xE1c vu\xF4ng.",
      "V\u1EADn d\u1EE5ng t\xEDnh ch\u1EA5t tam gi\xE1c c\xE2n, tam gi\xE1c \u0111\u1EC1u, \u0111\u01B0\u1EDDng trung tr\u1EF1c.",
      "V\u1EADn d\u1EE5ng quan h\u1EC7 gi\u1EEFa g\xF3c v\xE0 c\u1EA1nh \u0111\u1ED1i di\u1EC7n, b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c, c\xE1c \u0111\u01B0\u1EDDng \u0111\u1ED3ng quy."
    ],
    theory: [
      {
        heading: "1. T\u1ED5ng ba g\xF3c v\xE0 g\xF3c ngo\xE0i",
        body: [],
        formulas: [
          "T\u1ED5ng ba g\xF3c trong m\u1ED9t tam gi\xE1c b\u1EB1ng $180\\deg$",
          "G\xF3c ngo\xE0i c\u1EE7a tam gi\xE1c b\u1EB1ng **t\u1ED5ng hai g\xF3c trong kh\xF4ng k\u1EC1** v\u1EDBi n\xF3",
          "Tam gi\xE1c vu\xF4ng: hai g\xF3c nh\u1ECDn ph\u1EE5 nhau ($=90\\deg$)"
        ]
      },
      {
        heading: "2. C\xE1c tr\u01B0\u1EDDng h\u1EE3p b\u1EB1ng nhau c\u1EE7a hai tam gi\xE1c",
        body: [],
        formulas: [
          "Tam gi\xE1c th\u01B0\u1EDDng: **c.c.c** ; **c.g.c** ; **g.c.g**",
          "Tam gi\xE1c vu\xF4ng: hai c\u1EA1nh g\xF3c vu\xF4ng ; c\u1EA1nh g\xF3c vu\xF4ng \u2013 g\xF3c nh\u1ECDn k\u1EC1 ; c\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn ; **c\u1EA1nh huy\u1EC1n \u2013 c\u1EA1nh g\xF3c vu\xF4ng**",
          "Hai tam gi\xE1c b\u1EB1ng nhau \u27F9 c\xE1c c\u1EA1nh t\u01B0\u01A1ng \u1EE9ng b\u1EB1ng nhau, c\xE1c g\xF3c t\u01B0\u01A1ng \u1EE9ng b\u1EB1ng nhau."
        ],
        caution: ["Trong c.g.c, g\xF3c ph\u1EA3i l\xE0 g\xF3c **xen gi\u1EEFa** hai c\u1EA1nh; \u201Cc.c.g\u201D v\u1EDBi g\xF3c kh\xF4ng xen gi\u1EEFa l\xE0 **sai**."]
      },
      {
        heading: "3. Tam gi\xE1c c\xE2n, tam gi\xE1c \u0111\u1EC1u, \u0111\u01B0\u1EDDng trung tr\u1EF1c",
        body: [],
        formulas: [
          "Tam gi\xE1c c\xE2n: hai c\u1EA1nh b\xEAn b\u1EB1ng nhau $\\Leftrightarrow$ hai g\xF3c \u1EDF \u0111\xE1y b\u1EB1ng nhau",
          "Trong tam gi\xE1c c\xE2n, \u0111\u01B0\u1EDDng trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh \u0111\xE1y \u0111\u1ED3ng th\u1EDDi l\xE0 \u0111\u01B0\u1EDDng cao, \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c, \u0111\u01B0\u1EDDng trung tr\u1EF1c",
          "Tam gi\xE1c \u0111\u1EC1u: ba c\u1EA1nh b\u1EB1ng nhau $\\Leftrightarrow$ ba g\xF3c b\u1EB1ng $60\\deg$",
          "\u0110i\u1EC3m thu\u1ED9c \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a \u0111o\u1EA1n th\u1EB3ng th\xEC c\xE1ch \u0111\u1EC1u hai \u0111\u1EA7u m\xFAt c\u1EE7a \u0111o\u1EA1n th\u1EB3ng \u0111\xF3 (v\xE0 ng\u01B0\u1EE3c l\u1EA1i)"
        ]
      },
      {
        heading: "4. Quan h\u1EC7 trong tam gi\xE1c v\xE0 c\xE1c \u0111\u01B0\u1EDDng \u0111\u1ED3ng quy",
        body: [],
        formulas: [
          "G\xF3c l\u1EDBn h\u01A1n \u0111\u1ED1i di\u1EC7n v\u1EDBi c\u1EA1nh l\u1EDBn h\u01A1n (v\xE0 ng\u01B0\u1EE3c l\u1EA1i)",
          "B\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c: $\\abs{b-c}<a<b+c$",
          "Ba \u0111\u01B0\u1EDDng trung tuy\u1EBFn \u0111\u1ED3ng quy t\u1EA1i **tr\u1ECDng t\xE2m** $G$, v\u1EDBi $AG=\\f{2}{3}AM$",
          "Ba \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c \u0111\u1ED3ng quy t\u1EA1i t\xE2m \u0111\u01B0\u1EDDng tr\xF2n **n\u1ED9i ti\u1EBFp**",
          "Ba \u0111\u01B0\u1EDDng trung tr\u1EF1c \u0111\u1ED3ng quy t\u1EA1i t\xE2m \u0111\u01B0\u1EDDng tr\xF2n **ngo\u1EA1i ti\u1EBFp**",
          "Ba \u0111\u01B0\u1EDDng cao \u0111\u1ED3ng quy t\u1EA1i **tr\u1EF1c t\xE2m**"
        ]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 cho hai \u0111o\u1EA1n th\u1EB3ng b\u1EB1ng nhau v\xE0 m\u1ED9t g\xF3c chung", action: "Ngh\u0129 ngay t\u1EDBi tr\u01B0\u1EDDng h\u1EE3p c.g.c.", why: "G\xF3c chung/g\xF3c \u0111\u1ED1i \u0111\u1EC9nh th\u01B0\u1EDDng l\xE0 \u201Cg\xF3c xen gi\u1EEFa\u201D m\xE0 \u0111\u1EC1 c\xE0i s\u1EB5n." },
      { signal: "\u0110\u1EC1 cho trung \u0111i\u1EC3m", action: "Sinh ra hai \u0111o\u1EA1n b\u1EB1ng nhau \u2014 v\u1EADt li\u1EC7u cho c.g.c ho\u1EB7c t\xEDnh ch\u1EA5t trung tuy\u1EBFn.", why: "Trung \u0111i\u1EC3m l\xE0 ngu\u1ED3n d\u1EEF ki\u1EC7n b\u1EB1ng nhau mi\u1EC5n ph\xED." },
      { signal: "\u0110\u1EC1 cho tia ph\xE2n gi\xE1c", action: "Sinh ra hai g\xF3c b\u1EB1ng nhau, ho\u1EB7c d\xF9ng t\xEDnh ch\u1EA5t \u0111i\u1EC3m c\xE1ch \u0111\u1EC1u hai c\u1EA1nh.", why: "Ph\xE2n gi\xE1c v\u1EEBa cho g\xF3c b\u1EB1ng nhau, v\u1EEBa cho kho\u1EA3ng c\xE1ch b\u1EB1ng nhau." },
      { signal: "Y\xEAu c\u1EA7u ch\u1EE9ng minh hai \u0111o\u1EA1n th\u1EB3ng b\u1EB1ng nhau", action: "Gh\xE9p ch\xFAng v\xE0o hai tam gi\xE1c r\u1ED3i ch\u1EE9ng minh hai tam gi\xE1c b\u1EB1ng nhau.", why: "\u0110\xE2y l\xE0 con \u0111\u01B0\u1EDDng chu\u1EA9n: b\u1EB1ng nhau c\u1EE7a tam gi\xE1c k\xE9o theo b\u1EB1ng nhau c\u1EE7a c\u1EA1nh." },
      { signal: "\u0110\u1EC1 cho ba \u0111\u1ED9 d\xE0i v\xE0 h\u1ECFi \u201Cc\xF3 l\xE0 tam gi\xE1c kh\xF4ng\u201D", action: "Ki\u1EC3m tra b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c v\u1EDBi c\u1EA1nh l\u1EDBn nh\u1EA5t.", why: "Ch\u1EC9 c\u1EA7n ki\u1EC3m tra t\u1ED5ng hai c\u1EA1nh nh\u1ECF so v\u1EDBi c\u1EA1nh l\u1EDBn nh\u1EA5t." },
      { signal: "Xu\u1EA5t hi\u1EC7n tr\u1ECDng t\xE2m ho\u1EB7c trung tuy\u1EBFn", action: "D\xF9ng t\u1EC9 s\u1ED1 $\\f{2}{3}$ v\xE0 $\\f{1}{3}$.", why: "Tr\u1ECDng t\xE2m chia trung tuy\u1EBFn theo t\u1EC9 l\u1EC7 c\u1ED1 \u0111\u1ECBnh." }
    ],
    mindmap: {
      root: "TAM GI\xC1C",
      branches: [
        { title: "G\xF3c", items: ["T\u1ED5ng ba g\xF3c $=180\\deg$", "G\xF3c ngo\xE0i", "Tam gi\xE1c vu\xF4ng: hai g\xF3c ph\u1EE5 nhau"] },
        { title: "B\u1EB1ng nhau", items: ["c.c.c", "c.g.c", "g.c.g", "Tam gi\xE1c vu\xF4ng: ch\u2013gn, ch\u2013cgv"] },
        { title: "Tam gi\xE1c \u0111\u1EB7c bi\u1EC7t", items: ["C\xE2n: 2 c\u1EA1nh b\xEAn, 2 g\xF3c \u0111\xE1y", "\u0110\u1EC1u: $60\\deg$", "Vu\xF4ng c\xE2n"] },
        { title: "Quan h\u1EC7", items: ["G\xF3c \u2013 c\u1EA1nh \u0111\u1ED1i di\u1EC7n", "B\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c", "\u0110\u01B0\u1EDDng vu\xF4ng g\xF3c \u2013 \u0111\u01B0\u1EDDng xi\xEAn"] },
        { title: "\u0110\u1ED3ng quy", items: ["Trung tuy\u1EBFn \u2192 tr\u1ECDng t\xE2m", "Ph\xE2n gi\xE1c \u2192 t\xE2m n\u1ED9i ti\u1EBFp", "Trung tr\u1EF1c \u2192 t\xE2m ngo\u1EA1i ti\u1EBFp", "\u0110\u01B0\u1EDDng cao \u2192 tr\u1EF1c t\xE2m"] }
      ]
    },
    practiceSkills: [
      {
        title: "Quy tr\xECnh 4 b\u01B0\u1EDBc ch\u1EE9ng minh hai tam gi\xE1c b\u1EB1ng nhau",
        detail: [
          "B\u01B0\u1EDBc 1: G\u1ECDi t\xEAn hai tam gi\xE1c theo \u0111\xFAng th\u1EE9 t\u1EF1 \u0111\u1EC9nh t\u01B0\u01A1ng \u1EE9ng.",
          "B\u01B0\u1EDBc 2: Li\u1EC7t k\xEA ba y\u1EBFu t\u1ED1, m\u1ED7i y\u1EBFu t\u1ED1 k\xE8m l\xFD do (gi\u1EA3 thi\u1EBFt / g\xF3c chung / \u0111\u1ED1i \u0111\u1EC9nh\u2026).",
          "B\u01B0\u1EDBc 3: K\u1EBFt lu\u1EADn tr\u01B0\u1EDDng h\u1EE3p b\u1EB1ng nhau (c.c.c, c.g.c, g.c.g).",
          "B\u01B0\u1EDBc 4: Suy ra \u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh t\u1EEB c\xE1c c\u1EB7p t\u01B0\u01A1ng \u1EE9ng."
        ]
      },
      {
        title: "K\u1EF9 n\u0103ng \u0111\u1ECDc h\xECnh",
        detail: [
          "Ghi t\u1EA5t c\u1EA3 d\u1EEF ki\u1EC7n l\xEAn h\xECnh b\u1EB1ng k\xFD hi\u1EC7u (g\u1EA1ch c\u1EA1nh b\u1EB1ng nhau, cung g\xF3c b\u1EB1ng nhau).",
          "T\xF4 \u0111\u1EADm hai tam gi\xE1c \u0111\u1ECBnh ch\u1EE9ng minh.",
          "Truy ng\u01B0\u1EE3c t\u1EEB k\u1EBFt lu\u1EADn: mu\u1ED1n c\xF3 \u0111i\u1EC1u n\xE0y th\xEC c\u1EA7n hai tam gi\xE1c n\xE0o b\u1EB1ng nhau?"
        ]
      }
    ],
    types: [
      {
        id: "g7-t5-d1",
        name: "D\u1EA1ng 1. T\xEDnh s\u1ED1 \u0111o g\xF3c trong tam gi\xE1c",
        level: "NB",
        method: ["\xC1p d\u1EE5ng t\u1ED5ng ba g\xF3c b\u1EB1ng $180\\deg$.", "D\xF9ng g\xF3c ngo\xE0i khi thu\u1EADn ti\u1EC7n."],
        worked: [{
          prompt: "Tam gi\xE1c $ABC$ c\xF3 $\\angle A=70\\deg$, $\\angle B=50\\deg$. T\xEDnh $\\angle C$ v\xE0 g\xF3c ngo\xE0i t\u1EA1i \u0111\u1EC9nh $C$.",
          thinking: ["T\u1ED5ng ba g\xF3c b\u1EB1ng $180\\deg$; g\xF3c ngo\xE0i k\u1EC1 b\xF9 v\u1EDBi g\xF3c trong."],
          solution: [
            "$\\angle C=180\\deg-70\\deg-50\\deg=60\\deg$.",
            "G\xF3c ngo\xE0i t\u1EA1i $C$ $=180\\deg-60\\deg=120\\deg$ (c\u0169ng b\u1EB1ng $\\angle A+\\angle B=70\\deg+50\\deg$)."
          ]
        }]
      },
      {
        id: "g7-t5-d2",
        name: "D\u1EA1ng 2. Ch\u1EE9ng minh hai tam gi\xE1c b\u1EB1ng nhau",
        level: "VD",
        method: ["V\u1EBD h\xECnh, ghi GT\u2013KL.", "Ch\u1ECDn hai tam gi\xE1c ch\u1EE9a c\xE1c y\u1EBFu t\u1ED1 c\u1EA7n ch\u1EE9ng minh.", "Li\u1EC7t k\xEA ba y\u1EBFu t\u1ED1 k\xE8m l\xFD do.", "K\u1EBFt lu\u1EADn v\xE0 suy ra h\u1EC7 qu\u1EA3."],
        worked: [{
          prompt: "Cho tam gi\xE1c $ABC$ c\xF3 $AB=AC$. G\u1ECDi $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $BC$. Ch\u1EE9ng minh $\\tri ABM=\\tri ACM$ v\xE0 $AM\\perp BC$.",
          thinking: [
            "C\xF3 $AB=AC$ (gi\u1EA3 thi\u1EBFt), $MB=MC$ (trung \u0111i\u1EC3m), $AM$ chung \u2192 \u0111\u1EE7 ba c\u1EA1nh \u2192 c.c.c.",
            "T\u1EEB hai tam gi\xE1c b\u1EB1ng nhau suy ra hai g\xF3c k\u1EC1 b\xF9 b\u1EB1ng nhau, m\u1ED7i g\xF3c b\u1EB1ng $90\\deg$."
          ],
          solution: [
            "X\xE9t $\\tri ABM$ v\xE0 $\\tri ACM$ c\xF3:",
            "$AB=AC$ (gi\u1EA3 thi\u1EBFt); $MB=MC$ ($M$ l\xE0 trung \u0111i\u1EC3m $BC$); $AM$ l\xE0 c\u1EA1nh chung.",
            "Do \u0111\xF3 $\\tri ABM=\\tri ACM$ (c.c.c).",
            "Suy ra $\\angle AMB=\\angle AMC$ (hai g\xF3c t\u01B0\u01A1ng \u1EE9ng).",
            "M\xE0 $\\angle AMB+\\angle AMC=180\\deg$ (hai g\xF3c k\u1EC1 b\xF9) n\xEAn $\\angle AMB=\\angle AMC=90\\deg$.",
            "V\u1EADy $AM\\perp BC$."
          ]
        }]
      },
      {
        id: "g7-t5-d3",
        name: "D\u1EA1ng 3. B\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c",
        level: "TH",
        method: ["So s\xE1nh t\u1ED5ng hai c\u1EA1nh nh\u1ECF v\u1EDBi c\u1EA1nh l\u1EDBn nh\u1EA5t.", "V\u1EDBi b\xE0i t\xECm c\u1EA1nh th\u1EE9 ba: d\xF9ng $\\abs{b-c}<a<b+c$."],
        worked: [{
          prompt: "Tam gi\xE1c $ABC$ c\xF3 $AB=4\\,cm$, $AC=9\\,cm$ v\xE0 $BC$ l\xE0 s\u1ED1 nguy\xEAn. T\xECm t\u1EA5t c\u1EA3 gi\xE1 tr\u1ECB c\xF3 th\u1EC3 c\u1EE7a $BC$.",
          thinking: ["\xC1p d\u1EE5ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c \u0111\u1EC3 ch\u1EB7n hai \u0111\u1EA7u."],
          solution: [
            "$\\abs{9-4}<BC<9+4$, t\u1EE9c $5<BC<13$.",
            "V\xEC $BC$ nguy\xEAn n\xEAn $BC\\in\\{6;7;8;9;10;11;12\\}$."
          ]
        }]
      },
      {
        id: "g7-t5-d4",
        name: "D\u1EA1ng 4. V\u1EADn d\u1EE5ng cao \u2014 t\u1ED5ng h\u1EE3p tam gi\xE1c c\xE2n, trung tr\u1EF1c, \u0111\u1ED3ng quy",
        level: "VDC",
        method: ["Khai th\xE1c tri\u1EC7t \u0111\u1EC3 tam gi\xE1c c\xE2n: 4 \u0111\u01B0\u1EDDng tr\xF9ng nhau.", "D\xF9ng t\xEDnh ch\u1EA5t \u0111i\u1EC3m c\xE1ch \u0111\u1EC1u \u0111\u1EC3 ch\u1EE9ng minh thu\u1ED9c trung tr\u1EF1c.", "Gh\xE9p nhi\u1EC1u b\u01B0\u1EDBc ch\u1EE9ng minh b\u1EB1ng nhau li\xEAn ti\u1EBFp."],
        worked: [{
          prompt: "Cho tam gi\xE1c $ABC$ c\xE2n t\u1EA1i $A$. Tr\xEAn tia \u0111\u1ED1i c\u1EE7a tia $BC$ l\u1EA5y $D$, tr\xEAn tia \u0111\u1ED1i c\u1EE7a tia $CB$ l\u1EA5y $E$ sao cho $BD=CE$. Ch\u1EE9ng minh tam gi\xE1c $ADE$ c\xE2n.",
          thinking: [
            "Mu\u1ED1n $\\tri ADE$ c\xE2n t\u1EA1i $A$ th\xEC c\u1EA7n $AD=AE$.",
            "Gh\xE9p $AD$, $AE$ v\xE0o hai tam gi\xE1c $ABD$ v\xE0 $ACE$ r\u1ED3i ch\u1EE9ng minh b\u1EB1ng nhau (c.g.c).",
            "C\u1EA7n g\xF3c xen gi\u1EEFa: $\\angle ABD$ v\xE0 $\\angle ACE$ \u2014 l\xE0 hai g\xF3c k\u1EC1 b\xF9 v\u1EDBi hai g\xF3c \u0111\xE1y b\u1EB1ng nhau."
          ],
          solution: [
            "V\xEC $\\tri ABC$ c\xE2n t\u1EA1i $A$ n\xEAn $AB=AC$ v\xE0 $\\angle ABC=\\angle ACB$.",
            "$\\angle ABD$ k\u1EC1 b\xF9 v\u1EDBi $\\angle ABC$; $\\angle ACE$ k\u1EC1 b\xF9 v\u1EDBi $\\angle ACB$.",
            "Do $\\angle ABC=\\angle ACB$ n\xEAn $\\angle ABD=\\angle ACE$.",
            "X\xE9t $\\tri ABD$ v\xE0 $\\tri ACE$ c\xF3: $AB=AC$; $\\angle ABD=\\angle ACE$; $BD=CE$ (gi\u1EA3 thi\u1EBFt).",
            "Do \u0111\xF3 $\\tri ABD=\\tri ACE$ (c.g.c), suy ra $AD=AE$.",
            "V\u1EADy tam gi\xE1c $ADE$ c\xE2n t\u1EA1i $A$."
          ],
          remark: "M\u1EB9o: khi \u0111\u1EC1 cho \u201Ctia \u0111\u1ED1i\u201D, h\u1EA7u nh\u01B0 lu\xF4n ph\u1EA3i d\xF9ng c\u1EB7p g\xF3c k\u1EC1 b\xF9 \u0111\u1EC3 chuy\u1EC3n g\xF3c \u0111\xE1y ra ngo\xE0i."
        }]
      }
    ],
    bank: ["g7.tam-giac-goc", "g7.tam-giac-bang-nhau", "g7.bdt-tam-giac", "g7.tam-giac-can"]
  },
  {
    id: "g7-t6",
    grade: 7,
    term: "HK1",
    strand: "HINH_HOC",
    order: 6,
    name: "H\xECnh h\u1ECDc tr\u1EF1c quan \u2014 H\xECnh h\u1ED9p, H\xECnh l\u0103ng tr\u1EE5 \u0111\u1EE9ng",
    summary: "H\xECnh h\u1ED9p ch\u1EEF nh\u1EADt, h\xECnh l\u1EADp ph\u01B0\u01A1ng, l\u0103ng tr\u1EE5 \u0111\u1EE9ng tam gi\xE1c v\xE0 t\u1EE9 gi\xE1c: di\u1EC7n t\xEDch xung quanh, th\u1EC3 t\xEDch.",
    outcomes: [
      "M\xF4 t\u1EA3 c\xE1c y\u1EBFu t\u1ED1: \u0111\u1EC9nh, c\u1EA1nh, m\u1EB7t, \u0111\u01B0\u1EDDng ch\xE9o.",
      "T\xEDnh di\u1EC7n t\xEDch xung quanh, di\u1EC7n t\xEDch to\xE0n ph\u1EA7n, th\u1EC3 t\xEDch.",
      "Gi\u1EA3i b\xE0i to\xE1n th\u1EF1c ti\u1EC5n v\u1EC1 \u0111\u1ED3 v\u1EADt d\u1EA1ng h\xECnh h\u1ED9p, l\u0103ng tr\u1EE5."
    ],
    theory: [
      {
        heading: "C\xF4ng th\u1EE9c c\u1EA7n thu\u1ED9c",
        body: [],
        formulas: [
          "H\xECnh h\u1ED9p ch\u1EEF nh\u1EADt $a\\times b\\times c$: $S_{xq}=2(a+b)c$ ; $S_{tp}=2(ab+bc+ca)$ ; $V=abc$",
          "H\xECnh l\u1EADp ph\u01B0\u01A1ng c\u1EA1nh $a$: $S_{tp}=6a^{2}$ ; $V=a^{3}$",
          "L\u0103ng tr\u1EE5 \u0111\u1EE9ng: $S_{xq}=C_{\\text{\u0111\xE1y}}\\cdot h$ ; $S_{tp}=S_{xq}+2S_{\\text{\u0111\xE1y}}$ ; $V=S_{\\text{\u0111\xE1y}}\\cdot h$"
        ],
        caution: ["$S_{xq}$ ch\u1EC9 t\xEDnh c\xE1c m\u1EB7t b\xEAn; $S_{tp}$ m\u1EDBi c\u1ED9ng th\xEAm hai \u0111\xE1y.", "\u0110\u1ED5i \u0111\u01A1n v\u1ECB th\u1EC3 t\xEDch: $1\\,dm^{3}=1$ l\xEDt $=1000\\,cm^{3}$."]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Cs\u01A1n/qu\xE9t xung quanh\u201D", action: "D\xF9ng $S_{xq}$; n\u1EBFu c\xF3 n\u1EAFp/\u0111\xE1y th\xEC c\u1ED9ng th\xEAm.", why: "\u0110\u1ECDc k\u1EF9 c\xF3 s\u01A1n n\u1EAFp hay kh\xF4ng \u0111\u1EC3 c\u1ED9ng \u0111\xFAng s\u1ED1 m\u1EB7t." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Cch\u1EE9a \u0111\u01B0\u1EE3c bao nhi\xEAu l\xEDt n\u01B0\u1EDBc\u201D", action: "T\xEDnh th\u1EC3 t\xEDch r\u1ED3i \u0111\u1ED5i $1\\,dm^{3}=1$ l\xEDt.", why: "B\u1EABy \u0111\u01A1n v\u1ECB th\u01B0\u1EDDng xuy\xEAn nh\u1EA5t c\u1EE7a chuy\xEAn \u0111\u1EC1 n\xE0y." },
      { signal: "B\u1EC3 n\u01B0\u1EDBc c\xF3 m\u1EF1c n\u01B0\u1EDBc cao $h$", action: "Th\u1EC3 t\xEDch n\u01B0\u1EDBc $=S_{\\text{\u0111\xE1y}}\\cdot h$, kh\xF4ng d\xF9ng chi\u1EC1u cao b\u1EC3.", why: "Chi\u1EC1u cao d\xF9ng \u0111\u1EC3 t\xEDnh l\xE0 chi\u1EC1u cao c\u1ED9t n\u01B0\u1EDBc." }
    ],
    mindmap: {
      root: "H\xCCNH KH\u1ED0I L\u1EDAP 7",
      branches: [
        { title: "H\xECnh h\u1ED9p ch\u1EEF nh\u1EADt", items: ["8 \u0111\u1EC9nh, 12 c\u1EA1nh, 6 m\u1EB7t", "$V=abc$", "$S_{xq}=2(a+b)c$"] },
        { title: "H\xECnh l\u1EADp ph\u01B0\u01A1ng", items: ["6 m\u1EB7t vu\xF4ng", "$V=a^{3}$", "$S_{tp}=6a^{2}$"] },
        { title: "L\u0103ng tr\u1EE5 \u0111\u1EE9ng", items: ["Hai \u0111\xE1y song song b\u1EB1ng nhau", "$S_{xq}=C\\cdot h$", "$V=S\\cdot h$"] },
        { title: "Th\u1EF1c t\u1EBF", items: ["B\u1EC3 n\u01B0\u1EDBc", "Th\xF9ng carton", "L\u1EC1u tr\u1EA1i", "\u0110\u1ED5i \u0111\u01A1n v\u1ECB l\xEDt"] }
      ]
    },
    types: [
      {
        id: "g7-t6-d1",
        name: "D\u1EA1ng 1. T\xEDnh di\u1EC7n t\xEDch, th\u1EC3 t\xEDch",
        level: "TH",
        method: ["X\xE1c \u0111\u1ECBnh lo\u1EA1i h\xECnh.", "Ghi c\xF4ng th\u1EE9c, \u0111\u1ED5i \u0111\u01A1n v\u1ECB.", "Thay s\u1ED1 v\xE0 ghi r\xF5 \u0111\u01A1n v\u1ECB."],
        worked: [{
          prompt: "M\u1ED9t b\u1EC3 c\xE1 d\u1EA1ng h\xECnh h\u1ED9p ch\u1EEF nh\u1EADt d\xE0i $80\\,cm$, r\u1ED9ng $50\\,cm$, cao $60\\,cm$. Ng\u01B0\u1EDDi ta \u0111\u1ED5 n\u01B0\u1EDBc v\xE0o b\u1EC3 \u0111\u1EBFn khi m\u1EF1c n\u01B0\u1EDBc cao $45\\,cm$. T\xEDnh th\u1EC3 t\xEDch n\u01B0\u1EDBc trong b\u1EC3 theo l\xEDt.",
          thinking: ["D\xF9ng chi\u1EC1u cao **c\u1ED9t n\u01B0\u1EDBc** $45\\,cm$, kh\xF4ng d\xF9ng chi\u1EC1u cao b\u1EC3."],
          solution: [
            "$V=80\\cdot50\\cdot45=180\\,000\\ (cm^{3})$.",
            "$180\\,000\\,cm^{3}=180\\,dm^{3}=180$ l\xEDt.",
            "V\u1EADy trong b\u1EC3 c\xF3 180 l\xEDt n\u01B0\u1EDBc."
          ]
        }]
      },
      {
        id: "g7-t6-d2",
        name: "D\u1EA1ng 2. B\xE0i to\xE1n th\u1EF1c t\u1EBF l\u0103ng tr\u1EE5 \u0111\u1EE9ng",
        level: "VD",
        method: ["X\xE1c \u0111\u1ECBnh \u0111\xE1y l\xE0 h\xECnh g\xEC, t\xEDnh $S_{\\text{\u0111\xE1y}}$ v\xE0 chu vi \u0111\xE1y.", "\xC1p d\u1EE5ng $V=S\\cdot h$, $S_{xq}=C\\cdot h$."],
        worked: [{
          prompt: "M\u1ED9t chi\u1EBFc l\u1EC1u c\xF3 d\u1EA1ng l\u0103ng tr\u1EE5 \u0111\u1EE9ng tam gi\xE1c, \u0111\xE1y l\xE0 tam gi\xE1c c\xE2n c\xF3 c\u1EA1nh \u0111\xE1y $2\\,m$, chi\u1EC1u cao \u1EE9ng v\u1EDBi c\u1EA1nh \u0111\xE1y $1{,}5\\,m$; chi\u1EC1u d\xE0i l\u1EC1u l\xE0 $4\\,m$. T\xEDnh th\u1EC3 t\xEDch kh\xF4ng kh\xED b\xEAn trong l\u1EC1u.",
          thinking: ["Th\u1EC3 t\xEDch l\u0103ng tr\u1EE5 = di\u1EC7n t\xEDch \u0111\xE1y tam gi\xE1c \xD7 chi\u1EC1u d\xE0i l\u1EC1u."],
          solution: [
            "$S_{\\text{\u0111\xE1y}}=\\f{1}{2}\\cdot2\\cdot1{,}5=1{,}5\\ (m^{2})$.",
            "$V=1{,}5\\cdot4=6\\ (m^{3})$."
          ]
        }]
      }
    ],
    bank: ["g7.hinh-khoi"]
  },
  {
    id: "g7-t7",
    grade: 7,
    term: "HK1",
    strand: "THONG_KE_XS",
    order: 7,
    name: "Th\u1ED1ng k\xEA v\xE0 X\xE1c su\u1EA5t",
    summary: "Thu th\u1EADp, ph\xE2n lo\u1EA1i, bi\u1EC3u di\u1EC5n d\u1EEF li\u1EC7u; bi\u1EC3u \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng, bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n; bi\u1EBFn c\u1ED1 v\xE0 x\xE1c su\u1EA5t c\u1EE7a bi\u1EBFn c\u1ED1.",
    outcomes: [
      "Thu th\u1EADp, ph\xE2n lo\u1EA1i v\xE0 bi\u1EC3u di\u1EC5n d\u1EEF li\u1EC7u b\u1EB1ng bi\u1EC3u \u0111\u1ED3 ph\xF9 h\u1EE3p.",
      "\u0110\u1ECDc, ph\xE2n t\xEDch v\xE0 nh\u1EADn x\xE9t d\u1EEF li\u1EC7u t\u1EEB bi\u1EC3u \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng, bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n.",
      "Nh\u1EADn bi\u1EBFt bi\u1EBFn c\u1ED1 ch\u1EAFc ch\u1EAFn, kh\xF4ng th\u1EC3, ng\u1EABu nhi\xEAn; t\xEDnh x\xE1c su\u1EA5t c\u1EE7a bi\u1EBFn c\u1ED1 trong tr\u01B0\u1EDDng h\u1EE3p \u0111\u1ED3ng kh\u1EA3 n\u0103ng."
    ],
    theory: [
      {
        heading: "1. Bi\u1EC3u \u0111\u1ED3",
        body: [],
        formulas: [
          "Bi\u1EC3u \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng: m\xF4 t\u1EA3 s\u1EF1 **thay \u0111\u1ED5i theo th\u1EDDi gian**",
          "Bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n: m\xF4 t\u1EA3 **t\u1EC9 l\u1EC7 ph\u1EA7n tr\u0103m** c\u1EE7a c\xE1c th\xE0nh ph\u1EA7n trong t\u1ED5ng th\u1EC3",
          "T\u1ED5ng c\xE1c ph\u1EA7n trong bi\u1EC3u \u0111\u1ED3 qu\u1EA1t tr\xF2n lu\xF4n b\u1EB1ng $100\\percent$"
        ]
      },
      {
        heading: "2. Bi\u1EBFn c\u1ED1 v\xE0 x\xE1c su\u1EA5t",
        body: [],
        formulas: [
          "Bi\u1EBFn c\u1ED1 **ch\u1EAFc ch\u1EAFn**: lu\xF4n x\u1EA3y ra, x\xE1c su\u1EA5t b\u1EB1ng 1",
          "Bi\u1EBFn c\u1ED1 **kh\xF4ng th\u1EC3**: kh\xF4ng bao gi\u1EDD x\u1EA3y ra, x\xE1c su\u1EA5t b\u1EB1ng 0",
          "Bi\u1EBFn c\u1ED1 **ng\u1EABu nhi\xEAn**: c\xF3 th\u1EC3 x\u1EA3y ra ho\u1EB7c kh\xF4ng",
          "N\u1EBFu $k$ k\u1EBFt qu\u1EA3 \u0111\u1ED3ng kh\u1EA3 n\u0103ng v\xE0 bi\u1EBFn c\u1ED1 $A$ c\xF3 $m$ k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i th\xEC $P(A)=\\f{m}{k}$"
        ]
      }
    ],
    decode: [
      { signal: "Bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n cho ph\u1EA7n tr\u0103m v\xE0 m\u1ED9t s\u1ED1 li\u1EC7u tuy\u1EC7t \u0111\u1ED1i", action: "T\xEDnh t\u1ED5ng th\u1EC3 tr\u01B0\u1EDBc r\u1ED3i suy ra c\xE1c ph\u1EA7n c\xF2n l\u1EA1i.", why: "C\xF3 m\u1ED9t m\u1ED1c quy \u0111\u1ED5i l\xE0 \u0111\u1EE7 t\xEDnh to\xE0n b\u1ED9." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Cbi\u1EBFn c\u1ED1 n\xE0o ch\u1EAFc ch\u1EAFn x\u1EA3y ra\u201D", action: "Ki\u1EC3m tra xem c\xF3 k\u1EBFt qu\u1EA3 n\xE0o kh\xF4ng tho\u1EA3 kh\xF4ng.", why: "Ch\u1EC9 c\u1EA7n m\u1ED9t ph\u1EA3n v\xED d\u1EE5 l\xE0 bi\u1EBFn c\u1ED1 kh\xF4ng c\xF2n ch\u1EAFc ch\u1EAFn." },
      { signal: "R\xFAt th\u1EBB / gieo x\xFAc x\u1EAFc, c\xE1c k\u1EBFt qu\u1EA3 nh\u01B0 nhau", action: "D\xF9ng $P=\\f{\\text{s\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i}}{\\text{t\u1ED5ng s\u1ED1 k\u1EBFt qu\u1EA3}}$.", why: "\u0110\xE2y l\xE0 m\xF4 h\xECnh \u0111\u1ED3ng kh\u1EA3 n\u0103ng." }
    ],
    mindmap: {
      root: "TH\u1ED0NG K\xCA & X\xC1C SU\u1EA4T L\u1EDAP 7",
      branches: [
        { title: "D\u1EEF li\u1EC7u", items: ["Thu th\u1EADp", "Ph\xE2n lo\u1EA1i", "T\xEDnh \u0111\u1EA1i di\u1EC7n, h\u1EE3p l\xED"] },
        { title: "Bi\u1EC3u \u0111\u1ED3", items: ["\u0110o\u1EA1n th\u1EB3ng: theo th\u1EDDi gian", "Qu\u1EA1t tr\xF2n: theo t\u1EC9 l\u1EC7", "C\u1ED9t k\xE9p: so s\xE1nh"] },
        { title: "Bi\u1EBFn c\u1ED1", items: ["Ch\u1EAFc ch\u1EAFn", "Kh\xF4ng th\u1EC3", "Ng\u1EABu nhi\xEAn"] },
        { title: "X\xE1c su\u1EA5t", items: ["$P(A)=\\f{m}{k}$", "$0\\le P\\le1$", "K\u1EBFt qu\u1EA3 \u0111\u1ED3ng kh\u1EA3 n\u0103ng"] }
      ]
    },
    types: [
      {
        id: "g7-t7-d1",
        name: "D\u1EA1ng 1. \u0110\u1ECDc bi\u1EC3u \u0111\u1ED3 qu\u1EA1t tr\xF2n",
        level: "TH",
        method: ["X\xE1c \u0111\u1ECBnh t\u1ED5ng th\u1EC3 \u1EE9ng v\u1EDBi 100%.", "Nh\xE2n t\u1EC9 l\u1EC7 v\u1EDBi t\u1ED5ng th\u1EC3."],
        worked: [{
          prompt: "Bi\u1EC3u \u0111\u1ED3 qu\u1EA1t tr\xF2n v\u1EC1 s\u1EDF th\xEDch m\xF4n h\u1ECDc c\u1EE7a 200 h\u1ECDc sinh cho bi\u1EBFt To\xE1n chi\u1EBFm 35%, V\u0103n 25%, Anh 20%, c\xF2n l\u1EA1i l\xE0 c\xE1c m\xF4n kh\xE1c. T\xEDnh s\u1ED1 h\u1ECDc sinh th\xEDch To\xE1n v\xE0 s\u1ED1 h\u1ECDc sinh th\xEDch c\xE1c m\xF4n kh\xE1c.",
          thinking: ["Nh\xE2n t\u1EC9 l\u1EC7 v\u1EDBi t\u1ED5ng 200; ph\u1EA7n \u201Ckh\xE1c\u201D l\u1EA5y 100% tr\u1EEB c\xE1c ph\u1EA7n \u0111\xE3 bi\u1EBFt."],
          solution: [
            "S\u1ED1 h\u1ECDc sinh th\xEDch To\xE1n: $200\\cdot35\\percent=70$ (h\u1ECDc sinh).",
            "T\u1EC9 l\u1EC7 m\xF4n kh\xE1c: $100\\percent-35\\percent-25\\percent-20\\percent=20\\percent$.",
            "S\u1ED1 h\u1ECDc sinh th\xEDch m\xF4n kh\xE1c: $200\\cdot20\\percent=40$ (h\u1ECDc sinh)."
          ]
        }]
      },
      {
        id: "g7-t7-d2",
        name: "D\u1EA1ng 2. T\xEDnh x\xE1c su\u1EA5t c\u1EE7a bi\u1EBFn c\u1ED1",
        level: "TH",
        method: ["Li\u1EC7t k\xEA t\u1ED5ng s\u1ED1 k\u1EBFt qu\u1EA3 c\xF3 th\u1EC3.", "\u0110\u1EBFm s\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i.", "L\u1EADp t\u1EC9 s\u1ED1 v\xE0 r\xFAt g\u1ECDn."],
        worked: [{
          prompt: "M\u1ED9t h\u1ED9p c\xF3 12 th\u1EBB \u0111\xE1nh s\u1ED1 t\u1EEB 1 \u0111\u1EBFn 12. R\xFAt ng\u1EABu nhi\xEAn m\u1ED9t th\u1EBB. T\xEDnh x\xE1c su\u1EA5t \u0111\u1EC3 r\xFAt \u0111\u01B0\u1EE3c th\u1EBB ghi s\u1ED1 chia h\u1EBFt cho 3.",
          thinking: ["T\u1ED5ng s\u1ED1 k\u1EBFt qu\u1EA3 l\xE0 12; \u0111\u1EBFm b\u1ED9i c\u1EE7a 3 trong kho\u1EA3ng 1 \u0111\u1EBFn 12."],
          solution: [
            "C\xE1c th\u1EBB chia h\u1EBFt cho 3: $3;6;9;12$ \u2014 c\xF3 4 th\u1EBB.",
            "$P=\\f{4}{12}=\\f{1}{3}$."
          ]
        }]
      }
    ],
    bank: ["g7.thong-ke", "g7.xac-suat"]
  }
];

// src/content/g8/topics.ts
var G8_TOPICS = [
  {
    id: "g8-t1",
    grade: 8,
    term: "HK1",
    strand: "SO_DAI_SO",
    order: 1,
    name: "\u0110a th\u1EE9c \u2014 H\u1EB1ng \u0111\u1EB3ng th\u1EE9c \u2014 Ph\xE2n t\xEDch th\xE0nh nh\xE2n t\u1EED",
    summary: "\u0110\u01A1n th\u1EE9c, \u0111a th\u1EE9c nhi\u1EC1u bi\u1EBFn, b\u1EA3y h\u1EB1ng \u0111\u1EB3ng th\u1EE9c \u0111\xE1ng nh\u1EDB v\xE0 c\xE1c ph\u01B0\u01A1ng ph\xE1p ph\xE2n t\xEDch \u0111a th\u1EE9c th\xE0nh nh\xE2n t\u1EED.",
    outcomes: [
      "Th\u1EF1c hi\u1EC7n ph\xE9p c\u1ED9ng, tr\u1EEB, nh\xE2n, chia \u0111a th\u1EE9c nhi\u1EC1u bi\u1EBFn.",
      "V\u1EADn d\u1EE5ng th\xE0nh th\u1EA1o b\u1EA3y h\u1EB1ng \u0111\u1EB3ng th\u1EE9c \u0111\xE1ng nh\u1EDB theo c\u1EA3 hai chi\u1EC1u.",
      "Ph\xE2n t\xEDch \u0111a th\u1EE9c th\xE0nh nh\xE2n t\u1EED b\u1EB1ng nhi\u1EC1u ph\u01B0\u01A1ng ph\xE1p ph\u1ED1i h\u1EE3p."
    ],
    theory: [
      {
        heading: "1. B\u1EA3y h\u1EB1ng \u0111\u1EB3ng th\u1EE9c \u0111\xE1ng nh\u1EDB",
        body: ["\u0110\xE2y l\xE0 b\u1ED9 c\xF4ng c\u1EE5 quan tr\u1ECDng nh\u1EA5t c\u1EE7a \u0110\u1EA1i s\u1ED1 THCS, ph\u1EA3i thu\u1ED9c theo **c\u1EA3 hai chi\u1EC1u**."],
        formulas: [
          "$(A+B)^{2}=A^{2}+2AB+B^{2}$",
          "$(A-B)^{2}=A^{2}-2AB+B^{2}$",
          "$A^{2}-B^{2}=(A-B)(A+B)$",
          "$(A+B)^{3}=A^{3}+3A^{2}B+3AB^{2}+B^{3}$",
          "$(A-B)^{3}=A^{3}-3A^{2}B+3AB^{2}-B^{3}$",
          "$A^{3}+B^{3}=(A+B)(A^{2}-AB+B^{2})$",
          "$A^{3}-B^{3}=(A-B)(A^{2}+AB+B^{2})$"
        ],
        caution: [
          "$A^{2}+B^{2}$ **kh\xF4ng** ph\xE2n t\xEDch \u0111\u01B0\u1EE3c tr\xEAn t\u1EADp s\u1ED1 th\u1EF1c.",
          "Ph\xE2n bi\u1EC7t $A^{2}-AB+B^{2}$ (b\xECnh ph\u01B0\u01A1ng thi\u1EBFu) v\u1EDBi $(A-B)^{2}=A^{2}-2AB+B^{2}$."
        ]
      },
      {
        heading: "2. B\u1ED1n ph\u01B0\u01A1ng ph\xE1p ph\xE2n t\xEDch th\xE0nh nh\xE2n t\u1EED",
        body: ["Th\u1EE9 t\u1EF1 \u01B0u ti\xEAn khi g\u1EB7p m\u1ED9t \u0111a th\u1EE9c b\u1EA5t k\u1EF3:"],
        formulas: [
          "**B\u01B0\u1EDBc 1**: \u0110\u1EB7t nh\xE2n t\u1EED chung (lu\xF4n th\u1EED \u0111\u1EA7u ti\xEAn).",
          "**B\u01B0\u1EDBc 2**: D\xF9ng h\u1EB1ng \u0111\u1EB3ng th\u1EE9c.",
          "**B\u01B0\u1EDBc 3**: Nh\xF3m h\u1EA1ng t\u1EED (th\u01B0\u1EDDng nh\xF3m 2\u20132 ho\u1EB7c 3\u20131).",
          "**B\u01B0\u1EDBc 4**: T\xE1ch h\u1EA1ng t\u1EED / th\xEAm b\u1EDBt h\u1EA1ng t\u1EED."
        ],
        caution: ["Ph\xE2n t\xEDch ph\u1EA3i **tri\u1EC7t \u0111\u1EC3**: m\u1ED7i nh\xE2n t\u1EED thu \u0111\u01B0\u1EE3c \u0111\u1EC1u kh\xF4ng ph\xE2n t\xEDch th\xEAm \u0111\u01B0\u1EE3c n\u1EEFa."]
      },
      {
        heading: "3. K\u1EF9 thu\u1EADt t\xE1ch h\u1EA1ng t\u1EED cho tam th\u1EE9c b\u1EADc hai",
        body: ["V\u1EDBi $ax^{2}+bx+c$: t\xECm hai s\u1ED1 c\xF3 t\xEDch $a\\cdot c$ v\xE0 t\u1ED5ng $b$, r\u1ED3i t\xE1ch $bx$ th\xE0nh hai h\u1EA1ng t\u1EED."],
        formulas: [
          "V\xED d\u1EE5 $x^{2}-5x+6$: t\xECm hai s\u1ED1 t\xEDch $6$, t\u1ED5ng $-5$ l\xE0 $-2$ v\xE0 $-3$.",
          "$x^{2}-5x+6=x^{2}-2x-3x+6=x(x-2)-3(x-2)=(x-2)(x-3)$"
        ]
      }
    ],
    decode: [
      { signal: "\u0110a th\u1EE9c c\xF3 2 h\u1EA1ng t\u1EED", action: "Th\u1EED ngay $A^{2}-B^{2}$, $A^{3}\\pm B^{3}$ ho\u1EB7c \u0111\u1EB7t nh\xE2n t\u1EED chung.", why: "Hai h\u1EA1ng t\u1EED ch\u1EC9 c\xF3 ba kh\u1EA3 n\u0103ng \u0111\xF3." },
      { signal: "\u0110a th\u1EE9c c\xF3 3 h\u1EA1ng t\u1EED", action: "Th\u1EED $(A\\pm B)^{2}$; n\u1EBFu kh\xF4ng \u0111\u01B0\u1EE3c th\xEC t\xE1ch h\u1EA1ng t\u1EED gi\u1EEFa.", why: "Ba h\u1EA1ng t\u1EED l\xE0 d\u1EA5u hi\u1EC7u c\u1EE7a b\xECnh ph\u01B0\u01A1ng m\u1ED9t t\u1ED5ng/hi\u1EC7u ho\u1EB7c tam th\u1EE9c b\u1EADc hai." },
      { signal: "\u0110a th\u1EE9c c\xF3 4 h\u1EA1ng t\u1EED", action: "Nh\xF3m 2\u20132 ho\u1EB7c 3\u20131 (nh\xF3m 3 \u0111\u1EC3 t\u1EA1o h\u1EB1ng \u0111\u1EB3ng th\u1EE9c).", why: "Nh\xF3m 3\u20131 th\u01B0\u1EDDng d\u1EABn t\u1EDBi $A^{2}-B^{2}$." },
      { signal: "B\xE0i to\xE1n t\xEDnh gi\xE1 tr\u1ECB bi\u1EC3u th\u1EE9c c\xF3 s\u1ED1 \u201Cl\u1EBB\u201D", action: "Ph\xE2n t\xEDch th\xE0nh nh\xE2n t\u1EED tr\u01B0\u1EDBc r\u1ED3i m\u1EDBi thay s\u1ED1.", why: "\u0110\u1EC1 lu\xF4n c\xE0i \u0111\u1EC3 sau khi ph\xE2n t\xEDch, s\u1ED1 x\u1EA5u b\u1ECB tri\u1EC7t ti\xEAu." },
      { signal: "Ch\u1EE9ng minh chia h\u1EBFt cho $n$", action: "Ph\xE2n t\xEDch th\xE0nh t\xEDch c\xF3 ch\u1EE9a th\u1EEBa s\u1ED1 $n$.", why: "Chia h\u1EBFt \u27FA t\xE1ch \u0111\u01B0\u1EE3c th\u1EEBa s\u1ED1 t\u01B0\u01A1ng \u1EE9ng." },
      { signal: "T\xECm GTNN/GTLN c\u1EE7a tam th\u1EE9c b\u1EADc hai", action: "\u0110\u01B0a v\u1EC1 d\u1EA1ng $(x+m)^{2}+k$ (ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng).", why: "$(x+m)^{2}\\ge0$ cho ngay gi\xE1 tr\u1ECB ch\u1EB7n." }
    ],
    mindmap: {
      root: "\u0110A TH\u1EE8C \u2014 H\u1EB0NG \u0110\u1EB2NG TH\u1EE8C \u2014 NH\xC2N T\u1EEC",
      branches: [
        { title: "\u0110\u01A1n th\u1EE9c, \u0111a th\u1EE9c", items: ["Thu g\u1ECDn, b\u1EADc", "C\u1ED9ng, tr\u1EEB, nh\xE2n", "Chia \u0111\u01A1n th\u1EE9c, \u0111a th\u1EE9c"] },
        { title: "7 h\u1EB1ng \u0111\u1EB3ng th\u1EE9c", items: ["B\xECnh ph\u01B0\u01A1ng t\u1ED5ng, hi\u1EC7u", "Hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng", "L\u1EADp ph\u01B0\u01A1ng t\u1ED5ng, hi\u1EC7u", "T\u1ED5ng, hi\u1EC7u hai l\u1EADp ph\u01B0\u01A1ng"] },
        { title: "Ph\xE2n t\xEDch nh\xE2n t\u1EED", items: ["\u0110\u1EB7t nh\xE2n t\u1EED chung", "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c", "Nh\xF3m h\u1EA1ng t\u1EED", "T\xE1ch, th\xEAm b\u1EDBt"] },
        { title: "\u1EE8ng d\u1EE5ng", items: ["T\xEDnh nhanh gi\xE1 tr\u1ECB", "T\xECm $x$", "Ch\u1EE9ng minh chia h\u1EBFt", "C\u1EF1c tr\u1ECB"] }
      ]
    },
    practiceSkills: [
      {
        title: "Quy tr\xECnh ph\xE2n t\xEDch nh\xE2n t\u1EED \u201Ckh\xF4ng bao gi\u1EDD b\xED\u201D",
        detail: [
          "1. C\xF3 nh\xE2n t\u1EED chung kh\xF4ng? \u2192 \u0110\u1EB7t ra ngo\xE0i.",
          "2. \u0110\u1EBFm s\u1ED1 h\u1EA1ng t\u1EED: 2 \u2192 h\u1EB1ng \u0111\u1EB3ng th\u1EE9c hi\u1EC7u/t\u1ED5ng; 3 \u2192 b\xECnh ph\u01B0\u01A1ng ho\u1EB7c t\xE1ch; 4 tr\u1EDF l\xEAn \u2192 nh\xF3m.",
          "3. Sau m\u1ED7i b\u01B0\u1EDBc, ki\u1EC3m tra t\u1EEBng nh\xE2n t\u1EED c\xF2n ph\xE2n t\xEDch \u0111\u01B0\u1EE3c n\u1EEFa kh\xF4ng.",
          "4. Nh\xE2n ng\u01B0\u1EE3c l\u1EA1i \u0111\u1EC3 ki\u1EC3m tra k\u1EBFt qu\u1EA3."
        ]
      },
      {
        title: "K\u1EF9 n\u0103ng ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng",
        detail: [
          "$x^{2}+bx=\\left(x+\\f{b}{2}\\right)^{2}-\\f{b^{2}}{4}$.",
          "Lu\xF4n l\u1EA5y n\u1EEDa h\u1EC7 s\u1ED1 c\u1EE7a $x$ r\u1ED3i b\xECnh ph\u01B0\u01A1ng \u0111\u1EC3 b\xF9 tr\u1EEB.",
          "D\xF9ng cho b\xE0i t\xECm GTNN, GTLN v\xE0 gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai \u1EDF l\u1EDBp 9."
        ]
      }
    ],
    types: [
      {
        id: "g8-t1-d1",
        name: "D\u1EA1ng 1. Khai tri\u1EC3n v\xE0 r\xFAt g\u1ECDn b\u1EB1ng h\u1EB1ng \u0111\u1EB3ng th\u1EE9c",
        level: "NB",
        method: ["Nh\u1EADn d\u1EA1ng $A$, $B$.", "\xC1p d\u1EE5ng \u0111\xFAng c\xF4ng th\u1EE9c.", "Thu g\u1ECDn k\u1EBFt qu\u1EA3."],
        worked: [{
          prompt: "R\xFAt g\u1ECDn $M=(2x+3)^{2}-(2x-3)^{2}$.",
          thinking: ["C\xF3 d\u1EA1ng $A^{2}-B^{2}$ v\u1EDBi $A=2x+3$, $B=2x-3$ \u2192 d\xF9ng lu\xF4n hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng, nhanh h\u01A1n khai tri\u1EC3n."],
          solution: [
            "$M=[(2x+3)-(2x-3)]\\cdot[(2x+3)+(2x-3)]$",
            "$M=6\\cdot4x=24x$."
          ],
          remark: "Nh\xECn ra $A^{2}-B^{2}$ gi\xFAp r\xFAt ng\u1EAFn t\u1EEB 6 d\xF2ng khai tri\u1EC3n xu\u1ED1ng c\xF2n 2 d\xF2ng."
        }]
      },
      {
        id: "g8-t1-d2",
        name: "D\u1EA1ng 2. Ph\xE2n t\xEDch \u0111a th\u1EE9c th\xE0nh nh\xE2n t\u1EED",
        level: "TH",
        method: ["\u0110\u1EB7t nh\xE2n t\u1EED chung \u2192 h\u1EB1ng \u0111\u1EB3ng th\u1EE9c \u2192 nh\xF3m \u2192 t\xE1ch.", "Ki\u1EC3m tra ph\xE2n t\xEDch \u0111\xE3 tri\u1EC7t \u0111\u1EC3 ch\u01B0a."],
        pitfalls: ["D\u1EEBng l\u1EA1i khi ch\u01B0a ph\xE2n t\xEDch h\u1EBFt.", "Nh\xF3m sai d\u1EA5u khi \u0111\u1EB7t d\u1EA5u tr\u1EEB ra ngo\xE0i."],
        worked: [{
          prompt: "Ph\xE2n t\xEDch th\xE0nh nh\xE2n t\u1EED: $A=x^{2}-2xy+y^{2}-9$.",
          thinking: [
            "B\u1ED1n h\u1EA1ng t\u1EED. Ba h\u1EA1ng t\u1EED \u0111\u1EA7u t\u1EA1o th\xE0nh $(x-y)^{2}$ \u2192 nh\xF3m 3\u20131.",
            "Sau khi nh\xF3m ta c\xF3 hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng."
          ],
          solution: [
            "$A=(x^{2}-2xy+y^{2})-9=(x-y)^{2}-3^{2}$",
            "$A=(x-y-3)(x-y+3)$."
          ]
        }]
      },
      {
        id: "g8-t1-d3",
        name: "D\u1EA1ng 3. T\xECm x b\u1EB1ng ph\xE2n t\xEDch nh\xE2n t\u1EED",
        level: "VD",
        method: ["Chuy\u1EC3n h\u1EBFt v\u1EC1 m\u1ED9t v\u1EBF, v\u1EBF kia b\u1EB1ng 0.", "Ph\xE2n t\xEDch v\u1EBF tr\xE1i th\xE0nh nh\xE2n t\u1EED.", "Cho t\u1EEBng nh\xE2n t\u1EED b\u1EB1ng 0."],
        pitfalls: ["Chia hai v\u1EBF cho bi\u1EC3u th\u1EE9c ch\u1EE9a $x$ (l\xE0m m\u1EA5t nghi\u1EC7m)."],
        worked: [{
          prompt: "T\xECm $x$: $x^{3}-4x=0$.",
          thinking: ["Kh\xF4ng \u0111\u01B0\u1EE3c chia hai v\u1EBF cho $x$ v\xEC s\u1EBD m\u1EA5t nghi\u1EC7m $x=0$. Ph\u1EA3i ph\xE2n t\xEDch th\xE0nh nh\xE2n t\u1EED."],
          solution: [
            "$x(x^{2}-4)=0$",
            "$x(x-2)(x+2)=0$",
            "$x=0$ ho\u1EB7c $x=2$ ho\u1EB7c $x=-2$.",
            "V\u1EADy $x\\in\\{0;2;-2\\}$."
          ]
        }]
      },
      {
        id: "g8-t1-d4",
        name: "D\u1EA1ng 4. V\u1EADn d\u1EE5ng cao \u2014 c\u1EF1c tr\u1ECB v\xE0 ch\u1EE9ng minh",
        level: "VDC",
        method: ["Ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng \u0111\u1EC3 ch\u1EB7n.", "V\u1EDBi ch\u1EE9ng minh chia h\u1EBFt: ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 t\u01B0\u01A1ng \u1EE9ng.", "Ch\u1EC9 r\xF5 d\u1EA5u b\u1EB1ng x\u1EA3y ra khi n\xE0o."],
        worked: [{
          prompt: "T\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a $P=x^{2}-6x+13$.",
          thinking: ["Ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng: n\u1EEDa h\u1EC7 s\u1ED1 c\u1EE7a $x$ l\xE0 $-3$, b\xECnh ph\u01B0\u01A1ng l\xE0 9."],
          solution: [
            "$P=x^{2}-6x+9+4=(x-3)^{2}+4$.",
            "V\xEC $(x-3)^{2}\\ge0$ v\u1EDBi m\u1ECDi $x$ n\xEAn $P\\ge4$.",
            "D\u1EA5u \u201C=\u201D x\u1EA3y ra khi $x-3=0\\Leftrightarrow x=3$.",
            "V\u1EADy $P_{\\min}=4$ khi $x=3$."
          ]
        }, {
          prompt: "Ch\u1EE9ng minh $n^{3}-n$ chia h\u1EBFt cho 6 v\u1EDBi m\u1ECDi s\u1ED1 nguy\xEAn $n$.",
          thinking: ["Ph\xE2n t\xEDch th\xE0nh t\xEDch ba s\u1ED1 nguy\xEAn li\xEAn ti\u1EBFp \u2014 trong ba s\u1ED1 li\xEAn ti\u1EBFp lu\xF4n c\xF3 m\u1ED9t b\u1ED9i c\u1EE7a 2 v\xE0 m\u1ED9t b\u1ED9i c\u1EE7a 3."],
          solution: [
            "$n^{3}-n=n(n^{2}-1)=n(n-1)(n+1)=(n-1)n(n+1)$.",
            "\u0110\xE2y l\xE0 t\xEDch ba s\u1ED1 nguy\xEAn li\xEAn ti\u1EBFp.",
            "Trong ba s\u1ED1 nguy\xEAn li\xEAn ti\u1EBFp lu\xF4n c\xF3 \xEDt nh\u1EA5t m\u1ED9t s\u1ED1 chia h\u1EBFt cho 2 v\xE0 m\u1ED9t s\u1ED1 chia h\u1EBFt cho 3.",
            "V\xEC \u01AFCLN$(2;3)=1$ n\xEAn t\xEDch chia h\u1EBFt cho $2\\cdot3=6$.",
            "V\u1EADy $n^{3}-n;\\vdots;6$ v\u1EDBi m\u1ECDi $n\\in\\Z$."
          ]
        }]
      }
    ],
    bank: ["g8.hang-dang-thuc", "g8.nhan-tu", "g8.timx-nhantu", "g8.cuc-tri"]
  },
  {
    id: "g8-t2",
    grade: 8,
    term: "HK1",
    strand: "SO_DAI_SO",
    order: 2,
    name: "Ph\xE2n th\u1EE9c \u0111\u1EA1i s\u1ED1",
    summary: "Ph\xE2n th\u1EE9c, \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh, r\xFAt g\u1ECDn, quy \u0111\u1ED3ng v\xE0 b\u1ED1n ph\xE9p t\xEDnh v\u1EDBi ph\xE2n th\u1EE9c.",
    outcomes: [
      "T\xECm \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh c\u1EE7a ph\xE2n th\u1EE9c.",
      "R\xFAt g\u1ECDn ph\xE2n th\u1EE9c, quy \u0111\u1ED3ng m\u1EABu nhi\u1EC1u ph\xE2n th\u1EE9c.",
      "Th\u1EF1c hi\u1EC7n c\u1ED9ng, tr\u1EEB, nh\xE2n, chia ph\xE2n th\u1EE9c v\xE0 r\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c t\u1ED5ng h\u1EE3p."
    ],
    theory: [
      {
        heading: "1. Ph\xE2n th\u1EE9c v\xE0 \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh",
        body: [],
        formulas: [
          "Ph\xE2n th\u1EE9c $\\f{A}{B}$ v\u1EDBi $A,B$ l\xE0 \u0111a th\u1EE9c, $B\\ne0$.",
          "**\u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh**: m\u1EABu th\u1EE9c kh\xE1c 0.",
          "$\\f{A}{B}=\\f{C}{D}\\Leftrightarrow AD=BC$",
          "R\xFAt g\u1ECDn: $\\f{A\\cdot M}{B\\cdot M}=\\f{A}{B}$ ($M\\ne0$)"
        ],
        caution: ["Lu\xF4n vi\u1EBFt \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh **tr\u01B0\u1EDBc** khi r\xFAt g\u1ECDn \u2014 thi\u1EBFu l\xE0 m\u1EA5t \u0111i\u1EC3m."]
      },
      {
        heading: "2. C\xE1c ph\xE9p t\xEDnh",
        body: [],
        formulas: [
          "C\u1ED9ng, tr\u1EEB: quy \u0111\u1ED3ng m\u1EABu (m\u1EABu chung l\xE0 BCNN c\u1EE7a c\xE1c m\u1EABu sau khi ph\xE2n t\xEDch th\xE0nh nh\xE2n t\u1EED).",
          "$\\f{A}{B}\\cdot\\f{C}{D}=\\f{AC}{BD}$ ; $\\f{A}{B}:\\f{C}{D}=\\f{A}{B}\\cdot\\f{D}{C}$",
          "Ph\xE2n th\u1EE9c \u0111\u1ED1i: $-\\f{A}{B}=\\f{-A}{B}=\\f{A}{-B}$"
        ]
      }
    ],
    decode: [
      { signal: "B\xE0i \u201Cr\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c\u201D nhi\u1EC1u ph\xE2n th\u1EE9c", action: "Ph\xE2n t\xEDch m\u1ECDi m\u1EABu th\xE0nh nh\xE2n t\u1EED tr\u01B0\u1EDBc, r\u1ED3i m\u1EDBi t\xECm m\u1EABu chung.", why: "Ch\u01B0a ph\xE2n t\xEDch th\xEC kh\xF4ng th\u1EA5y \u0111\u01B0\u1EE3c m\u1EABu chung nh\u1ECF nh\u1EA5t." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Ct\xECm $x$ \u0111\u1EC3 bi\u1EC3u th\u1EE9c nh\u1EADn gi\xE1 tr\u1ECB nguy\xEAn\u201D", action: "R\xFAt g\u1ECDn r\u1ED3i t\xE1ch ph\u1EA7n nguy\xEAn, cho m\u1EABu l\xE0 \u01B0\u1EDBc c\u1EE7a t\u1EED c\xF2n l\u1EA1i.", why: "K\u1EF9 thu\u1EADt t\xE1ch ph\u1EA7n nguy\xEAn nh\u01B0 \u1EDF l\u1EDBp 6." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Ct\xECm $x$ \u0111\u1EC3 $P>0$ / $P<0$\u201D", action: "R\xFAt g\u1ECDn r\u1ED3i x\xE9t d\u1EA5u t\u1EED v\xE0 m\u1EABu.", why: "D\u1EA5u c\u1EE7a th\u01B0\u01A1ng ph\u1EE5 thu\u1ED9c d\u1EA5u c\u1EE7a t\u1EED v\xE0 m\u1EABu." },
      { signal: "C\xF3 $\\f{1}{x}-\\f{1}{x+1}$ d\u1EA1ng li\xEAn ti\u1EBFp", action: "D\xF9ng k\u1EF9 thu\u1EADt sai ph\xE2n \u0111\u1EC3 kh\u1EED.", why: "T\u1ED5ng d\xE0i tri\u1EC7t ti\xEAu v\u1EC1 hai s\u1ED1 h\u1EA1ng \u0111\u1EA7u \u2013 cu\u1ED1i." }
    ],
    mindmap: {
      root: "PH\xC2N TH\u1EE8C \u0110\u1EA0I S\u1ED0",
      branches: [
        { title: "Kh\xE1i ni\u1EC7m", items: ["$\\f{A}{B}$, $B\\ne0$", "\u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh", "Hai ph\xE2n th\u1EE9c b\u1EB1ng nhau"] },
        { title: "Bi\u1EBFn \u0111\u1ED5i", items: ["R\xFAt g\u1ECDn", "Quy \u0111\u1ED3ng m\u1EABu", "\u0110\u1ED5i d\u1EA5u"] },
        { title: "Ph\xE9p t\xEDnh", items: ["C\u1ED9ng, tr\u1EEB", "Nh\xE2n, chia", "R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c t\u1ED5ng h\u1EE3p"] },
        { title: "B\xE0i to\xE1n ph\u1EE5", items: ["T\xEDnh gi\xE1 tr\u1ECB t\u1EA1i $x=a$", "T\xECm $x$ \u0111\u1EC3 $P$ nguy\xEAn", "X\xE9t d\u1EA5u $P$", "T\xECm GTNN, GTLN"] }
      ]
    },
    types: [
      {
        id: "g8-t2-d1",
        name: "D\u1EA1ng 1. \u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh v\xE0 r\xFAt g\u1ECDn",
        level: "TH",
        method: ["Ph\xE2n t\xEDch t\u1EED v\xE0 m\u1EABu th\xE0nh nh\xE2n t\u1EED.", "\u0110\u1EB7t \u0111i\u1EC1u ki\u1EC7n m\u1EABu kh\xE1c 0.", "R\xFAt g\u1ECDn nh\xE2n t\u1EED chung."],
        worked: [{
          prompt: "Cho $P=\\f{x^{2}-4}{x^{2}+2x}$. T\xECm \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh v\xE0 r\xFAt g\u1ECDn $P$.",
          thinking: ["Ph\xE2n t\xEDch c\u1EA3 t\u1EED v\xE0 m\u1EABu \u0111\u1EC3 l\u1ED9 nh\xE2n t\u1EED chung."],
          solution: [
            "$x^{2}-4=(x-2)(x+2)$; $x^{2}+2x=x(x+2)$.",
            "\u0110i\u1EC1u ki\u1EC7n: $x(x+2)\\ne0\\Leftrightarrow x\\ne0$ v\xE0 $x\\ne-2$.",
            "$P=\\f{(x-2)(x+2)}{x(x+2)}=\\f{x-2}{x}$."
          ]
        }]
      },
      {
        id: "g8-t2-d2",
        name: "D\u1EA1ng 2. C\u1ED9ng, tr\u1EEB, nh\xE2n, chia ph\xE2n th\u1EE9c",
        level: "VD",
        method: ["Ph\xE2n t\xEDch m\u1EABu.", "T\xECm m\u1EABu th\u1EE9c chung.", "Quy \u0111\u1ED3ng v\xE0 thu g\u1ECDn t\u1EED.", "R\xFAt g\u1ECDn k\u1EBFt qu\u1EA3."],
        worked: [{
          prompt: "R\xFAt g\u1ECDn $Q=\\f{1}{x-2}+\\f{1}{x+2}-\\f{4}{x^{2}-4}$ (v\u1EDBi $x\\ne\\pm2$).",
          thinking: ["$x^{2}-4=(x-2)(x+2)$ ch\xEDnh l\xE0 m\u1EABu chung."],
          solution: [
            "M\u1EABu chung: $(x-2)(x+2)$.",
            "$Q=\\f{(x+2)+(x-2)-4}{(x-2)(x+2)}=\\f{2x-4}{(x-2)(x+2)}$",
            "$Q=\\f{2(x-2)}{(x-2)(x+2)}=\\f{2}{x+2}$."
          ]
        }]
      },
      {
        id: "g8-t2-d3",
        name: "D\u1EA1ng 3. V\u1EADn d\u1EE5ng cao \u2014 b\xE0i to\xE1n ph\u1EE5 sau khi r\xFAt g\u1ECDn",
        level: "VDC",
        method: ["R\xFAt g\u1ECDn v\u1EC1 d\u1EA1ng \u0111\u01A1n gi\u1EA3n nh\u1EA5t.", "T\xE1ch ph\u1EA7n nguy\xEAn n\u1EBFu t\xECm gi\xE1 tr\u1ECB nguy\xEAn.", "\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh tr\u01B0\u1EDBc khi k\u1EBFt lu\u1EADn."],
        pitfalls: ["Qu\xEAn lo\u1EA1i c\xE1c gi\xE1 tr\u1ECB vi ph\u1EA1m \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh."],
        worked: [{
          prompt: "Cho $P=\\f{x-2}{x}$ (v\u1EDBi $x\\ne0$). T\xECm c\xE1c s\u1ED1 nguy\xEAn $x$ \u0111\u1EC3 $P$ nh\u1EADn gi\xE1 tr\u1ECB nguy\xEAn.",
          thinking: ["T\xE1ch $\\f{x-2}{x}=1-\\f{2}{x}$ \u0111\u1EC3 l\u1ED9 \u0111i\u1EC1u ki\u1EC7n chia h\u1EBFt."],
          solution: [
            "$P=1-\\f{2}{x}$.",
            "$P\\in\\Z\\Leftrightarrow \\f{2}{x}\\in\\Z\\Leftrightarrow x$ l\xE0 \u01B0\u1EDBc c\u1EE7a 2.",
            "$x\\in\\{-2;-1;1;2\\}$ (\u0111\u1EC1u tho\u1EA3 $x\\ne0$).",
            "V\u1EADy $x\\in\\{-2;-1;1;2\\}$."
          ]
        }]
      }
    ],
    bank: ["g8.phan-thuc-rutgon", "g8.phan-thuc-tinh", "g8.phan-thuc-vdc"]
  },
  {
    id: "g8-t3",
    grade: 8,
    term: "HK2",
    strand: "SO_DAI_SO",
    order: 3,
    name: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n v\xE0 Gi\u1EA3i b\xE0i to\xE1n b\u1EB1ng c\xE1ch l\u1EADp ph\u01B0\u01A1ng tr\xECnh",
    summary: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n, ph\u01B0\u01A1ng tr\xECnh \u0111\u01B0a \u0111\u01B0\u1EE3c v\u1EC1 b\u1EADc nh\u1EA5t, v\xE0 quy tr\xECnh gi\u1EA3i b\xE0i to\xE1n th\u1EF1c t\u1EBF b\u1EB1ng c\xE1ch l\u1EADp ph\u01B0\u01A1ng tr\xECnh.",
    outcomes: [
      "Gi\u1EA3i th\xE0nh th\u1EA1o ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n v\xE0 ph\u01B0\u01A1ng tr\xECnh \u0111\u01B0a \u0111\u01B0\u1EE3c v\u1EC1 d\u1EA1ng \u0111\xF3.",
      "L\u1EADp \u0111\u01B0\u1EE3c ph\u01B0\u01A1ng tr\xECnh t\u1EEB t\xECnh hu\u1ED1ng th\u1EF1c t\u1EBF v\xE0 gi\u1EA3i, \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n."
    ],
    theory: [
      {
        heading: "1. Ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n",
        body: [],
        formulas: [
          "D\u1EA1ng: $ax+b=0$ ($a\\ne0$), nghi\u1EC7m duy nh\u1EA5t $x=-\\f{b}{a}$",
          "Quy t\u1EAFc chuy\u1EC3n v\u1EBF: chuy\u1EC3n m\u1ED9t h\u1EA1ng t\u1EED sang v\u1EBF kia v\xE0 **\u0111\u1ED5i d\u1EA5u**",
          "Quy t\u1EAFc nh\xE2n/chia: nh\xE2n ho\u1EB7c chia hai v\u1EBF cho c\xF9ng m\u1ED9t s\u1ED1 **kh\xE1c 0**"
        ],
        caution: ["N\u1EBFu $a=0$: $b=0$ th\xEC ph\u01B0\u01A1ng tr\xECnh c\xF3 v\xF4 s\u1ED1 nghi\u1EC7m; $b\\ne0$ th\xEC v\xF4 nghi\u1EC7m."]
      },
      {
        heading: "2. S\xE1u b\u01B0\u1EDBc gi\u1EA3i b\xE0i to\xE1n b\u1EB1ng c\xE1ch l\u1EADp ph\u01B0\u01A1ng tr\xECnh",
        body: ["\u0110\xE2y l\xE0 quy tr\xECnh chu\u1EA9n, vi\u1EBFt \u0111\u1EE7 m\u1EDBi tr\u1ECDn \u0111i\u1EC3m."],
        formulas: [
          "1. G\u1ECDi \u1EA9n, \u0111\u1EB7t **\u0111\u01A1n v\u1ECB** v\xE0 **\u0111i\u1EC1u ki\u1EC7n** cho \u1EA9n.",
          "2. Bi\u1EC3u di\u1EC5n c\xE1c \u0111\u1EA1i l\u01B0\u1EE3ng ch\u01B0a bi\u1EBFt kh\xE1c theo \u1EA9n.",
          "3. L\u1EADp ph\u01B0\u01A1ng tr\xECnh d\u1EF1a v\xE0o m\u1ED1i quan h\u1EC7 trong \u0111\u1EC1.",
          "4. Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh.",
          "5. **\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n**, lo\u1EA1i nghi\u1EC7m kh\xF4ng h\u1EE3p l\u1EC7.",
          "6. K\u1EBFt lu\u1EADn c\xF3 \u0111\u01A1n v\u1ECB."
        ]
      },
      {
        heading: "3. Ba m\xF4 h\xECnh b\xE0i to\xE1n th\u01B0\u1EDDng g\u1EB7p",
        body: [],
        formulas: [
          "Chuy\u1EC3n \u0111\u1ED9ng: $s=v\\cdot t$ ; xu\xF4i d\xF2ng $v+v_{n}$, ng\u01B0\u1EE3c d\xF2ng $v-v_{n}$",
          "N\u0103ng su\u1EA5t \u2013 c\xF4ng vi\u1EC7c: coi c\xF4ng vi\u1EC7c l\xE0 1, n\u0103ng su\u1EA5t $=\\f{1}{t}$",
          "To\xE1n ph\u1EA7n tr\u0103m \u2013 t\u1EC9 l\u1EC7: gi\xE1 sau $=$ gi\xE1 tr\u01B0\u1EDBc $\\cdot(1\\pm\\f{m}{100})$"
        ]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 cho qu\xE3ng \u0111\u01B0\u1EDDng kh\xF4ng \u0111\u1ED5i, hai v\u1EADn t\u1ED1c kh\xE1c nhau", action: "L\u1EADp ph\u01B0\u01A1ng tr\xECnh theo th\u1EDDi gian: $\\f{s}{v_1}-\\f{s}{v_2}=\\Delta t$.", why: "\u0110\u1EA1i l\u01B0\u1EE3ng chung (qu\xE3ng \u0111\u01B0\u1EDDng) l\xE0 c\u1EA7u n\u1ED1i gi\u1EEFa hai t\xECnh hu\u1ED1ng." },
      { signal: "\u0110\u1EC1 n\xF3i \u201Cl\xE0m chung xong trong $t$ gi\u1EDD\u201D", action: "C\u1ED9ng n\u0103ng su\u1EA5t: $\\f{1}{t_1}+\\f{1}{t_2}=\\f{1}{t}$.", why: "N\u0103ng su\u1EA5t c\xF3 t\xEDnh c\u1ED9ng, th\u1EDDi gian th\xEC kh\xF4ng." },
      { signal: "B\xE0i to\xE1n ca n\xF4/thuy\u1EC1n tr\xEAn s\xF4ng", action: "V\u1EADn t\u1ED1c xu\xF4i $=v+v_n$, ng\u01B0\u1EE3c $=v-v_n$.", why: "D\xF2ng n\u01B0\u1EDBc c\u1ED9ng/tr\u1EEB tr\u1EF1c ti\u1EBFp v\xE0o v\u1EADn t\u1ED1c th\u1EF1c." },
      { signal: "\u0110\u1EC1 cho \u201Cn\u1EBFu th\xEAm/b\u1EDBt \u2026 th\xEC \u2026\u201D", action: "Vi\u1EBFt hai bi\u1EC3u th\u1EE9c cho hai t\xECnh hu\u1ED1ng r\u1ED3i \u0111\u1EB7t b\u1EB1ng nhau theo d\u1EEF ki\u1EC7n.", why: "C\u1EA5u tr\xFAc \u201Cn\u1EBFu\u2026 th\xEC\u2026\u201D ch\xEDnh l\xE0 ph\u01B0\u01A1ng tr\xECnh." },
      { signal: "B\xE0i to\xE1n v\u1EC1 s\u1ED1 c\xF3 hai ch\u1EEF s\u1ED1", action: "\u0110\u1EB7t s\u1ED1 l\xE0 $\\ov{ab}=10a+b$ v\u1EDBi $1\\le a\\le9$, $0\\le b\\le9$.", why: "Chuy\u1EC3n ng\xF4n ng\u1EEF ch\u1EEF s\u1ED1 sang bi\u1EC3u th\u1EE9c \u0111\u1EA1i s\u1ED1." }
    ],
    mindmap: {
      root: "PH\u01AF\u01A0NG TR\xCCNH B\u1EACC NH\u1EA4T",
      branches: [
        { title: "L\xFD thuy\u1EBFt", items: ["$ax+b=0$", "Quy t\u1EAFc chuy\u1EC3n v\u1EBF", "Quy t\u1EAFc nh\xE2n", "Bi\u1EC7n lu\u1EADn khi $a=0$"] },
        { title: "K\u1EF9 thu\u1EADt gi\u1EA3i", items: ["Quy \u0111\u1ED3ng kh\u1EED m\u1EABu", "B\u1ECF ngo\u1EB7c", "Chuy\u1EC3n v\u1EBF thu g\u1ECDn", "Chia h\u1EC7 s\u1ED1"] },
        { title: "6 b\u01B0\u1EDBc l\u1EADp PT", items: ["G\u1ECDi \u1EA9n + \u0111i\u1EC1u ki\u1EC7n", "Bi\u1EC3u di\u1EC5n \u0111\u1EA1i l\u01B0\u1EE3ng", "L\u1EADp PT", "Gi\u1EA3i", "\u0110\u1ED1i chi\u1EBFu", "K\u1EBFt lu\u1EADn"] },
        { title: "M\xF4 h\xECnh", items: ["Chuy\u1EC3n \u0111\u1ED9ng $s=vt$", "N\u0103ng su\u1EA5t $\\f{1}{t}$", "Ph\u1EA7n tr\u0103m", "S\u1ED1 c\xF3 hai ch\u1EEF s\u1ED1"] }
      ]
    },
    practiceSkills: [
      {
        title: "K\u1EF9 n\u0103ng l\u1EADp b\u1EA3ng d\u1EEF ki\u1EC7n",
        detail: [
          "K\u1EBB b\u1EA3ng 3 c\u1ED9t: \u0110\u1EA1i l\u01B0\u1EE3ng | T\xECnh hu\u1ED1ng 1 | T\xECnh hu\u1ED1ng 2.",
          "\u0110i\u1EC1n c\xE1c \xF4 \u0111\xE3 bi\u1EBFt, \xF4 ch\u1EE9a \u1EA9n, \xF4 bi\u1EC3u di\u1EC5n theo \u1EA9n.",
          "D\xF2ng n\xE0o c\xF3 d\u1EEF ki\u1EC7n so s\xE1nh ch\xEDnh l\xE0 n\u01A1i l\u1EADp ph\u01B0\u01A1ng tr\xECnh."
        ]
      }
    ],
    types: [
      {
        id: "g8-t3-d1",
        name: "D\u1EA1ng 1. Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh \u0111\u01B0a v\u1EC1 b\u1EADc nh\u1EA5t",
        level: "TH",
        method: ["Quy \u0111\u1ED3ng, kh\u1EED m\u1EABu.", "B\u1ECF ngo\u1EB7c.", "Chuy\u1EC3n v\u1EBF, thu g\u1ECDn.", "Chia h\u1EC7 s\u1ED1 v\xE0 k\u1EBFt lu\u1EADn."],
        worked: [{
          prompt: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh $\\f{2x-1}{3}-\\f{x+2}{4}=1$.",
          thinking: ["M\u1EABu chung l\xE0 12 \u2192 nh\xE2n c\u1EA3 hai v\u1EBF v\u1EDBi 12 \u0111\u1EC3 kh\u1EED m\u1EABu."],
          solution: [
            "Nh\xE2n hai v\u1EBF v\u1EDBi 12: $4(2x-1)-3(x+2)=12$.",
            "$8x-4-3x-6=12$",
            "$5x=22\\Rightarrow x=\\f{22}{5}$.",
            "V\u1EADy ph\u01B0\u01A1ng tr\xECnh c\xF3 nghi\u1EC7m $x=\\f{22}{5}$."
          ]
        }]
      },
      {
        id: "g8-t3-d2",
        name: "D\u1EA1ng 2. B\xE0i to\xE1n chuy\u1EC3n \u0111\u1ED9ng",
        level: "VD",
        method: ["L\u1EADp b\u1EA3ng $s$, $v$, $t$ cho t\u1EEBng ch\u1EB7ng.", "D\xF9ng $t=\\f{s}{v}$.", "L\u1EADp ph\u01B0\u01A1ng tr\xECnh theo d\u1EEF ki\u1EC7n ch\xEAnh l\u1EC7ch."],
        worked: [{
          prompt: "M\u1ED9t \xF4 t\xF4 \u0111i t\u1EEB A \u0111\u1EBFn B v\u1EDBi v\u1EADn t\u1ED1c $50\\,km/h$, l\xFAc v\u1EC1 \u0111i v\u1EDBi v\u1EADn t\u1ED1c $60\\,km/h$ n\xEAn th\u1EDDi gian v\u1EC1 \xEDt h\u01A1n th\u1EDDi gian \u0111i 30 ph\xFAt. T\xEDnh qu\xE3ng \u0111\u01B0\u1EDDng AB.",
          thinking: [
            "Qu\xE3ng \u0111\u01B0\u1EDDng l\xE0 \u0111\u1EA1i l\u01B0\u1EE3ng chung \u2192 g\u1ECDi n\xF3 l\xE0 \u1EA9n.",
            "\u0110\u1ED5i 30 ph\xFAt $=0{,}5$ gi\u1EDD."
          ],
          solution: [
            "G\u1ECDi qu\xE3ng \u0111\u01B0\u1EDDng AB l\xE0 $x$ (km, $x>0$).",
            "Th\u1EDDi gian \u0111i: $\\f{x}{50}$ (gi\u1EDD). Th\u1EDDi gian v\u1EC1: $\\f{x}{60}$ (gi\u1EDD).",
            "Theo \u0111\u1EC1: $\\f{x}{50}-\\f{x}{60}=\\f{1}{2}$.",
            "Nh\xE2n hai v\u1EBF v\u1EDBi 300: $6x-5x=150\\Rightarrow x=150$.",
            "$x=150>0$ tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n.",
            "V\u1EADy qu\xE3ng \u0111\u01B0\u1EDDng AB d\xE0i **150 km**."
          ]
        }]
      },
      {
        id: "g8-t3-d3",
        name: "D\u1EA1ng 3. B\xE0i to\xE1n n\u0103ng su\u1EA5t \u2014 l\xE0m chung, l\xE0m ri\xEAng",
        level: "VDC",
        method: ["Coi to\xE0n b\u1ED9 c\xF4ng vi\u1EC7c l\xE0 1.", "N\u0103ng su\u1EA5t m\u1ED7i gi\u1EDD $=\\f{1}{\\text{th\u1EDDi gian}}$.", "C\u1ED9ng n\u0103ng su\u1EA5t khi l\xE0m chung."],
        worked: [{
          prompt: "Hai ng\u01B0\u1EDDi c\xF9ng l\xE0m chung m\u1ED9t c\xF4ng vi\u1EC7c th\xEC sau 6 gi\u1EDD xong. N\u1EBFu ng\u01B0\u1EDDi th\u1EE9 nh\u1EA5t l\xE0m m\u1ED9t m\xECnh th\xEC m\u1EA5t 10 gi\u1EDD. H\u1ECFi ng\u01B0\u1EDDi th\u1EE9 hai l\xE0m m\u1ED9t m\xECnh th\xEC bao l\xE2u xong c\xF4ng vi\u1EC7c?",
          thinking: [
            "Kh\xF4ng c\u1ED9ng \u0111\u01B0\u1EE3c th\u1EDDi gian, ph\u1EA3i c\u1ED9ng **n\u0103ng su\u1EA5t**.",
            "N\u0103ng su\u1EA5t chung $=$ n\u0103ng su\u1EA5t ng\u01B0\u1EDDi 1 $+$ n\u0103ng su\u1EA5t ng\u01B0\u1EDDi 2."
          ],
          solution: [
            "G\u1ECDi th\u1EDDi gian ng\u01B0\u1EDDi th\u1EE9 hai l\xE0m m\u1ED9t m\xECnh l\xE0 $x$ (gi\u1EDD, $x>0$).",
            "Trong 1 gi\u1EDD: ng\u01B0\u1EDDi 1 l\xE0m \u0111\u01B0\u1EE3c $\\f{1}{10}$ c\xF4ng vi\u1EC7c, ng\u01B0\u1EDDi 2 l\xE0m \u0111\u01B0\u1EE3c $\\f{1}{x}$ c\xF4ng vi\u1EC7c.",
            "L\xE0m chung trong 1 gi\u1EDD \u0111\u01B0\u1EE3c $\\f{1}{6}$ c\xF4ng vi\u1EC7c, n\xEAn $\\f{1}{10}+\\f{1}{x}=\\f{1}{6}$.",
            "$\\f{1}{x}=\\f{1}{6}-\\f{1}{10}=\\f{5-3}{30}=\\f{2}{30}=\\f{1}{15}$.",
            "$x=15$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n $x>0$).",
            "V\u1EADy ng\u01B0\u1EDDi th\u1EE9 hai l\xE0m m\u1ED9t m\xECnh m\u1EA5t **15 gi\u1EDD**."
          ],
          remark: "Nguy\xEAn t\u1EAFc b\u1EA5t di b\u1EA5t d\u1ECBch: c\u1ED9ng n\u0103ng su\u1EA5t, kh\xF4ng bao gi\u1EDD c\u1ED9ng th\u1EDDi gian."
        }]
      }
    ],
    bank: ["g8.pt-bac-nhat", "g8.lap-pt-chuyen-dong", "g8.lap-pt-nang-suat"]
  },
  {
    id: "g8-t4",
    grade: 8,
    term: "HK2",
    strand: "SO_DAI_SO",
    order: 4,
    name: "H\xE0m s\u1ED1 b\u1EADc nh\u1EA5t v\xE0 \u0110\u1ED3 th\u1ECB",
    summary: "H\xE0m s\u1ED1, m\u1EB7t ph\u1EB3ng to\u1EA1 \u0111\u1ED9, h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t $y=ax+b$, \u0111\u1ED3 th\u1ECB v\xE0 h\u1EC7 s\u1ED1 g\xF3c.",
    outcomes: [
      "Nh\u1EADn bi\u1EBFt h\xE0m s\u1ED1, t\xEDnh gi\xE1 tr\u1ECB c\u1EE7a h\xE0m s\u1ED1.",
      "V\u1EBD \u0111\u1ED3 th\u1ECB h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t, x\xE1c \u0111\u1ECBnh h\u1EC7 s\u1ED1 g\xF3c.",
      "X\xE9t v\u1ECB tr\xED t\u01B0\u01A1ng \u0111\u1ED1i c\u1EE7a hai \u0111\u01B0\u1EDDng th\u1EB3ng; gi\u1EA3i b\xE0i to\xE1n th\u1EF1c ti\u1EC5n."
    ],
    theory: [
      {
        heading: "H\xE0m s\u1ED1 b\u1EADc nh\u1EA5t $y=ax+b$ ($a\\ne0$)",
        body: [],
        formulas: [
          "\u0110\u1ED3 th\u1ECB l\xE0 m\u1ED9t **\u0111\u01B0\u1EDDng th\u1EB3ng** c\u1EAFt tr\u1EE5c tung t\u1EA1i \u0111i\u1EC3m $(0;b)$ v\xE0 c\u1EAFt tr\u1EE5c ho\xE0nh t\u1EA1i $\\left(-\\f{b}{a};0\\right)$.",
          "$a$ l\xE0 **h\u1EC7 s\u1ED1 g\xF3c**: $a>0$ th\xEC h\xE0m s\u1ED1 \u0111\u1ED3ng bi\u1EBFn (\u0111\u01B0\u1EDDng th\u1EB3ng \u0111i l\xEAn); $a<0$ th\xEC ngh\u1ECBch bi\u1EBFn (\u0111i xu\u1ED1ng).",
          "Hai \u0111\u01B0\u1EDDng th\u1EB3ng $y=ax+b$ v\xE0 $y=a'x+b'$: song song $\\Leftrightarrow a=a'$ v\xE0 $b\\ne b'$; c\u1EAFt nhau $\\Leftrightarrow a\\ne a'$; tr\xF9ng nhau $\\Leftrightarrow a=a'$, $b=b'$.",
          "\u0110i\u1EC3m $M(x_0;y_0)$ thu\u1ED9c \u0111\u1ED3 th\u1ECB $\\Leftrightarrow y_0=ax_0+b$."
        ]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 cho \u0111\u1ED3 th\u1ECB \u0111i qua hai \u0111i\u1EC3m", action: "Thay to\u1EA1 \u0111\u1ED9 v\xE0o $y=ax+b$ \u0111\u1EC3 l\u1EADp h\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh.", why: "Hai \u0111i\u1EC3m x\xE1c \u0111\u1ECBnh duy nh\u1EA5t m\u1ED9t \u0111\u01B0\u1EDDng th\u1EB3ng." },
      { signal: "\u0110\u1EC1 n\xF3i \u201Csong song v\u1EDBi \u0111\u01B0\u1EDDng th\u1EB3ng $y=2x+1$\u201D", action: "L\u1EA5y $a=2$, r\u1ED3i d\xF9ng \u0111i\u1EC1u ki\u1EC7n c\xF2n l\u1EA1i \u0111\u1EC3 t\xECm $b$ (nh\u1EDB $b\\ne1$).", why: "Song song \u27FA c\xF9ng h\u1EC7 s\u1ED1 g\xF3c, kh\xE1c tung \u0111\u1ED9 g\u1ED1c." },
      { signal: "\u0110\u1EC1 h\u1ECFi giao \u0111i\u1EC3m hai \u0111\u01B0\u1EDDng th\u1EB3ng", action: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m $ax+b=a'x+b'$.", why: "Giao \u0111i\u1EC3m l\xE0 \u0111i\u1EC3m chung c\u1EE7a hai \u0111\u1ED3 th\u1ECB." },
      { signal: "B\xE0i to\xE1n th\u1EF1c t\u1EBF c\xF3 \u201Cph\xED c\u1ED1 \u0111\u1ECBnh + ph\xED theo \u0111\u01A1n v\u1ECB\u201D", action: "M\xF4 h\xECnh ho\xE1 b\u1EB1ng $y=ax+b$ v\u1EDBi $b$ l\xE0 ph\xED c\u1ED1 \u0111\u1ECBnh.", why: "\u0110\xE2y l\xE0 m\xF4 h\xECnh tuy\u1EBFn t\xEDnh \u0111i\u1EC3n h\xECnh." }
    ],
    mindmap: {
      root: "H\xC0M S\u1ED0 B\u1EACC NH\u1EA4T",
      branches: [
        { title: "H\xE0m s\u1ED1", items: ["Kh\xE1i ni\u1EC7m", "Gi\xE1 tr\u1ECB $f(x_0)$", "M\u1EB7t ph\u1EB3ng to\u1EA1 \u0111\u1ED9"] },
        { title: "$y=ax+b$", items: ["$a\\ne0$", "\u0110\u1ED3ng bi\u1EBFn / ngh\u1ECBch bi\u1EBFn", "H\u1EC7 s\u1ED1 g\xF3c $a$", "Tung \u0111\u1ED9 g\u1ED1c $b$"] },
        { title: "\u0110\u1ED3 th\u1ECB", items: ["\u0110\u01B0\u1EDDng th\u1EB3ng", "V\u1EBD qua 2 \u0111i\u1EC3m", "Giao v\u1EDBi hai tr\u1EE5c"] },
        { title: "V\u1ECB tr\xED t\u01B0\u01A1ng \u0111\u1ED1i", items: ["Song song", "C\u1EAFt nhau", "Tr\xF9ng nhau", "Vu\xF4ng g\xF3c: $aa'=-1$"] }
      ]
    },
    types: [
      {
        id: "g8-t4-d1",
        name: "D\u1EA1ng 1. X\xE1c \u0111\u1ECBnh h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t",
        level: "TH",
        method: ["Thay to\u1EA1 \u0111\u1ED9 \u0111i\u1EC3m v\xE0o c\xF4ng th\u1EE9c.", "Gi\u1EA3i h\u1EC7 t\xECm $a$, $b$.", "K\u1EBFt lu\u1EADn c\xF4ng th\u1EE9c h\xE0m s\u1ED1."],
        worked: [{
          prompt: "X\xE1c \u0111\u1ECBnh h\xE0m s\u1ED1 $y=ax+b$ bi\u1EBFt \u0111\u1ED3 th\u1ECB \u0111i qua hai \u0111i\u1EC3m $A(1;5)$ v\xE0 $B(-2;-4)$.",
          thinking: ["Thay l\u1EA7n l\u01B0\u1EE3t hai \u0111i\u1EC3m \u0111\u1EC3 c\xF3 h\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh."],
          solution: [
            "Thay $A(1;5)$: $a+b=5$. (1)",
            "Thay $B(-2;-4)$: $-2a+b=-4$. (2)",
            "L\u1EA5y (1) tr\u1EEB (2): $3a=9\\Rightarrow a=3$; thay v\xE0o (1): $b=2$.",
            "V\u1EADy $y=3x+2$."
          ]
        }]
      },
      {
        id: "g8-t4-d2",
        name: "D\u1EA1ng 2. V\u1ECB tr\xED t\u01B0\u01A1ng \u0111\u1ED1i v\xE0 b\xE0i to\xE1n tham s\u1ED1",
        level: "VD",
        method: ["So s\xE1nh h\u1EC7 s\u1ED1 g\xF3c.", "\xC1p d\u1EE5ng \u0111i\u1EC1u ki\u1EC7n song song / c\u1EAFt / tr\xF9ng.", "\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n $a\\ne0$."],
        worked: [{
          prompt: "T\xECm $m$ \u0111\u1EC3 \u0111\u01B0\u1EDDng th\u1EB3ng $y=(m-1)x+3$ song song v\u1EDBi \u0111\u01B0\u1EDDng th\u1EB3ng $y=2x-5$.",
          thinking: ["Song song \u27FA h\u1EC7 s\u1ED1 g\xF3c b\u1EB1ng nhau v\xE0 tung \u0111\u1ED9 g\u1ED1c kh\xE1c nhau."],
          solution: [
            "\u0110i\u1EC1u ki\u1EC7n h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t: $m-1\\ne0\\Leftrightarrow m\\ne1$.",
            "Song song: $m-1=2\\Rightarrow m=3$; \u0111\u1ED3ng th\u1EDDi $3\\ne-5$ (tho\u1EA3).",
            "V\u1EADy $m=3$."
          ]
        }]
      }
    ],
    bank: ["g8.ham-so-bac-nhat", "g8.do-thi"]
  },
  {
    id: "g8-t5",
    grade: 8,
    term: "HK1",
    strand: "HINH_HOC",
    order: 5,
    name: "T\u1EE9 gi\xE1c \u2014 C\xE1c h\xECnh \u0111\u1EB7c bi\u1EC7t",
    summary: "T\u1EE9 gi\xE1c, h\xECnh thang c\xE2n, h\xECnh b\xECnh h\xE0nh, h\xECnh ch\u1EEF nh\u1EADt, h\xECnh thoi, h\xECnh vu\xF4ng: t\xEDnh ch\u1EA5t v\xE0 d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt.",
    outcomes: [
      "Nh\u1EADn bi\u1EBFt v\xE0 v\u1EADn d\u1EE5ng t\xEDnh ch\u1EA5t, d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt c\xE1c t\u1EE9 gi\xE1c \u0111\u1EB7c bi\u1EC7t.",
      "Ch\u1EE9ng minh m\u1ED9t t\u1EE9 gi\xE1c l\xE0 h\xECnh b\xECnh h\xE0nh, h\xECnh ch\u1EEF nh\u1EADt, h\xECnh thoi, h\xECnh vu\xF4ng."
    ],
    theory: [
      {
        heading: "1. S\u01A1 \u0111\u1ED3 quan h\u1EC7 gi\u1EEFa c\xE1c t\u1EE9 gi\xE1c",
        body: ["N\u1EAFm s\u01A1 \u0111\u1ED3 n\xE0y th\xEC m\u1ECDi b\xE0i ch\u1EE9ng minh \u0111\u1EC1u c\xF3 \u0111\u01B0\u1EDDng \u0111i r\xF5 r\xE0ng."],
        formulas: [
          "T\u1EE9 gi\xE1c $\\to$ H\xECnh thang $\\to$ H\xECnh thang c\xE2n",
          "T\u1EE9 gi\xE1c $\\to$ H\xECnh b\xECnh h\xE0nh $\\to$ H\xECnh ch\u1EEF nh\u1EADt $\\to$ H\xECnh vu\xF4ng",
          "H\xECnh b\xECnh h\xE0nh $\\to$ H\xECnh thoi $\\to$ H\xECnh vu\xF4ng",
          "H\xECnh vu\xF4ng $=$ H\xECnh ch\u1EEF nh\u1EADt $+$ hai c\u1EA1nh k\u1EC1 b\u1EB1ng nhau $=$ H\xECnh thoi $+$ m\u1ED9t g\xF3c vu\xF4ng"
        ]
      },
      {
        heading: "2. D\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt (thu\u1ED9c l\xF2ng)",
        body: [],
        formulas: [
          "**H\xECnh b\xECnh h\xE0nh**: 2 c\u1EB7p c\u1EA1nh \u0111\u1ED1i song song; ho\u1EB7c 2 c\u1EB7p c\u1EA1nh \u0111\u1ED1i b\u1EB1ng nhau; ho\u1EB7c 1 c\u1EB7p c\u1EA1nh \u0111\u1ED1i v\u1EEBa song song v\u1EEBa b\u1EB1ng nhau; ho\u1EB7c 2 c\u1EB7p g\xF3c \u0111\u1ED1i b\u1EB1ng nhau; ho\u1EB7c 2 \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m m\u1ED7i \u0111\u01B0\u1EDDng.",
          "**H\xECnh ch\u1EEF nh\u1EADt**: h\xECnh b\xECnh h\xE0nh c\xF3 1 g\xF3c vu\xF4ng; ho\u1EB7c c\xF3 2 \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau; ho\u1EB7c t\u1EE9 gi\xE1c c\xF3 3 g\xF3c vu\xF4ng.",
          "**H\xECnh thoi**: h\xECnh b\xECnh h\xE0nh c\xF3 2 c\u1EA1nh k\u1EC1 b\u1EB1ng nhau; ho\u1EB7c 2 \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c; ho\u1EB7c 1 \u0111\u01B0\u1EDDng ch\xE9o l\xE0 ph\xE2n gi\xE1c c\u1EE7a m\u1ED9t g\xF3c; ho\u1EB7c t\u1EE9 gi\xE1c c\xF3 4 c\u1EA1nh b\u1EB1ng nhau.",
          "**H\xECnh vu\xF4ng**: h\xECnh ch\u1EEF nh\u1EADt c\xF3 2 c\u1EA1nh k\u1EC1 b\u1EB1ng nhau (ho\u1EB7c 2 \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c); ho\u1EB7c h\xECnh thoi c\xF3 1 g\xF3c vu\xF4ng (ho\u1EB7c 2 \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau)."
        ],
        caution: ["Trong tam gi\xE1c vu\xF4ng, \u0111\u01B0\u1EDDng trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n b\u1EB1ng n\u1EEDa c\u1EA1nh huy\u1EC1n \u2014 d\u1EA5u hi\u1EC7u n\xE0y r\u1EA5t hay d\xF9ng."]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 cho hai trung \u0111i\u1EC3m c\u1EE7a hai c\u1EA1nh \u0111\u1ED1i", action: "Ngh\u0129 t\u1EDBi \u0111\u01B0\u1EDDng trung b\xECnh ho\u1EB7c h\xECnh b\xECnh h\xE0nh (1 c\u1EB7p c\u1EA1nh song song v\xE0 b\u1EB1ng nhau).", why: "Trung \u0111i\u1EC3m l\xE0 ngu\u1ED3n sinh ra c\u1EB7p c\u1EA1nh song song \u2013 b\u1EB1ng nhau." },
      { signal: "\u0110\u1EC1 cho \u201Cl\u1EA5y $E$ \u0111\u1ED1i x\u1EE9ng v\u1EDBi $D$ qua $M$\u201D", action: "Suy ra $M$ l\xE0 trung \u0111i\u1EC3m $DE$ \u2192 hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m \u2192 h\xECnh b\xECnh h\xE0nh.", why: "\u0110\u1ED1i x\u1EE9ng t\xE2m ch\xEDnh l\xE0 d\u1EA5u hi\u1EC7u h\xECnh b\xECnh h\xE0nh." },
      { signal: "C\xF3 tam gi\xE1c vu\xF4ng v\xE0 trung \u0111i\u1EC3m c\u1EA1nh huy\u1EC1n", action: "D\xF9ng trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n b\u1EB1ng n\u1EEDa c\u1EA1nh huy\u1EC1n.", why: "Cho ngay ba \u0111o\u1EA1n b\u1EB1ng nhau, r\u1EA5t m\u1EA1nh khi ch\u1EE9ng minh." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Ct\xECm \u0111i\u1EC1u ki\u1EC7n \u0111\u1EC3 t\u1EE9 gi\xE1c l\xE0 h\xECnh vu\xF4ng\u201D", action: "Ch\u1EE9ng minh n\xF3 l\xE0 h\xECnh ch\u1EEF nh\u1EADt (ho\u1EB7c h\xECnh thoi) tr\u01B0\u1EDBc, r\u1ED3i th\xEAm m\u1ED9t \u0111i\u1EC1u ki\u1EC7n.", why: "\u0110i t\u1EEBng n\u1EA5c theo s\u01A1 \u0111\u1ED3 quan h\u1EC7 th\xEC kh\xF4ng bao gi\u1EDD thi\u1EBFu \xFD." }
    ],
    mindmap: {
      root: "T\u1EE8 GI\xC1C \u0110\u1EB6C BI\u1EC6T",
      branches: [
        { title: "H\xECnh thang", items: ["2 c\u1EA1nh \u0111\u1ED1i song song", "H\xECnh thang c\xE2n: 2 g\xF3c \u0111\xE1y b\u1EB1ng nhau", "\u0110\u01B0\u1EDDng trung b\xECnh"] },
        { title: "H\xECnh b\xECnh h\xE0nh", items: ["5 d\u1EA5u hi\u1EC7u", "C\u1EA1nh \u0111\u1ED1i, g\xF3c \u0111\u1ED1i b\u1EB1ng nhau", "\u0110\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m"] },
        { title: "H\xECnh ch\u1EEF nh\u1EADt", items: ["HBH + 1 g\xF3c vu\xF4ng", "2 \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau", "Trung tuy\u1EBFn c\u1EA1nh huy\u1EC1n"] },
        { title: "H\xECnh thoi", items: ["HBH + 2 c\u1EA1nh k\u1EC1 b\u1EB1ng nhau", "2 \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c", "\u0110\u01B0\u1EDDng ch\xE9o l\xE0 ph\xE2n gi\xE1c"] },
        { title: "H\xECnh vu\xF4ng", items: ["HCN + 2 c\u1EA1nh k\u1EC1 b\u1EB1ng nhau", "H\xECnh thoi + 1 g\xF3c vu\xF4ng", "\u0110\u1EE7 m\u1ECDi t\xEDnh ch\u1EA5t"] }
      ]
    },
    practiceSkills: [
      {
        title: "Chi\u1EBFn thu\u1EADt \u201Cleo thang\u201D khi ch\u1EE9ng minh t\u1EE9 gi\xE1c \u0111\u1EB7c bi\u1EC7t",
        detail: [
          "Lu\xF4n ch\u1EE9ng minh h\xECnh b\xECnh h\xE0nh tr\u01B0\u1EDBc (d\u1EC5 nh\u1EA5t, nhi\u1EC1u d\u1EA5u hi\u1EC7u nh\u1EA5t).",
          "Th\xEAm m\u1ED9t \u0111i\u1EC1u ki\u1EC7n g\xF3c vu\xF4ng \u2192 h\xECnh ch\u1EEF nh\u1EADt; th\xEAm hai c\u1EA1nh k\u1EC1 b\u1EB1ng nhau \u2192 h\xECnh thoi.",
          "C\xF3 c\u1EA3 hai \u2192 h\xECnh vu\xF4ng.",
          "Kh\xF4ng nh\u1EA3y c\xF3c: nh\u1EA3y th\u1EB3ng l\xEAn h\xECnh vu\xF4ng th\u01B0\u1EDDng thi\u1EBFu l\u1EADp lu\u1EADn."
        ]
      }
    ],
    types: [
      {
        id: "g8-t5-d1",
        name: "D\u1EA1ng 1. Ch\u1EE9ng minh t\u1EE9 gi\xE1c l\xE0 h\xECnh b\xECnh h\xE0nh",
        level: "VD",
        method: ["Ch\u1ECDn d\u1EA5u hi\u1EC7u ph\xF9 h\u1EE3p v\u1EDBi d\u1EEF ki\u1EC7n \u0111\u1EC1 cho.", "Ch\u1EE9ng minh \u0111\u1EA7y \u0111\u1EE7 hai \xFD c\u1EE7a d\u1EA5u hi\u1EC7u.", "K\u1EBFt lu\u1EADn."],
        worked: [{
          prompt: "Cho tam gi\xE1c $ABC$, g\u1ECDi $M$ l\xE0 trung \u0111i\u1EC3m $BC$. Tr\xEAn tia \u0111\u1ED1i c\u1EE7a tia $MA$ l\u1EA5y \u0111i\u1EC3m $D$ sao cho $MD=MA$. Ch\u1EE9ng minh t\u1EE9 gi\xE1c $ABDC$ l\xE0 h\xECnh b\xECnh h\xE0nh.",
          thinking: ["$M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a c\u1EA3 $BC$ v\xE0 $AD$ \u2192 hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m m\u1ED7i \u0111\u01B0\u1EDDng."],
          solution: [
            "X\xE9t t\u1EE9 gi\xE1c $ABDC$ c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o l\xE0 $AD$ v\xE0 $BC$ c\u1EAFt nhau t\u1EA1i $M$.",
            "$M$ l\xE0 trung \u0111i\u1EC3m $BC$ (gi\u1EA3 thi\u1EBFt).",
            "$M$ l\xE0 trung \u0111i\u1EC3m $AD$ (v\xEC $D$ thu\u1ED9c tia \u0111\u1ED1i c\u1EE7a $MA$ v\xE0 $MD=MA$).",
            "V\u1EADy $ABDC$ l\xE0 h\xECnh b\xECnh h\xE0nh (hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m m\u1ED7i \u0111\u01B0\u1EDDng)."
          ]
        }]
      },
      {
        id: "g8-t5-d2",
        name: "D\u1EA1ng 2. Ch\u1EE9ng minh h\xECnh ch\u1EEF nh\u1EADt, h\xECnh thoi, h\xECnh vu\xF4ng",
        level: "VDC",
        method: ["Leo thang: h\xECnh b\xECnh h\xE0nh \u2192 th\xEAm \u0111i\u1EC1u ki\u1EC7n.", "T\xECm \u0111i\u1EC1u ki\u1EC7n \u0111\u1EC3 tr\u1EDF th\xE0nh h\xECnh vu\xF4ng."],
        worked: [{
          prompt: "Cho tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$, $M$ l\xE0 trung \u0111i\u1EC3m $BC$. G\u1ECDi $D$, $E$ l\u1EA7n l\u01B0\u1EE3t l\xE0 ch\xE2n \u0111\u01B0\u1EDDng vu\xF4ng g\xF3c h\u1EA1 t\u1EEB $M$ xu\u1ED1ng $AB$, $AC$. Ch\u1EE9ng minh t\u1EE9 gi\xE1c $ADME$ l\xE0 h\xECnh ch\u1EEF nh\u1EADt.",
          thinking: ["T\u1EE9 gi\xE1c c\xF3 ba g\xF3c vu\xF4ng l\xE0 h\xECnh ch\u1EEF nh\u1EADt \u2014 \u0111\xE2y l\xE0 d\u1EA5u hi\u1EC7u ng\u1EAFn nh\u1EA5t \u1EDF \u0111\xE2y."],
          solution: [
            "X\xE9t t\u1EE9 gi\xE1c $ADME$ c\xF3: $\\angle DAE=90\\deg$ (v\xEC $\\tri ABC$ vu\xF4ng t\u1EA1i $A$).",
            "$\\angle ADM=90\\deg$ (v\xEC $MD\\perp AB$).",
            "$\\angle AEM=90\\deg$ (v\xEC $ME\\perp AC$).",
            "T\u1EE9 gi\xE1c c\xF3 ba g\xF3c vu\xF4ng n\xEAn $ADME$ l\xE0 h\xECnh ch\u1EEF nh\u1EADt."
          ],
          remark: "N\u1EBFu \u0111\u1EC1 h\u1ECFi th\xEAm \u201C\u0111i\u1EC1u ki\u1EC7n \u0111\u1EC3 $ADME$ l\xE0 h\xECnh vu\xF4ng\u201D th\xEC tr\u1EA3 l\u1EDDi: khi $AB=AC$, t\u1EE9c $\\tri ABC$ vu\xF4ng c\xE2n t\u1EA1i $A$."
        }]
      }
    ],
    bank: ["g8.tu-giac", "g8.hbh", "g8.hcn-hthoi-hvuong"]
  },
  {
    id: "g8-t6",
    grade: 8,
    term: "HK2",
    strand: "HINH_HOC",
    order: 6,
    name: "\u0110\u1ECBnh l\xED Thal\xE8s \u2014 Tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng",
    summary: "\u0110\u1ECBnh l\xED Thal\xE8s, \u0111\u01B0\u1EDDng trung b\xECnh, t\xEDnh ch\u1EA5t \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c, c\xE1c tr\u01B0\u1EDDng h\u1EE3p \u0111\u1ED3ng d\u1EA1ng c\u1EE7a tam gi\xE1c v\xE0 \u1EE9ng d\u1EE5ng.",
    outcomes: [
      "V\u1EADn d\u1EE5ng \u0111\u1ECBnh l\xED Thal\xE8s, Thal\xE8s \u0111\u1EA3o v\xE0 h\u1EC7 qu\u1EA3.",
      "V\u1EADn d\u1EE5ng t\xEDnh ch\u1EA5t \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c trong tam gi\xE1c.",
      "Ch\u1EE9ng minh hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng v\xE0 v\u1EADn d\u1EE5ng \u0111\u1EC3 t\xEDnh \u0111\u1ED9 d\xE0i, ch\u1EE9ng minh h\u1EC7 th\u1EE9c."
    ],
    theory: [
      {
        heading: "1. \u0110\u1ECBnh l\xED Thal\xE8s v\xE0 h\u1EC7 qu\u1EA3",
        body: [],
        formulas: [
          "**Thu\u1EADn**: N\u1EBFu $MN\\para BC$ ($M\\in AB$, $N\\in AC$) th\xEC $\\f{AM}{MB}=\\f{AN}{NC}$ v\xE0 $\\f{AM}{AB}=\\f{AN}{AC}$.",
          "**\u0110\u1EA3o**: N\u1EBFu $\\f{AM}{MB}=\\f{AN}{NC}$ th\xEC $MN\\para BC$.",
          "**H\u1EC7 qu\u1EA3**: N\u1EBFu $MN\\para BC$ th\xEC $\\f{AM}{AB}=\\f{AN}{AC}=\\f{MN}{BC}$.",
          "\u0110\u01B0\u1EDDng trung b\xECnh: n\u1ED1i trung \u0111i\u1EC3m hai c\u1EA1nh, song song v\u1EDBi c\u1EA1nh th\u1EE9 ba v\xE0 b\u1EB1ng n\u1EEDa c\u1EA1nh \u1EA5y.",
          "T\xEDnh ch\u1EA5t \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c: $AD$ l\xE0 ph\xE2n gi\xE1c $\\angle A$ c\u1EE7a $\\tri ABC$ th\xEC $\\f{DB}{DC}=\\f{AB}{AC}$."
        ]
      },
      {
        heading: "2. Ba tr\u01B0\u1EDDng h\u1EE3p \u0111\u1ED3ng d\u1EA1ng c\u1EE7a tam gi\xE1c",
        body: [],
        formulas: [
          "**c.c.c**: ba c\u1EB7p c\u1EA1nh t\u01B0\u01A1ng \u1EE9ng t\u1EC9 l\u1EC7.",
          "**c.g.c**: hai c\u1EB7p c\u1EA1nh t\u1EC9 l\u1EC7 v\xE0 g\xF3c xen gi\u1EEFa b\u1EB1ng nhau.",
          "**g.g**: hai c\u1EB7p g\xF3c b\u1EB1ng nhau (d\xF9ng nhi\u1EC1u nh\u1EA5t).",
          "Tam gi\xE1c vu\xF4ng: m\u1ED9t c\u1EB7p g\xF3c nh\u1ECDn b\u1EB1ng nhau; ho\u1EB7c hai c\u1EA1nh g\xF3c vu\xF4ng t\u1EC9 l\u1EC7; ho\u1EB7c c\u1EA1nh huy\u1EC1n v\xE0 m\u1ED9t c\u1EA1nh g\xF3c vu\xF4ng t\u1EC9 l\u1EC7.",
          "T\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng $k$: t\u1EC9 s\u1ED1 chu vi $=k$, t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch $=k^{2}$."
        ],
        caution: ["Vi\u1EBFt \u0111\xFAng th\u1EE9 t\u1EF1 \u0111\u1EC9nh t\u01B0\u01A1ng \u1EE9ng khi k\xFD hi\u1EC7u $\\tri ABC\\sim\\tri A'B'C'$ \u2014 sai th\u1EE9 t\u1EF1 l\xE0 sai t\u1EC9 l\u1EC7."]
      }
    ],
    decode: [
      { signal: "H\xECnh c\xF3 \u0111\u01B0\u1EDDng th\u1EB3ng song song v\u1EDBi m\u1ED9t c\u1EA1nh tam gi\xE1c", action: "D\xF9ng ngay \u0111\u1ECBnh l\xED Thal\xE8s ho\u1EB7c h\u1EC7 qu\u1EA3 \u0111\u1EC3 l\u1EADp t\u1EC9 s\u1ED1.", why: "Song song sinh ra t\u1EC9 l\u1EC7 \u0111o\u1EA1n th\u1EB3ng." },
      { signal: "\u0110\u1EC1 cho ph\xE2n gi\xE1c trong tam gi\xE1c", action: "D\xF9ng $\\f{DB}{DC}=\\f{AB}{AC}$.", why: "\u0110\xE2y l\xE0 c\xF4ng c\u1EE5 duy nh\u1EA5t chuy\u1EC3n ph\xE2n gi\xE1c th\xE0nh t\u1EC9 s\u1ED1 \u0111\u1ED9 d\xE0i." },
      { signal: "\u0110\u1EC1 y\xEAu c\u1EA7u ch\u1EE9ng minh h\u1EC7 th\u1EE9c d\u1EA1ng $AB\\cdot AC=AD\\cdot AE$", action: "\u0110\u01B0a v\u1EC1 t\u1EC9 s\u1ED1 $\\f{AB}{AD}=\\f{AE}{AC}$ r\u1ED3i t\xECm hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng ch\u1EE9a c\xE1c c\u1EA1nh \u0111\xF3.", why: "T\xEDch ch\xE9o \u27FA t\u1EC9 l\u1EC7 \u27FA \u0111\u1ED3ng d\u1EA1ng." },
      { signal: "C\xF3 hai tam gi\xE1c chung m\u1ED9t g\xF3c", action: "Ch\u1EC9 c\u1EA7n th\xEAm m\u1ED9t c\u1EB7p g\xF3c b\u1EB1ng nhau l\xE0 \u0111\u1EE7 (g.g).", why: "g.g l\xE0 tr\u01B0\u1EDDng h\u1EE3p nh\u1EB9 \u0111i\u1EC1u ki\u1EC7n nh\u1EA5t, \u01B0u ti\xEAn d\xF9ng." },
      { signal: "\u0110\u1EC1 h\u1ECFi t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch", action: "B\xECnh ph\u01B0\u01A1ng t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng.", why: "Di\u1EC7n t\xEDch t\u1EC9 l\u1EC7 v\u1EDBi b\xECnh ph\u01B0\u01A1ng \u0111\u1ED9 d\xE0i." }
    ],
    mindmap: {
      root: "THAL\xC8S \u2014 TAM GI\xC1C \u0110\u1ED2NG D\u1EA0NG",
      branches: [
        { title: "Thal\xE8s", items: ["Thu\u1EADn, \u0111\u1EA3o, h\u1EC7 qu\u1EA3", "\u0110\u01B0\u1EDDng trung b\xECnh", "Chia \u0111o\u1EA1n th\u1EB3ng t\u1EC9 l\u1EC7"] },
        { title: "Ph\xE2n gi\xE1c", items: ["$\\f{DB}{DC}=\\f{AB}{AC}$", "Ph\xE2n gi\xE1c trong, ngo\xE0i"] },
        { title: "\u0110\u1ED3ng d\u1EA1ng", items: ["c.c.c", "c.g.c", "g.g", "Tam gi\xE1c vu\xF4ng"] },
        { title: "T\u1EC9 s\u1ED1", items: ["C\u1EA1nh: $k$", "Chu vi: $k$", "Di\u1EC7n t\xEDch: $k^{2}$", "\u0110\u01B0\u1EDDng cao, trung tuy\u1EBFn: $k$"] },
        { title: "\u1EE8ng d\u1EE5ng", items: ["\u0110o chi\u1EC1u cao gi\xE1n ti\u1EBFp", "Ch\u1EE9ng minh h\u1EC7 th\u1EE9c", "T\xEDnh \u0111\u1ED9 d\xE0i"] }
      ]
    },
    practiceSkills: [
      {
        title: "K\u1EF9 n\u0103ng \u201Ctruy ng\u01B0\u1EE3c\u201D t\u1EEB h\u1EC7 th\u1EE9c c\u1EA7n ch\u1EE9ng minh",
        detail: [
          "Vi\u1EBFt h\u1EC7 th\u1EE9c c\u1EA7n ch\u1EE9ng minh d\u01B0\u1EDBi d\u1EA1ng t\u1EC9 l\u1EC7: $AB\\cdot AC=AD\\cdot AE\\Leftrightarrow\\f{AB}{AD}=\\f{AE}{AC}$.",
          "\u0110\u1ECDc t\u1EC9 l\u1EC7 \u0111\u1EC3 \u0111o\xE1n hai tam gi\xE1c: t\u1EED s\u1ED1 cho tam gi\xE1c th\u1EE9 nh\u1EA5t, m\u1EABu s\u1ED1 cho tam gi\xE1c th\u1EE9 hai.",
          "Ki\u1EC3m tra ch\xFAng c\xF3 chung g\xF3c n\xE0o kh\xF4ng \u2192 d\xF9ng g.g."
        ]
      }
    ],
    types: [
      {
        id: "g8-t6-d1",
        name: "D\u1EA1ng 1. T\xEDnh \u0111\u1ED9 d\xE0i b\u1EB1ng \u0111\u1ECBnh l\xED Thal\xE8s",
        level: "TH",
        method: ["X\xE1c \u0111\u1ECBnh c\u1EB7p \u0111\u01B0\u1EDDng song song.", "L\u1EADp t\u1EC9 s\u1ED1 \u0111\xFAng th\u1EE9 t\u1EF1.", "Gi\u1EA3i t\u1EC9 l\u1EC7 th\u1EE9c."],
        worked: [{
          prompt: "Tam gi\xE1c $ABC$ c\xF3 $MN\\para BC$, $M\\in AB$, $N\\in AC$. Bi\u1EBFt $AM=4$, $MB=6$, $AN=5$. T\xEDnh $NC$.",
          thinking: ["$MN\\para BC$ \u2192 d\xF9ng Thal\xE8s: $\\f{AM}{MB}=\\f{AN}{NC}$."],
          solution: [
            "V\xEC $MN\\para BC$ n\xEAn theo \u0111\u1ECBnh l\xED Thal\xE8s: $\\f{AM}{MB}=\\f{AN}{NC}$.",
            "$\\f{4}{6}=\\f{5}{NC}\\Rightarrow NC=\\f{5\\cdot6}{4}=7{,}5$."
          ]
        }]
      },
      {
        id: "g8-t6-d2",
        name: "D\u1EA1ng 2. Ch\u1EE9ng minh hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng",
        level: "VD",
        method: ["T\xECm g\xF3c chung / g\xF3c b\u1EB1ng nhau.", "Ch\u1EC9 ra c\u1EB7p g\xF3c th\u1EE9 hai.", "K\u1EBFt lu\u1EADn theo g.g r\u1ED3i suy ra t\u1EC9 l\u1EC7 c\u1EA1nh."],
        worked: [{
          prompt: "Cho tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$, \u0111\u01B0\u1EDDng cao $AH$. Ch\u1EE9ng minh $\\tri ABH\\sim\\tri CBA$ v\xE0 suy ra $AB^{2}=BH\\cdot BC$.",
          thinking: ["Hai tam gi\xE1c c\xF3 chung g\xF3c $B$ v\xE0 c\xF9ng c\xF3 m\u1ED9t g\xF3c vu\xF4ng \u2192 g.g."],
          solution: [
            "X\xE9t $\\tri ABH$ v\xE0 $\\tri CBA$ c\xF3:",
            "$\\angle B$ chung; $\\angle AHB=\\angle CAB=90\\deg$.",
            "Do \u0111\xF3 $\\tri ABH\\sim\\tri CBA$ (g.g).",
            "Suy ra $\\f{AB}{CB}=\\f{BH}{BA}$, t\u1EE9c $AB^{2}=BH\\cdot BC$."
          ],
          remark: "\u0110\xE2y ch\xEDnh l\xE0 h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng trong tam gi\xE1c vu\xF4ng s\u1EBD h\u1ECDc k\u1EF9 \u1EDF l\u1EDBp 9 \u2014 ch\u1EE9ng minh b\u1EB1ng \u0111\u1ED3ng d\u1EA1ng."
        }]
      },
      {
        id: "g8-t6-d3",
        name: "D\u1EA1ng 3. V\u1EADn d\u1EE5ng cao \u2014 t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch, b\xE0i to\xE1n th\u1EF1c t\u1EBF",
        level: "VDC",
        method: ["Ch\u1EE9ng minh \u0111\u1ED3ng d\u1EA1ng, t\xECm t\u1EC9 s\u1ED1 $k$.", "T\u1EC9 s\u1ED1 di\u1EC7n t\xEDch $=k^{2}$.", "V\u1EDBi b\xE0i th\u1EF1c t\u1EBF: m\xF4 h\xECnh ho\xE1 b\u1EB1ng hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng."],
        worked: [{
          prompt: "M\u1ED9t c\xE1i c\xE2y c\xF3 b\xF3ng tr\xEAn m\u1EB7t \u0111\u1EA5t d\xE0i $6\\,m$. C\xF9ng l\xFAc \u0111\xF3, m\u1ED9t c\u1ECDc cao $1{,}5\\,m$ c\xF3 b\xF3ng d\xE0i $0{,}9\\,m$. T\xEDnh chi\u1EC1u cao c\u1EE7a c\xE2y.",
          thinking: ["Tia n\u1EAFng song song \u2192 hai tam gi\xE1c vu\xF4ng \u0111\u1ED3ng d\u1EA1ng (g.g)."],
          solution: [
            "G\u1ECDi chi\u1EC1u cao c\xE2y l\xE0 $h$ (m, $h>0$).",
            "Hai tam gi\xE1c vu\xF4ng t\u1EA1o b\u1EDFi c\xE2y \u2013 b\xF3ng c\xE2y v\xE0 c\u1ECDc \u2013 b\xF3ng c\u1ECDc \u0111\u1ED3ng d\u1EA1ng (v\xEC tia n\u1EAFng song song n\xEAn hai g\xF3c nh\u1ECDn b\u1EB1ng nhau).",
            "$\\f{h}{6}=\\f{1{,}5}{0{,}9}\\Rightarrow h=\\f{6\\cdot1{,}5}{0{,}9}=10$.",
            "V\u1EADy c\xE2y cao **10 m**."
          ]
        }]
      }
    ],
    bank: ["g8.thales", "g8.dong-dang", "g8.dong-dang-vdc"]
  },
  {
    id: "g8-t7",
    grade: 8,
    term: "HK1",
    strand: "HINH_HOC",
    order: 7,
    name: "\u0110\u1ECBnh l\xED Pythagore v\xE0 H\xECnh kh\u1ED1i",
    summary: "\u0110\u1ECBnh l\xED Pythagore thu\u1EADn, \u0111\u1EA3o v\xE0 \u1EE9ng d\u1EE5ng; h\xECnh ch\xF3p tam gi\xE1c \u0111\u1EC1u, h\xECnh ch\xF3p t\u1EE9 gi\xE1c \u0111\u1EC1u.",
    outcomes: [
      "V\u1EADn d\u1EE5ng \u0111\u1ECBnh l\xED Pythagore \u0111\u1EC3 t\xEDnh \u0111\u1ED9 d\xE0i v\xE0 nh\u1EADn bi\u1EBFt tam gi\xE1c vu\xF4ng.",
      "M\xF4 t\u1EA3 v\xE0 t\xEDnh di\u1EC7n t\xEDch xung quanh, th\u1EC3 t\xEDch h\xECnh ch\xF3p \u0111\u1EC1u."
    ],
    theory: [
      {
        heading: "C\xF4ng th\u1EE9c tr\u1ECDng t\xE2m",
        body: [],
        formulas: [
          "Pythagore thu\u1EADn: $\\tri ABC$ vu\xF4ng t\u1EA1i $A$ th\xEC $BC^{2}=AB^{2}+AC^{2}$",
          "Pythagore \u0111\u1EA3o: n\u1EBFu $BC^{2}=AB^{2}+AC^{2}$ th\xEC $\\tri ABC$ vu\xF4ng t\u1EA1i $A$",
          "B\u1ED9 ba Pythagore hay g\u1EB7p: $(3;4;5)$, $(6;8;10)$, $(5;12;13)$, $(8;15;17)$, $(7;24;25)$",
          "H\xECnh ch\xF3p \u0111\u1EC1u: $S_{xq}=p\\cdot d$ ($p$ l\xE0 n\u1EEDa chu vi \u0111\xE1y, $d$ l\xE0 trung \u0111o\u1EA1n) ; $V=\\f{1}{3}S_{\\text{\u0111\xE1y}}\\cdot h$"
        ],
        caution: ["C\u1EA1nh huy\u1EC1n lu\xF4n l\xE0 c\u1EA1nh **l\u1EDBn nh\u1EA5t** \u2014 ki\u1EC3m tra \u0111i\u1EC1u n\xE0y tr\u01B0\u1EDBc khi \xE1p d\u1EE5ng Pythagore \u0111\u1EA3o."]
      }
    ],
    decode: [
      { signal: "Tam gi\xE1c vu\xF4ng v\xE0 bi\u1EBFt hai c\u1EA1nh", action: "Pythagore \u0111\u1EC3 t\xECm c\u1EA1nh c\xF2n l\u1EA1i.", why: "C\xF4ng c\u1EE5 tr\u1EF1c ti\u1EBFp nh\u1EA5t." },
      { signal: "\u0110\u1EC1 cho ba \u0111\u1ED9 d\xE0i, h\u1ECFi c\xF3 vu\xF4ng kh\xF4ng", action: "Pythagore \u0111\u1EA3o v\u1EDBi c\u1EA1nh l\u1EDBn nh\u1EA5t.", why: "Ch\u1EC9 c\u1EA7n ki\u1EC3m tra m\u1ED9t \u0111\u1EB3ng th\u1EE9c." },
      { signal: "B\xE0i to\xE1n thang d\u1EF1a t\u01B0\u1EDDng, \u0111\u01B0\u1EDDng ch\xE9o s\xE2n", action: "V\u1EBD tam gi\xE1c vu\xF4ng r\u1ED3i \xE1p Pythagore.", why: "M\xF4 h\xECnh th\u1EF1c t\u1EBF quy v\u1EC1 tam gi\xE1c vu\xF4ng." },
      { signal: "H\xECnh ch\xF3p c\xF3 trung \u0111o\u1EA1n", action: "D\xF9ng $S_{xq}=p\\cdot d$; kh\xF4ng nh\u1EA7m trung \u0111o\u1EA1n v\u1EDBi chi\u1EC1u cao ch\xF3p.", why: "Trung \u0111o\u1EA1n n\u1EB1m tr\xEAn m\u1EB7t b\xEAn, chi\u1EC1u cao n\u1EB1m b\xEAn trong kh\u1ED1i." }
    ],
    mindmap: {
      root: "PYTHAGORE \u2014 H\xCCNH CH\xD3P \u0110\u1EC0U",
      branches: [
        { title: "Pythagore", items: ["Thu\u1EADn", "\u0110\u1EA3o", "B\u1ED9 ba Pythagore", "\u0110\u01B0\u1EDDng ch\xE9o h\xECnh ch\u1EEF nh\u1EADt"] },
        { title: "\u1EE8ng d\u1EE5ng", items: ["Thang d\u1EF1a t\u01B0\u1EDDng", "\u0110\u01B0\u1EDDng ch\xE9o s\xE2n", "Kho\u1EA3ng c\xE1ch hai \u0111i\u1EC3m"] },
        { title: "H\xECnh ch\xF3p \u0111\u1EC1u", items: ["\u0110\xE1y \u0111\u1EC1u, m\u1EB7t b\xEAn l\xE0 tam gi\xE1c c\xE2n", "Trung \u0111o\u1EA1n $d$", "$S_{xq}=p\\cdot d$", "$V=\\f{1}{3}Sh$"] }
      ]
    },
    types: [
      {
        id: "g8-t7-d1",
        name: "D\u1EA1ng 1. T\xEDnh \u0111\u1ED9 d\xE0i b\u1EB1ng Pythagore",
        level: "TH",
        method: ["X\xE1c \u0111\u1ECBnh tam gi\xE1c vu\xF4ng v\xE0 c\u1EA1nh huy\u1EC1n.", "\xC1p d\u1EE5ng c\xF4ng th\u1EE9c.", "L\u1EA5y c\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc."],
        worked: [{
          prompt: "M\u1ED9t c\xE1i thang d\xE0i $5\\,m$ d\u1EF1a v\xE0o t\u01B0\u1EDDng, ch\xE2n thang c\xE1ch ch\xE2n t\u01B0\u1EDDng $3\\,m$. H\u1ECFi thang ch\u1EA1m t\u01B0\u1EDDng \u1EDF \u0111\u1ED9 cao bao nhi\xEAu?",
          thinking: ["Thang l\xE0 c\u1EA1nh huy\u1EC1n, kho\u1EA3ng c\xE1ch ch\xE2n thang \u2013 ch\xE2n t\u01B0\u1EDDng v\xE0 \u0111\u1ED9 cao l\xE0 hai c\u1EA1nh g\xF3c vu\xF4ng."],
          solution: [
            "G\u1ECDi \u0111\u1ED9 cao c\u1EA7n t\xECm l\xE0 $h$ (m, $h>0$).",
            "Theo \u0111\u1ECBnh l\xED Pythagore: $h^{2}+3^{2}=5^{2}\\Rightarrow h^{2}=25-9=16$.",
            "$h=4$ (m)."
          ]
        }]
      },
      {
        id: "g8-t7-d2",
        name: "D\u1EA1ng 2. H\xECnh ch\xF3p \u0111\u1EC1u",
        level: "VD",
        method: ["X\xE1c \u0111\u1ECBnh di\u1EC7n t\xEDch \u0111\xE1y, chu vi \u0111\xE1y.", "\xC1p d\u1EE5ng $S_{xq}=p\\cdot d$ v\xE0 $V=\\f{1}{3}S_{\\text{\u0111\xE1y}}h$."],
        worked: [{
          prompt: "H\xECnh ch\xF3p t\u1EE9 gi\xE1c \u0111\u1EC1u c\xF3 c\u1EA1nh \u0111\xE1y $6\\,cm$, trung \u0111o\u1EA1n $5\\,cm$, chi\u1EC1u cao $4\\,cm$. T\xEDnh di\u1EC7n t\xEDch xung quanh v\xE0 th\u1EC3 t\xEDch.",
          thinking: ["N\u1EEDa chu vi \u0111\xE1y $p=\\f{4\\cdot6}{2}=12$; di\u1EC7n t\xEDch \u0111\xE1y l\xE0 h\xECnh vu\xF4ng c\u1EA1nh 6."],
          solution: [
            "$S_{xq}=p\\cdot d=12\\cdot5=60\\ (cm^{2})$.",
            "$S_{\\text{\u0111\xE1y}}=6^{2}=36\\ (cm^{2})$.",
            "$V=\\f{1}{3}\\cdot36\\cdot4=48\\ (cm^{3})$."
          ]
        }]
      }
    ],
    bank: ["g8.pythagore", "g8.hinh-chop"]
  },
  {
    id: "g8-t8",
    grade: 8,
    term: "HK1",
    strand: "THONG_KE_XS",
    order: 8,
    name: "Th\u1ED1ng k\xEA v\xE0 X\xE1c su\u1EA5t",
    summary: "Thu th\u1EADp, ph\xE2n lo\u1EA1i, bi\u1EC3u di\u1EC5n v\xE0 ph\xE2n t\xEDch d\u1EEF li\u1EC7u; x\xE1c su\u1EA5t l\xED thuy\u1EBFt v\xE0 x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m.",
    outcomes: [
      "L\u1EF1a ch\u1ECDn bi\u1EC3u \u0111\u1ED3 ph\xF9 h\u1EE3p, ph\xE1t hi\u1EC7n d\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\xED.",
      "T\xEDnh x\xE1c su\u1EA5t l\xED thuy\u1EBFt c\u1EE7a bi\u1EBFn c\u1ED1 trong m\xF4 h\xECnh \u0111\u1ED3ng kh\u1EA3 n\u0103ng.",
      "So s\xE1nh x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m v\xE0 x\xE1c su\u1EA5t l\xED thuy\u1EBFt."
    ],
    theory: [
      {
        heading: "X\xE1c su\u1EA5t l\xED thuy\u1EBFt v\xE0 th\u1EF1c nghi\u1EC7m",
        body: [],
        formulas: [
          "X\xE1c su\u1EA5t l\xED thuy\u1EBFt: $P(A)=\\f{\\text{s\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i}}{\\text{s\u1ED1 k\u1EBFt qu\u1EA3 c\xF3 th\u1EC3}}$ (m\xF4 h\xECnh \u0111\u1ED3ng kh\u1EA3 n\u0103ng)",
          "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m: $\\f{\\text{s\u1ED1 l\u1EA7n A x\u1EA3y ra}}{\\text{s\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n}}$",
          "Khi s\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n \u0111\u1EE7 l\u1EDBn, x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m x\u1EA5p x\u1EC9 x\xE1c su\u1EA5t l\xED thuy\u1EBFt."
        ]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 m\xF4 t\u1EA3 m\u1ED9t ph\xE9p th\u1EED c\xF3 c\xE1c k\u1EBFt qu\u1EA3 \u201Cnh\u01B0 nhau\u201D", action: "D\xF9ng x\xE1c su\u1EA5t l\xED thuy\u1EBFt.", why: "\u0110i\u1EC1u ki\u1EC7n \u0111\u1ED3ng kh\u1EA3 n\u0103ng cho ph\xE9p \u0111\u1EBFm tr\u1EF1c ti\u1EBFp." },
      { signal: "\u0110\u1EC1 cho b\u1EA3ng k\u1EBFt qu\u1EA3 sau nhi\u1EC1u l\u1EA7n th\u1EED", action: "D\xF9ng x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m.", why: "D\u1EEF li\u1EC7u quan s\xE1t \u0111\u01B0\u1EE3c l\xE0 c\u0103n c\u1EE9 duy nh\u1EA5t." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201C\u01B0\u1EDBc l\u01B0\u1EE3ng s\u1ED1 l\u1EA7n x\u1EA3y ra trong $n$ l\u1EA7n\u201D", action: "L\u1EA5y $n\\cdot P(A)$.", why: "T\u1EA7n s\u1ED1 k\u1EF3 v\u1ECDng b\u1EB1ng s\u1ED1 l\u1EA7n nh\xE2n x\xE1c su\u1EA5t." }
    ],
    mindmap: {
      root: "TH\u1ED0NG K\xCA & X\xC1C SU\u1EA4T L\u1EDAP 8",
      branches: [
        { title: "D\u1EEF li\u1EC7u", items: ["Thu th\u1EADp, ph\xE2n lo\u1EA1i", "D\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\xED", "Ch\u1ECDn bi\u1EC3u \u0111\u1ED3 ph\xF9 h\u1EE3p"] },
        { title: "Bi\u1EC3u \u0111\u1ED3", items: ["C\u1ED9t, c\u1ED9t k\xE9p", "\u0110o\u1EA1n th\u1EB3ng", "H\xECnh qu\u1EA1t tr\xF2n"] },
        { title: "X\xE1c su\u1EA5t", items: ["L\xED thuy\u1EBFt $\\f{m}{k}$", "Th\u1EF1c nghi\u1EC7m", "M\u1ED1i li\xEAn h\u1EC7 khi $n$ l\u1EDBn"] }
      ]
    },
    types: [
      {
        id: "g8-t8-d1",
        name: "D\u1EA1ng 1. T\xEDnh x\xE1c su\u1EA5t l\xED thuy\u1EBFt",
        level: "TH",
        method: ["\u0110\u1EBFm s\u1ED1 k\u1EBFt qu\u1EA3 c\xF3 th\u1EC3.", "\u0110\u1EBFm s\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i.", "L\u1EADp t\u1EC9 s\u1ED1."],
        worked: [{
          prompt: "M\u1ED9t h\u1ED9p c\xF3 5 bi \u0111\u1ECF, 3 bi xanh, 2 bi v\xE0ng. L\u1EA5y ng\u1EABu nhi\xEAn 1 vi\xEAn. T\xEDnh x\xE1c su\u1EA5t l\u1EA5y \u0111\u01B0\u1EE3c bi kh\xF4ng ph\u1EA3i m\xE0u \u0111\u1ECF.",
          thinking: ["T\u1ED5ng s\u1ED1 bi l\xE0 10; bi kh\xF4ng \u0111\u1ECF g\u1ED3m xanh v\xE0 v\xE0ng."],
          solution: [
            "T\u1ED5ng s\u1ED1 bi: $5+3+2=10$.",
            "S\u1ED1 bi kh\xF4ng \u0111\u1ECF: $3+2=5$.",
            "$P=\\f{5}{10}=\\f{1}{2}$."
          ]
        }]
      }
    ],
    bank: ["g8.thong-ke", "g8.xac-suat"]
  }
];

// src/content/g9/topics.ts
var G9_TOPICS = [
  {
    id: "g9-t1",
    grade: 9,
    term: "HK1",
    strand: "SO_DAI_SO",
    order: 1,
    name: "Ph\u01B0\u01A1ng tr\xECnh v\xE0 H\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t hai \u1EA9n",
    summary: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t hai \u1EA9n, h\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh, ph\u01B0\u01A1ng ph\xE1p th\u1EBF v\xE0 c\u1ED9ng \u0111\u1EA1i s\u1ED1, gi\u1EA3i b\xE0i to\xE1n b\u1EB1ng c\xE1ch l\u1EADp h\u1EC7.",
    outcomes: [
      "Nh\u1EADn bi\u1EBFt nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh v\xE0 h\u1EC7 ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t hai \u1EA9n.",
      "Gi\u1EA3i h\u1EC7 b\u1EB1ng ph\u01B0\u01A1ng ph\xE1p th\u1EBF v\xE0 ph\u01B0\u01A1ng ph\xE1p c\u1ED9ng \u0111\u1EA1i s\u1ED1.",
      "Gi\u1EA3i b\xE0i to\xE1n th\u1EF1c ti\u1EC5n b\u1EB1ng c\xE1ch l\u1EADp h\u1EC7 ph\u01B0\u01A1ng tr\xECnh."
    ],
    theory: [
      {
        heading: "1. H\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t hai \u1EA9n",
        body: [],
        formulas: [
          "D\u1EA1ng: $\\sys{ax+by=c\\\\a'x+b'y=c'}$",
          "**Ph\u01B0\u01A1ng ph\xE1p th\u1EBF**: r\xFAt m\u1ED9t \u1EA9n t\u1EEB m\u1ED9t ph\u01B0\u01A1ng tr\xECnh r\u1ED3i th\u1EBF v\xE0o ph\u01B0\u01A1ng tr\xECnh c\xF2n l\u1EA1i.",
          "**Ph\u01B0\u01A1ng ph\xE1p c\u1ED9ng \u0111\u1EA1i s\u1ED1**: nh\xE2n hai v\u1EBF \u0111\u1EC3 h\u1EC7 s\u1ED1 c\u1EE7a m\u1ED9t \u1EA9n \u0111\u1ED1i nhau (ho\u1EB7c b\u1EB1ng nhau) r\u1ED3i c\u1ED9ng (tr\u1EEB) theo v\u1EBF.",
          "H\u1EC7 c\xF3 nghi\u1EC7m duy nh\u1EA5t khi $\\f{a}{a'}\\ne\\f{b}{b'}$; v\xF4 nghi\u1EC7m khi $\\f{a}{a'}=\\f{b}{b'}\\ne\\f{c}{c'}$; v\xF4 s\u1ED1 nghi\u1EC7m khi $\\f{a}{a'}=\\f{b}{b'}=\\f{c}{c'}$."
        ],
        caution: ["V\u1EDBi h\u1EC7 c\xF3 \u1EA9n \u1EDF m\u1EABu, ph\u1EA3i **\u0111\u1EB7t \u1EA9n ph\u1EE5** $u=\\f{1}{x}$, $v=\\f{1}{y}$ v\xE0 nh\u1EDB \u0111i\u1EC1u ki\u1EC7n."]
      },
      {
        heading: "2. Gi\u1EA3i b\xE0i to\xE1n b\u1EB1ng c\xE1ch l\u1EADp h\u1EC7 ph\u01B0\u01A1ng tr\xECnh",
        body: ["Quy tr\xECnh gi\u1ED1ng l\u1EDBp 8 nh\u01B0ng d\xF9ng hai \u1EA9n, ph\xF9 h\u1EE3p b\xE0i to\xE1n c\xF3 hai \u0111\u1EA1i l\u01B0\u1EE3ng ch\u01B0a bi\u1EBFt."],
        formulas: [
          "1. G\u1ECDi hai \u1EA9n k\xE8m \u0111\u01A1n v\u1ECB v\xE0 \u0111i\u1EC1u ki\u1EC7n.",
          "2. Bi\u1EC3u di\u1EC5n c\xE1c \u0111\u1EA1i l\u01B0\u1EE3ng li\xEAn quan.",
          "3. L\u1EADp **hai** ph\u01B0\u01A1ng tr\xECnh t\u1EEB hai d\u1EEF ki\u1EC7n \u0111\u1ED9c l\u1EADp.",
          "4. Gi\u1EA3i h\u1EC7.",
          "5. \u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n.",
          "6. K\u1EBFt lu\u1EADn."
        ]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 c\xF3 hai \u0111\u1EA1i l\u01B0\u1EE3ng ch\u01B0a bi\u1EBFt v\xE0 hai d\u1EEF ki\u1EC7n r\xE0ng bu\u1ED9c", action: "L\u1EADp h\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh.", why: "S\u1ED1 ph\u01B0\u01A1ng tr\xECnh ph\u1EA3i b\u1EB1ng s\u1ED1 \u1EA9n." },
      { signal: "H\u1EC7 c\xF3 ph\xE2n s\u1ED1 v\u1EDBi \u1EA9n \u1EDF m\u1EABu", action: "\u0110\u1EB7t \u1EA9n ph\u1EE5 $u=\\f{1}{x}$, $v=\\f{1}{y}$.", why: "\u0110\u01B0a h\u1EC7 phi tuy\u1EBFn v\u1EC1 h\u1EC7 b\u1EADc nh\u1EA5t quen thu\u1ED9c." },
      { signal: "H\u1EC7 s\u1ED1 c\u1EE7a m\u1ED9t \u1EA9n gi\u1ED1ng nhau ho\u1EB7c l\xE0 b\u1ED9i c\u1EE7a nhau", action: "D\xF9ng c\u1ED9ng \u0111\u1EA1i s\u1ED1, kh\xF4ng d\xF9ng ph\u01B0\u01A1ng ph\xE1p th\u1EBF.", why: "C\u1ED9ng \u0111\u1EA1i s\u1ED1 s\u1EA1ch h\u01A1n, \xEDt ph\xE2n s\u1ED1." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Ct\xECm $m$ \u0111\u1EC3 h\u1EC7 c\xF3 nghi\u1EC7m duy nh\u1EA5t\u201D", action: "So s\xE1nh t\u1EC9 s\u1ED1 h\u1EC7 s\u1ED1 $\\f{a}{a'}\\ne\\f{b}{b'}$.", why: "\u0110i\u1EC1u ki\u1EC7n t\u1EC9 s\u1ED1 quy\u1EBFt \u0111\u1ECBnh s\u1ED1 nghi\u1EC7m c\u1EE7a h\u1EC7." },
      { signal: "B\xE0i to\xE1n \u201Chai v\xF2i n\u01B0\u1EDBc c\xF9ng ch\u1EA3y\u201D", action: "\u0110\u1EB7t \u1EA9n l\xE0 th\u1EDDi gian m\u1ED7i v\xF2i ch\u1EA3y ri\xEAng, l\u1EADp h\u1EC7 theo n\u0103ng su\u1EA5t.", why: "N\u0103ng su\u1EA5t c\u1ED9ng \u0111\u01B0\u1EE3c, th\u1EDDi gian th\xEC kh\xF4ng." }
    ],
    mindmap: {
      root: "H\u1EC6 PH\u01AF\u01A0NG TR\xCCNH B\u1EACC NH\u1EA4T HAI \u1EA8N",
      branches: [
        { title: "Kh\xE1i ni\u1EC7m", items: ["$ax+by=c$", "Nghi\u1EC7m $(x_0;y_0)$", "Bi\u1EC3u di\u1EC5n h\xECnh h\u1ECDc"] },
        { title: "Ph\u01B0\u01A1ng ph\xE1p gi\u1EA3i", items: ["Th\u1EBF", "C\u1ED9ng \u0111\u1EA1i s\u1ED1", "\u0110\u1EB7t \u1EA9n ph\u1EE5"] },
        { title: "S\u1ED1 nghi\u1EC7m", items: ["Duy nh\u1EA5t", "V\xF4 nghi\u1EC7m", "V\xF4 s\u1ED1 nghi\u1EC7m", "B\xE0i to\xE1n tham s\u1ED1 $m$"] },
        { title: "L\u1EADp h\u1EC7", items: ["Chuy\u1EC3n \u0111\u1ED9ng", "N\u0103ng su\u1EA5t \u2013 hai v\xF2i n\u01B0\u1EDBc", "S\u1ED1 c\xF3 hai ch\u1EEF s\u1ED1", "To\xE1n ph\u1EA7n tr\u0103m"] }
      ]
    },
    practiceSkills: [
      {
        title: "Ch\u1ECDn ph\u01B0\u01A1ng ph\xE1p gi\u1EA3i h\u1EC7 cho nhanh",
        detail: [
          "C\xF3 m\u1ED9t \u1EA9n h\u1EC7 s\u1ED1 $\\pm1$ \u2192 d\xF9ng ph\u01B0\u01A1ng ph\xE1p th\u1EBF.",
          "H\u1EC7 s\u1ED1 c\u1EE7a m\u1ED9t \u1EA9n b\u1EB1ng nhau ho\u1EB7c \u0111\u1ED1i nhau \u2192 c\u1ED9ng \u0111\u1EA1i s\u1ED1 ngay.",
          "H\u1EC7 s\u1ED1 \u201Cx\u1EA5u\u201D \u2192 nh\xE2n ch\xE9o \u0111\u1EC3 t\u1EA1o h\u1EC7 s\u1ED1 \u0111\u1ED1i r\u1ED3i c\u1ED9ng.",
          "Lu\xF4n th\u1EED l\u1EA1i nghi\u1EC7m v\xE0o **c\u1EA3 hai** ph\u01B0\u01A1ng tr\xECnh."
        ]
      }
    ],
    types: [
      {
        id: "g9-t1-d1",
        name: "D\u1EA1ng 1. Gi\u1EA3i h\u1EC7 ph\u01B0\u01A1ng tr\xECnh",
        level: "TH",
        method: ["Ch\u1ECDn ph\u01B0\u01A1ng ph\xE1p ph\xF9 h\u1EE3p.", "T\xECm m\u1ED9t \u1EA9n r\u1ED3i th\u1EBF ng\u01B0\u1EE3c t\xECm \u1EA9n c\xF2n l\u1EA1i.", "K\u1EBFt lu\u1EADn nghi\u1EC7m d\u1EA1ng $(x;y)$."],
        worked: [{
          prompt: "Gi\u1EA3i h\u1EC7 $\\sys{3x+2y=7\\\\2x-2y=3}$.",
          thinking: ["H\u1EC7 s\u1ED1 c\u1EE7a $y$ l\xE0 $2$ v\xE0 $-2$ \u2014 \u0111\u1ED1i nhau \u2192 c\u1ED9ng hai ph\u01B0\u01A1ng tr\xECnh theo v\u1EBF."],
          solution: [
            "C\u1ED9ng theo v\u1EBF: $(3x+2y)+(2x-2y)=7+3\\Rightarrow5x=10\\Rightarrow x=2$.",
            "Thay $x=2$ v\xE0o $3x+2y=7$: $6+2y=7\\Rightarrow y=\\f{1}{2}$.",
            "V\u1EADy h\u1EC7 c\xF3 nghi\u1EC7m duy nh\u1EA5t $(x;y)=\\left(2;\\f{1}{2}\\right)$."
          ]
        }]
      },
      {
        id: "g9-t1-d2",
        name: "D\u1EA1ng 2. H\u1EC7 c\xF3 \u1EA9n \u1EDF m\u1EABu \u2014 \u0111\u1EB7t \u1EA9n ph\u1EE5",
        level: "VD",
        method: ["\u0110\u1EB7t \u0111i\u1EC1u ki\u1EC7n.", "\u0110\u1EB7t $u=\\f{1}{x}$, $v=\\f{1}{y}$.", "Gi\u1EA3i h\u1EC7 theo $u,v$ r\u1ED3i quay v\u1EC1 $x,y$."],
        worked: [{
          prompt: "Gi\u1EA3i h\u1EC7 $\\sys{\\f{1}{x}+\\f{1}{y}=\\f{5}{6}\\\\\\f{2}{x}-\\f{3}{y}=\\f{1}{6}}$.",
          thinking: ["\u1EA8n n\u1EB1m \u1EDF m\u1EABu \u2192 \u0111\u1EB7t \u1EA9n ph\u1EE5 \u0111\u1EC3 tuy\u1EBFn t\xEDnh ho\xE1."],
          solution: [
            "\u0110i\u1EC1u ki\u1EC7n: $x\\ne0$, $y\\ne0$. \u0110\u1EB7t $u=\\f{1}{x}$, $v=\\f{1}{y}$.",
            "H\u1EC7 tr\u1EDF th\xE0nh $\\sys{u+v=\\f{5}{6}\\\\2u-3v=\\f{1}{6}}$",
            "T\u1EEB ph\u01B0\u01A1ng tr\xECnh \u0111\u1EA7u: $u=\\f{5}{6}-v$. Th\u1EBF v\xE0o: $2\\left(\\f{5}{6}-v\\right)-3v=\\f{1}{6}$.",
            "$\\f{5}{3}-5v=\\f{1}{6}\\Rightarrow5v=\\f{5}{3}-\\f{1}{6}=\\f{3}{2}\\Rightarrow v=\\f{3}{10}$.",
            "$u=\\f{5}{6}-\\f{3}{10}=\\f{25-9}{30}=\\f{16}{30}=\\f{8}{15}$.",
            "$x=\\f{1}{u}=\\f{15}{8}$; $y=\\f{1}{v}=\\f{10}{3}$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n)."
          ]
        }]
      },
      {
        id: "g9-t1-d3",
        name: "D\u1EA1ng 3. Gi\u1EA3i b\xE0i to\xE1n b\u1EB1ng c\xE1ch l\u1EADp h\u1EC7",
        level: "VDC",
        method: ["G\u1ECDi hai \u1EA9n v\u1EDBi \u0111\u01A1n v\u1ECB v\xE0 \u0111i\u1EC1u ki\u1EC7n.", "L\u1EADp hai ph\u01B0\u01A1ng tr\xECnh t\u1EEB hai d\u1EEF ki\u1EC7n.", "Gi\u1EA3i, \u0111\u1ED1i chi\u1EBFu, k\u1EBFt lu\u1EADn."],
        worked: [{
          prompt: "Hai v\xF2i n\u01B0\u1EDBc c\xF9ng ch\u1EA3y v\xE0o m\u1ED9t b\u1EC3 c\u1EA1n th\xEC sau 6 gi\u1EDD \u0111\u1EA7y b\u1EC3. N\u1EBFu v\xF2i th\u1EE9 nh\u1EA5t ch\u1EA3y trong 2 gi\u1EDD r\u1ED3i kho\xE1 l\u1EA1i, m\u1EDF v\xF2i th\u1EE9 hai ch\u1EA3y ti\u1EBFp 3 gi\u1EDD th\xEC \u0111\u01B0\u1EE3c $\\f{2}{5}$ b\u1EC3. H\u1ECFi m\u1ED7i v\xF2i ch\u1EA3y ri\xEAng th\xEC bao l\xE2u \u0111\u1EA7y b\u1EC3?",
          thinking: [
            "Hai \u0111\u1EA1i l\u01B0\u1EE3ng ch\u01B0a bi\u1EBFt l\xE0 th\u1EDDi gian ch\u1EA3y ri\xEAng c\u1EE7a m\u1ED7i v\xF2i \u2192 hai \u1EA9n.",
            "L\xE0m vi\u1EC7c v\u1EDBi **n\u0103ng su\u1EA5t** (ph\u1EA7n b\u1EC3 ch\u1EA3y \u0111\u01B0\u1EE3c trong 1 gi\u1EDD), kh\xF4ng l\xE0m vi\u1EC7c v\u1EDBi th\u1EDDi gian."
          ],
          solution: [
            "G\u1ECDi th\u1EDDi gian v\xF2i 1 v\xE0 v\xF2i 2 ch\u1EA3y ri\xEAng \u0111\u1EA7y b\u1EC3 l\u1EA7n l\u01B0\u1EE3t l\xE0 $x$, $y$ (gi\u1EDD; $x,y>6$).",
            "Trong 1 gi\u1EDD, v\xF2i 1 ch\u1EA3y \u0111\u01B0\u1EE3c $\\f{1}{x}$ b\u1EC3, v\xF2i 2 ch\u1EA3y \u0111\u01B0\u1EE3c $\\f{1}{y}$ b\u1EC3.",
            "C\xF9ng ch\u1EA3y 6 gi\u1EDD \u0111\u1EA7y b\u1EC3: $\\f{1}{x}+\\f{1}{y}=\\f{1}{6}$. (1)",
            "V\xF2i 1 ch\u1EA3y 2 gi\u1EDD, v\xF2i 2 ch\u1EA3y 3 gi\u1EDD \u0111\u01B0\u1EE3c $\\f{2}{5}$ b\u1EC3: $\\f{2}{x}+\\f{3}{y}=\\f{2}{5}$. (2)",
            "\u0110\u1EB7t $u=\\f{1}{x}$, $v=\\f{1}{y}$: $\\sys{u+v=\\f{1}{6}\\\\2u+3v=\\f{2}{5}}$",
            "T\u1EEB (1): $u=\\f{1}{6}-v$; th\u1EBF v\xE0o (2): $2\\left(\\f{1}{6}-v\\right)+3v=\\f{2}{5}\\Rightarrow\\f{1}{3}+v=\\f{2}{5}\\Rightarrow v=\\f{1}{15}$.",
            "$u=\\f{1}{6}-\\f{1}{15}=\\f{5-2}{30}=\\f{1}{10}$.",
            "$x=10$; $y=15$ (tho\u1EA3 $x,y>6$).",
            "V\u1EADy v\xF2i 1 ch\u1EA3y ri\xEAng \u0111\u1EA7y b\u1EC3 trong **10 gi\u1EDD**, v\xF2i 2 trong **15 gi\u1EDD**."
          ]
        }]
      }
    ],
    bank: ["g9.he-pt", "g9.he-pt-an-phu", "g9.lap-he-pt"]
  },
  {
    id: "g9-t2",
    grade: 9,
    term: "HK1",
    strand: "SO_DAI_SO",
    order: 2,
    name: "C\u0103n b\u1EADc hai \u2014 C\u0103n th\u1EE9c b\u1EADc hai",
    summary: "C\u0103n b\u1EADc hai, c\u0103n b\u1EADc ba, c\u0103n th\u1EE9c b\u1EADc hai, c\xE1c ph\xE9p bi\u1EBFn \u0111\u1ED5i v\xE0 r\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n.",
    outcomes: [
      "T\xECm \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh c\u1EE7a c\u0103n th\u1EE9c b\u1EADc hai.",
      "V\u1EADn d\u1EE5ng c\xE1c ph\xE9p bi\u1EBFn \u0111\u1ED5i: \u0111\u01B0a th\u1EEBa s\u1ED1 v\xE0o/ra ngo\xE0i d\u1EA5u c\u0103n, kh\u1EED m\u1EABu, tr\u1EE5c c\u0103n th\u1EE9c.",
      "R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n v\xE0 gi\u1EA3i c\xE1c b\xE0i to\xE1n ph\u1EE5."
    ],
    theory: [
      {
        heading: "1. \u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh v\xE0 h\u1EB1ng \u0111\u1EB3ng th\u1EE9c c\u0103n",
        body: [],
        formulas: [
          "$\\s{A}$ x\xE1c \u0111\u1ECBnh $\\Leftrightarrow A\\ge0$",
          "$\\s{A^{2}}=\\abs{A}$",
          "$\\s{A}\\cdot\\s{B}=\\s{AB}$ ($A,B\\ge0$)",
          "$\\f{\\s{A}}{\\s{B}}=\\s{\\f{A}{B}}$ ($A\\ge0$, $B>0$)"
        ],
        caution: ["$\\s{A^{2}}=A$ ch\u1EC9 \u0111\xFAng khi $A\\ge0$; n\xF3i chung ph\u1EA3i vi\u1EBFt $\\abs{A}$."]
      },
      {
        heading: "2. C\xE1c ph\xE9p bi\u1EBFn \u0111\u1ED5i",
        body: [],
        formulas: [
          "\u0110\u01B0a th\u1EEBa s\u1ED1 ra ngo\xE0i: $\\s{A^{2}B}=\\abs{A}\\s{B}$",
          "\u0110\u01B0a th\u1EEBa s\u1ED1 v\xE0o trong: $A\\s{B}=\\s{A^{2}B}$ (khi $A\\ge0$)",
          "Kh\u1EED m\u1EABu: $\\s{\\f{A}{B}}=\\f{\\s{AB}}{\\abs{B}}$",
          "Tr\u1EE5c c\u0103n th\u1EE9c: $\\f{C}{\\s{A}\\pm\\s{B}}=\\f{C(\\s{A}\\mp\\s{B})}{A-B}$",
          "$\\f{C}{\\s{A}}=\\f{C\\s{A}}{A}$"
        ]
      },
      {
        heading: "3. K\u1EF9 thu\u1EADt v\u1EDBi bi\u1EC3u th\u1EE9c d\u01B0\u1EDBi c\u0103n",
        body: ["Nh\u1EADn d\u1EA1ng h\u1EB1ng \u0111\u1EB3ng th\u1EE9c \u1EA9n d\u01B0\u1EDBi d\u1EA5u c\u0103n l\xE0 ch\xECa kho\xE1 c\u1EE7a m\u1ECDi b\xE0i r\xFAt g\u1ECDn kh\xF3."],
        formulas: [
          "$\\s{a\\pm2\\s{b}}$: t\xECm $m+n=a$, $mn=b$ \u0111\u1EC3 vi\u1EBFt th\xE0nh $\\s{(\\s{m}\\pm\\s{n})^{2}}$",
          "V\xED d\u1EE5: $\\s{7+4\\s{3}}=\\s{(2+\\s{3})^{2}}=2+\\s{3}$",
          "\u0110\u1EB7t $t=\\s{x}\\ (t\\ge0)$ \u0111\u1EC3 \u0111\u01B0a bi\u1EC3u th\u1EE9c v\u1EC1 \u0111a th\u1EE9c theo $t$"
        ]
      }
    ],
    decode: [
      { signal: "B\xE0i r\xFAt g\u1ECDn c\xF3 nhi\u1EC1u m\u1EABu ch\u1EE9a c\u0103n", action: "\u0110\u1EB7t $t=\\s{x}$, ph\xE2n t\xEDch m\u1EABu th\xE0nh nh\xE2n t\u1EED theo $t$.", why: "Bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n tr\u1EDF th\xE0nh ph\xE2n th\u1EE9c quen thu\u1ED9c." },
      { signal: "C\xF3 $\\s{a+b\\s{c}}$", action: "Th\u1EED vi\u1EBFt th\xE0nh b\xECnh ph\u01B0\u01A1ng c\u1EE7a $\\s{m}+\\s{n}$.", why: "\u0110\xE2y l\xE0 c\xE1ch duy nh\u1EA5t \u0111\u1EC3 r\xFAt g\u1ECDn c\u0103n k\xE9p." },
      { signal: "M\u1EABu l\xE0 $\\s{A}-\\s{B}$", action: "Nh\xE2n c\u1EA3 t\u1EED v\xE0 m\u1EABu v\u1EDBi bi\u1EC3u th\u1EE9c li\xEAn h\u1EE3p $\\s{A}+\\s{B}$.", why: "Li\xEAn h\u1EE3p bi\u1EBFn m\u1EABu th\xE0nh hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng, h\u1EBFt c\u0103n." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Ct\xECm $x$ \u0111\u1EC3 $P$ nguy\xEAn\u201D sau khi r\xFAt g\u1ECDn", action: "T\xE1ch ph\u1EA7n nguy\xEAn r\u1ED3i cho m\u1EABu l\xE0 \u01B0\u1EDBc.", why: "K\u1EF9 thu\u1EADt t\xE1ch ph\u1EA7n nguy\xEAn, k\xE8m \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh." },
      { signal: "\u0110\u1EC1 h\u1ECFi GTNN c\u1EE7a $P$ ch\u1EE9a $\\s{x}$", action: "\u0110\u1EB7t $t=\\s{x}\\ge0$, \u0111\u01B0a v\u1EC1 h\xE0m theo $t$ r\u1ED3i d\xF9ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si ho\u1EB7c ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng.", why: "\u0110\u1ED5i bi\u1EBFn l\xE0m l\u1ED9 c\u1EA5u tr\xFAc b\u1EADc hai." }
    ],
    mindmap: {
      root: "C\u0102N B\u1EACC HAI \u2014 C\u0102N TH\u1EE8C",
      branches: [
        { title: "\u0110i\u1EC1u ki\u1EC7n", items: ["$\\s{A}$ c\xF3 ngh\u0129a khi $A\\ge0$", "M\u1EABu $\\ne0$", "K\u1EBFt h\u1EE3p nhi\u1EC1u \u0111i\u1EC1u ki\u1EC7n"] },
        { title: "Bi\u1EBFn \u0111\u1ED5i", items: ["\u0110\u01B0a ra/v\xE0o d\u1EA5u c\u0103n", "Kh\u1EED m\u1EABu", "Tr\u1EE5c c\u0103n th\u1EE9c", "Li\xEAn h\u1EE3p"] },
        { title: "R\xFAt g\u1ECDn", items: ["\u0110\u1EB7t $t=\\s{x}$", "Ph\xE2n t\xEDch nh\xE2n t\u1EED", "Quy \u0111\u1ED3ng", "Thu g\u1ECDn tri\u1EC7t \u0111\u1EC3"] },
        { title: "B\xE0i to\xE1n ph\u1EE5", items: ["T\xEDnh $P$ t\u1EA1i $x=a$", "$P$ nguy\xEAn", "So s\xE1nh $P$ v\u1EDBi s\u1ED1", "GTNN, GTLN"] }
      ]
    },
    practiceSkills: [
      {
        title: "Quy tr\xECnh chu\u1EA9n cho b\xE0i \u201CR\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c\u201D thi v\xE0o 10",
        detail: [
          "B\u01B0\u1EDBc 1: Vi\u1EBFt \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh (th\u01B0\u1EDDng $x\\ge0$ v\xE0 $x\\ne$ m\u1ED9t s\u1ED1).",
          "B\u01B0\u1EDBc 2: \u0110\u1EB7t $t=\\s{x}$, ph\xE2n t\xEDch t\u1EA5t c\u1EA3 c\xE1c m\u1EABu th\xE0nh nh\xE2n t\u1EED theo $t$.",
          "B\u01B0\u1EDBc 3: T\xECm m\u1EABu chung, quy \u0111\u1ED3ng, thu g\u1ECDn t\u1EED.",
          "B\u01B0\u1EDBc 4: R\xFAt g\u1ECDn, tr\u1EA3 bi\u1EBFn v\u1EC1 $\\s{x}$.",
          "B\u01B0\u1EDBc 5: L\xE0m c\xE2u h\u1ECFi ph\u1EE5, lu\xF4n \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n \u1EDF b\u01B0\u1EDBc 1."
        ]
      }
    ],
    types: [
      {
        id: "g9-t2-d1",
        name: "D\u1EA1ng 1. \u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh v\xE0 t\xEDnh gi\xE1 tr\u1ECB",
        level: "NB",
        method: ["Cho bi\u1EC3u th\u1EE9c d\u01B0\u1EDBi c\u0103n $\\ge0$, m\u1EABu $\\ne0$.", "Giao c\xE1c \u0111i\u1EC1u ki\u1EC7n."],
        worked: [{
          prompt: "T\xECm \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh c\u1EE7a $A=\\f{\\s{x}}{\\s{x}-2}$.",
          thinking: ["C\u1EA7n $x\\ge0$ \u0111\u1EC3 c\u0103n c\xF3 ngh\u0129a v\xE0 m\u1EABu kh\xE1c 0."],
          solution: [
            "$\\s{x}$ c\xF3 ngh\u0129a $\\Leftrightarrow x\\ge0$.",
            "M\u1EABu kh\xE1c 0: $\\s{x}-2\\ne0\\Leftrightarrow x\\ne4$.",
            "V\u1EADy \u0111i\u1EC1u ki\u1EC7n: $x\\ge0$ v\xE0 $x\\ne4$."
          ]
        }]
      },
      {
        id: "g9-t2-d2",
        name: "D\u1EA1ng 2. R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n",
        level: "VD",
        method: ["\u0110\u1EB7t \u0111i\u1EC1u ki\u1EC7n.", "Ph\xE2n t\xEDch m\u1EABu th\xE0nh nh\xE2n t\u1EED.", "Quy \u0111\u1ED3ng, thu g\u1ECDn."],
        worked: [{
          prompt: "R\xFAt g\u1ECDn $P=\\f{1}{\\s{x}-1}-\\f{1}{\\s{x}+1}$ v\u1EDBi $x\\ge0$, $x\\ne1$.",
          thinking: ["M\u1EABu chung l\xE0 $(\\s{x}-1)(\\s{x}+1)=x-1$."],
          solution: [
            "$P=\\f{(\\s{x}+1)-(\\s{x}-1)}{(\\s{x}-1)(\\s{x}+1)}=\\f{2}{x-1}$."
          ]
        }]
      },
      {
        id: "g9-t2-d3",
        name: "D\u1EA1ng 3. V\u1EADn d\u1EE5ng cao \u2014 b\xE0i to\xE1n ph\u1EE5 sau r\xFAt g\u1ECDn",
        level: "VDC",
        method: ["R\xFAt g\u1ECDn tri\u1EC7t \u0111\u1EC3.", "T\xE1ch ph\u1EA7n nguy\xEAn / d\xF9ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si.", "\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n."],
        worked: [{
          prompt: "Cho $P=\\f{\\s{x}+3}{\\s{x}+1}$ v\u1EDBi $x\\ge0$. T\xECm gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t c\u1EE7a $P$.",
          thinking: ["T\xE1ch ph\u1EA7n nguy\xEAn theo m\u1EABu \u0111\u1EC3 th\u1EA5y $P$ gi\u1EA3m khi $\\s{x}$ t\u0103ng."],
          solution: [
            "\u0110\u1EB7t $t=\\s{x}\\ge0$. Khi \u0111\xF3 $P=\\f{t+3}{t+1}=\\f{(t+1)+2}{t+1}=1+\\f{2}{t+1}$.",
            "V\xEC $t\\ge0$ n\xEAn $t+1\\ge1$, suy ra $\\f{2}{t+1}\\le2$.",
            "Do \u0111\xF3 $P\\le3$. D\u1EA5u \u201C=\u201D x\u1EA3y ra khi $t=0$, t\u1EE9c $x=0$.",
            "V\u1EADy $P_{\\max}=3$ khi $x=0$."
          ]
        }]
      }
    ],
    bank: ["g9.can-dkxd", "g9.can-rutgon", "g9.can-vdc"]
  },
  {
    id: "g9-t3",
    grade: 9,
    term: "HK2",
    strand: "SO_DAI_SO",
    order: 3,
    name: "H\xE0m s\u1ED1 y = ax\xB2 \u2014 Ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai \u2014 H\u1EC7 th\u1EE9c Vi\xE8te",
    summary: "H\xE0m s\u1ED1 $y=ax^{2}$ v\xE0 parabol, ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai m\u1ED9t \u1EA9n, c\xF4ng th\u1EE9c nghi\u1EC7m, h\u1EC7 th\u1EE9c Vi\xE8te v\xE0 \u1EE9ng d\u1EE5ng.",
    outcomes: [
      "V\u1EBD \u0111\u1ED3 th\u1ECB h\xE0m s\u1ED1 $y=ax^{2}$, x\xE1c \u0111\u1ECBnh t\xEDnh ch\u1EA5t.",
      "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai b\u1EB1ng c\xF4ng th\u1EE9c nghi\u1EC7m, x\xE9t bi\u1EC7t th\u1EE9c $\\Delta$.",
      "V\u1EADn d\u1EE5ng h\u1EC7 th\u1EE9c Vi\xE8te \u0111\u1EC3 t\xEDnh bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng v\xE0 gi\u1EA3i b\xE0i to\xE1n tham s\u1ED1."
    ],
    theory: [
      {
        heading: "1. H\xE0m s\u1ED1 $y=ax^{2}$ ($a\\ne0$)",
        body: [],
        formulas: [
          "\u0110\u1ED3 th\u1ECB l\xE0 parabol \u0111\u1EC9nh $O(0;0)$, nh\u1EADn tr\u1EE5c $Oy$ l\xE0m tr\u1EE5c \u0111\u1ED1i x\u1EE9ng.",
          "$a>0$: \u0111\u1ED3 th\u1ECB n\u1EB1m ph\xEDa tr\xEAn $Ox$, $O$ l\xE0 \u0111i\u1EC3m th\u1EA5p nh\u1EA5t.",
          "$a<0$: \u0111\u1ED3 th\u1ECB n\u1EB1m ph\xEDa d\u01B0\u1EDBi $Ox$, $O$ l\xE0 \u0111i\u1EC3m cao nh\u1EA5t.",
          "To\u1EA1 \u0111\u1ED9 giao \u0111i\u1EC3m c\u1EE7a $(P):y=ax^{2}$ v\xE0 $(d):y=mx+n$ l\xE0 nghi\u1EC7m c\u1EE7a $ax^{2}=mx+n$."
        ]
      },
      {
        heading: "2. Ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai $ax^{2}+bx+c=0$ ($a\\ne0$)",
        body: [],
        formulas: [
          "$\\Delta=b^{2}-4ac$",
          "$\\Delta>0$: hai nghi\u1EC7m ph\xE2n bi\u1EC7t $x_{1,2}=\\f{-b\\pm\\s{\\Delta}}{2a}$",
          "$\\Delta=0$: nghi\u1EC7m k\xE9p $x_1=x_2=-\\f{b}{2a}$",
          "$\\Delta<0$: v\xF4 nghi\u1EC7m",
          "C\xF4ng th\u1EE9c thu g\u1ECDn v\u1EDBi $b=2b'$: $\\Delta'=b'^{2}-ac$ ; $x_{1,2}=\\f{-b'\\pm\\s{\\Delta'}}{a}$",
          "Nh\u1EA9m nghi\u1EC7m: $a+b+c=0\\Rightarrow x_1=1$, $x_2=\\f{c}{a}$ ; $a-b+c=0\\Rightarrow x_1=-1$, $x_2=-\\f{c}{a}$"
        ]
      },
      {
        heading: "3. H\u1EC7 th\u1EE9c Vi\xE8te v\xE0 \u1EE9ng d\u1EE5ng",
        body: ["C\xF4ng c\u1EE5 m\u1EA1nh nh\u1EA5t c\u1EE7a ch\u01B0\u01A1ng, xu\u1EA5t hi\u1EC7n trong h\u1EA7u h\u1EBFt \u0111\u1EC1 thi v\xE0o 10."],
        formulas: [
          "N\u1EBFu $x_1,x_2$ l\xE0 hai nghi\u1EC7m th\xEC $S=x_1+x_2=-\\f{b}{a}$ v\xE0 $P=x_1x_2=\\f{c}{a}$",
          "$x_1^{2}+x_2^{2}=S^{2}-2P$",
          "$(x_1-x_2)^{2}=S^{2}-4P$",
          "$\\f{1}{x_1}+\\f{1}{x_2}=\\f{S}{P}$ ($P\\ne0$)",
          "$x_1^{3}+x_2^{3}=S^{3}-3PS$",
          "Hai nghi\u1EC7m c\xF9ng d\u1EA5u $\\Leftrightarrow\\Delta\\ge0$ v\xE0 $P>0$; tr\xE1i d\u1EA5u $\\Leftrightarrow P<0$ (khi \u0111\xF3 lu\xF4n c\xF3 $\\Delta>0$).",
          "Hai nghi\u1EC7m d\u01B0\u01A1ng $\\Leftrightarrow\\Delta\\ge0$, $S>0$, $P>0$."
        ],
        caution: ["Tr\u01B0\u1EDBc khi d\xF9ng Vi\xE8te ph\u1EA3i kh\u1EB3ng \u0111\u1ECBnh ph\u01B0\u01A1ng tr\xECnh **c\xF3 nghi\u1EC7m** ($\\Delta\\ge0$) \u2014 b\u1ECF b\u01B0\u1EDBc n\xE0y l\xE0 m\u1EA5t \u0111i\u1EC3m."]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 h\u1ECFi bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng c\u1EE7a $x_1,x_2$", action: "Bi\u1EC3u di\u1EC5n qua $S$ v\xE0 $P$ r\u1ED3i d\xF9ng Vi\xE8te, kh\xF4ng gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh.", why: "M\u1ECDi bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng \u0111\u1EC1u vi\u1EBFt \u0111\u01B0\u1EE3c theo $S$, $P$." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Ct\xECm $m$ \u0111\u1EC3 ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t\u201D", action: "Gi\u1EA3i $\\Delta>0$, k\xE8m \u0111i\u1EC1u ki\u1EC7n $a\\ne0$.", why: "B\u1EADc hai ch\u1EC9 t\u1ED3n t\u1EA1i khi h\u1EC7 s\u1ED1 b\u1EADc hai kh\xE1c 0." },
      { signal: "\u0110\u1EC1 cho h\u1EC7 th\u1EE9c kh\xF4ng \u0111\u1ED1i x\u1EE9ng nh\u01B0 $x_1=2x_2$", action: "K\u1EBFt h\u1EE3p h\u1EC7 th\u1EE9c \u0111\xF3 v\u1EDBi hai c\xF4ng th\u1EE9c Vi\xE8te th\xE0nh h\u1EC7 ba ph\u01B0\u01A1ng tr\xECnh.", why: "Ba ph\u01B0\u01A1ng tr\xECnh cho ba \u1EA9n $x_1$, $x_2$, $m$." },
      { signal: "\u0110\u1EC1 h\u1ECFi giao \u0111i\u1EC3m c\u1EE7a parabol v\xE0 \u0111\u01B0\u1EDDng th\u1EB3ng", action: "L\u1EADp ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m r\u1ED3i x\xE9t $\\Delta$.", why: "S\u1ED1 giao \u0111i\u1EC3m b\u1EB1ng s\u1ED1 nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9." },
      { signal: "H\u1EC7 s\u1ED1 $a+b+c=0$ ho\u1EB7c $a-b+c=0$", action: "Nh\u1EA9m nghi\u1EC7m ngay, kh\xF4ng c\u1EA7n t\xEDnh $\\Delta$.", why: "Ti\u1EBFt ki\u1EC7m th\u1EDDi gian v\xE0 tr\xE1nh sai s\u1ED1 h\u1ECDc." },
      { signal: "Ph\u01B0\u01A1ng tr\xECnh tr\xF9ng ph\u01B0\u01A1ng $ax^{4}+bx^{2}+c=0$", action: "\u0110\u1EB7t $t=x^{2}\\ge0$ r\u1ED3i gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai theo $t$.", why: "Nh\u1EDB \u0111i\u1EC1u ki\u1EC7n $t\\ge0$ \u0111\u1EC3 lo\u1EA1i nghi\u1EC7m ngo\u1EA1i lai." }
    ],
    mindmap: {
      root: "H\xC0M S\u1ED0 y = ax\xB2 \u2014 PH\u01AF\u01A0NG TR\xCCNH B\u1EACC HAI",
      branches: [
        { title: "Parabol", items: ["$y=ax^{2}$", "\u0110\u1EC9nh $O$, tr\u1EE5c $Oy$", "B\u1EC1 l\xF5m theo d\u1EA5u $a$", "V\u1EBD b\u1EA3ng gi\xE1 tr\u1ECB"] },
        { title: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai", items: ["$\\Delta=b^{2}-4ac$", "C\xF4ng th\u1EE9c nghi\u1EC7m", "C\xF4ng th\u1EE9c thu g\u1ECDn", "Nh\u1EA9m nghi\u1EC7m"] },
        { title: "Vi\xE8te", items: ["$S=-\\f{b}{a}$", "$P=\\f{c}{a}$", "Bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng", "D\u1EA5u c\u1EE7a nghi\u1EC7m"] },
        { title: "T\u01B0\u01A1ng giao", items: ["PT ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m", "S\u1ED1 giao \u0111i\u1EC3m theo $\\Delta$", "Ti\u1EBFp x\xFAc: $\\Delta=0$"] },
        { title: "B\xE0i to\xE1n tham s\u1ED1", items: ["\u0110i\u1EC1u ki\u1EC7n c\xF3 nghi\u1EC7m", "H\u1EC7 th\u1EE9c gi\u1EEFa hai nghi\u1EC7m", "Nghi\u1EC7m c\xF9ng d\u1EA5u / tr\xE1i d\u1EA5u", "GTNN, GTLN theo $m$"] }
      ]
    },
    practiceSkills: [
      {
        title: "Quy tr\xECnh 3 b\u01B0\u1EDBc cho b\xE0i to\xE1n tham s\u1ED1 (c\xE2u ph\xE2n lo\u1EA1i thi v\xE0o 10)",
        detail: [
          "B\u01B0\u1EDBc 1: \u0110i\u1EC1u ki\u1EC7n \u0111\u1EC3 ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m ($a\\ne0$ v\xE0 $\\Delta\\ge0$ ho\u1EB7c $\\Delta>0$).",
          "B\u01B0\u1EDBc 2: Vi\u1EBFt Vi\xE8te: $S=-\\f{b}{a}$, $P=\\f{c}{a}$.",
          "B\u01B0\u1EDBc 3: Bi\u1EBFn \u0111\u1ED5i h\u1EC7 th\u1EE9c \u0111\u1EC1 cho v\u1EC1 $S$, $P$, gi\u1EA3i theo $m$, r\u1ED3i **\u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n \u1EDF B\u01B0\u1EDBc 1**.",
          "R\u1EA5t nhi\u1EC1u b\u1EA1n l\xE0m \u0111\xFAng B\u01B0\u1EDBc 3 nh\u01B0ng qu\xEAn \u0111\u1ED1i chi\u1EBFu v\xE0 m\u1EA5t 0,25\u20130,5 \u0111i\u1EC3m."
        ]
      }
    ],
    types: [
      {
        id: "g9-t3-d1",
        name: "D\u1EA1ng 1. Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai",
        level: "NB",
        method: ["X\xE1c \u0111\u1ECBnh $a$, $b$, $c$.", "T\xEDnh $\\Delta$ (ho\u1EB7c $\\Delta'$).", "K\u1EBFt lu\u1EADn nghi\u1EC7m."],
        worked: [{
          prompt: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh $2x^{2}-5x+3=0$.",
          thinking: ["Th\u1EED nh\u1EA9m: $a+b+c=2-5+3=0$ \u2192 c\xF3 nghi\u1EC7m $x=1$."],
          solution: [
            "V\xEC $a+b+c=2-5+3=0$ n\xEAn ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m $x_1=1$ v\xE0 $x_2=\\f{c}{a}=\\f{3}{2}$."
          ]
        }]
      },
      {
        id: "g9-t3-d2",
        name: "D\u1EA1ng 2. \u1EE8ng d\u1EE5ng h\u1EC7 th\u1EE9c Vi\xE8te",
        level: "VD",
        method: ["Ki\u1EC3m tra $\\Delta\\ge0$.", "Vi\u1EBFt $S$, $P$.", "Bi\u1EC3u di\u1EC5n bi\u1EC3u th\u1EE9c c\u1EA7n t\xEDnh qua $S$, $P$."],
        worked: [{
          prompt: "Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}-6x+4=0$ c\xF3 hai nghi\u1EC7m $x_1,x_2$. T\xEDnh $A=x_1^{2}+x_2^{2}$.",
          thinking: ["Bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng \u2192 d\xF9ng $x_1^{2}+x_2^{2}=S^{2}-2P$, kh\xF4ng c\u1EA7n gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh."],
          solution: [
            "$\\Delta'=(-3)^{2}-4=5>0$ n\xEAn ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t.",
            "Theo Vi\xE8te: $S=x_1+x_2=6$; $P=x_1x_2=4$.",
            "$A=S^{2}-2P=36-8=28$."
          ]
        }]
      },
      {
        id: "g9-t3-d3",
        name: "D\u1EA1ng 3. B\xE0i to\xE1n tham s\u1ED1 (c\xE2u ph\xE2n lo\u1EA1i)",
        level: "VDC",
        method: ["\u0110i\u1EC1u ki\u1EC7n c\xF3 nghi\u1EC7m.", "Vi\xE8te.", "Bi\u1EBFn \u0111\u1ED5i h\u1EC7 th\u1EE9c \u0111\u1EC1 cho.", "Gi\u1EA3i theo $m$ v\xE0 \u0111\u1ED1i chi\u1EBFu."],
        worked: [{
          prompt: "Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}-2(m+1)x+m^{2}+2=0$. T\xECm $m$ \u0111\u1EC3 ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m $x_1,x_2$ tho\u1EA3 m\xE3n $x_1^{2}+x_2^{2}=20$.",
          thinking: [
            "B\u01B0\u1EDBc 1: \u0111i\u1EC1u ki\u1EC7n $\\Delta'\\ge0$.",
            "B\u01B0\u1EDBc 2: Vi\xE8te cho $S$ v\xE0 $P$.",
            "B\u01B0\u1EDBc 3: vi\u1EBFt $x_1^{2}+x_2^{2}=S^{2}-2P$ r\u1ED3i gi\u1EA3i theo $m$, cu\u1ED1i c\xF9ng \u0111\u1ED1i chi\u1EBFu."
          ],
          solution: [
            "$\\Delta'=(m+1)^{2}-(m^{2}+2)=2m-1$.",
            "Ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m $\\Leftrightarrow\\Delta'\\ge0\\Leftrightarrow m\\ge\\f{1}{2}$. (*)",
            "Theo Vi\xE8te: $S=x_1+x_2=2(m+1)$; $P=x_1x_2=m^{2}+2$.",
            "$x_1^{2}+x_2^{2}=S^{2}-2P=4(m+1)^{2}-2(m^{2}+2)=4m^{2}+8m+4-2m^{2}-4=2m^{2}+8m$.",
            "Theo \u0111\u1EC1: $2m^{2}+8m=20\\Leftrightarrow m^{2}+4m-10=0$.",
            "$\\Delta_m'=4+10=14\\Rightarrow m=-2\\pm\\s{14}$.",
            "\u0110\u1ED1i chi\u1EBFu (*): $m=-2+\\s{14}\\approx1{,}74\\ge\\f{1}{2}$ (nh\u1EADn); $m=-2-\\s{14}<\\f{1}{2}$ (lo\u1EA1i).",
            "V\u1EADy $m=-2+\\s{14}$."
          ],
          remark: "B\u01B0\u1EDBc \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n (*) ch\xEDnh l\xE0 n\u01A1i ph\xE2n lo\u1EA1i h\u1ECDc sinh 8 \u0111i\u1EC3m v\xE0 h\u1ECDc sinh 9+."
        }]
      }
    ],
    bank: ["g9.pt-bac-hai", "g9.viete", "g9.viete-tham-so", "g9.parabol"]
  },
  {
    id: "g9-t4",
    grade: 9,
    term: "HK1",
    strand: "SO_DAI_SO",
    order: 4,
    name: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c v\xE0 B\u1EA5t ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n",
    summary: "T\xEDnh ch\u1EA5t b\u1EA5t \u0111\u1EB3ng th\u1EE9c, b\u1EA5t ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n v\xE0 c\xE1ch gi\u1EA3i.",
    outcomes: [
      "V\u1EADn d\u1EE5ng t\xEDnh ch\u1EA5t c\u1EE7a b\u1EA5t \u0111\u1EB3ng th\u1EE9c.",
      "Gi\u1EA3i b\u1EA5t ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n v\xE0 bi\u1EC3u di\u1EC5n t\u1EADp nghi\u1EC7m."
    ],
    theory: [
      {
        heading: "T\xEDnh ch\u1EA5t v\xE0 quy t\u1EAFc",
        body: [],
        formulas: [
          "$a<b\\Rightarrow a+c<b+c$",
          "$a<b$ v\xE0 $c>0$ $\\Rightarrow ac<bc$",
          "$a<b$ v\xE0 $c<0$ $\\Rightarrow ac>bc$ (**\u0111\u1ED5i chi\u1EC1u**)",
          "$a<b$ v\xE0 $b<c\\Rightarrow a<c$",
          "B\u1EA5t ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t: $ax+b>0$ ($a\\ne0$)"
        ],
        caution: ["Nh\xE2n ho\u1EB7c chia hai v\u1EBF cho s\u1ED1 **\xE2m** th\xEC ph\u1EA3i \u0111\u1ED5i chi\u1EC1u b\u1EA5t \u0111\u1EB3ng th\u1EE9c \u2014 l\u1ED7i sai kinh \u0111i\u1EC3n."]
      }
    ],
    decode: [
      { signal: "Chia hai v\u1EBF cho h\u1EC7 s\u1ED1 \xE2m", action: "\u0110\u1ED5i chi\u1EC1u d\u1EA5u b\u1EA5t \u0111\u1EB3ng th\u1EE9c.", why: "Ph\xE9p nh\xE2n v\u1EDBi s\u1ED1 \xE2m \u0111\u1EA3o th\u1EE9 t\u1EF1 tr\xEAn tr\u1EE5c s\u1ED1." },
      { signal: "B\u1EA5t ph\u01B0\u01A1ng tr\xECnh c\xF3 m\u1EABu s\u1ED1", action: "Nh\xE2n hai v\u1EBF v\u1EDBi m\u1EABu **d\u01B0\u01A1ng** (BCNN) \u0111\u1EC3 kh\u1EED m\u1EABu.", why: "Nh\xE2n v\u1EDBi s\u1ED1 d\u01B0\u01A1ng gi\u1EEF nguy\xEAn chi\u1EC1u." },
      { signal: "\u0110\u1EC1 h\u1ECFi \u201Cnghi\u1EC7m nguy\xEAn l\u1EDBn nh\u1EA5t/nh\u1ECF nh\u1EA5t\u201D", action: "Gi\u1EA3i b\u1EA5t ph\u01B0\u01A1ng tr\xECnh r\u1ED3i ch\u1ECDn s\u1ED1 nguy\xEAn \u1EDF \u0111\u1EA7u m\xFAt.", why: "T\u1EADp nghi\u1EC7m l\xE0 m\u1ED9t kho\u1EA3ng, \u0111\u1EA7u m\xFAt quy\u1EBFt \u0111\u1ECBnh \u0111\xE1p s\u1ED1." }
    ],
    mindmap: {
      root: "B\u1EA4T \u0110\u1EB2NG TH\u1EE8C \u2014 B\u1EA4T PH\u01AF\u01A0NG TR\xCCNH",
      branches: [
        { title: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c", items: ["C\u1ED9ng hai v\u1EBF", "Nh\xE2n s\u1ED1 d\u01B0\u01A1ng", "Nh\xE2n s\u1ED1 \xE2m: \u0111\u1ED5i chi\u1EC1u", "B\u1EAFc c\u1EA7u"] },
        { title: "B\u1EA5t ph\u01B0\u01A1ng tr\xECnh", items: ["$ax+b>0$", "Quy t\u1EAFc chuy\u1EC3n v\u1EBF", "Quy t\u1EAFc nh\xE2n", "Bi\u1EC3u di\u1EC5n tr\xEAn tr\u1EE5c s\u1ED1"] },
        { title: "\u1EE8ng d\u1EE5ng", items: ["Nghi\u1EC7m nguy\xEAn", "B\xE0i to\xE1n th\u1EF1c t\u1EBF c\xF3 r\xE0ng bu\u1ED9c", "T\xECm \u0111i\u1EC1u ki\u1EC7n tham s\u1ED1"] }
      ]
    },
    types: [
      {
        id: "g9-t4-d1",
        name: "D\u1EA1ng 1. Gi\u1EA3i b\u1EA5t ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t",
        level: "TH",
        method: ["Kh\u1EED m\u1EABu (nh\xE2n v\u1EDBi s\u1ED1 d\u01B0\u01A1ng).", "Chuy\u1EC3n v\u1EBF thu g\u1ECDn.", "Chia h\u1EC7 s\u1ED1, ch\xFA \xFD \u0111\u1ED5i chi\u1EC1u n\u1EBFu chia cho s\u1ED1 \xE2m."],
        worked: [{
          prompt: "Gi\u1EA3i b\u1EA5t ph\u01B0\u01A1ng tr\xECnh $\\f{2x-1}{3}\\le\\f{x+2}{2}$.",
          thinking: ["Nh\xE2n hai v\u1EBF v\u1EDBi 6 (s\u1ED1 d\u01B0\u01A1ng, gi\u1EEF nguy\xEAn chi\u1EC1u)."],
          solution: [
            "$2(2x-1)\\le3(x+2)$",
            "$4x-2\\le3x+6$",
            "$x\\le8$.",
            "T\u1EADp nghi\u1EC7m: $S=\\{x\\mid x\\le8\\}$."
          ]
        }]
      }
    ],
    bank: ["g9.bpt"]
  },
  {
    id: "g9-t5",
    grade: 9,
    term: "HK1",
    strand: "HINH_HOC",
    order: 5,
    name: "H\u1EC7 th\u1EE9c l\u01B0\u1EE3ng trong tam gi\xE1c vu\xF4ng \u2014 T\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c",
    summary: "C\xE1c h\u1EC7 th\u1EE9c v\u1EC1 c\u1EA1nh v\xE0 \u0111\u01B0\u1EDDng cao, t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c c\u1EE7a g\xF3c nh\u1ECDn v\xE0 \u1EE9ng d\u1EE5ng th\u1EF1c t\u1EBF.",
    outcomes: [
      "V\u1EADn d\u1EE5ng c\xE1c h\u1EC7 th\u1EE9c v\u1EC1 c\u1EA1nh v\xE0 \u0111\u01B0\u1EDDng cao trong tam gi\xE1c vu\xF4ng.",
      "T\xEDnh v\xE0 v\u1EADn d\u1EE5ng t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c c\u1EE7a g\xF3c nh\u1ECDn.",
      "Gi\u1EA3i tam gi\xE1c vu\xF4ng v\xE0 b\xE0i to\xE1n th\u1EF1c ti\u1EC5n (\u0111o chi\u1EC1u cao, kho\u1EA3ng c\xE1ch)."
    ],
    theory: [
      {
        heading: "1. H\u1EC7 th\u1EE9c v\u1EC1 c\u1EA1nh v\xE0 \u0111\u01B0\u1EDDng cao",
        body: ["Cho $\\tri ABC$ vu\xF4ng t\u1EA1i $A$, \u0111\u01B0\u1EDDng cao $AH$, $BC=a$, $AC=b$, $AB=c$, $BH=c'$, $CH=b'$, $AH=h$."],
        formulas: [
          "$b^{2}=ab'$ ; $c^{2}=ac'$",
          "$h^{2}=b'c'$",
          "$ah=bc$",
          "$\\f{1}{h^{2}}=\\f{1}{b^{2}}+\\f{1}{c^{2}}$",
          "$a^{2}=b^{2}+c^{2}$ (Pythagore)"
        ]
      },
      {
        heading: "2. T\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c c\u1EE7a g\xF3c nh\u1ECDn",
        body: ["M\u1EB9o nh\u1EDB: \u201C**Sin \u0111i h\u1ECDc \u2013 Cos kh\xF4ng h\u01B0 \u2013 Tang \u0111o\xE0n k\u1EBFt \u2013 Cotang k\u1EBFt \u0111o\xE0n**\u201D."],
        formulas: [
          "$\\sin\\alpha=\\f{\\text{\u0111\u1ED1i}}{\\text{huy\u1EC1n}}$ ; $\\cos\\alpha=\\f{\\text{k\u1EC1}}{\\text{huy\u1EC1n}}$",
          "$\\tan\\alpha=\\f{\\text{\u0111\u1ED1i}}{\\text{k\u1EC1}}$ ; $\\cot\\alpha=\\f{\\text{k\u1EC1}}{\\text{\u0111\u1ED1i}}$",
          "$\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$",
          "$\\tan\\alpha\\cdot\\cot\\alpha=1$ ; $\\tan\\alpha=\\f{\\sin\\alpha}{\\cos\\alpha}$",
          "N\u1EBFu $\\alpha+\\beta=90\\deg$ th\xEC $\\sin\\alpha=\\cos\\beta$, $\\tan\\alpha=\\cot\\beta$",
          "Gi\xE1 tr\u1ECB \u0111\u1EB7c bi\u1EC7t: $\\sin30\\deg=\\f{1}{2}$ ; $\\sin45\\deg=\\f{\\s{2}}{2}$ ; $\\sin60\\deg=\\f{\\s{3}}{2}$"
        ]
      },
      {
        heading: "3. Gi\u1EA3i tam gi\xE1c vu\xF4ng",
        body: [],
        formulas: [
          "C\u1EA1nh g\xF3c vu\xF4ng $=$ c\u1EA1nh huy\u1EC1n $\\times\\sin$ g\xF3c \u0111\u1ED1i $=$ c\u1EA1nh huy\u1EC1n $\\times\\cos$ g\xF3c k\u1EC1",
          "C\u1EA1nh g\xF3c vu\xF4ng $=$ c\u1EA1nh g\xF3c vu\xF4ng kia $\\times\\tan$ g\xF3c \u0111\u1ED1i $=$ c\u1EA1nh g\xF3c vu\xF4ng kia $\\times\\cot$ g\xF3c k\u1EC1"
        ]
      }
    ],
    decode: [
      { signal: "C\xF3 \u0111\u01B0\u1EDDng cao trong tam gi\xE1c vu\xF4ng", action: "Truy ngay 5 h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng, ch\u1ECDn h\u1EC7 th\u1EE9c ch\u1EE9a \u0111\u1EE7 d\u1EEF ki\u1EC7n.", why: "M\u1ED7i h\u1EC7 th\u1EE9c li\xEAn k\u1EBFt \u0111\xFAng 3 \u0111\u1EA1i l\u01B0\u1EE3ng \u2014 ch\u1ECDn h\u1EC7 th\u1EE9c c\xF3 2 \u0111\u1EA1i l\u01B0\u1EE3ng \u0111\xE3 bi\u1EBFt." },
      { signal: "\u0110\u1EC1 cho m\u1ED9t g\xF3c nh\u1ECDn v\xE0 m\u1ED9t c\u1EA1nh", action: "D\xF9ng t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c \u0111\u1EC3 t\xEDnh c\u1EA1nh c\xF2n l\u1EA1i.", why: "M\u1ED9t g\xF3c + m\u1ED9t c\u1EA1nh l\xE0 \u0111\u1EE7 \u0111\u1EC3 gi\u1EA3i tam gi\xE1c vu\xF4ng." },
      { signal: "B\xE0i to\xE1n \u201Cg\xF3c n\xE2ng\u201D, \u201Cg\xF3c h\u1EA1\u201D, \u0111o chi\u1EC1u cao to\xE0 nh\xE0", action: "V\u1EBD tam gi\xE1c vu\xF4ng, d\xF9ng $\\tan$.", why: "$\\tan$ li\xEAn k\u1EBFt chi\u1EC1u cao v\u1EDBi kho\u1EA3ng c\xE1ch ngang." },
      { signal: "Cho $\\sin\\alpha$, h\u1ECFi $\\cos\\alpha$", action: "D\xF9ng $\\sin^{2}+\\cos^{2}=1$, l\u1EA5y gi\xE1 tr\u1ECB d\u01B0\u01A1ng v\xEC $\\alpha$ nh\u1ECDn.", why: "V\u1EDBi g\xF3c nh\u1ECDn, m\u1ECDi t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c \u0111\u1EC1u d\u01B0\u01A1ng." }
    ],
    mindmap: {
      root: "H\u1EC6 TH\u1EE8C L\u01AF\u1EE2NG TRONG TAM GI\xC1C VU\xD4NG",
      branches: [
        { title: "C\u1EA1nh v\xE0 \u0111\u01B0\u1EDDng cao", items: ["$b^{2}=ab'$", "$h^{2}=b'c'$", "$ah=bc$", "$\\f{1}{h^{2}}=\\f{1}{b^{2}}+\\f{1}{c^{2}}$"] },
        { title: "T\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c", items: ["sin, cos, tan, cot", "G\xF3c ph\u1EE5 nhau", "$\\sin^{2}+\\cos^{2}=1$", "Gi\xE1 tr\u1ECB $30\\deg,45\\deg,60\\deg$"] },
        { title: "Gi\u1EA3i tam gi\xE1c vu\xF4ng", items: ["Bi\u1EBFt 2 c\u1EA1nh", "Bi\u1EBFt 1 c\u1EA1nh 1 g\xF3c", "T\xEDnh \u0111\u1EE7 3 c\u1EA1nh 2 g\xF3c"] },
        { title: "Th\u1EF1c t\u1EBF", items: ["\u0110o chi\u1EC1u cao c\xE2y, to\xE0 nh\xE0", "G\xF3c n\xE2ng, g\xF3c h\u1EA1", "\u0110\u1ED9 d\u1ED1c, \u0111\u01B0\u1EDDng tr\u01B0\u1EE3t"] }
      ]
    },
    types: [
      {
        id: "g9-t5-d1",
        name: "D\u1EA1ng 1. T\xEDnh c\u1EA1nh, \u0111\u01B0\u1EDDng cao",
        level: "TH",
        method: ["V\u1EBD h\xECnh, ghi k\xFD hi\u1EC7u.", "Ch\u1ECDn h\u1EC7 th\u1EE9c c\xF3 hai \u0111\u1EA1i l\u01B0\u1EE3ng \u0111\xE3 bi\u1EBFt.", "Thay s\u1ED1 v\xE0 t\xEDnh."],
        worked: [{
          prompt: "Tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$, \u0111\u01B0\u1EDDng cao $AH$. Bi\u1EBFt $BH=4\\,cm$, $CH=9\\,cm$. T\xEDnh $AH$, $AB$, $AC$.",
          thinking: ["$BC=BH+CH=13$. D\xF9ng $h^{2}=b'c'$ v\xE0 $c^{2}=ac'$."],
          solution: [
            "$BC=BH+CH=4+9=13\\ (cm)$.",
            "$AH^{2}=BH\\cdot CH=4\\cdot9=36\\Rightarrow AH=6\\ (cm)$.",
            "$AB^{2}=BH\\cdot BC=4\\cdot13=52\\Rightarrow AB=2\\s{13}\\ (cm)$.",
            "$AC^{2}=CH\\cdot BC=9\\cdot13=117\\Rightarrow AC=3\\s{13}\\ (cm)$."
          ]
        }]
      },
      {
        id: "g9-t5-d2",
        name: "D\u1EA1ng 2. B\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EDBi t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c",
        level: "VD",
        method: ["M\xF4 h\xECnh ho\xE1 b\u1EB1ng tam gi\xE1c vu\xF4ng.", "X\xE1c \u0111\u1ECBnh g\xF3c v\xE0 c\u1EA1nh \u0111\xE3 bi\u1EBFt.", "D\xF9ng tan/sin/cos ph\xF9 h\u1EE3p."],
        worked: [{
          prompt: "T\u1EEB m\u1ED9t \u0111i\u1EC3m c\xE1ch ch\xE2n to\xE0 nh\xE0 $30\\,m$, ng\u01B0\u1EDDi ta nh\xECn \u0111\u1EC9nh to\xE0 nh\xE0 d\u01B0\u1EDBi g\xF3c n\xE2ng $52\\deg$. M\u1EAFt ng\u01B0\u1EDDi quan s\xE1t cao $1{,}6\\,m$. T\xEDnh chi\u1EC1u cao to\xE0 nh\xE0 (l\xE0m tr\xF2n \u0111\u1EBFn h\xE0ng ph\u1EA7n m\u01B0\u1EDDi).",
          thinking: ["Chi\u1EC1u cao to\xE0 nh\xE0 = chi\u1EC1u cao t\xEDnh t\u1EEB t\u1EA7m m\u1EAFt + chi\u1EC1u cao m\u1EAFt."],
          solution: [
            "G\u1ECDi $h$ l\xE0 chi\u1EC1u cao t\u1EEB t\u1EA7m m\u1EAFt \u0111\u1EBFn \u0111\u1EC9nh to\xE0 nh\xE0.",
            "$\\tan52\\deg=\\f{h}{30}\\Rightarrow h=30\\tan52\\deg\\approx30\\cdot1{,}2799\\approx38{,}4\\ (m)$.",
            "Chi\u1EC1u cao to\xE0 nh\xE0: $38{,}4+1{,}6=40{,}0\\ (m)$."
          ]
        }]
      }
    ],
    bank: ["g9.he-thuc-luong", "g9.ti-so-luong-giac"]
  },
  {
    id: "g9-t6",
    grade: 9,
    term: "HK1",
    strand: "HINH_HOC",
    order: 6,
    name: "\u0110\u01B0\u1EDDng tr\xF2n \u2014 G\xF3c v\u1EDBi \u0111\u01B0\u1EDDng tr\xF2n \u2014 T\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp",
    summary: "\u0110\u01B0\u1EDDng tr\xF2n, d\xE2y cung, ti\u1EBFp tuy\u1EBFn, v\u1ECB tr\xED t\u01B0\u01A1ng \u0111\u1ED1i, g\xF3c \u1EDF t\xE2m, g\xF3c n\u1ED9i ti\u1EBFp, t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp.",
    outcomes: [
      "V\u1EADn d\u1EE5ng quan h\u1EC7 gi\u1EEFa \u0111\u01B0\u1EDDng k\xEDnh v\xE0 d\xE2y, t\xEDnh ch\u1EA5t ti\u1EBFp tuy\u1EBFn.",
      "V\u1EADn d\u1EE5ng g\xF3c \u1EDF t\xE2m, g\xF3c n\u1ED9i ti\u1EBFp, g\xF3c t\u1EA1o b\u1EDFi ti\u1EBFp tuy\u1EBFn v\xE0 d\xE2y cung.",
      "Ch\u1EE9ng minh t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp v\xE0 v\u1EADn d\u1EE5ng."
    ],
    theory: [
      {
        heading: "1. \u0110\u01B0\u1EDDng tr\xF2n, d\xE2y v\xE0 ti\u1EBFp tuy\u1EBFn",
        body: [],
        formulas: [
          "\u0110\u01B0\u1EDDng k\xEDnh vu\xF4ng g\xF3c v\u1EDBi m\u1ED9t d\xE2y th\xEC \u0111i qua trung \u0111i\u1EC3m c\u1EE7a d\xE2y \u1EA5y (v\xE0 ng\u01B0\u1EE3c l\u1EA1i, v\u1EDBi d\xE2y kh\xF4ng \u0111i qua t\xE2m).",
          "Trong m\u1ED9t \u0111\u01B0\u1EDDng tr\xF2n, d\xE2y l\u1EDBn h\u01A1n th\xEC g\u1EA7n t\xE2m h\u01A1n.",
          "Ti\u1EBFp tuy\u1EBFn $\\perp$ b\xE1n k\xEDnh t\u1EA1i ti\u1EBFp \u0111i\u1EC3m.",
          "Hai ti\u1EBFp tuy\u1EBFn c\u1EAFt nhau t\u1EA1i $M$: $MA=MB$; $MO$ l\xE0 ph\xE2n gi\xE1c $\\angle AMB$ v\xE0 $\\angle AOB$; $MO\\perp AB$ t\u1EA1i trung \u0111i\u1EC3m $AB$."
        ]
      },
      {
        heading: "2. G\xF3c v\u1EDBi \u0111\u01B0\u1EDDng tr\xF2n",
        body: [],
        formulas: [
          "G\xF3c \u1EDF t\xE2m b\u1EB1ng s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn.",
          "G\xF3c n\u1ED9i ti\u1EBFp b\u1EB1ng **n\u1EEDa** s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn.",
          "C\xE1c g\xF3c n\u1ED9i ti\u1EBFp c\xF9ng ch\u1EAFn m\u1ED9t cung th\xEC b\u1EB1ng nhau.",
          "G\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n l\xE0 **g\xF3c vu\xF4ng**.",
          "G\xF3c t\u1EA1o b\u1EDFi ti\u1EBFp tuy\u1EBFn v\xE0 d\xE2y cung b\u1EB1ng n\u1EEDa s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn (b\u1EB1ng g\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn cung \u0111\xF3).",
          "G\xF3c c\xF3 \u0111\u1EC9nh b\xEAn trong \u0111\u01B0\u1EDDng tr\xF2n $=\\f{1}{2}$ (t\u1ED5ng hai cung b\u1ECB ch\u1EAFn); b\xEAn ngo\xE0i $=\\f{1}{2}$ (hi\u1EC7u hai cung b\u1ECB ch\u1EAFn)."
        ]
      },
      {
        heading: "3. T\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp",
        body: ["D\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt \u2014 \u0111\xE2y l\xE0 \u201Cv\u0169 kh\xED\u201D ch\xEDnh c\u1EE7a c\xE2u h\xECnh thi v\xE0o 10."],
        formulas: [
          "T\u1EE9 gi\xE1c c\xF3 t\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$.",
          "T\u1EE9 gi\xE1c c\xF3 g\xF3c ngo\xE0i t\u1EA1i m\u1ED9t \u0111\u1EC9nh b\u1EB1ng g\xF3c trong c\u1EE7a \u0111\u1EC9nh \u0111\u1ED1i di\u1EC7n.",
          "T\u1EE9 gi\xE1c c\xF3 hai \u0111\u1EC9nh k\u1EC1 c\xF9ng nh\xECn m\u1ED9t c\u1EA1nh d\u01B0\u1EDBi hai g\xF3c b\u1EB1ng nhau.",
          "T\u1EE9 gi\xE1c c\xF3 b\u1ED1n \u0111\u1EC9nh c\xE1ch \u0111\u1EC1u m\u1ED9t \u0111i\u1EC3m.",
          "H\u1EC7 qu\u1EA3 (ph\u01B0\u01A1ng t\xEDch): $MA\\cdot MB=MC\\cdot MD$ khi $A,B,C,D$ c\xF9ng thu\u1ED9c m\u1ED9t \u0111\u01B0\u1EDDng tr\xF2n."
        ]
      }
    ],
    decode: [
      { signal: "Trong h\xECnh c\xF3 hai g\xF3c vu\xF4ng c\xF9ng nh\xECn m\u1ED9t \u0111o\u1EA1n th\u1EB3ng", action: "B\u1ED1n \u0111i\u1EC3m c\xF9ng thu\u1ED9c \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh l\xE0 \u0111o\u1EA1n th\u1EB3ng \u0111\xF3 \u2192 t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp.", why: "\u0110\xE2y l\xE0 d\u1EA5u hi\u1EC7u xu\u1EA5t hi\u1EC7n nhi\u1EC1u nh\u1EA5t trong c\xE2u h\xECnh thi v\xE0o 10." },
      { signal: "\u0110\u1EC1 cho \u0111\u01B0\u1EDDng cao / \u0111\u01B0\u1EDDng vu\xF4ng g\xF3c trong tam gi\xE1c n\u1ED9i ti\u1EBFp", action: "T\xECm ngay t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp t\u1EA1o b\u1EDFi c\xE1c ch\xE2n \u0111\u01B0\u1EDDng vu\xF4ng g\xF3c.", why: "Hai g\xF3c vu\xF4ng l\xE0 \u201Cnam ch\xE2m\u201D c\u1EE7a t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp." },
      { signal: "\u0110\u1EC1 cho hai ti\u1EBFp tuy\u1EBFn c\u1EAFt nhau", action: "Khai th\xE1c $MA=MB$, $MO$ l\xE0 trung tr\u1EF1c $AB$, v\xE0 t\u1EE9 gi\xE1c $MAOB$ n\u1ED9i ti\u1EBFp (hai g\xF3c vu\xF4ng \u0111\u1ED1i nhau).", why: "M\u1ED9t d\u1EEF ki\u1EC7n cho ba k\u1EBFt lu\u1EADn." },
      { signal: "Y\xEAu c\u1EA7u ch\u1EE9ng minh $MA\\cdot MB=MC\\cdot MD$", action: "Ch\u1EE9ng minh hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng (d\xF9ng g\xF3c n\u1ED9i ti\u1EBFp c\xF9ng ch\u1EAFn cung).", why: "\u0110\xE2y l\xE0 h\u1EC7 th\u1EE9c ph\u01B0\u01A1ng t\xEDch, ch\u1EE9ng minh qua \u0111\u1ED3ng d\u1EA1ng." },
      { signal: "\u0110\u1EC1 n\xF3i \u201C\u0111\u01B0\u1EDDng k\xEDnh $AB$, \u0111i\u1EC3m $C$ tr\xEAn \u0111\u01B0\u1EDDng tr\xF2n\u201D", action: "K\u1EBFt lu\u1EADn ngay $\\angle ACB=90\\deg$.", why: "G\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n." },
      { signal: "C\xE2u cu\u1ED1i h\u1ECFi \u0111i\u1EC3m c\u1ED1 \u0111\u1ECBnh / qu\u1EF9 t\xEDch", action: "Th\u1EED v\xE0i v\u1ECB tr\xED \u0111\u1EB7c bi\u1EC7t \u0111\u1EC3 d\u1EF1 \u0111o\xE1n, r\u1ED3i ch\u1EE9ng minh b\u1EB1ng g\xF3c kh\xF4ng \u0111\u1ED5i ho\u1EB7c kho\u1EA3ng c\xE1ch kh\xF4ng \u0111\u1ED5i.", why: "D\u1EF1 \u0111o\xE1n tr\u01B0\u1EDBc r\u1ED3i ch\u1EE9ng minh sau l\xE0 chi\u1EBFn thu\u1EADt chu\u1EA9n cho c\xE2u 0,5 \u0111i\u1EC3m cu\u1ED1i." }
    ],
    mindmap: {
      root: "\u0110\u01AF\u1EDCNG TR\xD2N \u2014 G\xD3C \u2014 T\u1EE8 GI\xC1C N\u1ED8I TI\u1EBEP",
      branches: [
        { title: "\u0110\u01B0\u1EDDng tr\xF2n, d\xE2y", items: ["\u0110\u01B0\u1EDDng k\xEDnh \u22A5 d\xE2y", "D\xE2y v\xE0 kho\u1EA3ng c\xE1ch t\u1EDBi t\xE2m", "V\u1ECB tr\xED t\u01B0\u01A1ng \u0111\u1ED1i \u0111\u01B0\u1EDDng th\u1EB3ng \u2013 \u0111\u01B0\u1EDDng tr\xF2n"] },
        { title: "Ti\u1EBFp tuy\u1EBFn", items: ["Ti\u1EBFp tuy\u1EBFn \u22A5 b\xE1n k\xEDnh", "Hai ti\u1EBFp tuy\u1EBFn c\u1EAFt nhau", "Ti\u1EBFp tuy\u1EBFn chung"] },
        { title: "G\xF3c", items: ["G\xF3c \u1EDF t\xE2m", "G\xF3c n\u1ED9i ti\u1EBFp $=\\f{1}{2}$ cung", "G\xF3c ti\u1EBFp tuy\u1EBFn \u2013 d\xE2y", "G\xF3c trong / ngo\xE0i \u0111\u01B0\u1EDDng tr\xF2n"] },
        { title: "T\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp", items: ["T\u1ED5ng 2 g\xF3c \u0111\u1ED1i $=180\\deg$", "Hai \u0111\u1EC9nh k\u1EC1 c\xF9ng nh\xECn 1 c\u1EA1nh", "G\xF3c ngo\xE0i = g\xF3c trong \u0111\u1ED1i di\u1EC7n", "Ph\u01B0\u01A1ng t\xEDch"] },
        { title: "\u0110\u01B0\u1EDDng tr\xF2n \u0111\u1EB7c bi\u1EC7t", items: ["Ngo\u1EA1i ti\u1EBFp tam gi\xE1c", "N\u1ED9i ti\u1EBFp tam gi\xE1c", "\u0110a gi\xE1c \u0111\u1EC1u"] }
      ]
    },
    practiceSkills: [
      {
        title: "Chi\u1EBFn thu\u1EADt l\xE0m c\xE2u h\xECnh thi v\xE0o 10 (3\u20134 \xFD)",
        detail: [
          "\xDD a (ch\u1EE9ng minh t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp): t\xECm hai g\xF3c vu\xF4ng ho\u1EB7c hai g\xF3c c\xF9ng nh\xECn m\u1ED9t c\u1EA1nh \u2014 h\u1EA7u nh\u01B0 lu\xF4n l\xE0m \u0111\u01B0\u1EE3c, ph\u1EA3i l\u1EA5y tr\u1ECDn \u0111i\u1EC3m.",
          "\xDD b (ch\u1EE9ng minh h\u1EC7 th\u1EE9c / \u0111\u1ED3ng d\u1EA1ng): d\xF9ng g\xF3c n\u1ED9i ti\u1EBFp c\xF9ng ch\u1EAFn cung \u0111\u1EC3 c\xF3 c\u1EB7p g\xF3c b\u1EB1ng nhau, r\u1ED3i g.g.",
          "\xDD c (t\xEDnh \u0111\u1ED9 d\xE0i / di\u1EC7n t\xEDch): d\xF9ng h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng, t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng ho\u1EB7c c\xF4ng th\u1EE9c cung, qu\u1EA1t.",
          "\xDD d (c\xE2u ph\xE2n lo\u1EA1i): th\u1EED v\u1ECB tr\xED \u0111\u1EB7c bi\u1EC7t \u0111\u1EC3 d\u1EF1 \u0111o\xE1n, sau \u0111\xF3 ch\u1EE9ng minh \u0111\u1EA1i l\u01B0\u1EE3ng kh\xF4ng \u0111\u1ED5i.",
          "Lu\xF4n v\u1EBD h\xECnh to, r\xF5, ghi \u0111\u1EE7 k\xFD hi\u1EC7u vu\xF4ng g\xF3c v\xE0 b\u1EB1ng nhau l\xEAn h\xECnh."
        ]
      }
    ],
    types: [
      {
        id: "g9-t6-d1",
        name: "D\u1EA1ng 1. T\xEDnh s\u1ED1 \u0111o g\xF3c, \u0111\u1ED9 d\xE0i cung, di\u1EC7n t\xEDch qu\u1EA1t",
        level: "TH",
        method: ["X\xE1c \u0111\u1ECBnh lo\u1EA1i g\xF3c.", "\xC1p d\u1EE5ng c\xF4ng th\u1EE9c t\u01B0\u01A1ng \u1EE9ng."],
        worked: [{
          prompt: "Cho \u0111\u01B0\u1EDDng tr\xF2n $(O;R)$ v\xE0 cung $AB$ c\xF3 s\u1ED1 \u0111o $60\\deg$. T\xEDnh \u0111\u1ED9 d\xE0i cung $AB$ v\xE0 di\u1EC7n t\xEDch h\xECnh qu\u1EA1t tr\xF2n $OAB$ theo $R$.",
          thinking: ["D\xF9ng c\xF4ng th\u1EE9c \u0111\u1ED9 d\xE0i cung $l=\\f{\\pi Rn}{180}$ v\xE0 di\u1EC7n t\xEDch qu\u1EA1t $S=\\f{\\pi R^{2}n}{360}$."],
          solution: [
            "$l_{AB}=\\f{\\pi R\\cdot60}{180}=\\f{\\pi R}{3}$.",
            "$S_{quat}=\\f{\\pi R^{2}\\cdot60}{360}=\\f{\\pi R^{2}}{6}$."
          ]
        }]
      },
      {
        id: "g9-t6-d2",
        name: "D\u1EA1ng 2. Ch\u1EE9ng minh t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp",
        level: "VD",
        method: ["T\xECm hai g\xF3c vu\xF4ng c\xF9ng nh\xECn m\u1ED9t c\u1EA1nh, ho\u1EB7c t\u1ED5ng hai g\xF3c \u0111\u1ED1i b\u1EB1ng $180\\deg$.", "K\u1EBFt lu\u1EADn k\xE8m t\xEAn \u0111\u01B0\u1EDDng tr\xF2n (n\u1EBFu x\xE1c \u0111\u1ECBnh \u0111\u01B0\u1EE3c)."],
        worked: [{
          prompt: "Cho tam gi\xE1c $ABC$ nh\u1ECDn, c\xE1c \u0111\u01B0\u1EDDng cao $BE$ v\xE0 $CF$ c\u1EAFt nhau t\u1EA1i $H$. Ch\u1EE9ng minh t\u1EE9 gi\xE1c $AEHF$ n\u1ED9i ti\u1EBFp.",
          thinking: ["$BE\\perp AC$ v\xE0 $CF\\perp AB$ cho hai g\xF3c vu\xF4ng t\u1EA1i $E$ v\xE0 $F$, \u0111\u1ED1i nhau trong t\u1EE9 gi\xE1c $AEHF$."],
          solution: [
            "V\xEC $BE$ l\xE0 \u0111\u01B0\u1EDDng cao n\xEAn $\\angle AEH=90\\deg$.",
            "V\xEC $CF$ l\xE0 \u0111\u01B0\u1EDDng cao n\xEAn $\\angle AFH=90\\deg$.",
            "X\xE9t t\u1EE9 gi\xE1c $AEHF$: $\\angle AEH+\\angle AFH=90\\deg+90\\deg=180\\deg$.",
            "Hai g\xF3c n\xE0y \u1EDF v\u1ECB tr\xED \u0111\u1ED1i nhau n\xEAn t\u1EE9 gi\xE1c $AEHF$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AH$."
          ]
        }]
      },
      {
        id: "g9-t6-d3",
        name: "D\u1EA1ng 3. Ch\u1EE9ng minh h\u1EC7 th\u1EE9c, \u0111\u1EB3ng th\u1EE9c t\xEDch",
        level: "VDC",
        method: ["\u0110\u01B0a h\u1EC7 th\u1EE9c v\u1EC1 t\u1EC9 l\u1EC7.", "T\xECm hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng ch\u1EE9a c\xE1c c\u1EA1nh \u0111\xF3.", "D\xF9ng g\xF3c n\u1ED9i ti\u1EBFp c\xF9ng ch\u1EAFn cung \u0111\u1EC3 c\xF3 c\u1EB7p g\xF3c b\u1EB1ng nhau."],
        worked: [{
          prompt: "T\u1EEB \u0111i\u1EC3m $M$ \u1EDF ngo\xE0i \u0111\u01B0\u1EDDng tr\xF2n $(O)$ k\u1EBB c\xE1t tuy\u1EBFn $MAB$ v\xE0 ti\u1EBFp tuy\u1EBFn $MT$ ($T$ l\xE0 ti\u1EBFp \u0111i\u1EC3m). Ch\u1EE9ng minh $MT^{2}=MA\\cdot MB$.",
          thinking: [
            "\u0110\u01B0a v\u1EC1 t\u1EC9 l\u1EC7: $MT^{2}=MA\\cdot MB\\Leftrightarrow\\f{MT}{MA}=\\f{MB}{MT}$.",
            "T\u1EC9 l\u1EC7 n\xE0y g\u1EE3i hai tam gi\xE1c $MTA$ v\xE0 $MBT$.",
            "C\u1EA7n c\u1EB7p g\xF3c b\u1EB1ng nhau: d\xF9ng g\xF3c t\u1EA1o b\u1EDFi ti\u1EBFp tuy\u1EBFn v\xE0 d\xE2y cung."
          ],
          solution: [
            "X\xE9t $\\tri MTA$ v\xE0 $\\tri MBT$ c\xF3: $\\angle M$ chung.",
            "$\\angle MTA=\\angle MBT$ (g\xF3c t\u1EA1o b\u1EDFi ti\u1EBFp tuy\u1EBFn $TM$ v\xE0 d\xE2y $TA$ b\u1EB1ng g\xF3c n\u1ED9i ti\u1EBFp $\\angle TBA$ c\xF9ng ch\u1EAFn cung $TA$).",
            "Do \u0111\xF3 $\\tri MTA\\sim\\tri MBT$ (g.g).",
            "Suy ra $\\f{MT}{MB}=\\f{MA}{MT}$, t\u1EE9c $MT^{2}=MA\\cdot MB$."
          ],
          remark: "\u0110\xE2y l\xE0 h\u1EC7 th\u1EE9c ph\u01B0\u01A1ng t\xEDch \u2014 c\xF4ng c\u1EE5 r\u1EA5t m\u1EA1nh cho \xFD d c\u1EE7a c\xE2u h\xECnh thi v\xE0o 10."
        }]
      }
    ],
    bank: ["g9.duong-tron", "g9.goc-duong-tron", "g9.tu-giac-noi-tiep"]
  },
  {
    id: "g9-t7",
    grade: 9,
    term: "HK2",
    strand: "HINH_HOC",
    order: 7,
    name: "H\xECnh tr\u1EE5 \u2014 H\xECnh n\xF3n \u2014 H\xECnh c\u1EA7u",
    summary: "Di\u1EC7n t\xEDch xung quanh, di\u1EC7n t\xEDch to\xE0n ph\u1EA7n v\xE0 th\u1EC3 t\xEDch c\u1EE7a h\xECnh tr\u1EE5, h\xECnh n\xF3n, h\xECnh c\u1EA7u.",
    outcomes: ["T\xEDnh di\u1EC7n t\xEDch v\xE0 th\u1EC3 t\xEDch c\xE1c h\xECnh kh\u1ED1i tr\xF2n xoay.", "Gi\u1EA3i b\xE0i to\xE1n th\u1EF1c ti\u1EC5n li\xEAn quan."],
    theory: [
      {
        heading: "C\xF4ng th\u1EE9c c\u1EA7n thu\u1ED9c",
        body: [],
        formulas: [
          "H\xECnh tr\u1EE5: $S_{xq}=2\\pi rh$ ; $S_{tp}=2\\pi rh+2\\pi r^{2}$ ; $V=\\pi r^{2}h$",
          "H\xECnh n\xF3n: $S_{xq}=\\pi rl$ ; $S_{tp}=\\pi rl+\\pi r^{2}$ ; $V=\\f{1}{3}\\pi r^{2}h$",
          "Li\xEAn h\u1EC7 trong h\xECnh n\xF3n: $l^{2}=r^{2}+h^{2}$",
          "H\xECnh c\u1EA7u: $S=4\\pi R^{2}$ ; $V=\\f{4}{3}\\pi R^{3}$"
        ],
        caution: ["Ph\xE2n bi\u1EC7t \u0111\u01B0\u1EDDng sinh $l$ (m\u1EB7t b\xEAn h\xECnh n\xF3n) v\u1EDBi chi\u1EC1u cao $h$ (tr\u1EE5c)."]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 cho b\xE1n k\xEDnh v\xE0 \u0111\u01B0\u1EDDng sinh c\u1EE7a h\xECnh n\xF3n", action: "D\xF9ng $S_{xq}=\\pi rl$; mu\u1ED1n t\xEDnh $V$ th\xEC t\xECm $h=\\s{l^{2}-r^{2}}$.", why: "\u0110\u01B0\u1EDDng sinh, b\xE1n k\xEDnh v\xE0 chi\u1EC1u cao t\u1EA1o th\xE0nh tam gi\xE1c vu\xF4ng." },
      { signal: "B\xE0i to\xE1n b\u1EC3 ch\u1EE9a h\xECnh tr\u1EE5", action: "D\xF9ng $V=\\pi r^{2}h$, \u0111\u1ED5i v\u1EC1 l\xEDt n\u1EBFu c\u1EA7n.", why: "M\xF4 h\xECnh th\u1EF1c t\u1EBF ph\u1ED5 bi\u1EBFn nh\u1EA5t c\u1EE7a h\xECnh tr\u1EE5." },
      { signal: "\u0110\u1EC1 n\xF3i \u201Cquay h\xECnh ch\u1EEF nh\u1EADt quanh m\u1ED9t c\u1EA1nh\u201D", action: "\u0110\u01B0\u1EE3c h\xECnh tr\u1EE5 v\u1EDBi b\xE1n k\xEDnh l\xE0 c\u1EA1nh kia.", why: "Nh\u1EADn di\u1EC7n v\u1EADt th\u1EC3 tr\xF2n xoay." }
    ],
    mindmap: {
      root: "H\xCCNH TR\u1EE4 \u2014 N\xD3N \u2014 C\u1EA6U",
      branches: [
        { title: "H\xECnh tr\u1EE5", items: ["$S_{xq}=2\\pi rh$", "$V=\\pi r^{2}h$", "Quay h\xECnh ch\u1EEF nh\u1EADt"] },
        { title: "H\xECnh n\xF3n", items: ["$S_{xq}=\\pi rl$", "$V=\\f{1}{3}\\pi r^{2}h$", "$l^{2}=r^{2}+h^{2}$"] },
        { title: "H\xECnh c\u1EA7u", items: ["$S=4\\pi R^{2}$", "$V=\\f{4}{3}\\pi R^{3}$", "M\u1EB7t c\u1EAFt l\xE0 h\xECnh tr\xF2n"] }
      ]
    },
    types: [
      {
        id: "g9-t7-d1",
        name: "D\u1EA1ng 1. T\xEDnh di\u1EC7n t\xEDch, th\u1EC3 t\xEDch",
        level: "TH",
        method: ["X\xE1c \u0111\u1ECBnh h\xECnh v\xE0 c\xE1c y\u1EBFu t\u1ED1.", "\xC1p d\u1EE5ng c\xF4ng th\u1EE9c, ghi r\xF5 \u0111\u01A1n v\u1ECB."],
        worked: [{
          prompt: "M\u1ED9t h\xECnh n\xF3n c\xF3 b\xE1n k\xEDnh \u0111\xE1y $3\\,cm$, \u0111\u01B0\u1EDDng sinh $5\\,cm$. T\xEDnh di\u1EC7n t\xEDch xung quanh v\xE0 th\u1EC3 t\xEDch h\xECnh n\xF3n.",
          thinking: ["C\u1EA7n chi\u1EC1u cao \u0111\u1EC3 t\xEDnh th\u1EC3 t\xEDch: $h=\\s{l^{2}-r^{2}}$."],
          solution: [
            "$S_{xq}=\\pi rl=\\pi\\cdot3\\cdot5=15\\pi\\ (cm^{2})$.",
            "$h=\\s{5^{2}-3^{2}}=\\s{16}=4\\ (cm)$.",
            "$V=\\f{1}{3}\\pi r^{2}h=\\f{1}{3}\\pi\\cdot9\\cdot4=12\\pi\\ (cm^{3})$."
          ]
        }]
      }
    ],
    bank: ["g9.hinh-tru-non-cau"]
  },
  {
    id: "g9-t8",
    grade: 9,
    term: "HK1",
    strand: "THONG_KE_XS",
    order: 8,
    name: "Th\u1ED1ng k\xEA v\xE0 X\xE1c su\u1EA5t",
    summary: "B\u1EA3ng t\u1EA7n s\u1ED1, t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i, bi\u1EC3u \u0111\u1ED3; ph\xE9p th\u1EED ng\u1EABu nhi\xEAn v\xE0 x\xE1c su\u1EA5t c\u1EE7a bi\u1EBFn c\u1ED1.",
    outcomes: [
      "L\u1EADp b\u1EA3ng t\u1EA7n s\u1ED1, t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i v\xE0 v\u1EBD bi\u1EC3u \u0111\u1ED3 t\u01B0\u01A1ng \u1EE9ng.",
      "T\xEDnh x\xE1c su\u1EA5t c\u1EE7a bi\u1EBFn c\u1ED1 trong m\u1ED9t s\u1ED1 m\xF4 h\xECnh \u0111\u01A1n gi\u1EA3n."
    ],
    theory: [
      {
        heading: "T\u1EA7n s\u1ED1 v\xE0 x\xE1c su\u1EA5t",
        body: [],
        formulas: [
          "T\u1EA7n s\u1ED1 $n_i$: s\u1ED1 l\u1EA7n xu\u1EA5t hi\u1EC7n c\u1EE7a gi\xE1 tr\u1ECB $x_i$",
          "T\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i: $f_i=\\f{n_i}{N}$ (th\u01B0\u1EDDng vi\u1EBFt d\u01B0\u1EDBi d\u1EA1ng ph\u1EA7n tr\u0103m)",
          "T\u1ED5ng t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i b\u1EB1ng $100\\percent$",
          "X\xE1c su\u1EA5t: $P(A)=\\f{\\text{s\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i}}{\\text{s\u1ED1 k\u1EBFt qu\u1EA3 c\xF3 th\u1EC3}}$",
          "Ph\xE9p th\u1EED hai giai \u0111o\u1EA1n: d\xF9ng s\u01A1 \u0111\u1ED3 c\xE2y \u0111\u1EC3 li\u1EC7t k\xEA \u0111\u1EA7y \u0111\u1EE7 k\u1EBFt qu\u1EA3."
        ]
      }
    ],
    decode: [
      { signal: "\u0110\u1EC1 m\xF4 t\u1EA3 ph\xE9p th\u1EED g\u1ED3m hai h\xE0nh \u0111\u1ED9ng li\xEAn ti\u1EBFp", action: "V\u1EBD s\u01A1 \u0111\u1ED3 c\xE2y \u0111\u1EC3 li\u1EC7t k\xEA \u0111\u1EE7 k\u1EBFt qu\u1EA3.", why: "S\u01A1 \u0111\u1ED3 c\xE2y ch\u1ED1ng b\u1ECF s\xF3t \u2014 nguy\xEAn nh\xE2n sai s\u1ED1 1 c\u1EE7a d\u1EA1ng n\xE0y." },
      { signal: "\u0110\u1EC1 cho b\u1EA3ng t\u1EA7n s\u1ED1 v\xE0 h\u1ECFi t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i", action: "Chia t\u1EA7n s\u1ED1 cho t\u1ED5ng r\u1ED3i \u0111\u1ED5i ra ph\u1EA7n tr\u0103m.", why: "\xC1p d\u1EE5ng tr\u1EF1c ti\u1EBFp c\xF4ng th\u1EE9c." }
    ],
    mindmap: {
      root: "TH\u1ED0NG K\xCA & X\xC1C SU\u1EA4T L\u1EDAP 9",
      branches: [
        { title: "B\u1EA3ng t\u1EA7n s\u1ED1", items: ["T\u1EA7n s\u1ED1 $n_i$", "T\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i $f_i$", "B\u1EA3ng gh\xE9p nh\xF3m"] },
        { title: "Bi\u1EC3u \u0111\u1ED3", items: ["C\u1ED9t", "\u0110o\u1EA1n th\u1EB3ng", "H\xECnh qu\u1EA1t tr\xF2n", "T\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i gh\xE9p nh\xF3m"] },
        { title: "X\xE1c su\u1EA5t", items: ["Ph\xE9p th\u1EED", "Kh\xF4ng gian m\u1EABu", "S\u01A1 \u0111\u1ED3 c\xE2y", "$P(A)=\\f{m}{k}$"] }
      ]
    },
    types: [
      {
        id: "g9-t8-d1",
        name: "D\u1EA1ng 1. X\xE1c su\u1EA5t v\u1EDBi ph\xE9p th\u1EED hai giai \u0111o\u1EA1n",
        level: "VD",
        method: ["V\u1EBD s\u01A1 \u0111\u1ED3 c\xE2y li\u1EC7t k\xEA k\u1EBFt qu\u1EA3.", "\u0110\u1EBFm k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i.", "L\u1EADp t\u1EC9 s\u1ED1."],
        worked: [{
          prompt: "Tung m\u1ED9t \u0111\u1ED3ng xu hai l\u1EA7n. T\xEDnh x\xE1c su\u1EA5t \u0111\u1EC3 c\xF3 \xEDt nh\u1EA5t m\u1ED9t l\u1EA7n xu\u1EA5t hi\u1EC7n m\u1EB7t s\u1EA5p (S).",
          thinking: ["Li\u1EC7t k\xEA 4 k\u1EBFt qu\u1EA3; \u201C\xEDt nh\u1EA5t m\u1ED9t l\u1EA7n S\u201D l\xE0 ph\u1EA7n b\xF9 c\u1EE7a \u201Ckh\xF4ng l\u1EA7n n\xE0o S\u201D."],
          solution: [
            "Kh\xF4ng gian m\u1EABu: $\\{NN;NS;SN;SS\\}$ \u2014 c\xF3 4 k\u1EBFt qu\u1EA3 \u0111\u1ED3ng kh\u1EA3 n\u0103ng.",
            "K\u1EBFt qu\u1EA3 kh\xF4ng c\xF3 m\u1EB7t s\u1EA5p: ch\u1EC9 $NN$ \u2014 1 k\u1EBFt qu\u1EA3.",
            "S\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i: $4-1=3$.",
            "$P=\\f{3}{4}$."
          ]
        }]
      }
    ],
    bank: ["g9.thong-ke", "g9.xac-suat"]
  }
];

// src/content/enrich-g6.ts
var EXTRA_TYPES_G6 = {
  "g6-t2": [
    {
      id: "g6-t2-d7",
      name: "D\u1EA1ng 7. Ch\u1EE9ng minh m\u1ED9t s\u1ED1 l\xE0 h\u1EE3p s\u1ED1 / s\u1ED1 nguy\xEAn t\u1ED1",
      level: "VDC",
      method: [
        "Mu\u1ED1n ch\u1EE9ng minh **h\u1EE3p s\u1ED1**: ch\u1EC9 ra m\u1ED9t \u01B0\u1EDBc kh\xE1c 1 v\xE0 ch\xEDnh n\xF3 (th\u01B0\u1EDDng b\u1EB1ng c\xE1ch ph\xE2n t\xEDch th\xE0nh t\xEDch).",
        "Mu\u1ED1n ch\u1EE9ng minh **s\u1ED1 nguy\xEAn t\u1ED1**: ki\u1EC3m tra kh\xF4ng chia h\u1EBFt cho m\u1ECDi s\u1ED1 nguy\xEAn t\u1ED1 nh\u1ECF h\u01A1n ho\u1EB7c b\u1EB1ng c\u0103n c\u1EE7a n\xF3.",
        "V\u1EDBi bi\u1EC3u th\u1EE9c ch\u1EE9a $n$: x\xE9t c\xE1c tr\u01B0\u1EDDng h\u1EE3p theo s\u1ED1 d\u01B0 c\u1EE7a $n$."
      ],
      skills: ["Ph\xE2n t\xEDch th\xE0nh t\xEDch", "X\xE9t theo s\u1ED1 d\u01B0"],
      pitfalls: ["Th\u1EED v\xE0i gi\xE1 tr\u1ECB c\u1EE7a $n$ r\u1ED3i k\u1EBFt lu\u1EADn cho m\u1ECDi $n$."],
      worked: [{
        prompt: "Ch\u1EE9ng minh r\u1EB1ng $A=3^{2020}+3^{2021}+3^{2022}$ chia h\u1EBFt cho 39.",
        thinking: [
          "Ba h\u1EA1ng t\u1EED c\xF9ng c\u01A1 s\u1ED1 3, s\u1ED1 m\u0169 li\xEAn ti\u1EBFp \u2192 \u0111\u1EB7t l\u0169y th\u1EEBa nh\u1ECF nh\u1EA5t l\xE0m nh\xE2n t\u1EED chung.",
          "$39=3\\cdot13$, n\xEAn c\u1EA7n ch\u1EC9 ra $A$ chia h\u1EBFt cho c\u1EA3 3 v\xE0 13."
        ],
        solution: [
          "$A=3^{2020}(1+3+3^{2})=3^{2020}\\cdot13$.",
          "$3^{2020}=3\\cdot3^{2019}$ n\xEAn $A=3\\cdot13\\cdot3^{2019}=39\\cdot3^{2019}$.",
          "V\u1EADy $A$ chia h\u1EBFt cho 39."
        ],
        remark: "K\u1EF9 thu\u1EADt \u201Cnh\xF3m ba l\u0169y th\u1EEBa li\xEAn ti\u1EBFp c\xF9ng c\u01A1 s\u1ED1\u201D cho ngay th\u1EEBa s\u1ED1 $1+a+a^{2}$ \u2014 nh\u1EDB \u0111\u1EC3 d\xF9ng l\u1EA1i."
      }]
    }
  ],
  "g6-t5": [
    {
      id: "g6-t5-d4",
      name: "D\u1EA1ng 4. B\xE0i to\xE1n l\xE3i su\u1EA5t v\xE0 thu\u1EBF",
      level: "VDC",
      method: [
        "Vi\u1EBFt h\u1EC7 s\u1ED1 nh\xE2n cho m\u1ED7i k\u1EF3: t\u0103ng $m\\percent$ \u1EE9ng v\u1EDBi nh\xE2n $(1+\\f{m}{100})$.",
        "Nhi\u1EC1u k\u1EF3 li\xEAn ti\u1EBFp th\xEC nh\xE2n li\xEAn ti\u1EBFp c\xE1c h\u1EC7 s\u1ED1.",
        "V\u1EDBi thu\u1EBF VAT: gi\xE1 ph\u1EA3i tr\u1EA3 $=$ gi\xE1 ch\u01B0a thu\u1EBF $\\times(1+\\f{VAT}{100})$."
      ],
      skills: ["M\xF4 h\xECnh ho\xE1 b\u1EB1ng h\u1EC7 s\u1ED1 nh\xE2n", "Ph\xE2n bi\u1EC7t gi\xE1 tr\u01B0\u1EDBc v\xE0 sau thu\u1EBF"],
      pitfalls: ["T\xEDnh thu\u1EBF tr\xEAn gi\xE1 \u0111\xE3 c\xF3 thu\u1EBF.", "C\u1ED9ng d\u1ED3n l\xE3i su\u1EA5t c\u1EE7a c\xE1c k\u1EF3."],
      worked: [{
        prompt: "M\u1ED9t ng\u01B0\u1EDDi g\u1EEDi ti\u1EBFt ki\u1EC7m 50 000 000 \u0111\u1ED3ng v\u1EDBi l\xE3i su\u1EA5t 6%/n\u0103m, l\xE3i nh\u1EADp g\u1ED1c h\u1EB1ng n\u0103m. H\u1ECFi sau 2 n\u0103m ng\u01B0\u1EDDi \u0111\xF3 nh\u1EADn \u0111\u01B0\u1EE3c c\u1EA3 g\u1ED1c l\u1EABn l\xE3i bao nhi\xEAu ti\u1EC1n?",
        thinking: [
          "\u201CL\xE3i nh\u1EADp g\u1ED1c\u201D ngh\u0129a l\xE0 n\u0103m sau t\xEDnh l\xE3i tr\xEAn c\u1EA3 g\u1ED1c l\u1EABn l\xE3i c\u1EE7a n\u0103m tr\u01B0\u1EDBc \u2192 nh\xE2n li\xEAn ti\u1EBFp hai h\u1EC7 s\u1ED1."
        ],
        solution: [
          "Sau n\u0103m th\u1EE9 nh\u1EA5t: $50\\,000\\,000\\cdot(1+0{,}06)=53\\,000\\,000$ (\u0111\u1ED3ng).",
          "Sau n\u0103m th\u1EE9 hai: $53\\,000\\,000\\cdot(1+0{,}06)=56\\,180\\,000$ (\u0111\u1ED3ng).",
          "V\u1EADy sau 2 n\u0103m ng\u01B0\u1EDDi \u0111\xF3 nh\u1EADn \u0111\u01B0\u1EE3c **56 180 000 \u0111\u1ED3ng**.",
          "L\u01B0u \xFD: n\u1EBFu c\u1ED9ng d\u1ED3n $6\\percent+6\\percent=12\\percent$ s\u1EBD ra $56\\,000\\,000$ \u2014 thi\u1EBFu 180 000 \u0111\u1ED3ng, \u0111\xF3 ch\xEDnh l\xE0 \u201Cl\xE3i c\u1EE7a l\xE3i\u201D."
        ]
      }]
    }
  ],
  "g6-t8": [
    {
      id: "g6-t8-d3",
      name: "D\u1EA1ng 3. Ph\xE2n t\xEDch v\xE0 nh\u1EADn x\xE9t b\u1EA3ng s\u1ED1 li\u1EC7u",
      level: "VD",
      method: [
        "\u0110\u1ECDc k\u1EF9 ti\xEAu \u0111\u1EC1 v\xE0 \u0111\u01A1n v\u1ECB c\u1EE7a b\u1EA3ng.",
        "T\xEDnh t\u1ED5ng, gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t, nh\u1ECF nh\u1EA5t, trung b\xECnh khi c\u1EA7n.",
        "Chuy\u1EC3n sang t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m \u0111\u1EC3 so s\xE1nh gi\u1EEFa c\xE1c nh\xF3m.",
        "Vi\u1EBFt nh\u1EADn x\xE9t b\u1EB1ng c\xE2u ho\xE0n ch\u1EC9nh, c\xF3 s\u1ED1 li\u1EC7u d\u1EABn ch\u1EE9ng."
      ],
      skills: ["\u0110\u1ECDc b\u1EA3ng s\u1ED1 li\u1EC7u", "Vi\u1EBFt nh\u1EADn x\xE9t c\xF3 d\u1EABn ch\u1EE9ng"],
      pitfalls: ["Nh\u1EADn x\xE9t chung chung, kh\xF4ng k\xE8m s\u1ED1 li\u1EC7u."],
      worked: [{
        prompt: "B\u1EA3ng th\u1ED1ng k\xEA s\u1ED1 h\u1ECDc sinh \u0111\u1EA1t \u0111i\u1EC3m 9\u201310 m\xF4n To\xE1n c\u1EE7a b\u1ED1n l\u1EDBp: 6A: 12; 6B: 8; 6C: 15; 6D: 5. T\xEDnh t\u1ED5ng s\u1ED1, cho bi\u1EBFt l\u1EDBp n\xE0o cao nh\u1EA5t v\xE0 l\u1EDBp \u0111\xF3 chi\u1EBFm bao nhi\xEAu ph\u1EA7n tr\u0103m t\u1ED5ng s\u1ED1.",
        thinking: ["T\xEDnh t\u1ED5ng tr\u01B0\u1EDBc, sau \u0111\xF3 t\xECm gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t r\u1ED3i l\u1EADp t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m."],
        solution: [
          "T\u1ED5ng s\u1ED1: $12+8+15+5=40$ (h\u1ECDc sinh).",
          "L\u1EDBp c\xF3 nhi\u1EC1u nh\u1EA5t l\xE0 **6C** v\u1EDBi 15 h\u1ECDc sinh.",
          "T\u1EC9 l\u1EC7: $\\f{15}{40}\\cdot100\\percent=37{,}5\\percent$.",
          "Nh\u1EADn x\xE9t: l\u1EDBp 6C d\u1EABn \u0111\u1EA7u v\u1EDBi 15 h\u1ECDc sinh, chi\u1EBFm $37{,}5\\percent$ t\u1ED5ng s\u1ED1; l\u1EDBp 6D th\u1EA5p nh\u1EA5t v\u1EDBi 5 h\u1ECDc sinh, ch\u1EC9 chi\u1EBFm $12{,}5\\percent$."
        ]
      }]
    }
  ]
};

// src/content/enrich-g7.ts
var EXTRA_TYPES_G7 = {
  "g7-t1": [
    {
      id: "g7-t1-d5",
      name: "D\u1EA1ng 5. So s\xE1nh hai l\u0169y th\u1EEBa l\u1EDBn",
      level: "VD",
      method: [
        "\u0110\u01B0a hai l\u0169y th\u1EEBa v\u1EC1 **c\xF9ng c\u01A1 s\u1ED1** r\u1ED3i so s\xE1nh s\u1ED1 m\u0169.",
        "Ho\u1EB7c \u0111\u01B0a v\u1EC1 **c\xF9ng s\u1ED1 m\u0169** r\u1ED3i so s\xE1nh c\u01A1 s\u1ED1.",
        "N\u1EBFu kh\xF4ng \u0111\u01B0a \u0111\u01B0\u1EE3c, d\xF9ng m\u1ED9t l\u0169y th\u1EEBa trung gian \u0111\u1EC3 ch\u1EB7n gi\u1EEFa."
      ],
      skills: ["T\xE1ch s\u1ED1 m\u0169 theo \u01B0\u1EDBc chung", "Ch\u1EB7n b\u1EB1ng s\u1ED1 trung gian"],
      pitfalls: ["So s\xE1nh tr\u1EF1c ti\u1EBFp c\u01A1 s\u1ED1 v\xE0 s\u1ED1 m\u0169 m\xE0 ch\u01B0a \u0111\u01B0a v\u1EC1 c\xF9ng d\u1EA1ng."],
      worked: [{
        prompt: "So s\xE1nh $3^{40}$ v\xE0 $5^{20}$.",
        thinking: [
          "\u01AF\u1EDBc chung l\u1EDBn nh\u1EA5t c\u1EE7a hai s\u1ED1 m\u0169 40 v\xE0 20 l\xE0 20 \u2192 \u0111\u01B0a v\u1EC1 c\xF9ng s\u1ED1 m\u0169 20.",
          "$3^{40}=(3^{2})^{20}=9^{20}$."
        ],
        solution: [
          "$3^{40}=(3^{2})^{20}=9^{20}$.",
          "V\xEC $9>5$ n\xEAn $9^{20}>5^{20}$.",
          "V\u1EADy $3^{40}>5^{20}$."
        ]
      }]
    },
    {
      id: "g7-t1-d6",
      name: "D\u1EA1ng 6. T\xECm x trong bi\u1EC3u th\u1EE9c ch\u1EE9a l\u0169y th\u1EEBa",
      level: "VD",
      method: [
        "\u0110\u01B0a hai v\u1EBF v\u1EC1 l\u0169y th\u1EEBa **c\xF9ng c\u01A1 s\u1ED1**, sau \u0111\xF3 cho hai s\u1ED1 m\u0169 b\u1EB1ng nhau.",
        "Ho\u1EB7c \u0111\u01B0a v\u1EC1 c\xF9ng s\u1ED1 m\u0169 r\u1ED3i cho hai c\u01A1 s\u1ED1 b\u1EB1ng nhau (ch\xFA \xFD s\u1ED1 m\u0169 ch\u1EB5n sinh hai nghi\u1EC7m).",
        "N\u1EBFu c\xF3 nhi\u1EC1u l\u1EDBp ph\xE9p t\xEDnh th\xEC g\u1EE1 t\u1EEB ngo\xE0i v\xE0o trong tr\u01B0\u1EDBc."
      ],
      pitfalls: ["V\u1EDBi s\u1ED1 m\u0169 ch\u1EB5n, qu\xEAn nghi\u1EC7m \xE2m."],
      worked: [{
        prompt: "T\xECm $x$, bi\u1EBFt $2^{x+1}+2^{x}=48$.",
        thinking: [
          "Hai h\u1EA1ng t\u1EED c\xF9ng c\u01A1 s\u1ED1 2 nh\u01B0ng kh\xE1c s\u1ED1 m\u0169 \u2192 \u0111\u1EB7t $2^{x}$ l\xE0m nh\xE2n t\u1EED chung.",
          "$2^{x+1}=2\\cdot2^{x}$."
        ],
        solution: [
          "$2^{x+1}+2^{x}=2\\cdot2^{x}+2^{x}=3\\cdot2^{x}$.",
          "$3\\cdot2^{x}=48\\Rightarrow2^{x}=16=2^{4}$.",
          "V\u1EADy $x=4$.",
          "Th\u1EED l\u1EA1i: $2^{5}+2^{4}=32+16=48$ \u2713"
        ],
        remark: "K\u1EF9 thu\u1EADt \u201C\u0111\u1EB7t l\u0169y th\u1EEBa nh\u1ECF nh\u1EA5t l\xE0m nh\xE2n t\u1EED chung\u201D d\xF9ng \u0111\u01B0\u1EE3c cho m\u1ECDi b\xE0i d\u1EA1ng $a^{x+k}\\pm a^{x}=b$."
      }]
    }
  ],
  "g7-t2": [
    {
      id: "g7-t2-d5",
      name: "D\u1EA1ng 5. Chia t\u1EC9 l\u1EC7 nhi\u1EC1u t\u1EA7ng (b\xE0i to\xE1n chia ph\u1EA7n th\u01B0\u1EDFng)",
      level: "VDC",
      method: [
        "Khi \u0111\u1EC1 cho t\u1EC9 l\u1EC7 theo c\u1EB7p (v\xED d\u1EE5 $a:b=2:3$ v\xE0 $b:c=4:5$), ph\u1EA3i **n\u1ED1i** hai t\u1EC9 l\u1EC7 qua \u0111\u1EA1i l\u01B0\u1EE3ng chung.",
        "Quy \u0111\u1ED3ng ph\u1EA7n chung: nh\xE2n c\u1EA3 hai t\u1EC9 l\u1EC7 \u0111\u1EC3 ph\u1EA7n c\u1EE7a $b$ b\u1EB1ng nhau.",
        "Sau khi c\xF3 t\u1EC9 l\u1EC7 ba s\u1ED1, \xE1p d\u1EE5ng t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau nh\u01B0 b\xECnh th\u01B0\u1EDDng."
      ],
      skills: ["N\u1ED1i hai t\u1EC9 l\u1EC7", "Quy \u0111\u1ED3ng ph\u1EA7n chung"],
      pitfalls: ["Gh\xE9p th\u1EB3ng $2:3:5$ m\xE0 kh\xF4ng quy \u0111\u1ED3ng ph\u1EA7n c\u1EE7a $b$ \u2014 sai ho\xE0n to\xE0n."],
      worked: [{
        prompt: "Ba l\u1EDBp 7A, 7B, 7C g\xF3p s\xE1ch. S\u1ED1 s\xE1ch c\u1EE7a 7A v\xE0 7B t\u1EC9 l\u1EC7 v\u1EDBi $2:3$; s\u1ED1 s\xE1ch c\u1EE7a 7B v\xE0 7C t\u1EC9 l\u1EC7 v\u1EDBi $4:5$. Bi\u1EBFt c\u1EA3 ba l\u1EDBp g\xF3p \u0111\u01B0\u1EE3c 350 quy\u1EC3n. T\xEDnh s\u1ED1 s\xE1ch m\u1ED7i l\u1EDBp.",
        thinking: [
          "\u0110\u1EA1i l\u01B0\u1EE3ng chung c\u1EE7a hai t\u1EC9 l\u1EC7 l\xE0 s\u1ED1 s\xE1ch l\u1EDBp 7B.",
          "\u1EDE t\u1EC9 l\u1EC7 th\u1EE9 nh\u1EA5t 7B \u1EE9ng v\u1EDBi 3 ph\u1EA7n; \u1EDF t\u1EC9 l\u1EC7 th\u1EE9 hai 7B \u1EE9ng v\u1EDBi 4 ph\u1EA7n \u2192 quy \u0111\u1ED3ng v\u1EC1 12 ph\u1EA7n."
        ],
        solution: [
          "G\u1ECDi s\u1ED1 s\xE1ch ba l\u1EDBp l\u1EA7n l\u01B0\u1EE3t l\xE0 $a$, $b$, $c$ ($a,b,c\\in\\Nstar$).",
          "$a:b=2:3=8:12$ (nh\xE2n c\u1EA3 hai v\u1EBF v\u1EDBi 4).",
          "$b:c=4:5=12:15$ (nh\xE2n c\u1EA3 hai v\u1EBF v\u1EDBi 3).",
          "N\u1ED1i l\u1EA1i: $a:b:c=8:12:15$, t\u1EE9c $\\f{a}{8}=\\f{b}{12}=\\f{c}{15}$.",
          "\xC1p d\u1EE5ng t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau: $\\f{a}{8}=\\f{b}{12}=\\f{c}{15}=\\f{a+b+c}{8+12+15}=\\f{350}{35}=10$.",
          "$a=80$; $b=120$; $c=150$ (quy\u1EC3n).",
          "Ki\u1EC3m tra: $80+120+150=350$ \u2713 v\xE0 $80:120=2:3$ \u2713, $120:150=4:5$ \u2713"
        ],
        remark: "B\u01B0\u1EDBc quy \u0111\u1ED3ng ph\u1EA7n chung l\xE0 \u0111i\u1EC3m ph\xE2n lo\u1EA1i c\u1EE7a d\u1EA1ng n\xE0y \u2014 l\xE0m sai \u1EDF \u0111\xE2y th\xEC m\u1ECDi b\u01B0\u1EDBc sau \u0111\u1EC1u sai."
      }]
    }
  ],
  "g7-t3": [
    {
      id: "g7-t3-d5",
      name: "D\u1EA1ng 5. Ch\u1EE9ng minh \u0111a th\u1EE9c kh\xF4ng c\xF3 nghi\u1EC7m",
      level: "VD",
      method: [
        "Bi\u1EBFn \u0111\u1ED5i \u0111a th\u1EE9c v\u1EC1 d\u1EA1ng t\u1ED5ng c\u1EE7a m\u1ED9t b\xECnh ph\u01B0\u01A1ng v\xE0 m\u1ED9t s\u1ED1 d\u01B0\u01A1ng.",
        "Ch\u1EC9 ra bi\u1EC3u th\u1EE9c lu\xF4n l\u1EDBn h\u01A1n 0 (ho\u1EB7c lu\xF4n nh\u1ECF h\u01A1n 0) v\u1EDBi m\u1ECDi gi\xE1 tr\u1ECB c\u1EE7a bi\u1EBFn.",
        "K\u1EBFt lu\u1EADn \u0111a th\u1EE9c kh\xF4ng c\xF3 nghi\u1EC7m."
      ],
      skills: ["Ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng", "L\u1EADp lu\u1EADn ch\u1EB7n"],
      pitfalls: ["Ch\u1EC9 th\u1EED v\xE0i gi\xE1 tr\u1ECB r\u1ED3i k\u1EBFt lu\u1EADn \u2014 \u0111\xF3 kh\xF4ng ph\u1EA3i ch\u1EE9ng minh."],
      worked: [{
        prompt: "Ch\u1EE9ng minh \u0111a th\u1EE9c $P(x)=x^{2}+4x+7$ kh\xF4ng c\xF3 nghi\u1EC7m.",
        thinking: [
          "Mu\u1ED1n ch\u1EE9ng minh kh\xF4ng c\xF3 nghi\u1EC7m, ta ch\u1EE9ng minh $P(x)>0$ v\u1EDBi m\u1ECDi $x$.",
          "Ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng: n\u1EEDa h\u1EC7 s\u1ED1 c\u1EE7a $x$ l\xE0 2, b\xECnh ph\u01B0\u01A1ng l\xE0 4."
        ],
        solution: [
          "$P(x)=x^{2}+4x+4+3=(x+2)^{2}+3$.",
          "V\xEC $(x+2)^{2}\\ge0$ v\u1EDBi m\u1ECDi $x$ n\xEAn $P(x)\\ge3>0$ v\u1EDBi m\u1ECDi $x$.",
          "Do \u0111\xF3 kh\xF4ng t\u1ED3n t\u1EA1i gi\xE1 tr\u1ECB n\xE0o c\u1EE7a $x$ \u0111\u1EC3 $P(x)=0$.",
          "V\u1EADy \u0111a th\u1EE9c $P(x)$ kh\xF4ng c\xF3 nghi\u1EC7m."
        ]
      }]
    }
  ],
  "g7-t5": [
    {
      id: "g7-t5-d5",
      name: "D\u1EA1ng 5. Ch\u1EE9ng minh ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng, hai \u0111\u01B0\u1EDDng vu\xF4ng g\xF3c",
      level: "VDC",
      method: [
        "Ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng: ch\u1EE9ng minh hai g\xF3c k\u1EC1 b\xF9 (t\u1ED5ng b\u1EB1ng $180\\deg$), ho\u1EB7c ch\u1EE9ng minh c\xF9ng thu\u1ED9c m\u1ED9t \u0111\u01B0\u1EDDng \u0111\u1EB7c bi\u1EC7t (trung tr\u1EF1c, ph\xE2n gi\xE1c).",
        "Hai \u0111\u01B0\u1EDDng vu\xF4ng g\xF3c: ch\u1EE9ng minh g\xF3c t\u1EA1o th\xE0nh b\u1EB1ng $90\\deg$, ho\u1EB7c d\xF9ng t\xEDnh ch\u1EA5t tam gi\xE1c c\xE2n (\u0111\u01B0\u1EDDng trung tuy\u1EBFn \u0111\u1ED3ng th\u1EDDi l\xE0 \u0111\u01B0\u1EDDng cao).",
        "Th\u01B0\u1EDDng ph\u1EA3i ch\u1EE9ng minh hai tam gi\xE1c b\u1EB1ng nhau tr\u01B0\u1EDBc \u0111\u1EC3 c\xF3 c\xE1c g\xF3c/c\u1EA1nh c\u1EA7n d\xF9ng."
      ],
      skills: ["Gh\xE9p nhi\u1EC1u b\u01B0\u1EDBc ch\u1EE9ng minh", "Khai th\xE1c t\xEDnh ch\u1EA5t tam gi\xE1c c\xE2n"],
      pitfalls: ["K\u1EBFt lu\u1EADn th\u1EB3ng h\xE0ng ch\u1EC9 v\xEC \u201Cnh\xECn h\xECnh th\u1EA5y th\u1EB3ng\u201D."],
      worked: [{
        prompt: "Cho tam gi\xE1c $ABC$ c\xE2n t\u1EA1i $A$. G\u1ECDi $M$ l\xE0 trung \u0111i\u1EC3m $BC$, $H$ l\xE0 trung \u0111i\u1EC3m $AM$. Ch\u1EE9ng minh $AM$ l\xE0 \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a $BC$.",
        thinking: [
          "\u0110\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a $BC$ l\xE0 \u0111\u01B0\u1EDDng vu\xF4ng g\xF3c v\u1EDBi $BC$ t\u1EA1i trung \u0111i\u1EC3m c\u1EE7a $BC$.",
          "Ta \u0111\xE3 c\xF3 $M$ l\xE0 trung \u0111i\u1EC3m $BC$, ch\u1EC9 c\u1EA7n ch\u1EE9ng minh $AM\\perp BC$."
        ],
        solution: [
          "X\xE9t $\\tri ABM$ v\xE0 $\\tri ACM$ c\xF3: $AB=AC$ (gt); $MB=MC$ ($M$ l\xE0 trung \u0111i\u1EC3m $BC$); $AM$ chung.",
          "Do \u0111\xF3 $\\tri ABM=\\tri ACM$ (c.c.c), suy ra $\\angle AMB=\\angle AMC$.",
          "M\xE0 $\\angle AMB+\\angle AMC=180\\deg$ (hai g\xF3c k\u1EC1 b\xF9) n\xEAn $\\angle AMB=\\angle AMC=90\\deg$.",
          "V\u1EADy $AM\\perp BC$ t\u1EA1i trung \u0111i\u1EC3m $M$ c\u1EE7a $BC$, t\u1EE9c $AM$ l\xE0 \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a \u0111o\u1EA1n th\u1EB3ng $BC$.",
          "(H\u1EC7 qu\u1EA3: m\u1ECDi \u0111i\u1EC3m tr\xEAn $AM$, trong \u0111\xF3 c\xF3 $H$, \u0111\u1EC1u c\xE1ch \u0111\u1EC1u $B$ v\xE0 $C$.)"
        ],
        remark: "Trong tam gi\xE1c c\xE2n, \u0111\u01B0\u1EDDng trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh \u0111\xE1y \u0111\u1ED3ng th\u1EDDi l\xE0 \u0111\u01B0\u1EDDng cao, \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c v\xE0 \u0111\u01B0\u1EDDng trung tr\u1EF1c \u2014 m\u1ED9t gi\u1EA3 thi\u1EBFt cho b\u1ED1n k\u1EBFt lu\u1EADn."
      }]
    }
  ]
};

// src/content/enrich-g8.ts
var EXTRA_TYPES_G8 = {
  "g8-t1": [
    {
      id: "g8-t1-d5",
      name: "D\u1EA1ng 5. Ph\xE2n t\xEDch nh\xE2n t\u1EED b\u1EB1ng th\xEAm b\u1EDBt h\u1EA1ng t\u1EED",
      level: "VDC",
      method: [
        "Khi b\u1ED1n ph\u01B0\u01A1ng ph\xE1p c\u01A1 b\u1EA3n \u0111\u1EC1u b\xED, h\xE3y ngh\u0129 t\u1EDBi **th\xEAm v\xE0 b\u1EDBt** c\xF9ng m\u1ED9t h\u1EA1ng t\u1EED.",
        "M\u1EE5c ti\xEAu: t\u1EA1o ra m\u1ED9t h\u1EB1ng \u0111\u1EB3ng th\u1EE9c (th\u01B0\u1EDDng l\xE0 b\xECnh ph\u01B0\u01A1ng c\u1EE7a m\u1ED9t t\u1ED5ng), ph\u1EA7n b\u1EDBt \u0111i tr\u1EDF th\xE0nh b\xECnh ph\u01B0\u01A1ng kh\xE1c.",
        "K\u1EBFt qu\u1EA3 thu \u0111\u01B0\u1EE3c c\xF3 d\u1EA1ng $A^{2}-B^{2}$ r\u1ED3i ph\xE2n t\xEDch ti\u1EBFp."
      ],
      skills: ["Nh\u1EADn d\u1EA1ng b\xECnh ph\u01B0\u01A1ng c\xF2n thi\u1EBFu", "B\xF9 tr\u1EEB h\u1EA1ng t\u1EED"],
      pitfalls: ["Th\xEAm m\xE0 qu\xEAn b\u1EDBt (l\xE0m thay \u0111\u1ED5i bi\u1EC3u th\u1EE9c).", "Th\xEAm h\u1EA1ng t\u1EED kh\xF4ng t\u1EA1o \u0111\u01B0\u1EE3c h\u1EB1ng \u0111\u1EB3ng th\u1EE9c."],
      worked: [{
        prompt: "Ph\xE2n t\xEDch $A=x^{4}+4$ th\xE0nh nh\xE2n t\u1EED.",
        thinking: [
          "$x^{4}+4$ kh\xF4ng ph\u1EA3i hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng, kh\xF4ng c\xF3 nh\xE2n t\u1EED chung, ch\u1EC9 c\xF3 hai h\u1EA1ng t\u1EED.",
          "Ta mu\u1ED1n c\xF3 $(x^{2}+2)^{2}=x^{4}+4x^{2}+4$ \u2014 so v\u1EDBi \u0111\u1EC1 th\xEC th\u1EEBa $4x^{2}$.",
          "V\u1EADy th\xEAm $4x^{2}$ r\u1ED3i b\u1EDBt $4x^{2}$."
        ],
        solution: [
          "$A=x^{4}+4x^{2}+4-4x^{2}$",
          "$A=(x^{2}+2)^{2}-(2x)^{2}$",
          "$A=(x^{2}-2x+2)(x^{2}+2x+2)$."
        ],
        remark: "\u0110\xE2y l\xE0 h\u1EB1ng \u0111\u1EB3ng th\u1EE9c Sophie Germain \u2014 m\u1ED9t \u201Cb\u1EA3o b\u1ED1i\u201D c\u1EE7a \u0111\u1EC1 h\u1ECDc sinh gi\u1ECFi l\u1EDBp 8."
      }]
    },
    {
      id: "g8-t1-d6",
      name: "D\u1EA1ng 6. T\xE1ch h\u1EA1ng t\u1EED cho tam th\u1EE9c c\xF3 h\u1EC7 s\u1ED1 b\u1EADc hai kh\xE1c 1",
      level: "VD",
      method: [
        "V\u1EDBi $ax^{2}+bx+c$: t\xECm hai s\u1ED1 c\xF3 **t\xEDch b\u1EB1ng $ac$** v\xE0 **t\u1ED5ng b\u1EB1ng $b$**.",
        "T\xE1ch $bx$ th\xE0nh hai h\u1EA1ng t\u1EED t\u01B0\u01A1ng \u1EE9ng.",
        "Nh\xF3m 2\u20132 r\u1ED3i \u0111\u1EB7t nh\xE2n t\u1EED chung."
      ],
      skills: ["T\xECm c\u1EB7p s\u1ED1 theo t\u1ED5ng \u2013 t\xEDch", "Nh\xF3m h\u1EA1ng t\u1EED"],
      pitfalls: ["T\xECm c\u1EB7p s\u1ED1 c\xF3 t\xEDch b\u1EB1ng $c$ thay v\xEC $ac$ \u2014 sai khi $a\\ne1$."],
      worked: [{
        prompt: "Ph\xE2n t\xEDch $B=6x^{2}+7x-3$ th\xE0nh nh\xE2n t\u1EED.",
        thinking: [
          "$a=6$, $b=7$, $c=-3$ n\xEAn $ac=-18$.",
          "T\xECm hai s\u1ED1 c\xF3 t\xEDch $-18$ v\xE0 t\u1ED5ng $7$: \u0111\xF3 l\xE0 $9$ v\xE0 $-2$."
        ],
        solution: [
          "$B=6x^{2}+9x-2x-3$",
          "$B=3x(2x+3)-(2x+3)$",
          "$B=(2x+3)(3x-1)$.",
          "Ki\u1EC3m tra b\u1EB1ng c\xE1ch nh\xE2n ng\u01B0\u1EE3c: $(2x+3)(3x-1)=6x^{2}-2x+9x-3=6x^{2}+7x-3$ \u2713"
        ]
      }]
    }
  ],
  "g8-t2": [
    {
      id: "g8-t2-d4",
      name: "D\u1EA1ng 4. R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c t\u1ED5ng h\u1EE3p nhi\u1EC1u t\u1EA7ng",
      level: "VDC",
      method: [
        "B\u01B0\u1EDBc 1: \u0111\u1EB7t \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh cho **t\u1EA5t c\u1EA3** c\xE1c m\u1EABu.",
        "B\u01B0\u1EDBc 2: ph\xE2n t\xEDch m\u1ECDi m\u1EABu th\xE0nh nh\xE2n t\u1EED.",
        "B\u01B0\u1EDBc 3: x\u1EED l\xFD trong ngo\u1EB7c tr\u01B0\u1EDBc, m\u1ED7i ngo\u1EB7c r\xFAt g\u1ECDn th\xE0nh m\u1ED9t ph\xE2n th\u1EE9c duy nh\u1EA5t.",
        "B\u01B0\u1EDBc 4: th\u1EF1c hi\u1EC7n ph\xE9p nh\xE2n/chia gi\u1EEFa c\xE1c ngo\u1EB7c (chia l\xE0 nh\xE2n v\u1EDBi ngh\u1ECBch \u0111\u1EA3o).",
        "B\u01B0\u1EDBc 5: r\xFAt g\u1ECDn tri\u1EC7t \u0111\u1EC3 v\xE0 \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n."
      ],
      skills: ["Quy tr\xECnh 5 b\u01B0\u1EDBc", "Qu\u1EA3n l\xFD \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh"],
      pitfalls: [
        "R\xFAt g\u1ECDn gi\u1EEFa ch\u1EEBng khi ch\u01B0a quy \u0111\u1ED3ng xong.",
        "Qu\xEAn \u0111i\u1EC1u ki\u1EC7n ph\xE1t sinh t\u1EEB ph\xE9p chia (bi\u1EC3u th\u1EE9c chia ph\u1EA3i kh\xE1c 0)."
      ],
      worked: [{
        prompt: "R\xFAt g\u1ECDn $P=\\left(\\f{1}{x-1}-\\f{1}{x+1}\\right):\\f{2}{x^{2}-1}$ v\u1EDBi $x\\ne\\pm1$.",
        thinking: [
          "X\u1EED l\xFD ngo\u1EB7c tr\u01B0\u1EDBc: m\u1EABu chung c\u1EE7a hai ph\xE2n th\u1EE9c trong ngo\u1EB7c l\xE0 $(x-1)(x+1)=x^{2}-1$.",
          "Sau \u0111\xF3 chia hai ph\xE2n th\u1EE9c = nh\xE2n v\u1EDBi ngh\u1ECBch \u0111\u1EA3o."
        ],
        solution: [
          "\u0110i\u1EC1u ki\u1EC7n: $x\\ne1$, $x\\ne-1$.",
          "Trong ngo\u1EB7c: $\\f{1}{x-1}-\\f{1}{x+1}=\\f{(x+1)-(x-1)}{x^{2}-1}=\\f{2}{x^{2}-1}$.",
          "$P=\\f{2}{x^{2}-1}:\\f{2}{x^{2}-1}=\\f{2}{x^{2}-1}\\cdot\\f{x^{2}-1}{2}=1$.",
          "V\u1EADy $P=1$ v\u1EDBi m\u1ECDi $x$ tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh."
        ],
        remark: "Khi k\u1EBFt qu\u1EA3 r\xFAt g\u1ECDn ra h\u1EB1ng s\u1ED1, h\xE3y ki\u1EC3m tra l\u1EA1i b\u1EB1ng c\xE1ch thay m\u1ED9t gi\xE1 tr\u1ECB c\u1EE5 th\u1EC3 \u2014 c\xE1ch ki\u1EC3m tra nhanh v\xE0 \u0111\xE1ng tin."
      }]
    }
  ],
  "g8-t3": [
    {
      id: "g8-t3-d4",
      name: "D\u1EA1ng 4. Ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a \u1EA9n \u1EDF m\u1EABu",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: t\xECm \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh (m\u1EABu kh\xE1c 0).",
        "B\u01B0\u1EDBc 2: quy \u0111\u1ED3ng v\xE0 kh\u1EED m\u1EABu.",
        "B\u01B0\u1EDBc 3: gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh thu \u0111\u01B0\u1EE3c.",
        "B\u01B0\u1EDBc 4: **\u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n**, lo\u1EA1i nghi\u1EC7m kh\xF4ng tho\u1EA3 r\u1ED3i m\u1EDBi k\u1EBFt lu\u1EADn."
      ],
      skills: ["Qu\u1EA3n l\xFD \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh", "Kh\u1EED m\u1EABu \u0111\xFAng c\xE1ch"],
      pitfalls: ["Qu\xEAn \u0111\u1EB7t \u0111i\u1EC1u ki\u1EC7n.", "Nh\u1EADn nghi\u1EC7m tr\xF9ng v\u1EDBi gi\xE1 tr\u1ECB l\xE0m m\u1EABu b\u1EB1ng 0."],
      worked: [{
        prompt: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh $\\f{x+2}{x-2}-\\f{1}{x}=\\f{2}{x(x-2)}$.",
        thinking: [
          "M\u1EABu c\xF3 $x-2$ v\xE0 $x$ n\xEAn \u0111i\u1EC1u ki\u1EC7n l\xE0 $x\\ne0$ v\xE0 $x\\ne2$.",
          "M\u1EABu chung l\xE0 $x(x-2)$."
        ],
        solution: [
          "\u0110i\u1EC1u ki\u1EC7n: $x\\ne0$ v\xE0 $x\\ne2$.",
          "Quy \u0111\u1ED3ng v\xE0 kh\u1EED m\u1EABu: $x(x+2)-(x-2)=2$.",
          "$x^{2}+2x-x+2=2\\Leftrightarrow x^{2}+x=0\\Leftrightarrow x(x+1)=0$.",
          "$x=0$ ho\u1EB7c $x=-1$.",
          "\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n: **lo\u1EA1i $x=0$**; nh\u1EADn $x=-1$.",
          "V\u1EADy ph\u01B0\u01A1ng tr\xECnh c\xF3 nghi\u1EC7m duy nh\u1EA5t $x=-1$."
        ],
        remark: "B\u01B0\u1EDBc lo\u1EA1i nghi\u1EC7m ngo\u1EA1i lai ch\xEDnh l\xE0 ch\u1ED7 m\u1EA5t \u0111i\u1EC3m ph\u1ED5 bi\u1EBFn nh\u1EA5t c\u1EE7a d\u1EA1ng n\xE0y."
      }]
    },
    {
      id: "g8-t3-d5",
      name: "D\u1EA1ng 5. B\xE0i to\xE1n ph\u1EA7n tr\u0103m \u2014 t\u0103ng gi\u1EA3m s\u1EA3n l\u01B0\u1EE3ng",
      level: "VD",
      method: [
        "G\u1ECDi \u1EA9n l\xE0 \u0111\u1EA1i l\u01B0\u1EE3ng ban \u0111\u1EA7u (s\u1ED1 ban \u0111\u1EA7u, gi\xE1 g\u1ED1c, s\u1EA3n l\u01B0\u1EE3ng k\u1EBF ho\u1EA1ch).",
        "Vi\u1EBFt \u0111\u1EA1i l\u01B0\u1EE3ng sau khi t\u0103ng/gi\u1EA3m d\u01B0\u1EDBi d\u1EA1ng $x(1\\pm\\f{m}{100})$.",
        "L\u1EADp ph\u01B0\u01A1ng tr\xECnh theo d\u1EEF ki\u1EC7n t\u1ED5ng ho\u1EB7c ch\xEAnh l\u1EC7ch."
      ],
      pitfalls: ["C\u1ED9ng d\u1ED3n ph\u1EA7n tr\u0103m c\u1EE7a hai l\u1EA7n thay \u0111\u1ED5i li\xEAn ti\u1EBFp.", "Nh\u1EA7m m\u1ED1c so s\xE1nh (t\u0103ng so v\u1EDBi ban \u0111\u1EA7u hay so v\u1EDBi l\u1EA7n tr\u01B0\u1EDBc)."],
      worked: [{
        prompt: "Trong th\xE1ng \u0111\u1EA7u, hai t\u1ED5 s\u1EA3n xu\u1EA5t \u0111\u01B0\u1EE3c 800 s\u1EA3n ph\u1EA9m. Sang th\xE1ng th\u1EE9 hai, t\u1ED5 I v\u01B0\u1EE3t m\u1EE9c 15%, t\u1ED5 II v\u01B0\u1EE3t m\u1EE9c 20%, n\xEAn c\u1EA3 hai t\u1ED5 l\xE0m \u0111\u01B0\u1EE3c 945 s\u1EA3n ph\u1EA9m. T\xEDnh s\u1ED1 s\u1EA3n ph\u1EA9m m\u1ED7i t\u1ED5 l\xE0m \u0111\u01B0\u1EE3c trong th\xE1ng \u0111\u1EA7u.",
        thinking: [
          "Hai \u0111\u1EA1i l\u01B0\u1EE3ng ch\u01B0a bi\u1EBFt nh\u01B0ng ta c\xF3 th\u1EC3 d\xF9ng m\u1ED9t \u1EA9n: g\u1ECDi s\u1ED1 s\u1EA3n ph\u1EA9m t\u1ED5 I l\xE0 $x$ th\xEC t\u1ED5 II l\xE0 $800-x$.",
          "Th\xE1ng hai: t\u1ED5 I l\xE0m $1{,}15x$, t\u1ED5 II l\xE0m $1{,}2(800-x)$."
        ],
        solution: [
          "G\u1ECDi s\u1ED1 s\u1EA3n ph\u1EA9m t\u1ED5 I l\xE0m trong th\xE1ng \u0111\u1EA7u l\xE0 $x$ (s\u1EA3n ph\u1EA9m; $0<x<800$).",
          "Khi \u0111\xF3 t\u1ED5 II l\xE0m \u0111\u01B0\u1EE3c $800-x$ s\u1EA3n ph\u1EA9m.",
          "Th\xE1ng th\u1EE9 hai: t\u1ED5 I l\xE0m $1{,}15x$; t\u1ED5 II l\xE0m $1{,}2(800-x)$.",
          "Theo \u0111\u1EC1: $1{,}15x+1{,}2(800-x)=945$.",
          "$1{,}15x+960-1{,}2x=945\\Leftrightarrow -0{,}05x=-15\\Leftrightarrow x=300$.",
          "$x=300$ tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n $0<x<800$.",
          "V\u1EADy th\xE1ng \u0111\u1EA7u t\u1ED5 I l\xE0m \u0111\u01B0\u1EE3c **300 s\u1EA3n ph\u1EA9m**, t\u1ED5 II l\xE0m \u0111\u01B0\u1EE3c **500 s\u1EA3n ph\u1EA9m**."
        ],
        remark: "Khi t\u1ED5ng c\u1EE7a hai \u0111\u1EA1i l\u01B0\u1EE3ng \u0111\xE3 bi\u1EBFt, d\xF9ng **m\u1ED9t \u1EA9n** ($x$ v\xE0 $800-x$) g\u1ECDn h\u01A1n l\u1EADp h\u1EC7 hai \u1EA9n."
      }]
    }
  ],
  "g8-t5": [
    {
      id: "g8-t5-d3",
      name: "D\u1EA1ng 3. T\xECm \u0111i\u1EC1u ki\u1EC7n \u0111\u1EC3 t\u1EE9 gi\xE1c l\xE0 h\xECnh \u0111\u1EB7c bi\u1EC7t",
      level: "VDC",
      method: [
        "Tr\u01B0\u1EDBc h\u1EBFt ch\u1EE9ng minh t\u1EE9 gi\xE1c \u0111\xF3 l\xE0 h\xECnh b\xECnh h\xE0nh (b\u01B0\u1EDBc n\xE0y g\u1EA7n nh\u01B0 lu\xF4n c\xF3).",
        "Mu\u1ED1n th\xE0nh h\xECnh ch\u1EEF nh\u1EADt: th\xEAm m\u1ED9t g\xF3c vu\xF4ng ho\u1EB7c hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau.",
        "Mu\u1ED1n th\xE0nh h\xECnh thoi: th\xEAm hai c\u1EA1nh k\u1EC1 b\u1EB1ng nhau ho\u1EB7c hai \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c.",
        "Mu\u1ED1n th\xE0nh h\xECnh vu\xF4ng: c\u1EA7n \u0111\u1ED3ng th\u1EDDi c\u1EA3 hai \u0111i\u1EC1u ki\u1EC7n tr\xEAn.",
        "Cu\u1ED1i c\xF9ng d\u1ECBch \u0111i\u1EC1u ki\u1EC7n h\xECnh h\u1ECDc \u0111\xF3 v\u1EC1 \u0111i\u1EC1u ki\u1EC7n c\u1EE7a tam gi\xE1c ban \u0111\u1EA7u."
      ],
      skills: ["Chi\u1EBFn thu\u1EADt leo thang", "D\u1ECBch \u0111i\u1EC1u ki\u1EC7n v\u1EC1 tam gi\xE1c g\u1ED1c"],
      pitfalls: ["Nh\u1EA3y th\u1EB3ng l\xEAn h\xECnh vu\xF4ng m\xE0 b\u1ECF qua b\u01B0\u1EDBc h\xECnh b\xECnh h\xE0nh."],
      worked: [{
        prompt: "Cho tam gi\xE1c $ABC$, $M$ l\xE0 trung \u0111i\u1EC3m $BC$. G\u1ECDi $D$, $E$ l\u1EA7n l\u01B0\u1EE3t l\xE0 trung \u0111i\u1EC3m $AB$, $AC$. T\u1EE9 gi\xE1c $ADME$ l\xE0 h\xECnh g\xEC? Tam gi\xE1c $ABC$ c\u1EA7n \u0111i\u1EC1u ki\u1EC7n g\xEC \u0111\u1EC3 $ADME$ l\xE0 h\xECnh thoi? L\xE0 h\xECnh vu\xF4ng?",
        thinking: [
          "$D$, $M$ l\xE0 trung \u0111i\u1EC3m hai c\u1EA1nh n\xEAn $DM$ l\xE0 \u0111\u01B0\u1EDDng trung b\xECnh \u2192 $DM\\para AC$ v\xE0 $DM=\\f{AC}{2}=AE$.",
          "M\u1ED9t c\u1EB7p c\u1EA1nh \u0111\u1ED1i v\u1EEBa song song v\u1EEBa b\u1EB1ng nhau \u2192 h\xECnh b\xECnh h\xE0nh."
        ],
        solution: [
          "Trong tam gi\xE1c $ABC$: $D$ l\xE0 trung \u0111i\u1EC3m $AB$, $M$ l\xE0 trung \u0111i\u1EC3m $BC$ n\xEAn $DM$ l\xE0 \u0111\u01B0\u1EDDng trung b\xECnh.",
          "Suy ra $DM\\para AC$ v\xE0 $DM=\\f{1}{2}AC$. M\xE0 $E$ l\xE0 trung \u0111i\u1EC3m $AC$ n\xEAn $AE=\\f{1}{2}AC$.",
          "Do \u0111\xF3 $DM\\para AE$ v\xE0 $DM=AE$, n\xEAn t\u1EE9 gi\xE1c $ADME$ l\xE0 **h\xECnh b\xECnh h\xE0nh**.",
          "$ADME$ l\xE0 **h\xECnh thoi** $\\Leftrightarrow$ hai c\u1EA1nh k\u1EC1 b\u1EB1ng nhau $\\Leftrightarrow AD=AE\\Leftrightarrow\\f{AB}{2}=\\f{AC}{2}\\Leftrightarrow AB=AC$.",
          "V\u1EADy tam gi\xE1c $ABC$ c\xE2n t\u1EA1i $A$ th\xEC $ADME$ l\xE0 h\xECnh thoi.",
          "$ADME$ l\xE0 **h\xECnh vu\xF4ng** $\\Leftrightarrow$ v\u1EEBa l\xE0 h\xECnh thoi v\u1EEBa c\xF3 m\u1ED9t g\xF3c vu\xF4ng $\\Leftrightarrow AB=AC$ v\xE0 $\\angle A=90\\deg$.",
          "V\u1EADy tam gi\xE1c $ABC$ vu\xF4ng c\xE2n t\u1EA1i $A$ th\xEC $ADME$ l\xE0 h\xECnh vu\xF4ng."
        ]
      }]
    }
  ],
  "g8-t6": [
    {
      id: "g8-t6-d4",
      name: "D\u1EA1ng 4. Ch\u1EE9ng minh h\u1EC7 th\u1EE9c t\xEDch b\u1EB1ng \u0111\u1ED3ng d\u1EA1ng",
      level: "VDC",
      method: [
        "Vi\u1EBFt h\u1EC7 th\u1EE9c c\u1EA7n ch\u1EE9ng minh d\u01B0\u1EDBi d\u1EA1ng **t\u1EC9 l\u1EC7**: $AB\\cdot CD=EF\\cdot GH\\Leftrightarrow\\f{AB}{EF}=\\f{GH}{CD}$.",
        "\u0110\u1ECDc t\u1EC9 l\u1EC7 \u0111\u1EC3 \u0111o\xE1n hai tam gi\xE1c: m\u1ED7i v\u1EBF c\u1EE7a t\u1EC9 l\u1EC7 g\u1EE3i m\u1ED9t tam gi\xE1c.",
        "T\xECm hai c\u1EB7p g\xF3c b\u1EB1ng nhau (th\u01B0\u1EDDng c\xF3 m\u1ED9t g\xF3c chung ho\u1EB7c m\u1ED9t c\u1EB7p g\xF3c \u0111\u1ED1i \u0111\u1EC9nh).",
        "K\u1EBFt lu\u1EADn \u0111\u1ED3ng d\u1EA1ng theo g.g r\u1ED3i suy ra t\u1EC9 l\u1EC7, cu\u1ED1i c\xF9ng nh\xE2n ch\xE9o."
      ],
      skills: ["Truy ng\u01B0\u1EE3c t\u1EEB k\u1EBFt lu\u1EADn", "Nh\u1EADn di\u1EC7n c\u1EB7p tam gi\xE1c t\u1EEB t\u1EC9 l\u1EC7"],
      pitfalls: ["Vi\u1EBFt sai th\u1EE9 t\u1EF1 \u0111\u1EC9nh khi k\xFD hi\u1EC7u \u0111\u1ED3ng d\u1EA1ng, d\u1EABn t\u1EDBi t\u1EC9 l\u1EC7 sai."],
      worked: [{
        prompt: "Cho tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$, \u0111\u01B0\u1EDDng cao $AH$. Ch\u1EE9ng minh $AH^{2}=BH\\cdot CH$.",
        thinking: [
          "\u0110\u01B0a v\u1EC1 t\u1EC9 l\u1EC7: $AH^{2}=BH\\cdot CH\\Leftrightarrow\\f{AH}{BH}=\\f{CH}{AH}$.",
          "T\u1EC9 l\u1EC7 n\xE0y g\u1EE3i hai tam gi\xE1c $AHB$ v\xE0 $CHA$.",
          "C\u1EA3 hai \u0111\u1EC1u vu\xF4ng t\u1EA1i $H$; c\u1EA7n th\xEAm m\u1ED9t c\u1EB7p g\xF3c nh\u1ECDn b\u1EB1ng nhau."
        ],
        solution: [
          "X\xE9t $\\tri AHB$ v\xE0 $\\tri CHA$ c\xF3: $\\angle AHB=\\angle CHA=90\\deg$.",
          "$\\angle BAH=\\angle ACH$ (c\xF9ng ph\u1EE5 v\u1EDBi $\\angle ABH$).",
          "Do \u0111\xF3 $\\tri AHB\\sim\\tri CHA$ (g.g).",
          "Suy ra $\\f{AH}{CH}=\\f{BH}{AH}$, t\u1EE9c $AH^{2}=BH\\cdot CH$."
        ],
        remark: "C\u1EB7p g\xF3c \u201Cc\xF9ng ph\u1EE5 v\u1EDBi m\u1ED9t g\xF3c\u201D l\xE0 c\xF4ng c\u1EE5 t\u1EA1o g\xF3c b\u1EB1ng nhau r\u1EA5t hay d\xF9ng trong tam gi\xE1c vu\xF4ng c\xF3 \u0111\u01B0\u1EDDng cao."
      }]
    }
  ]
};

// src/content/enrich-g9.ts
var EXTRA_TYPES_G9 = {
  /* ---------------- Hệ phương trình ---------------- */
  "g9-t1": [
    {
      id: "g9-t1-d4",
      name: "D\u1EA1ng 4. B\xE0i to\xE1n tham s\u1ED1 v\u1EC1 s\u1ED1 nghi\u1EC7m c\u1EE7a h\u1EC7",
      level: "VDC",
      method: [
        "Vi\u1EBFt h\u1EC7 v\u1EC1 d\u1EA1ng chu\u1EA9n $\\sys{ax+by=c\\\\a'x+b'y=c'}$.",
        "So s\xE1nh c\xE1c t\u1EC9 s\u1ED1: nghi\u1EC7m duy nh\u1EA5t $\\Leftrightarrow\\f{a}{a'}\\ne\\f{b}{b'}$.",
        "V\xF4 nghi\u1EC7m $\\Leftrightarrow\\f{a}{a'}=\\f{b}{b'}\\ne\\f{c}{c'}$; v\xF4 s\u1ED1 nghi\u1EC7m khi c\u1EA3 ba t\u1EC9 s\u1ED1 b\u1EB1ng nhau.",
        "Lu\xF4n x\xE9t ri\xEAng tr\u01B0\u1EDDng h\u1EE3p h\u1EC7 s\u1ED1 b\u1EB1ng 0 tr\u01B0\u1EDBc khi l\u1EADp t\u1EC9 s\u1ED1."
      ],
      skills: ["Bi\u1EC7n lu\u1EADn theo t\u1EC9 s\u1ED1 h\u1EC7 s\u1ED1", "X\xE9t tr\u01B0\u1EDDng h\u1EE3p \u0111\u1EB7c bi\u1EC7t"],
      pitfalls: [
        "L\u1EADp t\u1EC9 s\u1ED1 khi m\u1EABu c\xF3 th\u1EC3 b\u1EB1ng 0.",
        "Qu\xEAn tr\u01B0\u1EDDng h\u1EE3p $m$ l\xE0m h\u1EC7 s\u1ED1 tri\u1EC7t ti\xEAu."
      ],
      worked: [{
        prompt: "T\xECm $m$ \u0111\u1EC3 h\u1EC7 $\\sys{mx+y=3\\\\4x+my=6}$ c\xF3 nghi\u1EC7m duy nh\u1EA5t.",
        thinking: [
          "H\u1EC7 b\u1EADc nh\u1EA5t hai \u1EA9n c\xF3 nghi\u1EC7m duy nh\u1EA5t khi hai t\u1EC9 s\u1ED1 h\u1EC7 s\u1ED1 c\u1EE7a $x$ v\xE0 $y$ kh\xE1c nhau.",
          "\u0110i\u1EC1u ki\u1EC7n \u0111\xF3 t\u01B0\u01A1ng \u0111\u01B0\u01A1ng v\u1EDBi \u0111\u1ECBnh th\u1EE9c $ab'-a'b\\ne0$ \u2014 c\xE1ch vi\u1EBFt n\xE0y an to\xE0n v\xEC kh\xF4ng ph\u1EA3i chia."
        ],
        solution: [
          "H\u1EC7 c\xF3 nghi\u1EC7m duy nh\u1EA5t $\\Leftrightarrow m\\cdot m-4\\cdot1\\ne0$.",
          "$m^{2}-4\\ne0\\Leftrightarrow m\\ne2$ v\xE0 $m\\ne-2$.",
          "V\u1EADy h\u1EC7 c\xF3 nghi\u1EC7m duy nh\u1EA5t khi $m\\ne\\pm2$.",
          "Ki\u1EC3m tra: v\u1EDBi $m=2$ h\u1EC7 tr\u1EDF th\xE0nh $\\sys{2x+y=3\\\\4x+2y=6}$ \u2014 hai ph\u01B0\u01A1ng tr\xECnh t\u1EC9 l\u1EC7, h\u1EC7 c\xF3 v\xF4 s\u1ED1 nghi\u1EC7m.",
          "V\u1EDBi $m=-2$: $\\sys{-2x+y=3\\\\4x-2y=6}$, t\u1EE9c $-2x+y=3$ v\xE0 $-2x+y=-3$ \u2014 m\xE2u thu\u1EABn, h\u1EC7 v\xF4 nghi\u1EC7m."
        ],
        remark: "D\xF9ng \u0111i\u1EC1u ki\u1EC7n $ab'-a'b\\ne0$ thay cho t\u1EC9 s\u1ED1 gi\xFAp tr\xE1nh ho\xE0n to\xE0n b\u1EABy chia cho 0."
      }]
    },
    {
      id: "g9-t1-d5",
      name: "D\u1EA1ng 5. B\xE0i to\xE1n n\u0103ng su\u1EA5t \u2014 l\xE0m chung, l\xE0m ri\xEAng (l\u1EADp h\u1EC7)",
      level: "VD",
      method: [
        "Coi to\xE0n b\u1ED9 c\xF4ng vi\u1EC7c l\xE0 1; g\u1ECDi th\u1EDDi gian l\xE0m ri\xEAng c\u1EE7a m\u1ED7i \u0111\u1ED1i t\u01B0\u1EE3ng l\xE0 \u1EA9n.",
        "N\u0103ng su\u1EA5t m\u1ED7i gi\u1EDD (ng\xE0y) l\xE0 ngh\u1ECBch \u0111\u1EA3o c\u1EE7a th\u1EDDi gian.",
        "L\u1EADp h\u1EC7 theo hai t\xECnh hu\u1ED1ng \u0111\u1EC1 cho, \u0111\u1EB7t \u1EA9n ph\u1EE5 $u=\\f{1}{x}$, $v=\\f{1}{y}$.",
        "Gi\u1EA3i h\u1EC7 b\u1EADc nh\u1EA5t theo $u,v$ r\u1ED3i quay v\u1EC1 $x,y$ v\xE0 \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n."
      ],
      pitfalls: ["C\u1ED9ng th\u1EDDi gian thay v\xEC c\u1ED9ng n\u0103ng su\u1EA5t.", "Qu\xEAn quay v\u1EC1 \u1EA9n ban \u0111\u1EA7u sau khi gi\u1EA3i theo \u1EA9n ph\u1EE5."],
      worked: [{
        prompt: "Hai ng\u01B0\u1EDDi c\xF9ng l\xE0m chung m\u1ED9t c\xF4ng vi\u1EC7c trong 12 gi\u1EDD th\xEC xong. N\u1EBFu ng\u01B0\u1EDDi th\u1EE9 nh\u1EA5t l\xE0m 4 gi\u1EDD r\u1ED3i ngh\u1EC9, ng\u01B0\u1EDDi th\u1EE9 hai l\xE0m ti\u1EBFp 15 gi\u1EDD th\xEC ho\xE0n th\xE0nh c\xF4ng vi\u1EC7c. H\u1ECFi m\u1ED7i ng\u01B0\u1EDDi l\xE0m ri\xEAng th\xEC bao l\xE2u xong?",
        thinking: [
          "Hai \u0111\u1EA1i l\u01B0\u1EE3ng ch\u01B0a bi\u1EBFt l\xE0 th\u1EDDi gian l\xE0m ri\xEAng c\u1EE7a hai ng\u01B0\u1EDDi \u2192 hai \u1EA9n, c\u1EA7n hai ph\u01B0\u01A1ng tr\xECnh.",
          "D\u1EEF ki\u1EC7n 1 cho ph\u01B0\u01A1ng tr\xECnh v\u1EC1 n\u0103ng su\u1EA5t chung; d\u1EEF ki\u1EC7n 2 cho ph\u01B0\u01A1ng tr\xECnh v\u1EC1 kh\u1ED1i l\u01B0\u1EE3ng c\xF4ng vi\u1EC7c t\u1EEBng ng\u01B0\u1EDDi l\xE0m."
        ],
        solution: [
          "G\u1ECDi th\u1EDDi gian ng\u01B0\u1EDDi th\u1EE9 nh\u1EA5t v\xE0 ng\u01B0\u1EDDi th\u1EE9 hai l\xE0m ri\xEAng xong c\xF4ng vi\u1EC7c l\u1EA7n l\u01B0\u1EE3t l\xE0 $x$, $y$ (gi\u1EDD; $x,y>12$).",
          "Trong 1 gi\u1EDD, ng\u01B0\u1EDDi th\u1EE9 nh\u1EA5t l\xE0m \u0111\u01B0\u1EE3c $\\f{1}{x}$ c\xF4ng vi\u1EC7c, ng\u01B0\u1EDDi th\u1EE9 hai l\xE0m \u0111\u01B0\u1EE3c $\\f{1}{y}$ c\xF4ng vi\u1EC7c.",
          "L\xE0m chung 12 gi\u1EDD xong: $12\\left(\\f{1}{x}+\\f{1}{y}\\right)=1$. (1)",
          "Ng\u01B0\u1EDDi th\u1EE9 nh\u1EA5t l\xE0m 4 gi\u1EDD, ng\u01B0\u1EDDi th\u1EE9 hai l\xE0m 15 gi\u1EDD th\xEC xong: $\\f{4}{x}+\\f{15}{y}=1$. (2)",
          "\u0110\u1EB7t $u=\\f{1}{x}$, $v=\\f{1}{y}$ ($u,v>0$), ta \u0111\u01B0\u1EE3c $\\sys{12u+12v=1\\\\4u+15v=1}$.",
          "T\u1EEB (1): $u+v=\\f{1}{12}\\Rightarrow u=\\f{1}{12}-v$. Th\u1EBF v\xE0o (2): $4\\left(\\f{1}{12}-v\\right)+15v=1$.",
          "$\\f{1}{3}-4v+15v=1\\Rightarrow 11v=\\f{2}{3}\\Rightarrow v=\\f{2}{33}$.",
          "$u=\\f{1}{12}-\\f{2}{33}=\\f{11-8}{132}=\\f{3}{132}=\\f{1}{44}$.",
          "V\u1EADy $x=44$ gi\u1EDD, $y=\\f{33}{2}=16{,}5$ gi\u1EDD (\u0111\u1EC1u l\u1EDBn h\u01A1n 12, tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n).",
          "K\u1EBFt lu\u1EADn: ng\u01B0\u1EDDi th\u1EE9 nh\u1EA5t l\xE0m ri\xEAng m\u1EA5t **44 gi\u1EDD**, ng\u01B0\u1EDDi th\u1EE9 hai m\u1EA5t **16,5 gi\u1EDD**."
        ],
        remark: "Lu\xF4n ki\u1EC3m tra \u0111i\u1EC1u ki\u1EC7n \u201Cth\u1EDDi gian l\xE0m ri\xEAng ph\u1EA3i l\u1EDBn h\u01A1n th\u1EDDi gian l\xE0m chung\u201D \u2014 \u0111\xE2y l\xE0 b\u01B0\u1EDBc \u0111\u1ED1i chi\u1EBFu b\u1EAFt bu\u1ED9c."
      }]
    }
  ],
  /* ---------------- Căn thức ---------------- */
  "g9-t2": [
    {
      id: "g9-t2-d4",
      name: "D\u1EA1ng 4. R\xFAt g\u1ECDn c\u0103n k\xE9p $\\s{a\\pm2\\s{b}}$",
      level: "VDC",
      method: [
        "Nh\u1EADn d\u1EA1ng: bi\u1EC3u th\u1EE9c d\u01B0\u1EDBi c\u0103n c\xF3 d\u1EA1ng $a\\pm2\\s{b}$.",
        "T\xECm hai s\u1ED1 $m$, $n$ sao cho $m+n=a$ v\xE0 $mn=b$.",
        "Khi \u0111\xF3 $a\\pm2\\s{b}=(\\s{m}\\pm\\s{n})^{2}$, suy ra $\\s{a\\pm2\\s{b}}=\\abs{\\s{m}\\pm\\s{n}}$.",
        "Ki\u1EC3m tra d\u1EA5u: k\u1EBFt qu\u1EA3 ph\u1EA3i kh\xF4ng \xE2m."
      ],
      skills: ["Nh\u1EADn d\u1EA1ng b\xECnh ph\u01B0\u01A1ng \u1EA9n d\u01B0\u1EDBi c\u0103n", "Gi\u1EA3i h\u1EC7 t\u1ED5ng \u2013 t\xEDch"],
      pitfalls: ["B\u1ECF d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i khi $\\s{m}<\\s{n}$.", "Qu\xEAn nh\xE2n \u0111\xF4i: d\u1EA1ng chu\u1EA9n ph\u1EA3i l\xE0 $2\\s{b}$, n\u1EBFu \u0111\u1EC1 cho $\\s{b}$ th\xEC ph\u1EA3i bi\u1EBFn \u0111\u1ED5i tr\u01B0\u1EDBc."],
      worked: [{
        prompt: "R\xFAt g\u1ECDn $A=\\s{7+4\\s{3}}-\\s{7-4\\s{3}}$.",
        thinking: [
          "\u0110\u01B0a v\u1EC1 d\u1EA1ng chu\u1EA9n: $4\\s{3}=2\\cdot2\\s{3}=2\\s{12}$, n\xEAn $7+4\\s{3}=7+2\\s{12}$.",
          "T\xECm $m+n=7$, $mn=12$ \u2192 $m=4$, $n=3$."
        ],
        solution: [
          "$7+4\\s{3}=7+2\\s{12}=4+2\\cdot2\\s{3}+3=(2+\\s{3})^{2}$.",
          "$7-4\\s{3}=(2-\\s{3})^{2}$.",
          "$A=\\abs{2+\\s{3}}-\\abs{2-\\s{3}}$.",
          "V\xEC $\\s{3}\\approx1{,}73<2$ n\xEAn $2-\\s{3}>0$, do \u0111\xF3 $\\abs{2-\\s{3}}=2-\\s{3}$.",
          "$A=(2+\\s{3})-(2-\\s{3})=2\\s{3}$."
        ],
        remark: "B\u01B0\u1EDBc x\xE9t d\u1EA5u $2-\\s{3}>0$ l\xE0 ch\u1ED7 ph\xE2n lo\u1EA1i: b\u1ECF qua n\xF3 s\u1EBD ra $A=0$ \u2014 sai ho\xE0n to\xE0n."
      }]
    },
    {
      id: "g9-t2-d5",
      name: "D\u1EA1ng 5. Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a c\u0103n th\u1EE9c",
      level: "VD",
      method: [
        "\u0110\u1EB7t \u0111i\u1EC1u ki\u1EC7n cho bi\u1EC3u th\u1EE9c d\u01B0\u1EDBi c\u0103n kh\xF4ng \xE2m (v\xE0 v\u1EBF ph\u1EA3i kh\xF4ng \xE2m n\u1EBFu b\xECnh ph\u01B0\u01A1ng hai v\u1EBF).",
        "C\xF4 l\u1EADp c\u0103n th\u1EE9c v\u1EC1 m\u1ED9t v\u1EBF r\u1ED3i b\xECnh ph\u01B0\u01A1ng hai v\u1EBF.",
        "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh thu \u0111\u01B0\u1EE3c.",
        "**Th\u1EED l\u1EA1i** nghi\u1EC7m v\xE0o ph\u01B0\u01A1ng tr\xECnh g\u1ED1c \u2014 b\u01B0\u1EDBc b\u1EAFt bu\u1ED9c v\xEC b\xECnh ph\u01B0\u01A1ng c\xF3 th\u1EC3 sinh nghi\u1EC7m ngo\u1EA1i lai."
      ],
      pitfalls: ["B\xECnh ph\u01B0\u01A1ng khi v\u1EBF ph\u1EA3i \xE2m.", "Qu\xEAn th\u1EED l\u1EA1i nghi\u1EC7m."],
      worked: [{
        prompt: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh $\\s{2x+3}=x$.",
        thinking: [
          "V\u1EBF tr\xE1i kh\xF4ng \xE2m n\xEAn v\u1EBF ph\u1EA3i c\u0169ng ph\u1EA3i kh\xF4ng \xE2m: \u0111i\u1EC1u ki\u1EC7n $x\\ge0$.",
          "Bi\u1EC3u th\u1EE9c d\u01B0\u1EDBi c\u0103n: $2x+3\\ge0\\Leftrightarrow x\\ge-\\f{3}{2}$ \u2014 \u0111i\u1EC1u ki\u1EC7n n\xE0y b\u1ECB $x\\ge0$ bao h\xE0m."
        ],
        solution: [
          "\u0110i\u1EC1u ki\u1EC7n: $x\\ge0$ (\u0111\u1ED3ng th\u1EDDi $2x+3\\ge0$ lu\xF4n \u0111\xFAng khi $x\\ge0$).",
          "B\xECnh ph\u01B0\u01A1ng hai v\u1EBF: $2x+3=x^{2}\\Leftrightarrow x^{2}-2x-3=0$.",
          "$(x-3)(x+1)=0\\Rightarrow x=3$ ho\u1EB7c $x=-1$.",
          "\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n $x\\ge0$: lo\u1EA1i $x=-1$.",
          "Th\u1EED l\u1EA1i $x=3$: $\\s{2\\cdot3+3}=\\s{9}=3$ \u2713.",
          "V\u1EADy ph\u01B0\u01A1ng tr\xECnh c\xF3 nghi\u1EC7m duy nh\u1EA5t $x=3$."
        ]
      }]
    }
  ],
  /* ---------------- Phương trình bậc hai — Viète ---------------- */
  "g9-t3": [
    {
      id: "g9-t3-d4",
      name: "D\u1EA1ng 4. T\u01B0\u01A1ng giao parabol v\xE0 \u0111\u01B0\u1EDDng th\u1EB3ng",
      level: "VD",
      method: [
        "L\u1EADp **ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m**: cho hai bi\u1EC3u th\u1EE9c c\u1EE7a $y$ b\u1EB1ng nhau.",
        "\u0110\u01B0a v\u1EC1 ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai r\u1ED3i t\xEDnh $\\Delta$.",
        "S\u1ED1 giao \u0111i\u1EC3m b\u1EB1ng s\u1ED1 nghi\u1EC7m: $\\Delta>0$ c\u1EAFt t\u1EA1i hai \u0111i\u1EC3m, $\\Delta=0$ ti\u1EBFp x\xFAc, $\\Delta<0$ kh\xF4ng c\u1EAFt.",
        "Mu\u1ED1n t\xECm to\u1EA1 \u0111\u1ED9 giao \u0111i\u1EC3m: gi\u1EA3i ra $x$ r\u1ED3i thay ng\u01B0\u1EE3c t\xECm $y$."
      ],
      skills: ["L\u1EADp ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m", "Bi\u1EC7n lu\u1EADn theo $\\Delta$"],
      pitfalls: ["Qu\xEAn r\u1EB1ng \u201Cti\u1EBFp x\xFAc\u201D t\u01B0\u01A1ng \u1EE9ng v\u1EDBi $\\Delta=0$, kh\xF4ng ph\u1EA3i $\\Delta<0$."],
      worked: [{
        prompt: "Cho parabol $(P): y=x^{2}$ v\xE0 \u0111\u01B0\u1EDDng th\u1EB3ng $(d): y=2(m-1)x-m^{2}+2m$. T\xECm $m$ \u0111\u1EC3 $(d)$ c\u1EAFt $(P)$ t\u1EA1i hai \u0111i\u1EC3m ph\xE2n bi\u1EC7t.",
        thinking: [
          "S\u1ED1 giao \u0111i\u1EC3m = s\u1ED1 nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m.",
          "H\u1EC7 s\u1ED1 c\u1EE7a $x$ c\xF3 d\u1EA1ng $2b'$ n\xEAn d\xF9ng c\xF4ng th\u1EE9c $\\Delta'$ cho g\u1ECDn."
        ],
        solution: [
          "Ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m: $x^{2}=2(m-1)x-m^{2}+2m$.",
          "$\\Leftrightarrow x^{2}-2(m-1)x+m^{2}-2m=0$. (*)",
          "$\\Delta'=(m-1)^{2}-(m^{2}-2m)=m^{2}-2m+1-m^{2}+2m=1$.",
          "$\\Delta'=1>0$ v\u1EDBi m\u1ECDi $m$, n\xEAn (*) lu\xF4n c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t.",
          "V\u1EADy v\u1EDBi **m\u1ECDi gi\xE1 tr\u1ECB c\u1EE7a $m$**, \u0111\u01B0\u1EDDng th\u1EB3ng $(d)$ lu\xF4n c\u1EAFt parabol $(P)$ t\u1EA1i hai \u0111i\u1EC3m ph\xE2n bi\u1EC7t."
        ],
        remark: "Khi $\\Delta$ r\xFAt g\u1ECDn th\xE0nh m\u1ED9t h\u1EB1ng s\u1ED1 d\u01B0\u01A1ng, k\u1EBFt lu\u1EADn l\xE0 \u201Cv\u1EDBi m\u1ECDi $m$\u201D \u2014 \u0111\u1EEBng c\u1ED1 t\xECm \u0111i\u1EC1u ki\u1EC7n cho $m$ n\u1EEFa."
      }]
    },
    {
      id: "g9-t3-d5",
      name: "D\u1EA1ng 5. H\u1EC7 th\u1EE9c \u0111\u1ED9c l\u1EADp v\u1EDBi tham s\u1ED1",
      level: "VDC",
      method: [
        "Vi\u1EBFt $S$ v\xE0 $P$ theo tham s\u1ED1 $m$.",
        "R\xFAt $m$ t\u1EEB bi\u1EC3u th\u1EE9c \u0111\u01A1n gi\u1EA3n h\u01A1n (th\u01B0\u1EDDng l\xE0 $S$).",
        "Th\u1EBF v\xE0o bi\u1EC3u th\u1EE9c c\xF2n l\u1EA1i \u0111\u1EC3 kh\u1EED $m$.",
        "Thu g\u1ECDn th\xE0nh m\u1ED9t h\u1EC7 th\u1EE9c ch\u1EC9 ch\u1EE9a $x_1$, $x_2$."
      ],
      skills: ["Kh\u1EED tham s\u1ED1", "Bi\u1EBFn \u0111\u1ED5i t\u01B0\u01A1ng \u0111\u01B0\u01A1ng"],
      pitfalls: ["Qu\xEAn n\xEAu \u0111i\u1EC1u ki\u1EC7n ph\u01B0\u01A1ng tr\xECnh c\xF3 nghi\u1EC7m tr\u01B0\u1EDBc khi d\xF9ng Vi\xE8te."],
      worked: [{
        prompt: "Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}-2(m+1)x+2m=0$. Ch\u1EE9ng minh ph\u01B0\u01A1ng tr\xECnh lu\xF4n c\xF3 hai nghi\u1EC7m, r\u1ED3i t\xECm h\u1EC7 th\u1EE9c li\xEAn h\u1EC7 gi\u1EEFa hai nghi\u1EC7m kh\xF4ng ph\u1EE5 thu\u1ED9c $m$.",
        thinking: [
          "Ch\u1EE9ng minh $\\Delta'\\ge0$ b\u1EB1ng c\xE1ch \u0111\u01B0a v\u1EC1 t\u1ED5ng b\xECnh ph\u01B0\u01A1ng.",
          "Sau \u0111\xF3 vi\u1EBFt $S$, $P$ theo $m$ r\u1ED3i kh\u1EED $m$."
        ],
        solution: [
          "$\\Delta'=(m+1)^{2}-2m=m^{2}+2m+1-2m=m^{2}+1>0$ v\u1EDBi m\u1ECDi $m$.",
          "V\u1EADy ph\u01B0\u01A1ng tr\xECnh lu\xF4n c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t v\u1EDBi m\u1ECDi $m$.",
          "Theo Vi\xE8te: $S=x_1+x_2=2(m+1)=2m+2$ v\xE0 $P=x_1x_2=2m$.",
          "T\u1EEB $P=2m$ suy ra $2m=P$; thay v\xE0o $S$: $S=P+2$.",
          "V\u1EADy $x_1+x_2-x_1x_2-2=0$ \u2014 h\u1EC7 th\u1EE9c n\xE0y \u0111\xFAng v\u1EDBi m\u1ECDi $m$."
        ],
        remark: "M\u1EB9o: ch\u1ECDn kh\u1EED $m$ \u1EDF bi\u1EC3u th\u1EE9c n\xE0o c\xF3 $m$ \u0111\u1EE9ng \u201Ctr\u1EA7n\u201D nh\u1EA5t (\u1EDF \u0111\xE2y l\xE0 $P=2m$) \u0111\u1EC3 ph\xE9p th\u1EBF g\u1ECDn nh\u1EA5t."
      }]
    },
    {
      id: "g9-t3-d6",
      name: "D\u1EA1ng 6. \u0110i\u1EC1u ki\u1EC7n v\u1EC1 d\u1EA5u v\xE0 v\u1ECB tr\xED c\u1EE7a hai nghi\u1EC7m",
      level: "VDC",
      method: [
        "Hai nghi\u1EC7m **tr\xE1i d\u1EA5u** $\\Leftrightarrow P<0$ (khi \u0111\xF3 $\\Delta>0$ t\u1EF1 \u0111\u1ED9ng).",
        "Hai nghi\u1EC7m **c\xF9ng d\u01B0\u01A1ng** $\\Leftrightarrow\\Delta\\ge0$, $S>0$, $P>0$.",
        "Hai nghi\u1EC7m **c\xF9ng \xE2m** $\\Leftrightarrow\\Delta\\ge0$, $S<0$, $P>0$.",
        "Lu\xF4n giao t\u1EA5t c\u1EA3 c\xE1c \u0111i\u1EC1u ki\u1EC7n r\u1ED3i m\u1EDBi k\u1EBFt lu\u1EADn."
      ],
      skills: ["L\u1EADp h\u1EC7 \u0111i\u1EC1u ki\u1EC7n", "Giao nghi\u1EC7m c\u1EE7a nhi\u1EC1u b\u1EA5t ph\u01B0\u01A1ng tr\xECnh"],
      pitfalls: [
        "Th\xEAm \u0111i\u1EC1u ki\u1EC7n $\\Delta>0$ v\xE0o tr\u01B0\u1EDDng h\u1EE3p tr\xE1i d\u1EA5u (th\u1EEBa, nh\u01B0ng kh\xF4ng sai) \u2014 ch\u1EC9 sai khi **thi\u1EBFu** \u0111i\u1EC1u ki\u1EC7n.",
        "Qu\xEAn giao c\xE1c \u0111i\u1EC1u ki\u1EC7n, ch\u1EC9 l\u1EA5y \u0111i\u1EC1u ki\u1EC7n cu\u1ED1i c\xF9ng."
      ],
      worked: [{
        prompt: "Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}-2mx+m^{2}-4=0$. T\xECm $m$ \u0111\u1EC3 ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m d\u01B0\u01A1ng ph\xE2n bi\u1EC7t.",
        thinking: [
          "Hai nghi\u1EC7m d\u01B0\u01A1ng ph\xE2n bi\u1EC7t c\u1EA7n \u0111\u1EE7 ba \u0111i\u1EC1u ki\u1EC7n: $\\Delta'>0$, $S>0$, $P>0$.",
          "Gi\u1EA3i t\u1EEBng b\u1EA5t ph\u01B0\u01A1ng tr\xECnh r\u1ED3i giao l\u1EA1i tr\xEAn tr\u1EE5c s\u1ED1."
        ],
        solution: [
          "$\\Delta'=m^{2}-(m^{2}-4)=4>0$ v\u1EDBi m\u1ECDi $m$ \u2192 lu\xF4n c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t. (1)",
          "Theo Vi\xE8te: $S=2m$ v\xE0 $P=m^{2}-4$.",
          "$S>0\\Leftrightarrow 2m>0\\Leftrightarrow m>0$. (2)",
          "$P>0\\Leftrightarrow m^{2}-4>0\\Leftrightarrow m<-2$ ho\u1EB7c $m>2$. (3)",
          "Giao (1), (2), (3): $m>2$.",
          "V\u1EADy $m>2$ th\xEC ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m d\u01B0\u01A1ng ph\xE2n bi\u1EC7t."
        ],
        remark: "V\u1EBD tr\u1EE5c s\u1ED1 \u0111\u1EC3 giao c\xE1c \u0111i\u1EC1u ki\u1EC7n \u2014 c\xE1ch n\xE0y g\u1EA7n nh\u01B0 kh\xF4ng bao gi\u1EDD sai, c\xF2n giao \u201Ctrong \u0111\u1EA7u\u201D th\xEC r\u1EA5t d\u1EC5 s\xF3t."
      }]
    }
  ],
  /* ---------------- Hệ thức lượng ---------------- */
  "g9-t5": [
    {
      id: "g9-t5-d3",
      name: "D\u1EA1ng 3. Gi\u1EA3i tam gi\xE1c vu\xF4ng",
      level: "VD",
      method: [
        "V\u1EBD h\xECnh, ghi r\xF5 y\u1EBFu t\u1ED1 \u0111\xE3 bi\u1EBFt.",
        "Bi\u1EBFt hai c\u1EA1nh: d\xF9ng Pythagore t\xECm c\u1EA1nh c\xF2n l\u1EA1i, d\xF9ng t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c t\xECm g\xF3c.",
        "Bi\u1EBFt m\u1ED9t c\u1EA1nh v\xE0 m\u1ED9t g\xF3c nh\u1ECDn: d\xF9ng $\\sin$, $\\cos$, $\\tan$ \u0111\u1EC3 t\xECm c\xE1c c\u1EA1nh c\xF2n l\u1EA1i.",
        "G\xF3c nh\u1ECDn c\xF2n l\u1EA1i l\u1EA5y $90\\deg$ tr\u1EEB g\xF3c \u0111\xE3 bi\u1EBFt."
      ],
      skills: ["Ch\u1ECDn \u0111\xFAng t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c", "L\xE0m tr\xF2n theo y\xEAu c\u1EA7u"],
      pitfalls: ["Nh\u1EA7m c\u1EA1nh k\u1EC1 v\u1EDBi c\u1EA1nh \u0111\u1ED1i.", "D\xF9ng $\\sin$ khi l\u1EBD ra ph\u1EA3i d\xF9ng $\\tan$."],
      worked: [{
        prompt: "Tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$ c\xF3 $AB=6\\,cm$, $\\angle B=55\\deg$. Gi\u1EA3i tam gi\xE1c $ABC$ (l\xE0m tr\xF2n \u0111\u1ED9 d\xE0i \u0111\u1EBFn ch\u1EEF s\u1ED1 th\u1EADp ph\xE2n th\u1EE9 nh\u1EA5t).",
        thinking: [
          "\u201CGi\u1EA3i tam gi\xE1c\u201D ngh\u0129a l\xE0 t\xECm \u0111\u1EE7 t\u1EA5t c\u1EA3 c\xE1c c\u1EA1nh v\xE0 g\xF3c ch\u01B0a bi\u1EBFt.",
          "$AB$ l\xE0 c\u1EA1nh k\u1EC1 c\u1EE7a g\xF3c $B$; $AC$ l\xE0 c\u1EA1nh \u0111\u1ED1i; $BC$ l\xE0 c\u1EA1nh huy\u1EC1n."
        ],
        solution: [
          "$\\angle C=90\\deg-\\angle B=90\\deg-55\\deg=35\\deg$.",
          "$\\tan B=\\f{AC}{AB}\\Rightarrow AC=AB\\cdot\\tan55\\deg\\approx6\\cdot1{,}428\\approx8{,}6\\ (cm)$.",
          "$\\cos B=\\f{AB}{BC}\\Rightarrow BC=\\f{AB}{\\cos55\\deg}\\approx\\f{6}{0{,}574}\\approx10{,}5\\ (cm)$.",
          "Ki\u1EC3m tra b\u1EB1ng Pythagore: $6^{2}+8{,}6^{2}=36+73{,}96=109{,}96$ v\xE0 $10{,}5^{2}=110{,}25$ \u2014 sai l\u1EC7ch do l\xE0m tr\xF2n, ch\u1EA5p nh\u1EADn \u0111\u01B0\u1EE3c."
        ],
        remark: "Lu\xF4n ki\u1EC3m tra ch\xE9o b\u1EB1ng Pythagore \u2014 n\u1EBFu l\u1EC7ch nhi\u1EC1u th\xEC ch\u1EAFc ch\u1EAFn \u0111\xE3 ch\u1ECDn nh\u1EA7m t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c."
      }]
    }
  ],
  /* ---------------- Đường tròn ---------------- */
  "g9-t6": [
    {
      id: "g9-t6-d4",
      name: "D\u1EA1ng 4. Hai ti\u1EBFp tuy\u1EBFn c\u1EAFt nhau",
      level: "VD",
      method: [
        "T\u1EEB \u0111i\u1EC3m $M$ ngo\xE0i $(O)$ k\u1EBB hai ti\u1EBFp tuy\u1EBFn $MA$, $MB$: khai th\xE1c ngay ba k\u1EBFt qu\u1EA3.",
        "$MA=MB$ (hai ti\u1EBFp tuy\u1EBFn c\xF9ng xu\u1EA5t ph\xE1t t\u1EEB m\u1ED9t \u0111i\u1EC3m).",
        "$MO$ l\xE0 tia ph\xE2n gi\xE1c c\u1EE7a $\\angle AMB$, \u0111\u1ED3ng th\u1EDDi $OM$ l\xE0 ph\xE2n gi\xE1c $\\angle AOB$.",
        "$MO$ l\xE0 \u0111\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a $AB$, do \u0111\xF3 $MO\\perp AB$ t\u1EA1i trung \u0111i\u1EC3m $H$ c\u1EE7a $AB$.",
        "Ngo\xE0i ra $MAOB$ n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $MO$ (hai g\xF3c vu\xF4ng \u0111\u1ED1i nhau)."
      ],
      skills: ["Khai th\xE1c tri\u1EC7t \u0111\u1EC3 m\u1ED9t gi\u1EA3 thi\u1EBFt", "K\u1EBFt h\u1EE3p ti\u1EBFp tuy\u1EBFn v\u1EDBi h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng"],
      pitfalls: ["Ch\u1EC9 d\xF9ng $MA=MB$ m\xE0 b\u1ECF qu\xEAn ba k\u1EBFt qu\u1EA3 c\xF2n l\u1EA1i \u2014 th\u01B0\u1EDDng l\xE0 ch\u1ED7 m\u1EAFc \u1EDF \xFD c, d."],
      worked: [{
        prompt: "Cho $(O;R)$ v\xE0 \u0111i\u1EC3m $M$ v\u1EDBi $OM=2R$. K\u1EBB hai ti\u1EBFp tuy\u1EBFn $MA$, $MB$. T\xEDnh $MA$ v\xE0 $\\angle AMB$.",
        thinking: [
          "Ti\u1EBFp tuy\u1EBFn vu\xF4ng g\xF3c b\xE1n k\xEDnh t\u1EA1i ti\u1EBFp \u0111i\u1EC3m \u2192 tam gi\xE1c $OAM$ vu\xF4ng t\u1EA1i $A$.",
          "Bi\u1EBFt c\u1EA1nh huy\u1EC1n $OM=2R$ v\xE0 m\u1ED9t c\u1EA1nh g\xF3c vu\xF4ng $OA=R$ \u2192 d\xF9ng Pythagore v\xE0 t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c."
        ],
        solution: [
          "V\xEC $MA$ l\xE0 ti\u1EBFp tuy\u1EBFn t\u1EA1i $A$ n\xEAn $OA\\perp MA$, tam gi\xE1c $OAM$ vu\xF4ng t\u1EA1i $A$.",
          "Theo Pythagore: $MA^{2}=OM^{2}-OA^{2}=(2R)^{2}-R^{2}=3R^{2}\\Rightarrow MA=R\\s{3}$.",
          "$\\sin\\angle AMO=\\f{OA}{OM}=\\f{R}{2R}=\\f{1}{2}\\Rightarrow\\angle AMO=30\\deg$.",
          "V\xEC $MO$ l\xE0 ph\xE2n gi\xE1c c\u1EE7a $\\angle AMB$ n\xEAn $\\angle AMB=2\\cdot30\\deg=60\\deg$."
        ],
        remark: "C\u1EA5u h\xECnh $OM=2R$ cho tam gi\xE1c \u0111\u1EC1u $MAB$ \u2014 m\u1ED9t c\u1EA5u h\xECnh quen thu\u1ED9c, n\xEAn nh\u1EDB \u0111\u1EC3 nh\u1EADn ra nhanh."
      }]
    },
    {
      id: "g9-t6-d5",
      name: "D\u1EA1ng 5. C\xE2u ph\xE2n lo\u1EA1i \u2014 ch\u1EE9ng minh \u0111i\u1EC3m c\u1ED1 \u0111\u1ECBnh, ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng",
      level: "VDC",
      method: [
        "Th\u1EED v\u1EDBi **hai v\u1ECB tr\xED \u0111\u1EB7c bi\u1EC7t** c\u1EE7a \u0111i\u1EC3m di \u0111\u1ED9ng \u0111\u1EC3 d\u1EF1 \u0111o\xE1n k\u1EBFt qu\u1EA3 (v\xED d\u1EE5 khi \u0111i\u1EC3m tr\xF9ng \u0111\u1EA7u m\xFAt, khi h\xECnh tr\u1EDF n\xEAn \u0111\u1ED1i x\u1EE9ng).",
        "V\u1EDBi \u0111i\u1EC3m c\u1ED1 \u0111\u1ECBnh: ch\u1EC9 ra m\u1ED9t \u0111\u1EA1i l\u01B0\u1EE3ng kh\xF4ng \u0111\u1ED5i (kho\u1EA3ng c\xE1ch t\u1EDBi m\u1ED9t \u0111i\u1EC3m cho tr\u01B0\u1EDBc, ho\u1EB7c giao c\u1EE7a hai \u0111\u01B0\u1EDDng c\u1ED1 \u0111\u1ECBnh).",
        "V\u1EDBi ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng: ch\u1EE9ng minh hai g\xF3c k\u1EC1 b\xF9, ho\u1EB7c d\xF9ng t\xEDnh ch\u1EA5t t\xE2m \u2014 trung \u0111i\u1EC3m \u2014 tr\u1EF1c t\xE2m.",
        "V\u1EDBi h\u1EC7 th\u1EE9c t\xEDch: quy v\u1EC1 ph\u01B0\u01A1ng t\xEDch ho\u1EB7c hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng."
      ],
      skills: ["D\u1EF1 \u0111o\xE1n tr\u01B0\u1EDBc, ch\u1EE9ng minh sau", "Nh\u1EADn di\u1EC7n \u0111\u1EA1i l\u01B0\u1EE3ng kh\xF4ng \u0111\u1ED5i"],
      pitfalls: ["Lao v\xE0o ch\u1EE9ng minh khi ch\u01B0a bi\u1EBFt k\u1EBFt qu\u1EA3 c\u1EA7n ch\u1EE9ng minh tr\xF4ng nh\u01B0 th\u1EBF n\xE0o."],
      worked: [{
        prompt: "Cho n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n $(O)$ \u0111\u01B0\u1EDDng k\xEDnh $AB$, \u0111i\u1EC3m $C$ di \u0111\u1ED9ng tr\xEAn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n. G\u1ECDi $H$ l\xE0 h\xECnh chi\u1EBFu c\u1EE7a $C$ tr\xEAn $AB$. Ch\u1EE9ng minh $CH^{2}=AH\\cdot HB$ v\xE0 t\xECm v\u1ECB tr\xED c\u1EE7a $C$ \u0111\u1EC3 $CH$ l\u1EDBn nh\u1EA5t.",
        thinking: [
          "$C$ thu\u1ED9c n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AB$ n\xEAn $\\angle ACB=90\\deg$ \u2014 tam gi\xE1c $ACB$ vu\xF4ng t\u1EA1i $C$.",
          "$CH$ l\xE0 \u0111\u01B0\u1EDDng cao \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n \u2192 d\xF9ng ngay h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng.",
          "\u0110\u1EC3 t\xECm gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t: $CH$ ch\xEDnh l\xE0 kho\u1EA3ng c\xE1ch t\u1EEB $C$ t\u1EDBi $AB$, l\u1EDBn nh\u1EA5t khi $C$ \u1EDF \u201C\u0111\u1EC9nh\u201D n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n."
        ],
        solution: [
          "V\xEC $C$ thu\u1ED9c \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh $AB$ n\xEAn $\\angle ACB=90\\deg$ (g\xF3c n\u1ED9i ti\u1EBFp ch\u1EAFn n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n).",
          "Tam gi\xE1c $ACB$ vu\xF4ng t\u1EA1i $C$, c\xF3 \u0111\u01B0\u1EDDng cao $CH$ \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n $AB$.",
          "Theo h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng: $CH^{2}=AH\\cdot HB$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)",
          "M\u1EB7t kh\xE1c, $CH$ l\xE0 kho\u1EA3ng c\xE1ch t\u1EEB \u0111i\u1EC3m $C$ t\u1EDBi \u0111\u01B0\u1EDDng th\u1EB3ng $AB$; m\xE0 $C$ lu\xF4n n\u1EB1m tr\xEAn \u0111\u01B0\u1EDDng tr\xF2n b\xE1n k\xEDnh $R=\\f{AB}{2}$ t\xE2m $O$.",
          "Do \u0111\xF3 $CH\\le OC=R$, d\u1EA5u \u201C=\u201D x\u1EA3y ra khi $CH$ \u0111i qua $O$, t\u1EE9c $H\\equiv O$ v\xE0 $C$ l\xE0 \u0111i\u1EC3m ch\xEDnh gi\u1EEFa c\u1EE7a n\u1EEDa \u0111\u01B0\u1EDDng tr\xF2n.",
          "V\u1EADy $CH$ l\u1EDBn nh\u1EA5t b\u1EB1ng $R=\\f{AB}{2}$ khi $C$ l\xE0 \u0111i\u1EC3m ch\xEDnh gi\u1EEFa cung $AB$."
        ],
        remark: "\xDD \u201Ct\xECm v\u1ECB tr\xED \u0111\u1EC3 l\u1EDBn nh\u1EA5t\u201D g\u1EA7n nh\u01B0 lu\xF4n gi\u1EA3i b\u1EB1ng c\xE1ch ch\u1EB7n m\u1ED9t \u0111\u1EA1i l\u01B0\u1EE3ng b\u1EDFi b\xE1n k\xEDnh ho\u1EB7c b\u1EDFi m\u1ED9t \u0111o\u1EA1n c\u1ED1 \u0111\u1ECBnh."
      }]
    }
  ]
};

// src/content/enrich-mong.ts
var EXTRA_TYPES_MONG = {
  /* ============================== KHỐI 6 ============================== */
  "g6-t6": [
    {
      id: "g6-t6-d5",
      name: "D\u1EA1ng 5. Di\u1EC7n t\xEDch h\xECnh gh\xE9p \u2014 c\u1ED9ng v\xE0 tr\u1EEB ph\u1EA7n",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: chia h\xECnh \u0111\xE3 cho th\xE0nh c\xE1c **h\xECnh c\u01A1 b\u1EA3n** (ch\u1EEF nh\u1EADt, tam gi\xE1c, h\xECnh thang, h\xECnh thoi).",
        "B\u01B0\u1EDBc 2: \u0111\xE1nh d\u1EA5u ph\u1EA7n n\xE0o **c\u1ED9ng v\xE0o**, ph\u1EA7n n\xE0o **tr\u1EEB \u0111i** (ph\u1EA7n kho\xE9t r\u1ED7ng).",
        "B\u01B0\u1EDBc 3: t\xEDnh t\u1EEBng ph\u1EA7n r\u1ED3i t\u1ED5ng h\u1EE3p; lu\xF4n ghi \u0111\u01A1n v\u1ECB di\u1EC7n t\xEDch."
      ],
      skills: ["Chia h\xECnh h\u1EE3p l\xED", "Suy ra k\xEDch th\u01B0\u1EDBc c\xF2n thi\u1EBFu t\u1EEB d\u1EEF ki\u1EC7n \u0111\xE3 cho"],
      pitfalls: ["Chia h\xECnh ch\u1ED3ng l\u1EA5n khi\u1EBFn m\u1ED9t ph\u1EA7n b\u1ECB t\xEDnh hai l\u1EA7n.", "Qu\xEAn tr\u1EEB ph\u1EA7n kho\xE9t r\u1ED7ng."],
      worked: [{
        prompt: "M\u1ED9t m\u1EA3nh v\u01B0\u1EDDn h\xECnh ch\u1EEF nh\u1EADt d\xE0i $18$ m, r\u1ED9ng $12$ m. Ng\u01B0\u1EDDi ta \u0111\xE0o m\u1ED9t c\xE1i ao h\xECnh vu\xF4ng c\u1EA1nh $5$ m \u1EDF gi\u1EEFa v\u01B0\u1EDDn. T\xEDnh di\u1EC7n t\xEDch ph\u1EA7n \u0111\u1EA5t c\xF2n l\u1EA1i.",
        thinking: [
          'H\xECnh c\xF3 m\u1ED9t ph\u1EA7n b\u1ECB "kho\xE9t" n\xEAn \u0111\xE2y l\xE0 b\xE0i **tr\u1EEB di\u1EC7n t\xEDch**, kh\xF4ng ph\u1EA3i chia nh\u1ECF r\u1ED3i c\u1ED9ng.',
          "Di\u1EC7n t\xEDch c\xF2n l\u1EA1i $=$ di\u1EC7n t\xEDch c\u1EA3 v\u01B0\u1EDDn $-$ di\u1EC7n t\xEDch ao.",
          'V\u1ECB tr\xED c\xE1i ao "\u1EDF gi\u1EEFa" kh\xF4ng \u1EA3nh h\u01B0\u1EDFng t\u1EDBi k\u1EBFt qu\u1EA3 \u2014 ch\u1EC9 di\u1EC7n t\xEDch c\u1EE7a n\xF3 m\u1EDBi quan tr\u1ECDng.'
        ],
        solution: [
          "Di\u1EC7n t\xEDch c\u1EA3 m\u1EA3nh v\u01B0\u1EDDn: $18\\times12=216\\;(m^{2})$.",
          "Di\u1EC7n t\xEDch c\xE1i ao: $5\\times5=25\\;(m^{2})$.",
          "Di\u1EC7n t\xEDch ph\u1EA7n \u0111\u1EA5t c\xF2n l\u1EA1i: $216-25=191\\;(m^{2})$."
        ],
        remark: 'D\u1EEF ki\u1EC7n "\u1EDF gi\u1EEFa v\u01B0\u1EDDn" l\xE0 th\xF4ng tin th\u1EEBa \u0111\u01B0\u1EE3c c\xE0i v\xE0o \u0111\u1EC3 th\u1EED xem h\u1ECDc sinh c\xF3 b\u1ECB r\u1ED1i kh\xF4ng.'
      }]
    },
    {
      id: "g6-t6-d6",
      name: "D\u1EA1ng 6. B\xE0i to\xE1n chi ph\xED t\u1EEB \u0111\u1EA1i l\u01B0\u1EE3ng h\xECnh h\u1ECDc",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: \u0111\u1ECDc k\u1EF9 xem \u0111\u1EC1 d\xF9ng **chu vi** (h\xE0ng r\xE0o, vi\u1EC1n, n\u1EB9p) hay **di\u1EC7n t\xEDch** (l\xE1t g\u1EA1ch, s\u01A1n, tr\u1ED3ng c\xE2y).",
        "B\u01B0\u1EDBc 2: \u0111\u1ED5i t\u1EA5t c\u1EA3 v\u1EC1 c\xF9ng m\u1ED9t \u0111\u01A1n v\u1ECB.",
        "B\u01B0\u1EDBc 3: t\xEDnh \u0111\u1EA1i l\u01B0\u1EE3ng h\xECnh h\u1ECDc, r\u1ED3i **nh\xE2n \u0111\u01A1n gi\xE1** \u1EDF m\u1ED9t b\u01B0\u1EDBc ri\xEAng."
      ],
      skills: ["Ph\xE2n bi\u1EC7t chu vi v\xE0 di\u1EC7n t\xEDch trong ng\u1EEF c\u1EA3nh th\u1EF1c t\u1EBF", "\u0110\u1ED5i \u0111\u01A1n v\u1ECB di\u1EC7n t\xEDch"],
      pitfalls: ["D\xF9ng chu vi cho b\xE0i l\xE1t g\u1EA1ch (ho\u1EB7c ng\u01B0\u1EE3c l\u1EA1i).", "Qu\xEAn \u0111\u1ED5i $m^{2}$ sang $cm^{2}$ khi k\xEDch th\u01B0\u1EDBc vi\xEAn g\u1EA1ch cho b\u1EB1ng cm."],
      worked: [{
        prompt: "N\u1EC1n m\u1ED9t c\u0103n ph\xF2ng h\xECnh ch\u1EEF nh\u1EADt d\xE0i $6$ m, r\u1ED9ng $4{,}5$ m. Ng\u01B0\u1EDDi ta l\xE1t n\u1EC1n b\u1EB1ng g\u1EA1ch vu\xF4ng c\u1EA1nh $50$ cm, gi\xE1 m\u1ED7i vi\xEAn $85\\,000$ \u0111\u1ED3ng. T\xEDnh s\u1ED1 ti\u1EC1n mua g\u1EA1ch.",
        thinking: [
          '"L\xE1t n\u1EC1n" l\xE0 ph\u1EE7 k\xEDn b\u1EC1 m\u1EB7t n\xEAn ph\u1EA3i d\xF9ng **di\u1EC7n t\xEDch**.',
          "K\xEDch th\u01B0\u1EDBc ph\xF2ng cho b\u1EB1ng m\xE9t, g\u1EA1ch cho b\u1EB1ng x\u0103ng-ti-m\xE9t \u2192 ph\u1EA3i \u0111\u1ED5i v\u1EC1 c\xF9ng \u0111\u01A1n v\u1ECB tr\u01B0\u1EDBc.",
          "\u0110\u1ED5i $50$ cm $=0{,}5$ m s\u1EBD g\u1ECDn h\u01A1n l\xE0 \u0111\u1ED5i ph\xF2ng sang cm."
        ],
        solution: [
          "Di\u1EC7n t\xEDch n\u1EC1n ph\xF2ng: $6\\times4{,}5=27\\;(m^{2})$.",
          "\u0110\u1ED5i c\u1EA1nh vi\xEAn g\u1EA1ch: $50\\;cm=0{,}5\\;m$; di\u1EC7n t\xEDch m\u1ED7i vi\xEAn: $0{,}5\\times0{,}5=0{,}25\\;(m^{2})$.",
          "S\u1ED1 vi\xEAn g\u1EA1ch c\u1EA7n d\xF9ng: $27:0{,}25=108$ (vi\xEAn).",
          "S\u1ED1 ti\u1EC1n mua g\u1EA1ch: $108\\times85\\,000=9\\,180\\,000$ (\u0111\u1ED3ng)."
        ],
        remark: 'Lu\xF4n t\xE1ch ri\xEAng b\u01B0\u1EDBc "t\xEDnh \u0111\u1EA1i l\u01B0\u1EE3ng h\xECnh h\u1ECDc" v\xE0 b\u01B0\u1EDBc "nh\xE2n \u0111\u01A1n gi\xE1" \u2014 tr\xECnh b\xE0y r\xF5, ch\u1EA5m \u0111i\u1EC3m c\u0169ng d\u1EC5.'
      }]
    }
  ],
  "g6-t7": [
    {
      id: "g6-t7-d5",
      name: "D\u1EA1ng 5. \u0110\u1EBFm h\xECnh t\u1EEB \u0111i\u1EC3m v\xE0 tia",
      level: "TH",
      method: [
        "V\u1EDBi $n$ \u0111i\u1EC3m ph\xE2n bi\u1EC7t tr\xEAn m\u1ED9t \u0111\u01B0\u1EDDng th\u1EB3ng: s\u1ED1 \u0111o\u1EA1n th\u1EB3ng $=\\f{n(n-1)}{2}$.",
        "V\u1EDBi $n$ tia chung g\u1ED1c (kh\xF4ng c\xF3 tia n\xE0o tr\xF9ng nhau): s\u1ED1 g\xF3c $=\\f{n(n-1)}{2}$.",
        "C\xE1ch hi\u1EC3u chung: m\u1ED7i h\xECnh \u1EE9ng v\u1EDBi m\u1ED9t c\xE1ch **ch\u1ECDn 2** trong $n$ \u0111\u1ED1i t\u01B0\u1EE3ng."
      ],
      skills: ['Nh\u1EADn ra m\xF4 h\xECnh "ch\u1ECDn 2 trong n"', "\u0110\u1EBFm kh\xF4ng tr\xF9ng, kh\xF4ng s\xF3t"],
      pitfalls: ["Qu\xEAn chia $2$ (m\u1ED7i h\xECnh b\u1ECB \u0111\u1EBFm hai l\u1EA7n).", "\u0110\u1EBFm c\u1EA3 tr\u01B0\u1EDDng h\u1EE3p hai \u0111\u1EA7u tr\xF9ng nhau."],
      worked: [{
        prompt: "Tr\xEAn \u0111\u01B0\u1EDDng th\u1EB3ng $d$ l\u1EA5y $8$ \u0111i\u1EC3m ph\xE2n bi\u1EC7t. H\u1ECFi c\xF3 t\u1EA5t c\u1EA3 bao nhi\xEAu \u0111o\u1EA1n th\u1EB3ng \u0111\u01B0\u1EE3c t\u1EA1o th\xE0nh?",
        thinking: [
          "M\u1ED7i \u0111o\u1EA1n th\u1EB3ng \u0111\u01B0\u1EE3c x\xE1c \u0111\u1ECBnh b\u1EDFi **hai \u0111\u1EA7u m\xFAt** \u2014 v\u1EADy \u0111\u1EBFm s\u1ED1 c\xE1ch ch\u1ECDn $2$ \u0111i\u1EC3m trong $8$.",
          "C\xE1ch \u0111\u1EBFm tr\u1EF1c ti\u1EBFp: m\u1ED7i \u0111i\u1EC3m n\u1ED1i \u0111\u01B0\u1EE3c v\u1EDBi $7$ \u0111i\u1EC3m c\xF2n l\u1EA1i, cho $8\\times7$ l\u01B0\u1EE3t.",
          "Nh\u01B0ng \u0111o\u1EA1n $AB$ v\xE0 $BA$ l\xE0 **m\u1ED9t**, n\xEAn ph\u1EA3i chia \u0111\xF4i."
        ],
        solution: [
          "M\u1ED7i \u0111i\u1EC3m n\u1ED1i v\u1EDBi $7$ \u0111i\u1EC3m c\xF2n l\u1EA1i, t\u1EA1o ra $8\\times7=56$ l\u01B0\u1EE3t n\u1ED1i.",
          "M\u1ED7i \u0111o\u1EA1n th\u1EB3ng b\u1ECB \u0111\u1EBFm hai l\u1EA7n (m\u1ED9t l\u1EA7n t\u1EEB m\u1ED7i \u0111\u1EA7u).",
          "S\u1ED1 \u0111o\u1EA1n th\u1EB3ng $=\\f{8\\times7}{2}=28$ (\u0111o\u1EA1n th\u1EB3ng)."
        ],
        remark: "C\xF9ng m\u1ED9t c\xF4ng th\u1EE9c d\xF9ng cho: \u0111\u1EBFm \u0111o\u1EA1n th\u1EB3ng, \u0111\u1EBFm g\xF3c t\u1EEB tia chung g\u1ED1c, \u0111\u1EBFm giao \u0111i\u1EC3m c\u1EE7a c\xE1c \u0111\u01B0\u1EDDng th\u1EB3ng."
      }]
    },
    {
      id: "g6-t7-d6",
      name: 'D\u1EA1ng 6. T\xEDnh \u0111\u1ED9 d\xE0i d\u1EF1a v\xE0o quan h\u1EC7 "n\u1EB1m gi\u1EEFa"',
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: v\u1EBD h\xECnh theo \u0111\xFAng th\u1EE9 t\u1EF1 c\xE1c \u0111i\u1EC3m m\xE0 \u0111\u1EC1 m\xF4 t\u1EA3.",
        "B\u01B0\u1EDBc 2: \u0111i\u1EC3m $M$ n\u1EB1m gi\u1EEFa $A$ v\xE0 $B$ th\xEC vi\u1EBFt $AM+MB=AB$.",
        "B\u01B0\u1EDBc 3: $M$ l\xE0 trung \u0111i\u1EC3m th\xEC th\xEAm $MA=MB=\\f{AB}{2}$.",
        "B\u01B0\u1EDBc 4: l\u1EADp ph\u01B0\u01A1ng tr\xECnh theo \u0111o\u1EA1n c\u1EA7n t\xECm."
      ],
      skills: ["V\u1EBD h\xECnh \u0111\xFAng th\u1EE9 t\u1EF1 \u0111i\u1EC3m", "Chuy\u1EC3n quan h\u1EC7 h\xECnh h\u1ECDc th\xE0nh \u0111\u1EB3ng th\u1EE9c"],
      pitfalls: ["V\u1EBD sai th\u1EE9 t\u1EF1 \u0111i\u1EC3m d\u1EABn t\u1EDBi c\u1ED9ng nh\u1EA7m th\xE0nh tr\u1EEB.", 'K\u1EBFt lu\u1EADn "n\u1EB1m gi\u1EEFa" khi ch\u01B0a ch\u1EE9ng minh.'],
      worked: [{
        prompt: "Tr\xEAn tia $Ox$ l\u1EA5y hai \u0111i\u1EC3m $A$ v\xE0 $B$ sao cho $OA=3$ cm, $OB=7$ cm. T\xEDnh $AB$ v\xE0 cho bi\u1EBFt $A$ c\xF3 ph\u1EA3i trung \u0111i\u1EC3m c\u1EE7a $OB$ kh\xF4ng.",
        thinking: [
          "Hai \u0111i\u1EC3m c\xF9ng n\u1EB1m tr\xEAn tia $Ox$, m\xE0 $OA<OB$ n\xEAn $A$ **n\u1EB1m gi\u1EEFa** $O$ v\xE0 $B$.",
          "C\xF3 quan h\u1EC7 n\u1EB1m gi\u1EEFa l\xE0 vi\u1EBFt \u0111\u01B0\u1EE3c ngay $OA+AB=OB$.",
          "Mu\u1ED1n $A$ l\xE0 trung \u0111i\u1EC3m th\xEC c\u1EA7n \u0111\u1ED3ng th\u1EDDi $A$ n\u1EB1m gi\u1EEFa **v\xE0** $OA=AB$ \u2014 ph\u1EA3i ki\u1EC3m tra c\u1EA3 hai."
        ],
        solution: [
          "V\xEC $A$, $B$ c\xF9ng thu\u1ED9c tia $Ox$ v\xE0 $OA=3<7=OB$ n\xEAn $A$ n\u1EB1m gi\u1EEFa $O$ v\xE0 $B$.",
          "Do \u0111\xF3 $OA+AB=OB\\Rightarrow 3+AB=7\\Rightarrow AB=4$ (cm).",
          "X\xE9t \u0111i\u1EC1u ki\u1EC7n trung \u0111i\u1EC3m: $A$ n\u1EB1m gi\u1EEFa $O$ v\xE0 $B$ \u2713, nh\u01B0ng $OA=3\\ne4=AB$.",
          "V\u1EADy $A$ **kh\xF4ng** ph\u1EA3i l\xE0 trung \u0111i\u1EC3m c\u1EE7a \u0111o\u1EA1n $OB$."
        ],
        remark: "Trung \u0111i\u1EC3m c\u1EA7n **hai** \u0111i\u1EC1u ki\u1EC7n: n\u1EB1m gi\u1EEFa v\xE0 c\xE1ch \u0111\u1EC1u. Thi\u1EBFu m\u1ED9t trong hai l\xE0 k\u1EBFt lu\u1EADn sai."
      }]
    }
  ],
  "g6-t8": [
    {
      id: "g6-t8-d4",
      name: "D\u1EA1ng 4. \u0110\u1ECDc bi\u1EC3u \u0111\u1ED3 v\xE0 t\xEDnh s\u1ED1 l\u01B0\u1EE3ng th\u1EF1c t\u1EBF",
      level: "TH",
      method: [
        "B\u01B0\u1EDBc 1: x\xE1c \u0111\u1ECBnh **t\u1ED5ng** c\u1EE7a to\xE0n b\u1ED9 d\u1EEF li\u1EC7u (\u0111\u1EC1 th\u01B0\u1EDDng cho s\u1EB5n).",
        "B\u01B0\u1EDBc 2: \u0111\u1ECDc t\u1EC9 l\u1EC7 ph\u1EA7n tr\u0103m c\u1EE7a ph\u1EA7n c\u1EA7n t\xEDnh t\u1EEB bi\u1EC3u \u0111\u1ED3.",
        "B\u01B0\u1EDBc 3: s\u1ED1 l\u01B0\u1EE3ng th\u1EF1c t\u1EBF $=$ t\u1ED5ng $\\times$ t\u1EC9 l\u1EC7."
      ],
      skills: ["\u0110\u1ECDc bi\u1EC3u \u0111\u1ED3 c\u1ED9t v\xE0 bi\u1EC3u \u0111\u1ED3 qu\u1EA1t tr\xF2n", "\u0110\u1ED5i qua l\u1EA1i gi\u1EEFa ph\u1EA7n tr\u0103m v\xE0 s\u1ED1 l\u01B0\u1EE3ng"],
      pitfalls: ["L\u1EA5y t\u1EC9 l\u1EC7 nh\xE2n v\u1EDBi m\u1ED9t ph\u1EA7n thay v\xEC nh\xE2n v\u1EDBi t\u1ED5ng.", "C\u1ED9ng c\xE1c t\u1EC9 l\u1EC7 ra kh\xE1c $100\\%$ m\xE0 kh\xF4ng ki\u1EC3m tra l\u1EA1i."],
      worked: [{
        prompt: "Kh\u1ED1i 6 c\u1EE7a m\u1ED9t tr\u01B0\u1EDDng c\xF3 $240$ h\u1ECDc sinh. Bi\u1EC3u \u0111\u1ED3 cho bi\u1EBFt $20\\%$ th\xEDch m\xF4n To\xE1n, $25\\%$ th\xEDch m\xF4n V\u0103n, s\u1ED1 c\xF2n l\u1EA1i th\xEDch m\xF4n Ti\u1EBFng Anh. T\xEDnh s\u1ED1 h\u1ECDc sinh th\xEDch m\xF4n Ti\u1EBFng Anh.",
        thinking: [
          "T\u1ED5ng lu\xF4n l\xE0 $100\\%$, n\xEAn t\u1EC9 l\u1EC7 th\xEDch Ti\u1EBFng Anh $=100\\%-20\\%-25\\%$.",
          "C\xF3 t\u1EC9 l\u1EC7 r\u1ED3i th\xEC nh\xE2n v\u1EDBi **t\u1ED5ng $240$** \u0111\u1EC3 ra s\u1ED1 h\u1ECDc sinh.",
          "C\xF3 th\u1EC3 ki\u1EC3m tra ch\xE9o: c\u1ED9ng ba s\u1ED1 l\u01B0\u1EE3ng ph\u1EA3i \u0111\xFAng b\u1EB1ng $240$."
        ],
        solution: [
          "T\u1EC9 l\u1EC7 h\u1ECDc sinh th\xEDch Ti\u1EBFng Anh: $100\\%-20\\%-25\\%=55\\%$.",
          "S\u1ED1 h\u1ECDc sinh th\xEDch Ti\u1EBFng Anh: $240\\times55\\%=240\\times0{,}55=132$ (h\u1ECDc sinh).",
          "Ki\u1EC3m tra: To\xE1n $240\\times20\\%=48$; V\u0103n $240\\times25\\%=60$; t\u1ED5ng $48+60+132=240$ \u2713"
        ],
        remark: "Lu\xF4n c\u1ED9ng l\u1EA1i \u0111\u1EC3 ki\u1EC3m tra \u2014 b\u01B0\u1EDBc n\xE0y m\u1EA5t 10 gi\xE2y nh\u01B0ng b\u1EAFt \u0111\u01B0\u1EE3c h\u1EA7u h\u1EBFt l\u1ED7i t\xEDnh to\xE1n."
      }]
    },
    {
      id: "g6-t8-d5",
      name: "D\u1EA1ng 5. X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: \u0111\u1EBFm s\u1ED1 l\u1EA7n bi\u1EBFn c\u1ED1 x\u1EA3y ra (s\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i trong th\u1EF1c nghi\u1EC7m).",
        "B\u01B0\u1EDBc 2: \u0111\u1EBFm t\u1ED5ng s\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n ph\xE9p th\u1EED.",
        "B\u01B0\u1EDBc 3: l\u1EADp t\u1EC9 s\u1ED1 v\xE0 r\xFAt g\u1ECDn; c\xF3 th\u1EC3 \u0111\u1ED5i sang ph\u1EA7n tr\u0103m."
      ],
      skills: ["\u0110\u1EBFm \u0111\xFAng theo \u0111i\u1EC1u ki\u1EC7n c\u1EE7a bi\u1EBFn c\u1ED1", "R\xFAt g\u1ECDn ph\xE2n s\u1ED1 k\u1EBFt qu\u1EA3"],
      pitfalls: ['Nh\u1EA7m "s\u1ED1 l\u1EA7n x\u1EA3y ra" v\u1EDBi "s\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n".', "Qu\xEAn r\xFAt g\u1ECDn ph\xE2n s\u1ED1."],
      worked: [{
        prompt: 'Tung m\u1ED9t \u0111\u1ED3ng xu $50$ l\u1EA7n th\xEC c\xF3 $28$ l\u1EA7n xu\u1EA5t hi\u1EC7n m\u1EB7t ng\u1EEDa. T\xEDnh x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m c\u1EE7a bi\u1EBFn c\u1ED1 "xu\u1EA5t hi\u1EC7n m\u1EB7t ng\u1EEDa" v\xE0 so s\xE1nh v\u1EDBi x\xE1c su\u1EA5t l\xED thuy\u1EBFt.',
        thinking: [
          "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m ch\u1EC9 l\xE0 **t\u1EC9 s\u1ED1 \u0111\u1EBFm \u0111\u01B0\u1EE3c** t\u1EEB th\xED nghi\u1EC7m th\u1EADt.",
          "X\xE1c su\u1EA5t l\xED thuy\u1EBFt c\u1EE7a m\u1EB7t ng\u1EEDa l\xE0 $\\f{1}{2}$ v\xEC \u0111\u1ED3ng xu c\xF3 hai m\u1EB7t \u0111\u1ED3ng kh\u1EA3 n\u0103ng.",
          "Hai gi\xE1 tr\u1ECB n\xE0y th\u01B0\u1EDDng **kh\xF4ng b\u1EB1ng nhau**, nh\u01B0ng c\xE0ng tung nhi\u1EC1u l\u1EA7n th\xEC c\xE0ng g\u1EA7n nhau."
        ],
        solution: [
          "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m: $\\f{28}{50}=\\f{14}{25}=0{,}56=56\\%$.",
          "X\xE1c su\u1EA5t l\xED thuy\u1EBFt: $\\f{1}{2}=0{,}5=50\\%$.",
          "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m ($56\\%$) l\u1EDBn h\u01A1n x\xE1c su\u1EA5t l\xED thuy\u1EBFt ($50\\%$) m\u1ED9t ch\xFAt.",
          "\u0110i\u1EC1u n\xE0y l\xE0 b\xECnh th\u01B0\u1EDDng; n\u1EBFu tung c\xE0ng nhi\u1EC1u l\u1EA7n th\xEC t\u1EC9 s\u1ED1 th\u1EF1c nghi\u1EC7m s\u1EBD c\xE0ng ti\u1EBFn g\u1EA7n $50\\%$."
        ],
        remark: '\u0110\u1EC1 r\u1EA5t hay h\u1ECFi "v\xEC sao hai gi\xE1 tr\u1ECB kh\xE1c nhau" \u2014 c\xE2u tr\u1EA3 l\u1EDDi l\xE0 do s\u1ED1 l\u1EA7n th\u1EED c\xF2n \xEDt.'
      }]
    }
  ],
  /* ============================== KHỐI 7 ============================== */
  "g7-t4": [
    {
      id: "g7-t4-d5",
      name: "D\u1EA1ng 5. K\u1EBB \u0111\u01B0\u1EDDng ph\u1EE5 song song \u0111\u1EC3 t\xEDnh g\xF3c",
      level: "VD",
      method: [
        'B\u01B0\u1EDBc 1: nh\u1EADn ra hai \u0111\u01B0\u1EDDng song song \u0111\xE3 cho v\xE0 m\u1ED9t \u0111i\u1EC3m n\u1EB1m "k\u1EB9p" gi\u1EEFa ch\xFAng.',
        "B\u01B0\u1EDBc 2: qua \u0111i\u1EC3m \u0111\xF3 **k\u1EBB m\u1ED9t tia song song** v\u1EDBi hai \u0111\u01B0\u1EDDng \u1EA5y.",
        "B\u01B0\u1EDBc 3: \u0111\u01B0\u1EDDng ph\u1EE5 t\xE1ch g\xF3c l\u1EDBn th\xE0nh hai g\xF3c con, m\u1ED7i g\xF3c t\xEDnh \u0111\u01B0\u1EE3c b\u1EB1ng so le trong.",
        "B\u01B0\u1EDBc 4: c\u1ED9ng hai g\xF3c con \u0111\u1EC3 ra g\xF3c c\u1EA7n t\xECm."
      ],
      skills: ["Nh\u1EADn bi\u1EBFt th\u1EDDi \u0111i\u1EC3m c\u1EA7n k\u1EBB \u0111\u01B0\u1EDDng ph\u1EE5", "V\u1EADn d\u1EE5ng g\xF3c so le trong hai l\u1EA7n li\xEAn ti\u1EBFp"],
      pitfalls: ["K\u1EBB \u0111\u01B0\u1EDDng ph\u1EE5 kh\xF4ng song song v\u1EDBi hai \u0111\u01B0\u1EDDng \u0111\xE3 cho.", "C\u1ED9ng nh\u1EA7m th\xE0nh tr\u1EEB khi \u0111i\u1EC3m n\u1EB1m ngo\xE0i d\u1EA3i gi\u1EEFa hai \u0111\u01B0\u1EDDng."],
      worked: [{
        prompt: "Cho $Ax\\para By$. \u0110i\u1EC3m $C$ n\u1EB1m gi\u1EEFa hai \u0111\u01B0\u1EDDng th\u1EB3ng \u0111\xF3, bi\u1EBFt $\\angle xAC=40\\deg$ v\xE0 $\\angle yBC=35\\deg$. T\xEDnh $\\angle ACB$.",
        thinking: [
          "G\xF3c $\\angle ACB$ kh\xF4ng n\u1EB1m trong c\u1EA5u h\xECnh hai \u0111\u01B0\u1EDDng song song n\xE0o c\u1EA3 \u2014 kh\xF4ng t\xEDnh tr\u1EF1c ti\u1EBFp \u0111\u01B0\u1EE3c.",
          "M\u1EB9o chu\u1EA9n: qua $C$ k\u1EBB tia $Cz\\para Ax$; khi \u0111\xF3 $Cz$ c\u0169ng song song $By$ (c\xF9ng song song v\u1EDBi $Ax$).",
          "Tia $Cz$ chia $\\angle ACB$ th\xE0nh hai g\xF3c, m\u1ED7i g\xF3c so le trong v\u1EDBi m\u1ED9t g\xF3c \u0111\xE3 bi\u1EBFt."
        ],
        solution: [
          "Qua $C$ k\u1EBB tia $Cz\\para Ax$ (n\u1EB1m trong g\xF3c $ACB$).",
          "V\xEC $Ax\\para By$ v\xE0 $Cz\\para Ax$ n\xEAn $Cz\\para By$.",
          "$\\angle ACz=\\angle xAC=40\\deg$ (hai g\xF3c so le trong, $Cz\\para Ax$).",
          "$\\angle zCB=\\angle yBC=35\\deg$ (hai g\xF3c so le trong, $Cz\\para By$).",
          "V\xEC tia $Cz$ n\u1EB1m gi\u1EEFa hai tia $CA$ v\xE0 $CB$ n\xEAn:",
          "$\\angle ACB=\\angle ACz+\\angle zCB=40\\deg+35\\deg=75\\deg$."
        ],
        remark: 'H\u1EC5 th\u1EA5y m\u1ED9t \u0111i\u1EC3m "k\u1EB9p" gi\u1EEFa hai \u0111\u01B0\u1EDDng song song v\xE0 c\u1EA7n t\xEDnh g\xF3c t\u1EA1i \u0111i\u1EC3m \u0111\xF3 \u2014 k\u1EBB \u0111\u01B0\u1EDDng ph\u1EE5 song song ngay.'
      }]
    },
    {
      id: "g7-t4-d6",
      name: "D\u1EA1ng 6. Ch\u1EE9ng minh hai \u0111\u01B0\u1EDDng th\u1EB3ng song song",
      level: "TH",
      method: [
        "C\xE1ch 1: ch\u1EC9 ra m\u1ED9t c\u1EB7p g\xF3c **so le trong** ho\u1EB7c **\u0111\u1ED3ng v\u1ECB** b\u1EB1ng nhau.",
        "C\xE1ch 2: ch\u1EC9 ra m\u1ED9t c\u1EB7p g\xF3c **trong c\xF9ng ph\xEDa** b\xF9 nhau.",
        "C\xE1ch 3: hai \u0111\u01B0\u1EDDng c\xF9ng vu\xF4ng g\xF3c (ho\u1EB7c c\xF9ng song song) v\u1EDBi \u0111\u01B0\u1EDDng th\u1EE9 ba."
      ],
      skills: ["X\xE1c \u0111\u1ECBnh \u0111\xFAng v\u1ECB tr\xED t\u01B0\u01A1ng \u0111\u1ED1i c\u1EE7a c\u1EB7p g\xF3c", "Ch\u1ECDn c\xE1t tuy\u1EBFn ph\xF9 h\u1EE3p"],
      pitfalls: ["G\u1ECDi t\xEAn sai c\u1EB7p g\xF3c (nh\u1EA7m so le trong v\u1EDBi trong c\xF9ng ph\xEDa).", "D\xF9ng g\xF3c \u1EDF hai c\xE1t tuy\u1EBFn kh\xE1c nhau."],
      worked: [{
        prompt: "Cho h\xECnh v\u1EBD c\xF3 $\\angle A_1=65\\deg$ v\xE0 $\\angle B_1=115\\deg$ l\xE0 hai g\xF3c **trong c\xF9ng ph\xEDa** \u0111\u1ED1i v\u1EDBi hai \u0111\u01B0\u1EDDng th\u1EB3ng $a$, $b$ v\xE0 c\xE1t tuy\u1EBFn $c$. Ch\u1EE9ng minh $a\\para b$.",
        thinking: [
          '\u0110\u1EC1 \u0111\xE3 n\xF3i r\xF5 hai g\xF3c \u1EDF v\u1ECB tr\xED **trong c\xF9ng ph\xEDa** \u2014 v\u1EADy d\xF9ng d\u1EA5u hi\u1EC7u "b\xF9 nhau".',
          "Ch\u1EC9 c\u1EA7n ki\u1EC3m tra t\u1ED5ng hai g\xF3c c\xF3 b\u1EB1ng $180\\deg$ hay kh\xF4ng.",
          "N\u1EBFu b\u1EB1ng th\xEC k\u1EBFt lu\u1EADn song song theo d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt."
        ],
        solution: [
          "Ta c\xF3 $\\angle A_1+\\angle B_1=65\\deg+115\\deg=180\\deg$.",
          "$\\angle A_1$ v\xE0 $\\angle B_1$ l\xE0 hai g\xF3c trong c\xF9ng ph\xEDa \u0111\u1ED1i v\u1EDBi hai \u0111\u01B0\u1EDDng th\u1EB3ng $a$, $b$ v\xE0 c\xE1t tuy\u1EBFn $c$.",
          "Hai g\xF3c trong c\xF9ng ph\xEDa b\xF9 nhau n\xEAn $a\\para b$ (d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt hai \u0111\u01B0\u1EDDng th\u1EB3ng song song)."
        ],
        remark: "Ba d\u1EA5u hi\u1EC7u song song \u0111\u1EC1u quy v\u1EC1 m\u1ED9t c\xE2u: so le trong v\xE0 \u0111\u1ED3ng v\u1ECB th\xEC **b\u1EB1ng**, trong c\xF9ng ph\xEDa th\xEC **b\xF9**."
      }]
    }
  ],
  "g7-t6": [
    {
      id: "g7-t6-d4",
      name: "D\u1EA1ng 4. Di\u1EC7n t\xEDch xung quanh v\xE0 to\xE0n ph\u1EA7n c\u1EE7a l\u0103ng tr\u1EE5 \u0111\u1EE9ng",
      level: "TH",
      method: [
        "$S_{xq}=C_{\\text{\u0111\xE1y}}\\times h$ (chu vi \u0111\xE1y nh\xE2n chi\u1EC1u cao).",
        "$S_{tp}=S_{xq}+2S_{\\text{\u0111\xE1y}}$.",
        "N\u1EBFu v\u1EADt th\u1EC3 **kh\xF4ng c\xF3 n\u1EAFp** th\xEC ch\u1EC9 c\u1ED9ng **m\u1ED9t** m\u1EB7t \u0111\xE1y."
      ],
      skills: ["T\xEDnh chu vi v\xE0 di\u1EC7n t\xEDch c\u1EE7a \u0111a gi\xE1c \u0111\xE1y", "\u0110\u1ECDc \u0111\u1EC1 \u0111\u1EC3 bi\u1EBFt c\xF3 n\u1EAFp hay kh\xF4ng"],
      pitfalls: ["D\xF9ng di\u1EC7n t\xEDch \u0111\xE1y thay cho chu vi \u0111\xE1y khi t\xEDnh $S_{xq}$.", 'Qu\xEAn y\xEAu c\u1EA7u "kh\xF4ng n\u1EAFp" c\u1EE7a b\xE0i th\u1EF1c t\u1EBF.'],
      worked: [{
        prompt: "M\u1ED9t chi\u1EBFc h\u1ED9p kh\xF4ng n\u1EAFp c\xF3 d\u1EA1ng h\xECnh h\u1ED9p ch\u1EEF nh\u1EADt, \u0111\xE1y l\xE0 h\xECnh ch\u1EEF nh\u1EADt d\xE0i $30$ cm, r\u1ED9ng $20$ cm, chi\u1EC1u cao $15$ cm. T\xEDnh di\u1EC7n t\xEDch b\xECa c\u1EA7n d\xF9ng (b\u1ECF qua m\xE9p d\xE1n).",
        thinking: [
          '"B\xECa c\u1EA7n d\xF9ng" ch\xEDnh l\xE0 di\u1EC7n t\xEDch to\xE0n b\u1ED9 c\xE1c m\u1EB7t c\u1EE7a h\u1ED9p.',
          "H\u1ED9p **kh\xF4ng n\u1EAFp** n\xEAn ch\u1EC9 c\xF3 m\u1ED9t m\u1EB7t \u0111\xE1y, c\u1ED9ng b\u1ED1n m\u1EB7t xung quanh.",
          "B\u1ED1n m\u1EB7t xung quanh g\u1ED9p l\u1EA1i ch\xEDnh l\xE0 $S_{xq}=$ chu vi \u0111\xE1y $\\times$ chi\u1EC1u cao."
        ],
        solution: [
          "Chu vi \u0111\xE1y: $C=2\\times(30+20)=100$ (cm).",
          "Di\u1EC7n t\xEDch xung quanh: $S_{xq}=100\\times15=1500\\;(cm^{2})$.",
          "Di\u1EC7n t\xEDch m\u1ED9t m\u1EB7t \u0111\xE1y: $S_{\\text{\u0111\xE1y}}=30\\times20=600\\;(cm^{2})$.",
          "H\u1ED9p kh\xF4ng n\u1EAFp n\xEAn di\u1EC7n t\xEDch b\xECa c\u1EA7n d\xF9ng: $1500+600=2100\\;(cm^{2})$."
        ],
        remark: "N\u1EBFu h\u1ED9p **c\xF3 n\u1EAFp** th\xEC ph\u1EA3i c\u1ED9ng $2\\times600$, k\u1EBFt qu\u1EA3 l\xE0 $2700\\;cm^{2}$ \u2014 ch\xEAnh nhau \u0111\xFAng m\u1ED9t m\u1EB7t \u0111\xE1y."
      }]
    },
    {
      id: "g7-t6-d5",
      name: "D\u1EA1ng 5. B\xE0i to\xE1n th\u1EC3 t\xEDch v\u1EDBi \u0111\u01A1n v\u1ECB l\xEDt",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: t\xEDnh th\u1EC3 t\xEDch theo c\xF4ng th\u1EE9c $V=S_{\\text{\u0111\xE1y}}\\times h$.",
        "B\u01B0\u1EDBc 2: \u0111\u1ED5i \u0111\u01A1n v\u1ECB \u2014 $1\\;dm^{3}=1$ l\xEDt, $1\\;m^{3}=1000$ l\xEDt.",
        "B\u01B0\u1EDBc 3: n\u1EBFu b\xE0i h\u1ECFi m\u1EF1c n\u01B0\u1EDBc, h\xE3y l\u1EADp ph\u01B0\u01A1ng tr\xECnh $V_{\\text{n\u01B0\u1EDBc}}=S_{\\text{\u0111\xE1y}}\\times h_{\\text{n\u01B0\u1EDBc}}$."
      ],
      skills: ["\u0110\u1ED5i \u0111\u01A1n v\u1ECB th\u1EC3 t\xEDch", "Gi\u1EA3i ng\u01B0\u1EE3c t\u1EEB th\u1EC3 t\xEDch ra chi\u1EC1u cao"],
      pitfalls: ["\u0110\u1ED5i sai: $1\\;m^{3}=1000\\;dm^{3}$ ch\u1EE9 kh\xF4ng ph\u1EA3i $100$.", "Qu\xEAn r\u1EB1ng n\u01B0\u1EDBc ch\u1EC9 chi\u1EBFm m\u1ED9t ph\u1EA7n chi\u1EC1u cao b\u1EC3."],
      worked: [{
        prompt: "M\u1ED9t b\u1EC3 n\u01B0\u1EDBc d\u1EA1ng h\xECnh h\u1ED9p ch\u1EEF nh\u1EADt c\xF3 \u0111\xE1y l\xE0 h\xECnh ch\u1EEF nh\u1EADt $2$ m $\\times$ $1{,}5$ m. Ng\u01B0\u1EDDi ta \u0111\u1ED5 v\xE0o b\u1EC3 $4\\,500$ l\xEDt n\u01B0\u1EDBc. H\u1ECFi m\u1EF1c n\u01B0\u1EDBc trong b\u1EC3 cao bao nhi\xEAu m\xE9t?",
        thinking: [
          "\u0110\u1EC1 cho th\u1EC3 t\xEDch n\u01B0\u1EDBc v\xE0 di\u1EC7n t\xEDch \u0111\xE1y, h\u1ECFi chi\u1EC1u cao \u2014 \u0111\xE2y l\xE0 b\xE0i **gi\u1EA3i ng\u01B0\u1EE3c** c\xF4ng th\u1EE9c th\u1EC3 t\xEDch.",
          "Th\u1EC3 t\xEDch cho b\u1EB1ng l\xEDt, k\xEDch th\u01B0\u1EDBc cho b\u1EB1ng m\xE9t \u2192 ph\u1EA3i \u0111\u1ED5i l\xEDt sang $m^{3}$ tr\u01B0\u1EDBc.",
          "$1\\;m^{3}=1000$ l\xEDt n\xEAn $4\\,500$ l\xEDt $=4{,}5\\;m^{3}$."
        ],
        solution: [
          "\u0110\u1ED5i th\u1EC3 t\xEDch n\u01B0\u1EDBc: $4\\,500$ l\xEDt $=4{,}5\\;(m^{3})$.",
          "Di\u1EC7n t\xEDch \u0111\xE1y b\u1EC3: $S=2\\times1{,}5=3\\;(m^{2})$.",
          "T\u1EEB $V=S\\times h$ suy ra $h=\\f{V}{S}=\\f{4{,}5}{3}=1{,}5$ (m).",
          "V\u1EADy m\u1EF1c n\u01B0\u1EDBc trong b\u1EC3 cao $1{,}5$ m."
        ],
        remark: "Chi\u1EC1u cao c\u1EE7a **b\u1EC3** v\xE0 chi\u1EC1u cao c\u1EE7a **m\u1EF1c n\u01B0\u1EDBc** l\xE0 hai \u0111\u1EA1i l\u01B0\u1EE3ng kh\xE1c nhau \u2014 \u0111\u1ECDc k\u1EF9 \u0111\u1EC1 h\u1ECFi c\xE1i n\xE0o."
      }]
    }
  ],
  "g7-t7": [
    {
      id: "g7-t7-d4",
      name: "D\u1EA1ng 4. V\u1EBD v\xE0 \u0111\u1ECDc bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n",
      level: "TH",
      method: [
        "B\u01B0\u1EDBc 1: t\xEDnh t\u1ED5ng t\u1EA5t c\u1EA3 s\u1ED1 li\u1EC7u.",
        "B\u01B0\u1EDBc 2: t\u1EC9 l\u1EC7 m\u1ED7i ph\u1EA7n $=\\f{\\text{s\u1ED1 li\u1EC7u}}{\\text{t\u1ED5ng}}\\times100\\%$.",
        "B\u01B0\u1EDBc 3: g\xF3c \u1EDF t\xE2m m\u1ED7i ph\u1EA7n $=\\f{\\text{s\u1ED1 li\u1EC7u}}{\\text{t\u1ED5ng}}\\times360\\deg$.",
        "B\u01B0\u1EDBc 4: ki\u1EC3m tra t\u1ED5ng c\xE1c t\u1EC9 l\u1EC7 b\u1EB1ng $100\\%$ v\xE0 t\u1ED5ng c\xE1c g\xF3c b\u1EB1ng $360\\deg$."
      ],
      skills: ["Chuy\u1EC3n s\u1ED1 li\u1EC7u th\xE0nh t\u1EC9 l\u1EC7 v\xE0 g\xF3c \u1EDF t\xE2m", "Ki\u1EC3m tra ch\xE9o b\u1EB1ng t\u1ED5ng"],
      pitfalls: ["Nh\xE2n v\u1EDBi $100$ khi c\u1EA7n g\xF3c, ho\u1EB7c nh\xE2n $360$ khi c\u1EA7n ph\u1EA7n tr\u0103m.", "Qu\xEAn ki\u1EC3m tra t\u1ED5ng."],
      worked: [{
        prompt: "Doanh s\u1ED1 b\u1ED1n m\u1EB7t h\xE0ng c\u1EE7a m\u1ED9t c\u1EEDa h\xE0ng l\u1EA7n l\u01B0\u1EE3t l\xE0: Tivi $60$, Laptop $90$, M\xE1y gi\u1EB7t $45$, T\u1EE7 l\u1EA1nh $30$ (tri\u1EC7u \u0111\u1ED3ng). T\xEDnh g\xF3c \u1EDF t\xE2m c\u1EE7a h\xECnh qu\u1EA1t bi\u1EC3u di\u1EC5n Laptop.",
        thinking: [
          "C\u1EA3 h\xECnh tr\xF2n ($360\\deg$) \u1EE9ng v\u1EDBi **t\u1ED5ng** doanh s\u1ED1 c\u1EE7a c\u1EA3 b\u1ED1n m\u1EB7t h\xE0ng.",
          "V\u1EADy tr\u01B0\u1EDBc h\u1EBFt ph\u1EA3i c\u1ED9ng b\u1ED1n s\u1ED1 \u0111\u1EC3 c\xF3 t\u1ED5ng.",
          "G\xF3c c\u1EE7a Laptop t\u1EC9 l\u1EC7 v\u1EDBi doanh s\u1ED1 Laptop tr\xEAn t\u1ED5ng \u0111\xF3."
        ],
        solution: [
          "T\u1ED5ng doanh s\u1ED1: $60+90+45+30=225$ (tri\u1EC7u \u0111\u1ED3ng).",
          "T\u1EC9 l\u1EC7 c\u1EE7a Laptop: $\\f{90}{225}=\\f{2}{5}=40\\%$.",
          "G\xF3c \u1EDF t\xE2m c\u1EE7a Laptop: $\\f{90}{225}\\times360\\deg=\\f{2}{5}\\times360\\deg=144\\deg$.",
          "(Ki\u1EC3m tra: Tivi $96\\deg$, M\xE1y gi\u1EB7t $72\\deg$, T\u1EE7 l\u1EA1nh $48\\deg$; t\u1ED5ng $96+144+72+48=360\\deg$ \u2713)"
        ],
        remark: "B\u01B0\u1EDBc ki\u1EC3m tra t\u1ED5ng b\u1EB1ng $360\\deg$ gi\xFAp ph\xE1t hi\u1EC7n ngay n\u1EBFu t\xEDnh sai m\u1ED9t ph\u1EA7n n\xE0o \u0111\xF3."
      }]
    },
    {
      id: "g7-t7-d5",
      name: "D\u1EA1ng 5. X\xE1c su\u1EA5t c\u1EE7a bi\u1EBFn c\u1ED1 \u0111\u1ED3ng kh\u1EA3 n\u0103ng",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: li\u1EC7t k\xEA (ho\u1EB7c \u0111\u1EBFm) **t\u1ED5ng s\u1ED1 k\u1EBFt qu\u1EA3 c\xF3 th\u1EC3** \u2014 \u0111\xE2y l\xE0 m\u1EABu s\u1ED1.",
        "B\u01B0\u1EDBc 2: \u0111\u1EBFm s\u1ED1 k\u1EBFt qu\u1EA3 **thu\u1EADn l\u1EE3i** cho bi\u1EBFn c\u1ED1 \u2014 \u0111\xE2y l\xE0 t\u1EED s\u1ED1.",
        "B\u01B0\u1EDBc 3: l\u1EADp t\u1EC9 s\u1ED1 v\xE0 r\xFAt g\u1ECDn.",
        "L\u01B0u \xFD: c\xF4ng th\u1EE9c n\xE0y ch\u1EC9 \u0111\xFAng khi c\xE1c k\u1EBFt qu\u1EA3 **\u0111\u1ED3ng kh\u1EA3 n\u0103ng**."
      ],
      skills: ["Li\u1EC7t k\xEA kh\xF4ng gian m\u1EABu", "\u0110\u1EBFm theo \u0111i\u1EC1u ki\u1EC7n c\u1EE7a bi\u1EBFn c\u1ED1"],
      pitfalls: ["\u0110\u1EBFm s\xF3t k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i.", "\xC1p d\u1EE5ng c\xF4ng th\u1EE9c khi c\xE1c k\u1EBFt qu\u1EA3 kh\xF4ng \u0111\u1ED3ng kh\u1EA3 n\u0103ng."],
      worked: [{
        prompt: 'M\u1ED9t h\u1ED9p c\xF3 $30$ t\u1EA5m th\u1EBB \u0111\xE1nh s\u1ED1 t\u1EEB $1$ \u0111\u1EBFn $30$. R\xFAt ng\u1EABu nhi\xEAn m\u1ED9t th\u1EBB. T\xEDnh x\xE1c su\u1EA5t c\u1EE7a bi\u1EBFn c\u1ED1 $A$: "R\xFAt \u0111\u01B0\u1EE3c th\u1EBB ghi s\u1ED1 l\xE0 \u01B0\u1EDBc c\u1EE7a $30$".',
        thinking: [
          "R\xFAt ng\u1EABu nhi\xEAn n\xEAn $30$ th\u1EBB **\u0111\u1ED3ng kh\u1EA3 n\u0103ng** \u2014 d\xF9ng \u0111\u01B0\u1EE3c c\xF4ng th\u1EE9c x\xE1c su\u1EA5t l\xED thuy\u1EBFt.",
          "M\u1EABu s\u1ED1 l\xE0 $30$ (t\u1ED5ng s\u1ED1 th\u1EBB).",
          "T\u1EED s\u1ED1 l\xE0 s\u1ED1 c\xE1c \u01B0\u1EDBc d\u01B0\u01A1ng c\u1EE7a $30$ \u2014 ph\u1EA3i li\u1EC7t k\xEA c\u1EA9n th\u1EADn, \u0111\u1EEBng s\xF3t $1$ v\xE0 $30$."
        ],
        solution: [
          "T\u1ED5ng s\u1ED1 k\u1EBFt qu\u1EA3 c\xF3 th\u1EC3: $30$ (m\u1ED7i th\u1EBB l\xE0 m\u1ED9t k\u1EBFt qu\u1EA3, \u0111\u1ED3ng kh\u1EA3 n\u0103ng).",
          "C\xE1c \u01B0\u1EDBc d\u01B0\u01A1ng c\u1EE7a $30$ l\xE0: $1;\\;2;\\;3;\\;5;\\;6;\\;10;\\;15;\\;30$ \u2014 c\xF3 $8$ s\u1ED1.",
          "V\u1EADy c\xF3 $8$ k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i cho bi\u1EBFn c\u1ED1 $A$.",
          "$P(A)=\\f{8}{30}=\\f{4}{15}$."
        ],
        remark: "M\u1EB9o \u0111\u1EBFm \u01B0\u1EDBc kh\xF4ng s\xF3t: gh\xE9p c\u1EB7p $1\\cdot30$, $2\\cdot15$, $3\\cdot10$, $5\\cdot6$ \u2014 b\u1ED1n c\u1EB7p cho $8$ \u01B0\u1EDBc."
      }]
    }
  ],
  /* ============================== KHỐI 8 ============================== */
  "g8-t4": [
    {
      id: "g8-t4-d4",
      name: "D\u1EA1ng 4. X\xE1c \u0111\u1ECBnh h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t theo \u0111i\u1EC1u ki\u1EC7n",
      level: "VD",
      method: [
        "H\u1EC7 s\u1ED1 g\xF3c cho tr\u01B0\u1EDBc \u2192 bi\u1EBFt ngay $a$; ch\u1EC9 c\xF2n t\xECm $b$ b\u1EB1ng c\xE1ch thay to\u1EA1 \u0111\u1ED9 m\u1ED9t \u0111i\u1EC3m.",
        "\u0110i qua hai \u0111i\u1EC3m \u2192 thay c\u1EA3 hai \u0111i\u1EC3m, \u0111\u01B0\u1EE3c h\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh hai \u1EA9n $a$, $b$.",
        "Song song v\u1EDBi $y=a_0x+b_0$ \u2192 $a=a_0$ v\xE0 $b\\ne b_0$."
      ],
      skills: ["Chuy\u1EC3n \u0111i\u1EC1u ki\u1EC7n h\xECnh h\u1ECDc th\xE0nh ph\u01B0\u01A1ng tr\xECnh", "Gi\u1EA3i h\u1EC7 hai \u1EA9n"],
      pitfalls: ["Qu\xEAn \u0111i\u1EC1u ki\u1EC7n $a\\ne0$ \u0111\u1EC3 h\xE0m s\u1ED1 l\xE0 b\u1EADc nh\u1EA5t.", "Qu\xEAn $b\\ne b_0$ \u1EDF b\xE0i song song (n\u1EBFu b\u1EB1ng th\xEC hai \u0111\u01B0\u1EDDng **tr\xF9ng** nhau)."],
      worked: [{
        prompt: "X\xE1c \u0111\u1ECBnh h\xE0m s\u1ED1 $y=ax+b$ bi\u1EBFt \u0111\u1ED3 th\u1ECB c\u1EE7a n\xF3 song song v\u1EDBi \u0111\u01B0\u1EDDng th\u1EB3ng $y=-2x+5$ v\xE0 \u0111i qua \u0111i\u1EC3m $M(1;3)$.",
        thinking: [
          "Song song th\xEC **c\xF9ng h\u1EC7 s\u1ED1 g\xF3c**: $a=-2$, v\xE0 ph\u1EA3i kh\xE1c tung \u0111\u1ED9 g\u1ED1c: $b\\ne5$.",
          "C\xF2n m\u1ED9t \u1EA9n $b$, m\xE0 \u0111\u1EC1 cho m\u1ED9t \u0111i\u1EC3m \u2014 thay to\u1EA1 \u0111\u1ED9 \u0111i\u1EC3m v\xE0o l\xE0 ra.",
          "Cu\u1ED1i c\xF9ng nh\u1EDB \u0111\u1ED1i chi\u1EBFu $b\\ne5$ \u0111\u1EC3 b\u1EA3o \u0111\u1EA3m hai \u0111\u01B0\u1EDDng **song song** ch\u1EE9 kh\xF4ng tr\xF9ng."
        ],
        solution: [
          "V\xEC \u0111\u1ED3 th\u1ECB song song v\u1EDBi $y=-2x+5$ n\xEAn $a=-2$ v\xE0 $b\\ne5$.",
          "H\xE0m s\u1ED1 c\xF3 d\u1EA1ng $y=-2x+b$.",
          "\u0110\u1ED3 th\u1ECB \u0111i qua $M(1;3)$ n\xEAn $3=-2\\cdot1+b\\Rightarrow b=5$... nh\u01B0ng $b=5$ vi ph\u1EA1m \u0111i\u1EC1u ki\u1EC7n $b\\ne5$.",
          "Xem l\u1EA1i: $3=-2+b\\Rightarrow b=5$. V\xEC $b=5$ tr\xF9ng v\u1EDBi \u0111\u01B0\u1EDDng \u0111\xE3 cho n\xEAn **kh\xF4ng t\u1ED3n t\u1EA1i** h\xE0m s\u1ED1 tho\u1EA3 m\xE3n.",
          "K\u1EBFt lu\u1EADn: \u0111i\u1EC3m $M(1;3)$ n\u1EB1m ngay tr\xEAn \u0111\u01B0\u1EDDng th\u1EB3ng $y=-2x+5$, n\xEAn kh\xF4ng c\xF3 \u0111\u01B0\u1EDDng th\u1EB3ng n\xE0o v\u1EEBa song song v\u1EDBi n\xF3 v\u1EEBa \u0111i qua $M$."
        ],
        remark: "\u0110\xE2y l\xE0 b\u1EABy kinh \u0111i\u1EC3n: lu\xF4n ki\u1EC3m tra $b\\ne b_0$ \u1EDF cu\u1ED1i. N\u1EBFu $b=b_0$ th\xEC hai \u0111\u01B0\u1EDDng tr\xF9ng nhau, kh\xF4ng song song."
      }]
    },
    {
      id: "g8-t4-d5",
      name: "D\u1EA1ng 5. B\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EDBi h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: x\xE1c \u0111\u1ECBnh \u0111\u1EA1i l\u01B0\u1EE3ng n\xE0o l\xE0 bi\u1EBFn $x$, \u0111\u1EA1i l\u01B0\u1EE3ng n\xE0o l\xE0 h\xE0m $y$.",
        "B\u01B0\u1EDBc 2: h\u1EC7 s\u1ED1 g\xF3c $a$ l\xE0 **m\u1EE9c thay \u0111\u1ED5i tr\xEAn m\u1ED7i \u0111\u01A1n v\u1ECB**; h\u1EB1ng s\u1ED1 $b$ l\xE0 **gi\xE1 tr\u1ECB ban \u0111\u1EA7u**.",
        "B\u01B0\u1EDBc 3: l\u1EADp c\xF4ng th\u1EE9c $y=ax+b$ r\u1ED3i thay s\u1ED1 \u0111\u1EC3 tr\u1EA3 l\u1EDDi c\xE2u h\u1ECFi."
      ],
      skills: ["D\u1ECBch t\xECnh hu\u1ED1ng th\u1EF1c t\u1EBF th\xE0nh h\xE0m s\u1ED1", "Gi\u1EA3i ng\u01B0\u1EE3c \u0111\u1EC3 t\xECm $x$ t\u1EEB $y$"],
      pitfalls: ["Nh\u1EA7m gi\xE1 tr\u1ECB ban \u0111\u1EA7u v\u1EDBi m\u1EE9c thay \u0111\u1ED5i.", "Qu\xEAn \u0111i\u1EC1u ki\u1EC7n th\u1EF1c t\u1EBF c\u1EE7a bi\u1EBFn (th\u1EDDi gian, s\u1ED1 l\u01B0\u1EE3ng ph\u1EA3i kh\xF4ng \xE2m)."],
      worked: [{
        prompt: "M\u1ED9t c\u1EEDa h\xE0ng cho thu\xEA xe \u0111\u1EA1p v\u1EDBi gi\xE1 thu\xEA c\u1ED1 \u0111\u1ECBnh $20\\,000$ \u0111\u1ED3ng, c\u1ED9ng th\xEAm $8\\,000$ \u0111\u1ED3ng cho m\u1ED7i gi\u1EDD s\u1EED d\u1EE5ng. L\u1EADp c\xF4ng th\u1EE9c t\xEDnh s\u1ED1 ti\u1EC1n $y$ (\u0111\u1ED3ng) ph\u1EA3i tr\u1EA3 khi thu\xEA xe $x$ gi\u1EDD. H\u1ECFi v\u1EDBi $150\\,000$ \u0111\u1ED3ng th\xEC thu\xEA \u0111\u01B0\u1EE3c t\u1ED1i \u0111a bao nhi\xEAu gi\u1EDD?",
        thinking: [
          '"C\u1ED1 \u0111\u1ECBnh $20\\,000$" l\xE0 kho\u1EA3n tr\u1EA3 ngay c\u1EA3 khi $x=0$ \u2192 \u0111\xF3 l\xE0 $b$.',
          '"Th\xEAm $8\\,000$ m\u1ED7i gi\u1EDD" l\xE0 m\u1EE9c t\u0103ng tr\xEAn m\u1ED7i \u0111\u01A1n v\u1ECB th\u1EDDi gian \u2192 \u0111\xF3 l\xE0 h\u1EC7 s\u1ED1 g\xF3c $a$.',
          "C\xE2u h\u1ECFi th\u1EE9 hai cho $y$ v\xE0 h\u1ECFi $x$ \u2014 gi\u1EA3i ng\u01B0\u1EE3c, v\xE0 v\xEC l\xE0 s\u1ED1 gi\u1EDD nguy\xEAn n\xEAn ph\u1EA3i **l\xE0m tr\xF2n xu\u1ED1ng**."
        ],
        solution: [
          "Gi\xE1 tr\u1ECB ban \u0111\u1EA7u $b=20\\,000$; m\u1EE9c t\u0103ng m\u1ED7i gi\u1EDD $a=8\\,000$.",
          "C\xF4ng th\u1EE9c: $y=8\\,000x+20\\,000$ (\u0111\u1ED3ng), v\u1EDBi $x\\ge0$.",
          "V\u1EDBi $y=150\\,000$: $8\\,000x+20\\,000=150\\,000\\Rightarrow 8\\,000x=130\\,000\\Rightarrow x=16{,}25$.",
          "V\xEC s\u1ED1 gi\u1EDD thu\xEA ph\u1EA3i l\xE0 s\u1ED1 nguy\xEAn v\xE0 kh\xF4ng v\u01B0\u1EE3t qu\xE1 s\u1ED1 ti\u1EC1n c\xF3, ta l\u1EA5y $x=16$ gi\u1EDD.",
          "(Ki\u1EC3m tra: $16$ gi\u1EDD h\u1EBFt $8\\,000\\cdot16+20\\,000=148\\,000$ \u0111\u1ED3ng $\\le150\\,000$ \u2713; $17$ gi\u1EDD h\u1EBFt $156\\,000$ \u0111\u1ED3ng \u2014 v\u01B0\u1EE3t qu\xE1.)"
        ],
        remark: "B\xE0i th\u1EF1c t\u1EBF lu\xF4n ph\u1EA3i **\u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n** \u1EDF cu\u1ED1i: s\u1ED1 gi\u1EDD, s\u1ED1 ng\u01B0\u1EDDi, s\u1ED1 s\u1EA3n ph\u1EA9m \u0111\u1EC1u ph\u1EA3i nguy\xEAn v\xE0 kh\xF4ng \xE2m."
      }]
    }
  ],
  "g8-t5": [
    {
      id: "g8-t5-d5",
      name: "D\u1EA1ng 5. Ch\u1EE9ng minh t\u1EE9 gi\xE1c l\xE0 h\xECnh \u0111\u1EB7c bi\u1EC7t",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: ch\u1EE9ng minh tr\u01B0\u1EDBc l\xE0 **h\xECnh b\xECnh h\xE0nh** (th\u01B0\u1EDDng qua hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m m\u1ED7i \u0111\u01B0\u1EDDng).",
        "B\u01B0\u1EDBc 2: th\xEAm **m\u1ED9t** \u0111i\u1EC1u ki\u1EC7n \u0111\u1EC3 l\xEAn h\xECnh ri\xEAng: m\u1ED9t g\xF3c vu\xF4ng (ho\u1EB7c hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau) \u2192 h\xECnh ch\u1EEF nh\u1EADt; hai c\u1EA1nh k\u1EC1 b\u1EB1ng nhau (ho\u1EB7c hai \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c) \u2192 h\xECnh thoi.",
        "B\u01B0\u1EDBc 3: c\xF3 **c\u1EA3 hai** \u0111i\u1EC1u ki\u1EC7n tr\xEAn \u2192 h\xECnh vu\xF4ng."
      ],
      skills: ["\u0110i theo s\u01A1 \u0111\u1ED3 nh\u1EADn bi\u1EBFt t\u1EEB h\xECnh chung t\u1EDBi h\xECnh ri\xEAng", "Ch\u1ECDn d\u1EA5u hi\u1EC7u \xEDt vi\u1EC7c nh\u1EA5t"],
      pitfalls: ["Nh\u1EA3y th\u1EB3ng l\xEAn h\xECnh vu\xF4ng m\xE0 b\u1ECF qua b\u01B0\u1EDBc h\xECnh b\xECnh h\xE0nh.", "D\xF9ng d\u1EA5u hi\u1EC7u ch\u01B0a \u0111\u01B0\u1EE3c ch\u1EE9ng minh."],
      worked: [{
        prompt: "Cho tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$. G\u1ECDi $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $BC$. Tr\xEAn tia \u0111\u1ED1i c\u1EE7a tia $MA$ l\u1EA5y \u0111i\u1EC3m $D$ sao cho $MD=MA$. Ch\u1EE9ng minh t\u1EE9 gi\xE1c $ABDC$ l\xE0 h\xECnh ch\u1EEF nh\u1EADt.",
        thinking: [
          'C\u1EA5u h\xECnh "trung \u0111i\u1EC3m + k\xE9o d\xE0i g\u1EA5p \u0111\xF4i" cho ngay **hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m m\u1ED7i \u0111\u01B0\u1EDDng**.',
          "\u0110\xF3 ch\xEDnh l\xE0 d\u1EA5u hi\u1EC7u c\u1EE7a h\xECnh b\xECnh h\xE0nh \u2014 b\u01B0\u1EDBc 1 xong.",
          "\u0110\u1EC1 \u0111\xE3 cho s\u1EB5n $\\angle BAC=90\\deg$, \u0111\xFAng m\u1ED9t \u0111i\u1EC1u ki\u1EC7n c\u1EA7n th\xEAm \u0111\u1EC3 l\xEAn h\xECnh ch\u1EEF nh\u1EADt."
        ],
        solution: [
          "X\xE9t t\u1EE9 gi\xE1c $ABDC$ c\xF3 hai \u0111\u01B0\u1EDDng ch\xE9o l\xE0 $AD$ v\xE0 $BC$.",
          "$M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $BC$ (gi\u1EA3 thi\u1EBFt) v\xE0 $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $AD$ (v\xEC $MD=MA$ v\xE0 $D$ thu\u1ED9c tia \u0111\u1ED1i c\u1EE7a tia $MA$).",
          "Hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m m\u1ED7i \u0111\u01B0\u1EDDng n\xEAn $ABDC$ l\xE0 **h\xECnh b\xECnh h\xE0nh**.",
          "M\xE0 $\\angle BAC=90\\deg$ (tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$).",
          "H\xECnh b\xECnh h\xE0nh c\xF3 m\u1ED9t g\xF3c vu\xF4ng l\xE0 h\xECnh ch\u1EEF nh\u1EADt. V\u1EADy $ABDC$ l\xE0 **h\xECnh ch\u1EEF nh\u1EADt**. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
        ],
        remark: "H\u1EC7 qu\u1EA3 r\u1EA5t hay d\xF9ng: t\u1EEB \u0111\xE2y suy ra $AD=BC$, t\u1EE9c $AM=\\f{BC}{2}$ \u2014 trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n b\u1EB1ng n\u1EEDa c\u1EA1nh huy\u1EC1n."
      }]
    },
    {
      id: "g8-t5-d6",
      name: "D\u1EA1ng 6. \u0110\u01B0\u1EDDng trung b\xECnh c\u1EE7a tam gi\xE1c v\xE0 h\xECnh thang",
      level: "TH",
      method: [
        "\u0110\u01B0\u1EDDng trung b\xECnh c\u1EE7a **tam gi\xE1c**: n\u1ED1i trung \u0111i\u1EC3m hai c\u1EA1nh, song song c\u1EA1nh th\u1EE9 ba v\xE0 b\u1EB1ng **n\u1EEDa** c\u1EA1nh \u1EA5y.",
        "\u0110\u01B0\u1EDDng trung b\xECnh c\u1EE7a **h\xECnh thang**: n\u1ED1i trung \u0111i\u1EC3m hai c\u1EA1nh b\xEAn, song song hai \u0111\xE1y v\xE0 b\u1EB1ng **n\u1EEDa t\u1ED5ng** hai \u0111\xE1y.",
        "D\u1EA5u hi\u1EC7u d\xF9ng: h\u1EC5 trong h\xECnh c\xF3 hai trung \u0111i\u1EC3m l\xE0 ngh\u0129 ngay t\u1EDBi \u0111\u01B0\u1EDDng trung b\xECnh."
      ],
      skills: ["Ph\xE1t hi\u1EC7n c\u1EB7p trung \u0111i\u1EC3m", "D\xF9ng \u0111\u01B0\u1EDDng trung b\xECnh \u0111\u1EC3 t\u1EA1o quan h\u1EC7 song song"],
      pitfalls: ["Nh\u1EA7m c\xF4ng th\u1EE9c tam gi\xE1c (n\u1EEDa c\u1EA1nh) v\u1EDBi h\xECnh thang (n\u1EEDa t\u1ED5ng hai \u0111\xE1y).", "D\xF9ng khi m\u1EDBi ch\u1EC9 c\xF3 m\u1ED9t trung \u0111i\u1EC3m."],
      worked: [{
        prompt: "Cho h\xECnh thang $ABCD$ ($AB\\para CD$) c\xF3 $AB=8$ cm, $CD=14$ cm. G\u1ECDi $M$, $N$ l\u1EA7n l\u01B0\u1EE3t l\xE0 trung \u0111i\u1EC3m c\u1EE7a $AD$ v\xE0 $BC$. T\xEDnh $MN$.",
        thinking: [
          "$M$, $N$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a **hai c\u1EA1nh b\xEAn** \u2192 $MN$ l\xE0 \u0111\u01B0\u1EDDng trung b\xECnh c\u1EE7a h\xECnh thang.",
          "C\xF4ng th\u1EE9c c\u1EE7a h\xECnh thang l\xE0 **n\u1EEDa t\u1ED5ng hai \u0111\xE1y**, kh\xE1c v\u1EDBi tam gi\xE1c.",
          "Hai \u0111\xE1y \u1EDF \u0111\xE2y l\xE0 $AB$ v\xE0 $CD$."
        ],
        solution: [
          "V\xEC $M$, $N$ l\u1EA7n l\u01B0\u1EE3t l\xE0 trung \u0111i\u1EC3m c\u1EE7a hai c\u1EA1nh b\xEAn $AD$ v\xE0 $BC$ n\xEAn $MN$ l\xE0 \u0111\u01B0\u1EDDng trung b\xECnh c\u1EE7a h\xECnh thang $ABCD$.",
          "Do \u0111\xF3 $MN\\para AB\\para CD$ v\xE0 $MN=\\f{AB+CD}{2}$.",
          "$MN=\\f{8+14}{2}=\\f{22}{2}=11$ (cm)."
        ],
        remark: 'Nh\u1EDB theo c\xE1ch n\xE0y: tam gi\xE1c c\xF3 "m\u1ED9t \u0111\xE1y" n\xEAn l\u1EA5y n\u1EEDa \u0111\xE1y; h\xECnh thang c\xF3 "hai \u0111\xE1y" n\xEAn l\u1EA5y n\u1EEDa t\u1ED5ng.'
      }]
    }
  ],
  "g8-t7": [
    {
      id: "g8-t7-d4",
      name: "D\u1EA1ng 4. \u0110\u1ECBnh l\xED Pythagore thu\u1EADn v\xE0 \u0111\u1EA3o",
      level: "TH",
      method: [
        "Thu\u1EADn: tam gi\xE1c vu\xF4ng \u2192 $a^{2}=b^{2}+c^{2}$ v\u1EDBi $a$ l\xE0 c\u1EA1nh huy\u1EC1n. D\xF9ng \u0111\u1EC3 **t\xEDnh c\u1EA1nh**.",
        "\u0110\u1EA3o: n\u1EBFu $a^{2}=b^{2}+c^{2}$ (v\u1EDBi $a$ l\u1EDBn nh\u1EA5t) \u2192 tam gi\xE1c vu\xF4ng. D\xF9ng \u0111\u1EC3 **nh\u1EADn bi\u1EBFt**.",
        "B\u1ED9 ba Pythagore hay g\u1EB7p: $(3;4;5)$, $(6;8;10)$, $(5;12;13)$, $(8;15;17)$, $(9;12;15)$."
      ],
      skills: ["X\xE1c \u0111\u1ECBnh \u0111\xFAng c\u1EA1nh huy\u1EC1n", "Thu\u1ED9c c\xE1c b\u1ED9 ba Pythagore \u0111\u1EC3 t\xEDnh nh\u1EA9m"],
      pitfalls: ["L\u1EA5y nh\u1EA7m c\u1EA1nh g\xF3c vu\xF4ng l\xE0m c\u1EA1nh huy\u1EC1n.", "D\xF9ng \u0111\u1ECBnh l\xED thu\u1EADn khi ch\u01B0a bi\u1EBFt tam gi\xE1c c\xF3 vu\xF4ng hay kh\xF4ng."],
      worked: [{
        prompt: "M\u1ED9t chi\u1EBFc thang d\xE0i $5$ m d\u1EF1a v\xE0o t\u01B0\u1EDDng, ch\xE2n thang c\xE1ch ch\xE2n t\u01B0\u1EDDng $3$ m. H\u1ECFi thang ch\u1EA1m t\u01B0\u1EDDng \u1EDF \u0111\u1ED9 cao bao nhi\xEAu m\xE9t?",
        thinking: [
          "Thang, t\u01B0\u1EDDng v\xE0 m\u1EB7t \u0111\u1EA5t t\u1EA1o th\xE0nh m\u1ED9t **tam gi\xE1c vu\xF4ng** (t\u01B0\u1EDDng vu\xF4ng g\xF3c m\u1EB7t \u0111\u1EA5t).",
          "Chi\u1EBFc thang l\xE0 c\u1EA1nh d\xE0i nh\u1EA5t, \u0111\u1ED1i di\u1EC7n g\xF3c vu\xF4ng \u2192 thang ch\xEDnh l\xE0 **c\u1EA1nh huy\u1EC1n**.",
          "Bi\u1EBFt c\u1EA1nh huy\u1EC1n v\xE0 m\u1ED9t c\u1EA1nh g\xF3c vu\xF4ng, t\xECm c\u1EA1nh g\xF3c vu\xF4ng c\xF2n l\u1EA1i."
        ],
        solution: [
          "G\u1ECDi $h$ l\xE0 \u0111\u1ED9 cao thang ch\u1EA1m t\u01B0\u1EDDng. Tam gi\xE1c t\u1EA1o b\u1EDFi thang, t\u01B0\u1EDDng v\xE0 m\u1EB7t \u0111\u1EA5t vu\xF4ng t\u1EA1i ch\xE2n t\u01B0\u1EDDng.",
          "C\u1EA1nh huy\u1EC1n l\xE0 chi\u1EBFc thang: $5$ m; m\u1ED9t c\u1EA1nh g\xF3c vu\xF4ng l\xE0 kho\u1EA3ng c\xE1ch ch\xE2n thang t\u1EDBi t\u01B0\u1EDDng: $3$ m.",
          "Theo \u0111\u1ECBnh l\xED Pythagore: $5^{2}=3^{2}+h^{2}\\Rightarrow 25=9+h^{2}\\Rightarrow h^{2}=16$.",
          "V\xEC $h>0$ n\xEAn $h=4$ (m). V\u1EADy thang ch\u1EA1m t\u01B0\u1EDDng \u1EDF \u0111\u1ED9 cao $4$ m."
        ],
        remark: "\u0110\xE2y ch\xEDnh l\xE0 b\u1ED9 ba $(3;4;5)$ \u2014 nh\u1EADn ra ngay th\xEC kh\xF4ng c\u1EA7n t\xEDnh, ch\u1EC9 c\u1EA7n ki\u1EC3m tra l\u1EA1i."
      }]
    },
    {
      id: "g8-t7-d5",
      name: "D\u1EA1ng 5. H\xECnh ch\xF3p \u0111\u1EC1u \u2014 di\u1EC7n t\xEDch v\xE0 th\u1EC3 t\xEDch",
      level: "VD",
      method: [
        "$S_{xq}=\\f{1}{2}\\times C_{\\text{\u0111\xE1y}}\\times d$ v\u1EDBi $d$ l\xE0 **trung \u0111o\u1EA1n** (\u0111\u01B0\u1EDDng cao c\u1EE7a m\u1EB7t b\xEAn).",
        "$S_{tp}=S_{xq}+S_{\\text{\u0111\xE1y}}$ (h\xECnh ch\xF3p ch\u1EC9 c\xF3 **m\u1ED9t** \u0111\xE1y).",
        "$V=\\f{1}{3}\\times S_{\\text{\u0111\xE1y}}\\times h$ v\u1EDBi $h$ l\xE0 **chi\u1EC1u cao** h\xECnh ch\xF3p."
      ],
      skills: ["Ph\xE2n bi\u1EC7t trung \u0111o\u1EA1n v\u1EDBi chi\u1EC1u cao", "T\xEDnh di\u1EC7n t\xEDch \u0111a gi\xE1c \u0111\xE1y"],
      pitfalls: ["D\xF9ng chi\u1EC1u cao thay cho trung \u0111o\u1EA1n khi t\xEDnh $S_{xq}$.", "Qu\xEAn h\u1EC7 s\u1ED1 $\\f{1}{3}$ khi t\xEDnh th\u1EC3 t\xEDch."],
      worked: [{
        prompt: "M\u1ED9t h\xECnh ch\xF3p t\u1EE9 gi\xE1c \u0111\u1EC1u c\xF3 \u0111\xE1y l\xE0 h\xECnh vu\xF4ng c\u1EA1nh $6$ cm, trung \u0111o\u1EA1n $5$ cm v\xE0 chi\u1EC1u cao $4$ cm. T\xEDnh di\u1EC7n t\xEDch xung quanh v\xE0 th\u1EC3 t\xEDch c\u1EE7a h\xECnh ch\xF3p.",
        thinking: [
          "\u0110\u1EC1 cho **c\u1EA3** trung \u0111o\u1EA1n l\u1EABn chi\u1EC1u cao \u2014 \u0111\xE2y l\xE0 c\xE1ch ki\u1EC3m tra xem h\u1ECDc sinh c\xF3 ph\xE2n bi\u1EC7t \u0111\u01B0\u1EE3c hai \u0111\u1EA1i l\u01B0\u1EE3ng kh\xF4ng.",
          "Di\u1EC7n t\xEDch xung quanh d\xF9ng **trung \u0111o\u1EA1n** ($5$ cm), v\xEC m\u1ED7i m\u1EB7t b\xEAn l\xE0 tam gi\xE1c c\xE2n c\xF3 \u0111\u01B0\u1EDDng cao l\xE0 trung \u0111o\u1EA1n.",
          "Th\u1EC3 t\xEDch d\xF9ng **chi\u1EC1u cao** ($4$ cm), l\xE0 kho\u1EA3ng c\xE1ch t\u1EEB \u0111\u1EC9nh t\u1EDBi m\u1EB7t \u0111\xE1y."
        ],
        solution: [
          "Chu vi \u0111\xE1y: $C=4\\times6=24$ (cm). Di\u1EC7n t\xEDch \u0111\xE1y: $S_{\\text{\u0111\xE1y}}=6\\times6=36\\;(cm^{2})$.",
          "Di\u1EC7n t\xEDch xung quanh: $S_{xq}=\\f{1}{2}\\times24\\times5=60\\;(cm^{2})$.",
          "Th\u1EC3 t\xEDch: $V=\\f{1}{3}\\times36\\times4=48\\;(cm^{3})$."
        ],
        remark: "Ghi nh\u1EDB theo vai tr\xF2: trung \u0111o\u1EA1n n\u1EB1m **tr\xEAn m\u1EB7t b\xEAn** (cho di\u1EC7n t\xEDch), chi\u1EC1u cao n\u1EB1m **b\xEAn trong** h\xECnh ch\xF3p (cho th\u1EC3 t\xEDch)."
      }]
    }
  ],
  "g8-t8": [
    {
      id: "g8-t8-d5",
      name: "D\u1EA1ng 5. \u01AF\u1EDBc l\u01B0\u1EE3ng s\u1ED1 l\u1EA7n x\u1EA3y ra t\u1EEB x\xE1c su\u1EA5t",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: t\xEDnh x\xE1c su\u1EA5t (l\xED thuy\u1EBFt ho\u1EB7c th\u1EF1c nghi\u1EC7m) c\u1EE7a bi\u1EBFn c\u1ED1.",
        "B\u01B0\u1EDBc 2: nh\xE2n x\xE1c su\u1EA5t v\u1EDBi s\u1ED1 l\u1EA7n d\u1EF1 \u0111\u1ECBnh th\u1EF1c hi\u1EC7n.",
        "B\u01B0\u1EDBc 3: l\xE0m tr\xF2n v\u1EC1 s\u1ED1 nguy\xEAn v\xEC s\u1ED1 l\u1EA7n ph\u1EA3i l\xE0 s\u1ED1 \u0111\u1EBFm \u0111\u01B0\u1EE3c."
      ],
      skills: ["Chuy\u1EC3n x\xE1c su\u1EA5t th\xE0nh s\u1ED1 l\u1EA7n d\u1EF1 \u0111o\xE1n", "Hi\u1EC3u t\xEDnh ch\u1EA5t \u01B0\u1EDBc l\u01B0\u1EE3ng c\u1EE7a k\u1EBFt qu\u1EA3"],
      pitfalls: ["Coi k\u1EBFt qu\u1EA3 \u01B0\u1EDBc l\u01B0\u1EE3ng l\xE0 con s\u1ED1 ch\xEDnh x\xE1c tuy\u1EC7t \u0111\u1ED1i.", "Qu\xEAn l\xE0m tr\xF2n v\u1EC1 s\u1ED1 nguy\xEAn."],
      worked: [{
        prompt: "Trong m\u1ED9t t\xFAi c\xF3 bi \u0111en v\xE0 bi \u0111\u1ECF. Nam l\u1EA5y ng\u1EABu nhi\xEAn m\u1ED9t vi\xEAn, xem m\xE0u r\u1ED3i tr\u1EA3 l\u1EA1i t\xFAi; l\xE0m nh\u01B0 v\u1EADy $30$ l\u1EA7n th\xEC c\xF3 $13$ l\u1EA7n \u0111\u01B0\u1EE3c bi \u0111\u1ECF. N\u1EBFu Nam th\u1EF1c hi\u1EC7n $50$ l\u1EA7n th\xEC d\u1EF1 \u0111o\xE1n c\xF3 kho\u1EA3ng bao nhi\xEAu l\u1EA7n l\u1EA5y \u0111\u01B0\u1EE3c bi **\u0111en**?",
        thinking: [
          "Kh\xF4ng bi\u1EBFt s\u1ED1 bi th\u1EADt trong t\xFAi, n\xEAn ph\u1EA3i d\xF9ng **x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m** t\u1EEB $30$ l\u1EA7n \u0111\xE3 l\xE0m.",
          "\u0110\u1EC1 h\u1ECFi bi **\u0111en**, m\xE0 s\u1ED1 li\u1EC7u cho bi **\u0111\u1ECF** \u2014 ph\u1EA3i l\u1EA5y ph\u1EA7n b\xF9 tr\u01B0\u1EDBc.",
          "C\xF3 x\xE1c su\u1EA5t r\u1ED3i th\xEC nh\xE2n v\u1EDBi $50$ \u0111\u1EC3 ra s\u1ED1 l\u1EA7n d\u1EF1 \u0111o\xE1n."
        ],
        solution: [
          "S\u1ED1 l\u1EA7n l\u1EA5y \u0111\u01B0\u1EE3c bi \u0111en trong $30$ l\u1EA7n: $30-13=17$ (l\u1EA7n).",
          'X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m c\u1EE7a bi\u1EBFn c\u1ED1 "l\u1EA5y \u0111\u01B0\u1EE3c bi \u0111en": $\\f{17}{30}$.',
          "D\u1EF1 \u0111o\xE1n s\u1ED1 l\u1EA7n l\u1EA5y \u0111\u01B0\u1EE3c bi \u0111en trong $50$ l\u1EA7n: $50\\times\\f{17}{30}=\\f{850}{30}\\approx28{,}3$.",
          "V\u1EADy d\u1EF1 \u0111o\xE1n c\xF3 kho\u1EA3ng $28$ l\u1EA7n l\u1EA5y \u0111\u01B0\u1EE3c bi \u0111en."
        ],
        remark: "K\u1EBFt qu\u1EA3 ch\u1EC9 l\xE0 **d\u1EF1 \u0111o\xE1n**; th\u1EF1c t\u1EBF c\xF3 th\u1EC3 l\u1EC7ch, v\xE0 c\xE0ng th\u1EF1c hi\u1EC7n nhi\u1EC1u l\u1EA7n th\xEC c\xE0ng s\xE1t."
      }]
    },
    {
      id: "g8-t8-d3",
      name: "D\u1EA1ng 3. X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m t\u1EEB b\u1EA3ng th\u1ED1ng k\xEA",
      level: "TH",
      method: [
        "B\u01B0\u1EDBc 1: x\xE1c \u0111\u1ECBnh t\u1ED5ng s\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n $N$ (th\u01B0\u1EDDng ghi \u1EDF cu\u1ED1i b\u1EA3ng).",
        "B\u01B0\u1EDBc 2: c\u1ED9ng c\xE1c t\u1EA7n s\u1ED1 tho\u1EA3 m\xE3n \u0111i\u1EC1u ki\u1EC7n c\u1EE7a bi\u1EBFn c\u1ED1.",
        "B\u01B0\u1EDBc 3: l\u1EADp t\u1EC9 s\u1ED1 r\u1ED3i r\xFAt g\u1ECDn."
      ],
      skills: ["\u0110\u1ECDc b\u1EA3ng t\u1EA7n s\u1ED1", "X\u1EED l\xFD ch\xEDnh x\xE1c t\u1EEB kho\xE1 v\u1EC1 ranh gi\u1EDBi"],
      pitfalls: ['Nh\u1EA7m "d\u01B0\u1EDBi 5" (kh\xF4ng g\u1ED3m 5) v\u1EDBi "kh\xF4ng qu\xE1 5" (c\xF3 g\u1ED3m 5).', 'Qu\xEAn c\u1ED9ng nh\xF3m "tr\xEAn n" \u1EDF cu\u1ED1i b\u1EA3ng.'],
      worked: [{
        prompt: 'M\u1ED9t c\u1EEDa h\xE0ng th\u1ED1ng k\xEA s\u1ED1 xe b\xE1n ra m\u1ED7i ng\xE0y trong $32$ ng\xE0y: b\xE1n $2$ chi\u1EBFc c\xF3 $3$ ng\xE0y, $3$ chi\u1EBFc c\xF3 $5$ ng\xE0y, $4$ chi\u1EBFc c\xF3 $2$ ng\xE0y, $5$ chi\u1EBFc c\xF3 $6$ ng\xE0y, $6$ chi\u1EBFc c\xF3 $7$ ng\xE0y, $7$ chi\u1EBFc c\xF3 $5$ ng\xE0y, tr\xEAn $7$ chi\u1EBFc c\xF3 $4$ ng\xE0y. T\xEDnh x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m c\u1EE7a bi\u1EBFn c\u1ED1 "ng\xE0y b\xE1n \u0111\u01B0\u1EE3c **d\u01B0\u1EDBi 5** chi\u1EBFc xe".',
        thinking: [
          '"D\u01B0\u1EDBi 5" ngh\u0129a l\xE0 $2$, $3$, $4$ chi\u1EBFc \u2014 **kh\xF4ng** bao g\u1ED3m $5$ chi\u1EBFc.',
          "C\u1ED9ng t\u1EA7n s\u1ED1 c\u1EE7a \u0111\xFAng ba nh\xF3m \u0111\xF3 l\xE0m t\u1EED s\u1ED1.",
          "M\u1EABu s\u1ED1 l\xE0 t\u1ED5ng $N=32$ ng\xE0y, \u0111\u1EC1 \u0111\xE3 cho s\u1EB5n."
        ],
        solution: [
          "C\xE1c ng\xE0y b\xE1n d\u01B0\u1EDBi $5$ chi\u1EBFc l\xE0 c\xE1c ng\xE0y b\xE1n $2$, $3$ ho\u1EB7c $4$ chi\u1EBFc.",
          "S\u1ED1 ng\xE0y t\u01B0\u01A1ng \u1EE9ng: $3+5+2=10$ (ng\xE0y).",
          "T\u1ED5ng s\u1ED1 ng\xE0y th\u1ED1ng k\xEA: $N=32$.",
          "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m: $\\f{10}{32}=\\f{5}{16}=0{,}3125$."
        ],
        remark: 'G\u1EA1ch ch\xE2n t\u1EEB kho\xE1 ranh gi\u1EDBi ("d\u01B0\u1EDBi", "tr\xEAn", "\xEDt nh\u1EA5t", "kh\xF4ng qu\xE1") ngay khi \u0111\u1ECDc \u0111\u1EC1 \u2014 \u0111\xF3 l\xE0 ch\u1ED7 ra \u0111\u1EC1 c\xE0i b\u1EABy.'
      }]
    },
    {
      id: "g8-t8-d4",
      name: "D\u1EA1ng 4. X\xE1c su\u1EA5t l\xED thuy\u1EBFt c\u1EE7a ph\xE9p th\u1EED",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: x\xE1c \u0111\u1ECBnh kh\xF4ng gian m\u1EABu \u2014 t\u1ED5ng s\u1ED1 k\u1EBFt qu\u1EA3 **\u0111\u1ED3ng kh\u1EA3 n\u0103ng**.",
        "B\u01B0\u1EDBc 2: \u0111\u1EBFm s\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i cho bi\u1EBFn c\u1ED1.",
        "B\u01B0\u1EDBc 3: $P=\\f{\\text{thu\u1EADn l\u1EE3i}}{\\text{t\u1ED5ng}}$.",
        'V\u1EDBi bi\u1EBFn c\u1ED1 "\xEDt nh\u1EA5t m\u1ED9t...", n\xEAn t\xEDnh qua **bi\u1EBFn c\u1ED1 \u0111\u1ED1i**.'
      ],
      skills: ["Li\u1EC7t k\xEA kh\xF4ng gian m\u1EABu b\u1EB1ng b\u1EA3ng ho\u1EB7c s\u01A1 \u0111\u1ED3 c\xE2y", "D\xF9ng bi\u1EBFn c\u1ED1 \u0111\u1ED1i \u0111\u1EC3 r\xFAt ng\u1EAFn"],
      pitfalls: ["\u0110\u1EBFm thi\u1EBFu kh\xF4ng gian m\u1EABu \u1EDF ph\xE9p th\u1EED hai giai \u0111o\u1EA1n.", "Qu\xEAn l\u1EA5y $1$ tr\u1EEB khi d\xF9ng bi\u1EBFn c\u1ED1 \u0111\u1ED1i."],
      worked: [{
        prompt: 'Trong m\u1ED9t ph\xF2ng c\xF3 $15$ h\u1ECDc sinh l\u1EDBp 8H (g\u1ED3m $9$ nam, $6$ n\u1EEF) v\xE0 $15$ h\u1ECDc sinh l\u1EDBp 8G (g\u1ED3m $12$ nam, $3$ n\u1EEF). Ch\u1ECDn ng\u1EABu nhi\xEAn m\u1ED9t h\u1ECDc sinh. T\xEDnh x\xE1c su\u1EA5t c\u1EE7a bi\u1EBFn c\u1ED1 "ch\u1ECDn \u0111\u01B0\u1EE3c m\u1ED9t h\u1ECDc sinh nam".',
        thinking: [
          "Ch\u1ECDn m\u1ED9t h\u1ECDc sinh trong **to\xE0n b\u1ED9** ph\xF2ng, n\xEAn kh\xF4ng gian m\u1EABu l\xE0 c\u1EA3 $30$ h\u1ECDc sinh.",
          "\u0110\xE2y l\xE0 b\u1EABy: nhi\u1EC1u b\u1EA1n ch\u1EC9 l\u1EA5y $15$ c\u1EE7a m\u1ED9t l\u1EDBp l\xE0m m\u1EABu s\u1ED1.",
          "S\u1ED1 nam l\xE0 t\u1ED5ng nam c\u1EE7a c\u1EA3 hai l\u1EDBp."
        ],
        solution: [
          "T\u1ED5ng s\u1ED1 h\u1ECDc sinh trong ph\xF2ng: $15+15=30$ \u2014 \u0111\xE2y l\xE0 s\u1ED1 k\u1EBFt qu\u1EA3 \u0111\u1ED3ng kh\u1EA3 n\u0103ng.",
          "T\u1ED5ng s\u1ED1 h\u1ECDc sinh nam: $9+12=21$.",
          "X\xE1c su\u1EA5t ch\u1ECDn \u0111\u01B0\u1EE3c h\u1ECDc sinh nam: $P=\\f{21}{30}=\\f{7}{10}=0{,}7$."
        ],
        remark: 'Lu\xF4n h\u1ECFi "ch\u1ECDn trong ph\u1EA1m vi n\xE0o?" tr\u01B0\u1EDBc khi \u0111\u1EB7t m\u1EABu s\u1ED1 \u2014 ph\u1EA1m vi sai th\xEC m\u1ECDi ph\xE9p t\xEDnh sau \u0111\u1EC1u v\xF4 ngh\u0129a.'
      }]
    }
  ],
  /* ============================== KHỐI 9 ============================== */
  "g9-t4": [
    {
      id: "g9-t4-d5",
      name: "D\u1EA1ng 5. B\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si v\xE0 \u0111i\u1EC3m r\u01A1i",
      level: "VDC",
      method: [
        "B\u01B0\u1EDBc 1: **d\u1EF1 \u0111o\xE1n \u0111i\u1EC3m r\u01A1i** \u2014 v\u1EDBi b\xE0i \u0111\u1ED1i x\u1EE9ng th\u01B0\u1EDDng l\xE0 c\xE1c bi\u1EBFn b\u1EB1ng nhau.",
        "B\u01B0\u1EDBc 2: thay \u0111i\u1EC3m r\u01A1i v\xE0o \u0111\u1EC3 bi\u1EBFt gi\xE1 tr\u1ECB c\u1EF1c tr\u1ECB c\u1EA7n h\u01B0\u1EDBng t\u1EDBi.",
        "B\u01B0\u1EDBc 3: ch\u1ECDn c\xE1ch t\xE1ch h\u1EA1ng t\u1EED sao cho d\u1EA5u b\u1EB1ng c\u1EE7a C\xF4-si x\u1EA3y ra \u0111\xFAng t\u1EA1i \u0111i\u1EC3m r\u01A1i.",
        "B\u01B0\u1EDBc 4: k\u1EBFt lu\u1EADn k\xE8m gi\xE1 tr\u1ECB c\u1EE7a bi\u1EBFn."
      ],
      skills: ["D\u1EF1 \u0111o\xE1n \u0111i\u1EC3m r\u01A1i tr\u01B0\u1EDBc khi bi\u1EBFn \u0111\u1ED5i", "T\xE1ch h\u1EC7 s\u1ED1 cho kh\u1EDBp \u0111i\u1EC3m r\u01A1i"],
      pitfalls: ["\xC1p C\xF4-si tu\u1EF3 ti\u1EC7n khi\u1EBFn d\u1EA5u b\u1EB1ng kh\xF4ng x\u1EA3y ra \u0111\u01B0\u1EE3c.", "Qu\xEAn \u0111i\u1EC1u ki\u1EC7n c\xE1c s\u1ED1 ph\u1EA3i kh\xF4ng \xE2m."],
      worked: [{
        prompt: "Cho $x>0$. T\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a bi\u1EC3u th\u1EE9c $A=x+\\f{9}{x}$.",
        thinking: [
          "Hai h\u1EA1ng t\u1EED \u0111\u1EC1u d\u01B0\u01A1ng v\xE0 **t\xEDch c\u1EE7a ch\xFAng l\xE0 h\u1EB1ng s\u1ED1** ($x\\cdot\\f{9}{x}=9$) \u2014 \u0111\xFAng m\xF4 h\xECnh \xE1p C\xF4-si.",
          "D\u1EF1 \u0111o\xE1n \u0111i\u1EC3m r\u01A1i: d\u1EA5u b\u1EB1ng c\u1EE7a C\xF4-si x\u1EA3y ra khi hai h\u1EA1ng t\u1EED b\u1EB1ng nhau, t\u1EE9c $x=\\f{9}{x}$.",
          "Gi\u1EA3i ra $x^{2}=9$, m\xE0 $x>0$ n\xEAn $x=3$ \u2014 \u0111i\u1EC3m r\u01A1i n\u1EB1m trong mi\u1EC1n cho ph\xE9p, v\u1EADy c\xE1ch l\xE0m n\xE0y \u0111i \u0111\xFAng h\u01B0\u1EDBng."
        ],
        solution: [
          "V\xEC $x>0$ n\xEAn $\\f{9}{x}>0$. \xC1p d\u1EE5ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si cho hai s\u1ED1 d\u01B0\u01A1ng:",
          "$A=x+\\f{9}{x}\\ge2\\s{x\\cdot\\f{9}{x}}=2\\s{9}=6$.",
          'D\u1EA5u "$=$" x\u1EA3y ra khi $x=\\f{9}{x}\\Leftrightarrow x^{2}=9\\Leftrightarrow x=3$ (v\xEC $x>0$).',
          "V\u1EADy $A_{\\min}=6$ khi $x=3$."
        ],
        remark: "\u0110i\u1EC1u ki\u1EC7n $x>0$ l\xE0 b\u1EAFt bu\u1ED9c: n\u1EBFu $x<0$ th\xEC $A$ c\xF3 th\u1EC3 nh\u1ECF tu\u1EF3 \xFD, kh\xF4ng t\u1ED3n t\u1EA1i gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t."
      }]
    },
    {
      id: "g9-t4-d3",
      name: "D\u1EA1ng 3. Gi\u1EA3i b\u1EA5t ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n",
      level: "TH",
      method: [
        "B\u01B0\u1EDBc 1: kh\u1EED m\u1EABu (n\u1EBFu c\xF3) b\u1EB1ng c\xE1ch nh\xE2n v\u1EDBi BCNN \u2014 n\u1EBFu nh\xE2n s\u1ED1 **d\u01B0\u01A1ng** th\xEC gi\u1EEF chi\u1EC1u.",
        "B\u01B0\u1EDBc 2: chuy\u1EC3n v\u1EBF c\xE1c h\u1EA1ng t\u1EED ch\u1EE9a \u1EA9n v\u1EC1 m\u1ED9t b\xEAn (nh\u1EDB \u0111\u1ED5i d\u1EA5u).",
        "B\u01B0\u1EDBc 3: chia hai v\u1EBF cho h\u1EC7 s\u1ED1 c\u1EE7a \u1EA9n \u2014 n\u1EBFu h\u1EC7 s\u1ED1 **\xE2m** th\xEC **\u0111\u1ED5i chi\u1EC1u** b\u1EA5t \u0111\u1EB3ng th\u1EE9c.",
        "B\u01B0\u1EDBc 4: bi\u1EC3u di\u1EC5n t\u1EADp nghi\u1EC7m tr\xEAn tr\u1EE5c s\u1ED1."
      ],
      skills: ["X\u1EED l\xFD chi\u1EC1u b\u1EA5t \u0111\u1EB3ng th\u1EE9c", "Bi\u1EC3u di\u1EC5n t\u1EADp nghi\u1EC7m"],
      pitfalls: ["Qu\xEAn \u0111\u1ED5i chi\u1EC1u khi chia cho s\u1ED1 \xE2m \u2014 l\u1ED7i nghi\xEAm tr\u1ECDng nh\u1EA5t c\u1EE7a chuy\xEAn \u0111\u1EC1.", "Bi\u1EC3u di\u1EC5n nh\u1EA7m d\u1EA5u ngo\u1EB7c m\u1EDF/\u0111\xF3ng tr\xEAn tr\u1EE5c s\u1ED1."],
      worked: [{
        prompt: "Gi\u1EA3i b\u1EA5t ph\u01B0\u01A1ng tr\xECnh $\\f{2x-1}{3}-\\f{x+2}{2}>1$ v\xE0 bi\u1EC3u di\u1EC5n t\u1EADp nghi\u1EC7m tr\xEAn tr\u1EE5c s\u1ED1.",
        thinking: [
          "C\xF3 m\u1EABu s\u1ED1 n\xEAn b\u01B0\u1EDBc \u0111\u1EA7u l\xE0 nh\xE2n hai v\u1EBF v\u1EDBi BCNN$(3;2)=6$ \u2014 s\u1ED1 **d\u01B0\u01A1ng** n\xEAn gi\u1EEF nguy\xEAn chi\u1EC1u.",
          "Sau khi kh\u1EED m\u1EABu, c\u1EA9n th\u1EADn d\u1EA5u tr\u1EEB tr\u01B0\u1EDBc ngo\u1EB7c th\u1EE9 hai.",
          "Cu\u1ED1i c\xF9ng n\u1EBFu h\u1EC7 s\u1ED1 c\u1EE7a $x$ ra s\u1ED1 \xE2m th\xEC ph\u1EA3i \u0111\u1ED5i chi\u1EC1u khi chia."
        ],
        solution: [
          "Nh\xE2n hai v\u1EBF v\u1EDBi $6>0$ (gi\u1EEF nguy\xEAn chi\u1EC1u): $2(2x-1)-3(x+2)>6$.",
          "$\\Leftrightarrow 4x-2-3x-6>6\\Leftrightarrow x-8>6\\Leftrightarrow x>14$.",
          "T\u1EADp nghi\u1EC7m: $S=\\{x\\;|\\;x>14\\}$.",
          "Tr\xEAn tr\u1EE5c s\u1ED1: \u0111\xE1nh d\u1EA5u \u0111i\u1EC3m $14$ b\u1EB1ng d\u1EA5u ngo\u1EB7c **m\u1EDF** (v\xEC $x=14$ kh\xF4ng tho\u1EA3), g\u1EA1ch b\u1ECF ph\u1EA7n b\xEAn tr\xE1i."
        ],
        remark: "D\u1EA5u $>$ hay $<$ d\xF9ng ngo\u1EB7c m\u1EDF; d\u1EA5u $\\ge$ hay $\\le$ m\u1EDBi t\xF4 \u0111\u1EB7c \u0111i\u1EC3m m\xFAt."
      }]
    },
    {
      id: "g9-t4-d4",
      name: "D\u1EA1ng 4. Ch\u1EE9ng minh b\u1EA5t \u0111\u1EB3ng th\u1EE9c b\u1EB1ng t\u1ED5ng b\xECnh ph\u01B0\u01A1ng",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: chuy\u1EC3n to\xE0n b\u1ED9 v\u1EC1 m\u1ED9t v\u1EBF: c\u1EA7n ch\u1EE9ng minh $A-B\\ge0$.",
        "B\u01B0\u1EDBc 2: bi\u1EBFn \u0111\u1ED5i $A-B$ th\xE0nh **t\u1ED5ng c\xE1c b\xECnh ph\u01B0\u01A1ng** (c\xF3 th\u1EC3 ph\u1EA3i nh\xE2n $2$ tr\u01B0\u1EDBc khi nh\xF3m).",
        "B\u01B0\u1EDBc 3: k\u1EBFt lu\u1EADn v\xEC b\xECnh ph\u01B0\u01A1ng lu\xF4n kh\xF4ng \xE2m.",
        "B\u01B0\u1EDBc 4: ch\u1EC9 r\xF5 **\u0111i\u1EC1u ki\u1EC7n d\u1EA5u b\u1EB1ng**."
      ],
      skills: ["Gh\xE9p b\xECnh ph\u01B0\u01A1ng t\u1EEB c\xE1c h\u1EA1ng t\u1EED r\u1EDDi r\u1EA1c", "Nh\u1EADn ra khi n\xE0o c\u1EA7n nh\xE2n h\u1EC7 s\u1ED1"],
      pitfalls: ["Qu\xEAn n\xEAu \u0111i\u1EC1u ki\u1EC7n d\u1EA5u b\u1EB1ng \u2014 m\u1EA5t \u0111i\u1EC3m d\xF9 ch\u1EE9ng minh \u0111\xFAng.", "D\xF9ng C\xF4-si khi \u0111\u1EC1 kh\xF4ng cho \u0111i\u1EC1u ki\u1EC7n c\xE1c bi\u1EBFn d\u01B0\u01A1ng."],
      worked: [{
        prompt: "Ch\u1EE9ng minh r\u1EB1ng v\u1EDBi m\u1ECDi s\u1ED1 th\u1EF1c $x$, $y$ ta c\xF3 $x^{2}+y^{2}+1\\ge xy+x+y$.",
        thinking: [
          "\u0110\u1EC1 kh\xF4ng cho $x$, $y$ d\u01B0\u01A1ng n\xEAn **kh\xF4ng d\xF9ng \u0111\u01B0\u1EE3c C\xF4-si** \u2014 ph\u1EA3i \u0111i b\u1EB1ng t\u1ED5ng b\xECnh ph\u01B0\u01A1ng.",
          "Chuy\u1EC3n h\u1EBFt v\u1EC1 m\u1ED9t v\u1EBF, ta c\u1EA7n ch\u1EE9ng minh $x^{2}+y^{2}+1-xy-x-y\\ge0$.",
          "C\xF3 ba t\xEDch ch\xE9o $xy$, $x$, $y$ \u2014 mu\u1ED1n gh\xE9p th\xE0nh ba b\xECnh ph\u01B0\u01A1ng th\xEC ph\u1EA3i **nh\xE2n $2$** \u0111\u1EC3 m\u1ED7i bi\u1EBFn \u0111\u1EE7 d\xF9ng hai l\u1EA7n."
        ],
        solution: [
          "B\u1EA5t \u0111\u1EB3ng th\u1EE9c t\u01B0\u01A1ng \u0111\u01B0\u01A1ng v\u1EDBi $x^{2}+y^{2}+1-xy-x-y\\ge0$.",
          "Nh\xE2n hai v\u1EBF v\u1EDBi $2>0$: $2x^{2}+2y^{2}+2-2xy-2x-2y\\ge0$.",
          "Nh\xF3m l\u1EA1i: $\\left(x^{2}-2xy+y^{2}\\right)+\\left(x^{2}-2x+1\\right)+\\left(y^{2}-2y+1\\right)\\ge0$",
          "$\\Leftrightarrow (x-y)^{2}+(x-1)^{2}+(y-1)^{2}\\ge0$.",
          "B\u1EA5t \u0111\u1EB3ng th\u1EE9c cu\u1ED1i lu\xF4n \u0111\xFAng v\xEC l\xE0 t\u1ED5ng ba b\xECnh ph\u01B0\u01A1ng.",
          'D\u1EA5u "$=$" x\u1EA3y ra khi $x-y=0$, $x-1=0$ v\xE0 $y-1=0$, t\u1EE9c $x=y=1$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)'
        ],
        remark: "\u0110\u1EBFm s\u1ED1 t\xEDch ch\xE9o \u0111\u1EC3 bi\u1EBFt c\u1EA7n nh\xE2n m\u1EA5y: c\xF3 $3$ t\xEDch ch\xE9o th\xEC nh\xE2n $2$, m\u1ED7i bi\u1EBFn b\xECnh ph\u01B0\u01A1ng s\u1EBD \u0111\u1EE7 chia cho hai nh\xF3m."
      }]
    }
  ],
  "g9-t5": [
    {
      id: "g9-t5-d5",
      name: "D\u1EA1ng 5. Gi\u1EA3i tam gi\xE1c vu\xF4ng",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: v\u1EBD h\xECnh, ghi r\xF5 c\u1EA1nh huy\u1EC1n v\xE0 hai c\u1EA1nh g\xF3c vu\xF4ng.",
        "B\u01B0\u1EDBc 2: v\u1EDBi m\u1ED7i g\xF3c nh\u1ECDn, x\xE1c \u0111\u1ECBnh \u0111\xE2u l\xE0 c\u1EA1nh **\u0111\u1ED1i**, \u0111\xE2u l\xE0 c\u1EA1nh **k\u1EC1**.",
        "B\u01B0\u1EDBc 3: ch\u1ECDn t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c n\u1ED1i **\u0111\u1EA1i l\u01B0\u1EE3ng \u0111\xE3 bi\u1EBFt** v\u1EDBi **\u0111\u1EA1i l\u01B0\u1EE3ng c\u1EA7n t\xECm**.",
        "B\u01B0\u1EDBc 4: n\u1EBFu bi\u1EBFt hai c\u1EA1nh, d\xF9ng Pythagore s\u1EBD nhanh h\u01A1n t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c."
      ],
      skills: ["Ch\u1ECDn \u0111\xFAng t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c", "K\u1EBFt h\u1EE3p Pythagore v\u1EDBi t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c"],
      pitfalls: ["Nh\u1EA7m c\u1EA1nh \u0111\u1ED1i v\u1EDBi c\u1EA1nh k\u1EC1 khi \u0111\u1ED5i g\xF3c tham chi\u1EBFu.", "D\xF9ng $\\sin$ v\u1EDBi c\u1EA1nh g\xF3c vu\xF4ng thay v\xEC c\u1EA1nh huy\u1EC1n."],
      worked: [{
        prompt: "Cho tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$, bi\u1EBFt $AB=6$ cm v\xE0 $\\angle B=60\\deg$. T\xEDnh $AC$ v\xE0 $BC$.",
        thinking: [
          "X\xE9t theo g\xF3c $B$: c\u1EA1nh $AB$ l\xE0 c\u1EA1nh **k\u1EC1**, c\u1EA1nh $AC$ l\xE0 c\u1EA1nh **\u0111\u1ED1i**, c\u1EA1nh $BC$ l\xE0 c\u1EA1nh **huy\u1EC1n**.",
          "Mu\u1ED1n t\xECm $AC$ (\u0111\u1ED1i) t\u1EEB $AB$ (k\u1EC1) \u2192 d\xF9ng $\\tan$ v\xEC $\\tan=\\f{\\text{\u0111\u1ED1i}}{\\text{k\u1EC1}}$.",
          "Mu\u1ED1n t\xECm $BC$ (huy\u1EC1n) t\u1EEB $AB$ (k\u1EC1) \u2192 d\xF9ng $\\cos$ v\xEC $\\cos=\\f{\\text{k\u1EC1}}{\\text{huy\u1EC1n}}$."
        ],
        solution: [
          "X\xE9t tam gi\xE1c $ABC$ vu\xF4ng t\u1EA1i $A$ v\u1EDBi g\xF3c nh\u1ECDn $B=60\\deg$:",
          "$\\tan B=\\f{AC}{AB}\\Rightarrow AC=AB\\cdot\\tan60\\deg=6\\s{3}$ (cm) $\\approx10{,}39$ cm.",
          "$\\cos B=\\f{AB}{BC}\\Rightarrow BC=\\f{AB}{\\cos60\\deg}=\\f{6}{\\f{1}{2}}=12$ (cm).",
          "Ki\u1EC3m tra b\u1EB1ng Pythagore: $AB^{2}+AC^{2}=36+108=144=12^{2}=BC^{2}$ \u2713"
        ],
        remark: "Lu\xF4n ki\u1EC3m tra ch\xE9o b\u1EB1ng Pythagore \u1EDF cu\u1ED1i \u2014 b\u01B0\u1EDBc n\xE0y b\u1EAFt \u0111\u01B0\u1EE3c m\u1ECDi l\u1ED7i ch\u1ECDn nh\u1EA7m t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c."
      }]
    },
    {
      id: "g9-t5-d6",
      name: "D\u1EA1ng 6. \u1EE8ng d\u1EE5ng th\u1EF1c t\u1EBF c\u1EE7a t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: v\u1EBD m\xF4 h\xECnh tam gi\xE1c vu\xF4ng t\u1EEB t\xECnh hu\u1ED1ng th\u1EF1c t\u1EBF.",
        "B\u01B0\u1EDBc 2: \u0111\xE1nh d\u1EA5u g\xF3c n\xE2ng (nh\xECn l\xEAn) ho\u1EB7c g\xF3c h\u1EA1 (nh\xECn xu\u1ED1ng) \u2014 \u0111\u1EC1u \u0111o so v\u1EDBi **ph\u01B0\u01A1ng ngang**.",
        "B\u01B0\u1EDBc 3: ch\u1ECDn t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c ph\xF9 h\u1EE3p r\u1ED3i t\xEDnh.",
        "B\u01B0\u1EDBc 4: n\u1EBFu \u0111i\u1EC3m quan s\xE1t \u1EDF \u0111\u1ED9 cao n\xE0o \u0111\xF3, nh\u1EDB **c\u1ED9ng th\xEAm** \u0111\u1ED9 cao \u1EA5y v\xE0o k\u1EBFt qu\u1EA3."
      ],
      skills: ["M\xF4 h\xECnh ho\xE1 t\xECnh hu\u1ED1ng th\u1EF1c t\u1EBF", "X\u1EED l\xFD chi\u1EC1u cao c\u1EE7a ng\u01B0\u1EDDi quan s\xE1t"],
      pitfalls: ["Qu\xEAn c\u1ED9ng chi\u1EC1u cao m\u1EAFt ng\u01B0\u1EDDi quan s\xE1t.", "Nh\u1EA7m g\xF3c n\xE2ng v\u1EDBi g\xF3c \u1EDF \u0111\u1EC9nh c\u1EE7a tam gi\xE1c."],
      worked: [{
        prompt: "M\u1ED9t ng\u01B0\u1EDDi \u0111\u1EE9ng c\xE1ch ch\xE2n c\u1ED9t c\u1EDD $20$ m, nh\xECn \u0111\u1EC9nh c\u1ED9t c\u1EDD d\u01B0\u1EDBi g\xF3c n\xE2ng $35\\deg$. Bi\u1EBFt kho\u1EA3ng c\xE1ch t\u1EEB m\u1EAFt ng\u01B0\u1EDDi \u0111\xF3 t\u1EDBi m\u1EB7t \u0111\u1EA5t l\xE0 $1{,}6$ m. T\xEDnh chi\u1EC1u cao c\u1ED9t c\u1EDD (l\xE0m tr\xF2n \u0111\u1EBFn ch\u1EEF s\u1ED1 th\u1EADp ph\xE2n th\u1EE9 nh\u1EA5t).",
        thinking: [
          "V\u1EBD tam gi\xE1c vu\xF4ng c\xF3 \u0111\u1EC9nh l\xE0 m\u1EAFt ng\u01B0\u1EDDi, c\u1EA1nh ngang $20$ m, g\xF3c n\xE2ng $35\\deg$.",
          "Tam gi\xE1c n\xE0y ch\u1EC9 cho ph\u1EA7n c\u1ED9t c\u1EDD **cao h\u01A1n t\u1EA7m m\u1EAFt**, ch\u1EE9 kh\xF4ng ph\u1EA3i to\xE0n b\u1ED9 c\u1ED9t c\u1EDD.",
          "V\u1EADy k\u1EBFt qu\u1EA3 cu\u1ED1i ph\u1EA3i **c\u1ED9ng th\xEAm** $1{,}6$ m chi\u1EC1u cao m\u1EAFt."
        ],
        solution: [
          "G\u1ECDi $h$ l\xE0 ph\u1EA7n c\u1ED9t c\u1EDD cao h\u01A1n t\u1EA7m m\u1EAFt ng\u01B0\u1EDDi quan s\xE1t.",
          "Trong tam gi\xE1c vu\xF4ng c\xF3 c\u1EA1nh k\u1EC1 $20$ m v\xE0 g\xF3c $35\\deg$: $\\tan35\\deg=\\f{h}{20}$.",
          "$h=20\\cdot\\tan35\\deg\\approx20\\times0{,}7002\\approx14{,}0$ (m).",
          "Chi\u1EC1u cao c\u1ED9t c\u1EDD $=h+1{,}6\\approx14{,}0+1{,}6=15{,}6$ (m)."
        ],
        remark: "Qu\xEAn c\u1ED9ng chi\u1EC1u cao m\u1EAFt l\xE0 l\u1ED7i ph\u1ED5 bi\u1EBFn nh\u1EA5t c\u1EE7a d\u1EA1ng th\u1EF1c t\u1EBF n\xE0y \u2014 h\xE3y v\u1EBD h\xECnh c\xF3 ghi r\xF5 m\u1EF1c m\u1EAFt."
      }]
    }
  ],
  "g9-t7": [
    {
      id: "g9-t7-d5",
      name: "D\u1EA1ng 5. H\xECnh c\u1EA7u v\xE0 m\u1EB7t c\u1EA7u",
      level: "TH",
      method: [
        "Di\u1EC7n t\xEDch m\u1EB7t c\u1EA7u: $S=4\\pi R^{2}$.",
        "Th\u1EC3 t\xEDch h\xECnh c\u1EA7u: $V=\\f{4}{3}\\pi R^{3}$.",
        "\u0110\u1EC1 cho **\u0111\u01B0\u1EDDng k\xEDnh** th\xEC ph\u1EA3i chia \u0111\xF4i \u0111\u1EC3 l\u1EA5y b\xE1n k\xEDnh tr\u01B0\u1EDBc khi thay v\xE0o c\xF4ng th\u1EE9c."
      ],
      skills: ["Ph\xE2n bi\u1EC7t di\u1EC7n t\xEDch m\u1EB7t c\u1EA7u v\u1EDBi th\u1EC3 t\xEDch h\xECnh c\u1EA7u", "Chuy\u1EC3n \u0111\u1ED5i \u0111\u01B0\u1EDDng k\xEDnh \u2014 b\xE1n k\xEDnh"],
      pitfalls: ["Nh\u1EA7m $4\\pi R^{2}$ (di\u1EC7n t\xEDch) v\u1EDBi $\\f{4}{3}\\pi R^{3}$ (th\u1EC3 t\xEDch).", "Thay th\u1EB3ng \u0111\u01B0\u1EDDng k\xEDnh v\xE0o c\xF4ng th\u1EE9c."],
      worked: [{
        prompt: "M\u1ED9t qu\u1EA3 b\xF3ng c\xF3 d\u1EA1ng h\xECnh c\u1EA7u v\u1EDBi \u0111\u01B0\u1EDDng k\xEDnh $22$ cm. T\xEDnh di\u1EC7n t\xEDch m\u1EB7t ngo\xE0i v\xE0 th\u1EC3 t\xEDch c\u1EE7a qu\u1EA3 b\xF3ng (l\u1EA5y $\\pi\\approx3{,}14$, l\xE0m tr\xF2n \u0111\u1EBFn h\xE0ng \u0111\u01A1n v\u1ECB).",
        thinking: [
          "\u0110\u1EC1 cho **\u0111\u01B0\u1EDDng k\xEDnh** $22$ cm n\xEAn b\xE1n k\xEDnh l\xE0 $R=11$ cm \u2014 b\u01B0\u1EDBc n\xE0y b\u1ECF qua l\xE0 sai to\xE0n b\xE0i.",
          '"Di\u1EC7n t\xEDch m\u1EB7t ngo\xE0i" ch\xEDnh l\xE0 di\u1EC7n t\xEDch m\u1EB7t c\u1EA7u, d\xF9ng $S=4\\pi R^{2}$.',
          "Th\u1EC3 t\xEDch d\xF9ng c\xF4ng th\u1EE9c c\xF3 $R^{3}$ v\xE0 h\u1EC7 s\u1ED1 $\\f{4}{3}$."
        ],
        solution: [
          "B\xE1n k\xEDnh qu\u1EA3 b\xF3ng: $R=\\f{22}{2}=11$ (cm).",
          "Di\u1EC7n t\xEDch m\u1EB7t c\u1EA7u: $S=4\\pi R^{2}\\approx4\\times3{,}14\\times121\\approx1\\,520\\;(cm^{2})$.",
          "Th\u1EC3 t\xEDch h\xECnh c\u1EA7u: $V=\\f{4}{3}\\pi R^{3}\\approx\\f{4}{3}\\times3{,}14\\times1\\,331\\approx5\\,572\\;(cm^{3})$."
        ],
        remark: "M\u1EB9o nh\u1EDB h\u1EC7 s\u1ED1: di\u1EC7n t\xEDch c\xF3 s\u1ED1 m\u0169 $2$ \u0111i v\u1EDBi h\u1EC7 s\u1ED1 $4$; th\u1EC3 t\xEDch c\xF3 s\u1ED1 m\u0169 $3$ \u0111i v\u1EDBi h\u1EC7 s\u1ED1 $\\f{4}{3}$."
      }]
    },
    {
      id: "g9-t7-d3",
      name: "D\u1EA1ng 3. H\xECnh n\xF3n \u2014 quan h\u1EC7 gi\u1EEFa b\xE1n k\xEDnh, chi\u1EC1u cao v\xE0 \u0111\u01B0\u1EDDng sinh",
      level: "VD",
      method: [
        "Ba \u0111\u1EA1i l\u01B0\u1EE3ng $r$, $h$, $l$ t\u1EA1o th\xE0nh tam gi\xE1c vu\xF4ng: $l^{2}=r^{2}+h^{2}$.",
        "$S_{xq}=\\pi rl$ (d\xF9ng **\u0111\u01B0\u1EDDng sinh**), $S_{tp}=\\pi rl+\\pi r^{2}$.",
        "$V=\\f{1}{3}\\pi r^{2}h$ (d\xF9ng **chi\u1EC1u cao**).",
        "Quay tam gi\xE1c vu\xF4ng quanh m\u1ED9t c\u1EA1nh g\xF3c vu\xF4ng: c\u1EA1nh quay l\xE0 $h$, c\u1EA1nh kia l\xE0 $r$, c\u1EA1nh huy\u1EC1n l\xE0 $l$."
      ],
      skills: ["Chuy\u1EC3n \u0111\u1ED5i gi\u1EEFa $r$, $h$, $l$ b\u1EB1ng Pythagore", "Ph\xE2n bi\u1EC7t c\xF4ng th\u1EE9c di\u1EC7n t\xEDch v\xE0 th\u1EC3 t\xEDch"],
      pitfalls: ["D\xF9ng $h$ thay cho $l$ trong c\xF4ng th\u1EE9c $S_{xq}$.", "Qu\xEAn h\u1EC7 s\u1ED1 $\\f{1}{3}$ \u1EDF th\u1EC3 t\xEDch h\xECnh n\xF3n."],
      worked: [{
        prompt: "M\u1ED9t h\xECnh n\xF3n c\xF3 b\xE1n k\xEDnh \u0111\xE1y $r=6$ cm v\xE0 chi\u1EC1u cao $h=8$ cm. T\xEDnh di\u1EC7n t\xEDch xung quanh v\xE0 th\u1EC3 t\xEDch c\u1EE7a h\xECnh n\xF3n \u0111\xF3.",
        thinking: [
          "Di\u1EC7n t\xEDch xung quanh c\u1EA7n **\u0111\u01B0\u1EDDng sinh** $l$, m\xE0 \u0111\u1EC1 ch\u1EC9 cho $r$ v\xE0 $h$ \u2192 ph\u1EA3i t\xEDnh $l$ tr\u01B0\u1EDBc b\u1EB1ng Pythagore.",
          "$r=6$, $h=8$ g\u1EE3i ngay b\u1ED9 ba $(6;8;10)$ n\xEAn $l=10$.",
          "Th\u1EC3 t\xEDch th\xEC d\xF9ng th\u1EB3ng $h$, kh\xF4ng c\u1EA7n $l$."
        ],
        solution: [
          "\u0110\u01B0\u1EDDng sinh: $l=\\s{r^{2}+h^{2}}=\\s{6^{2}+8^{2}}=\\s{100}=10$ (cm).",
          "Di\u1EC7n t\xEDch xung quanh: $S_{xq}=\\pi rl=\\pi\\cdot6\\cdot10=60\\pi\\;(cm^{2})\\approx188{,}5\\;cm^{2}$.",
          "Th\u1EC3 t\xEDch: $V=\\f{1}{3}\\pi r^{2}h=\\f{1}{3}\\pi\\cdot36\\cdot8=96\\pi\\;(cm^{3})\\approx301{,}6\\;cm^{3}$."
        ],
        remark: 'M\u1EB9o nh\u1EDB: di\u1EC7n t\xEDch **xung quanh** th\xEC "\u0111i v\xF2ng theo m\u1EB7t b\xEAn" n\xEAn d\xF9ng \u0111\u01B0\u1EDDng sinh; th\u1EC3 t\xEDch th\xEC "\u0111o b\u1EC1 d\xE0y" n\xEAn d\xF9ng chi\u1EC1u cao.'
      }]
    },
    {
      id: "g9-t7-d4",
      name: "D\u1EA1ng 4. B\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EDBi kh\u1ED1i tr\xF2n xoay",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: nh\u1EADn d\u1EA1ng kh\u1ED1i \u2014 tr\u1EE5, n\xF3n, c\u1EA7u, hay kh\u1ED1i gh\xE9p.",
        "B\u01B0\u1EDBc 2: v\u1EDBi kh\u1ED1i gh\xE9p, t\xE1ch th\xE0nh c\xE1c kh\u1ED1i c\u01A1 b\u1EA3n r\u1ED3i **c\u1ED9ng** (gh\xE9p v\xE0o) ho\u1EB7c **tr\u1EEB** (kho\xE9t \u0111i).",
        "B\u01B0\u1EDBc 3: th\u1ED1ng nh\u1EA5t \u0111\u01A1n v\u1ECB, nh\u1EDB $1\\;dm^{3}=1$ l\xEDt."
      ],
      skills: ["Nh\u1EADn d\u1EA1ng kh\u1ED1i t\u1EEB m\xF4 t\u1EA3 th\u1EF1c t\u1EBF", "C\u1ED9ng tr\u1EEB th\u1EC3 t\xEDch kh\u1ED1i gh\xE9p"],
      pitfalls: ["Nh\u1EA7m b\xE1n k\xEDnh v\u1EDBi \u0111\u01B0\u1EDDng k\xEDnh (\u0111\u1EC1 th\u01B0\u1EDDng cho \u0111\u01B0\u1EDDng k\xEDnh).", "Qu\xEAn \u0111\u1ED5i \u0111\u01A1n v\u1ECB sang l\xEDt."],
      worked: [{
        prompt: "M\u1ED9t b\u1ED3n ch\u1EE9a n\u01B0\u1EDBc c\xF3 d\u1EA1ng h\xECnh tr\u1EE5 v\u1EDBi \u0111\u01B0\u1EDDng k\xEDnh \u0111\xE1y $1{,}2$ m v\xE0 chi\u1EC1u cao $1{,}5$ m. H\u1ECFi b\u1ED3n ch\u1EE9a \u0111\u01B0\u1EE3c t\u1ED1i \u0111a bao nhi\xEAu l\xEDt n\u01B0\u1EDBc? (L\u1EA5y $\\pi\\approx3{,}14$, l\xE0m tr\xF2n \u0111\u1EBFn h\xE0ng \u0111\u01A1n v\u1ECB.)",
        thinking: [
          "\u0110\u1EC1 cho **\u0111\u01B0\u1EDDng k\xEDnh** $1{,}2$ m, m\xE0 c\xF4ng th\u1EE9c c\u1EA7n **b\xE1n k\xEDnh** \u2192 ph\u1EA3i chia \u0111\xF4i tr\u01B0\u1EDBc.",
          "T\xEDnh th\u1EC3 t\xEDch ra $m^{3}$, r\u1ED3i \u0111\u1ED5i sang l\xEDt v\u1EDBi $1\\;m^{3}=1000$ l\xEDt.",
          "\u0110\xE2y l\xE0 hai b\u1EABy \u0111\u01B0\u1EE3c c\xE0i li\xEAn ti\u1EBFp trong c\xF9ng m\u1ED9t c\xE2u."
        ],
        solution: [
          "B\xE1n k\xEDnh \u0111\xE1y: $r=\\f{1{,}2}{2}=0{,}6$ (m).",
          "Th\u1EC3 t\xEDch b\u1ED3n: $V=\\pi r^{2}h\\approx3{,}14\\times0{,}6^{2}\\times1{,}5=3{,}14\\times0{,}36\\times1{,}5\\approx1{,}6956\\;(m^{3})$.",
          "\u0110\u1ED5i sang l\xEDt: $1{,}6956\\;m^{3}\\approx1\\,695{,}6$ l\xEDt $\\approx1\\,696$ l\xEDt.",
          "V\u1EADy b\u1ED3n ch\u1EE9a \u0111\u01B0\u1EE3c t\u1ED1i \u0111a kho\u1EA3ng $1\\,696$ l\xEDt n\u01B0\u1EDBc."
        ],
        remark: 'G\u1EA1ch ch\xE2n ngay ch\u1EEF "\u0111\u01B0\u1EDDng k\xEDnh" khi \u0111\u1ECDc \u0111\u1EC1 \u2014 \u0111\xE2y l\xE0 b\u1EABy xu\u1EA5t hi\u1EC7n \u1EDF h\u01A1n m\u1ED9t n\u1EEDa s\u1ED1 b\xE0i th\u1EF1c t\u1EBF v\u1EC1 h\xECnh tr\u1EE5.'
      }]
    }
  ],
  "g9-t8": [
    {
      id: "g9-t8-d5",
      name: "D\u1EA1ng 5. T\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i v\xE0 bi\u1EC3u \u0111\u1ED3",
      level: "TH",
      method: [
        "T\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i c\u1EE7a m\u1ED9t gi\xE1 tr\u1ECB $=\\f{\\text{t\u1EA7n s\u1ED1}}{N}\\times100\\%$.",
        "T\u1ED5ng t\u1EA5t c\u1EA3 t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i lu\xF4n b\u1EB1ng $100\\%$ \u2014 d\xF9ng \u0111\u1EC3 ki\u1EC3m tra l\u1EA1i.",
        "Bi\u1EC3u \u0111\u1ED3 qu\u1EA1t tr\xF2n: g\xF3c \u1EDF t\xE2m $=$ t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i $\\times360\\deg$."
      ],
      skills: ["L\u1EADp b\u1EA3ng t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i", "Ki\u1EC3m tra ch\xE9o b\u1EB1ng t\u1ED5ng"],
      pitfalls: ["Chia cho t\u1EA7n s\u1ED1 c\u1EE7a m\u1ED9t nh\xF3m thay v\xEC t\u1ED5ng $N$.", "Qu\xEAn nh\xE2n $100\\%$ khi \u0111\u1EC1 h\u1ECFi ph\u1EA7n tr\u0103m."],
      worked: [{
        prompt: "Kh\u1EA3o s\xE1t m\xF4n th\u1EC3 thao y\xEAu th\xEDch c\u1EE7a $200$ h\u1ECDc sinh: B\xF3ng \u0111\xE1 $80$ em, C\u1EA7u l\xF4ng $50$ em, B\u01A1i l\u1ED9i $40$ em, m\xF4n kh\xE1c $30$ em. L\u1EADp b\u1EA3ng t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i v\xE0 t\xEDnh g\xF3c \u1EDF t\xE2m c\u1EE7a h\xECnh qu\u1EA1t bi\u1EC3u di\u1EC5n C\u1EA7u l\xF4ng.",
        thinking: [
          "T\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i c\u1EE7a m\u1ED7i m\xF4n l\u1EA5y t\u1EA7n s\u1ED1 chia cho t\u1ED5ng $N=200$ r\u1ED3i nh\xE2n $100\\%$.",
          "G\xF3c \u1EDF t\xE2m th\xEC nh\xE2n t\u1EC9 l\u1EC7 v\u1EDBi $360\\deg$ ch\u1EE9 kh\xF4ng ph\u1EA3i $100$.",
          "Cu\u1ED1i c\xF9ng c\u1ED9ng l\u1EA1i \u0111\u1EC3 ki\u1EC3m tra: t\u1ED5ng ph\u1EA7n tr\u0103m ph\u1EA3i b\u1EB1ng $100\\%$."
        ],
        solution: [
          "B\xF3ng \u0111\xE1: $\\f{80}{200}=40\\%$ \xB7 C\u1EA7u l\xF4ng: $\\f{50}{200}=25\\%$ \xB7 B\u01A1i l\u1ED9i: $\\f{40}{200}=20\\%$ \xB7 Kh\xE1c: $\\f{30}{200}=15\\%$.",
          "Ki\u1EC3m tra: $40\\%+25\\%+20\\%+15\\%=100\\%$ \u2713",
          "G\xF3c \u1EDF t\xE2m c\u1EE7a C\u1EA7u l\xF4ng: $\\f{50}{200}\\times360\\deg=25\\%\\times360\\deg=90\\deg$."
        ],
        remark: "T\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i cho ph\xE9p so s\xE1nh gi\u1EEFa hai b\u1ED9 d\u1EEF li\u1EC7u c\xF3 c\u1EE1 kh\xE1c nhau \u2014 \u0111i\u1EC1u m\xE0 t\u1EA7n s\u1ED1 th\xF4 kh\xF4ng l\xE0m \u0111\u01B0\u1EE3c."
      }]
    },
    {
      id: "g9-t8-d3",
      name: "D\u1EA1ng 3. B\u1EA3ng t\u1EA7n s\u1ED1 gh\xE9p nh\xF3m",
      level: "TH",
      method: [
        "B\u01B0\u1EDBc 1: x\xE1c \u0111\u1ECBnh **gi\xE1 tr\u1ECB \u0111\u1EA1i di\u1EC7n** c\u1EE7a m\u1ED7i nh\xF3m \u2014 ch\xEDnh l\xE0 trung \u0111i\u1EC3m c\u1EE7a nh\xF3m \u0111\xF3.",
        "B\u01B0\u1EDBc 2: t\xEDnh nh\u01B0 b\u1EA3ng t\u1EA7n s\u1ED1 th\u01B0\u1EDDng, d\xF9ng gi\xE1 tr\u1ECB \u0111\u1EA1i di\u1EC7n thay cho s\u1ED1 li\u1EC7u g\u1ED1c.",
        "B\u01B0\u1EDBc 3: t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i $=\\f{\\text{t\u1EA7n s\u1ED1}}{N}\\times100\\%$."
      ],
      skills: ["T\xEDnh gi\xE1 tr\u1ECB \u0111\u1EA1i di\u1EC7n c\u1EE7a nh\xF3m", "T\xEDnh s\u1ED1 trung b\xECnh t\u1EEB b\u1EA3ng gh\xE9p nh\xF3m"],
      pitfalls: ["L\u1EA5y \u0111\u1EA7u m\xFAt nh\xF3m thay v\xEC trung \u0111i\u1EC3m.", "Qu\xEAn nh\xE2n t\u1EA7n s\u1ED1 khi t\xEDnh trung b\xECnh."],
      worked: [{
        prompt: "\u0110i\u1EC3m ki\u1EC3m tra c\u1EE7a $40$ h\u1ECDc sinh \u0111\u01B0\u1EE3c gh\xE9p nh\xF3m: $[0;4)$ c\xF3 $4$ em, $[4;6)$ c\xF3 $10$ em, $[6;8)$ c\xF3 $18$ em, $[8;10]$ c\xF3 $8$ em. T\xEDnh \u0111i\u1EC3m trung b\xECnh c\u1EE7a l\u1EDBp (l\xE0m tr\xF2n \u0111\u1EBFn ch\u1EEF s\u1ED1 th\u1EADp ph\xE2n th\u1EE9 hai).",
        thinking: [
          "Gh\xE9p nh\xF3m l\xE0m m\u1EA5t s\u1ED1 li\u1EC7u g\u1ED1c, n\xEAn ph\u1EA3i thay m\u1ED7i nh\xF3m b\u1EB1ng **trung \u0111i\u1EC3m** c\u1EE7a n\xF3.",
          "Trung \u0111i\u1EC3m c\xE1c nh\xF3m l\u1EA7n l\u01B0\u1EE3t l\xE0 $2$, $5$, $7$, $9$.",
          "Trung b\xECnh $=\\f{\\text{t\u1ED5ng c\u1EE7a (\u0111\u1EA1i di\u1EC7n} \\times \\text{t\u1EA7n s\u1ED1)}}{N}$."
        ],
        solution: [
          "Gi\xE1 tr\u1ECB \u0111\u1EA1i di\u1EC7n c\xE1c nh\xF3m: $[0;4)\\to2$ \xB7 $[4;6)\\to5$ \xB7 $[6;8)\\to7$ \xB7 $[8;10]\\to9$.",
          "T\u1ED5ng \u0111i\u1EC3m \u01B0\u1EDBc l\u01B0\u1EE3ng: $2\\times4+5\\times10+7\\times18+9\\times8=8+50+126+72=256$.",
          "\u0110i\u1EC3m trung b\xECnh: $\\f{256}{40}=6{,}4$.",
          "V\u1EADy \u0111i\u1EC3m trung b\xECnh c\u1EE7a l\u1EDBp kho\u1EA3ng $6{,}40$."
        ],
        remark: "K\u1EBFt qu\u1EA3 ch\u1EC9 l\xE0 **\u01B0\u1EDBc l\u01B0\u1EE3ng** v\xEC \u0111\xE3 thay s\u1ED1 li\u1EC7u th\u1EADt b\u1EB1ng \u0111\u1EA1i di\u1EC7n \u2014 \u0111\u1EC1 th\u01B0\u1EDDng y\xEAu c\u1EA7u ghi r\xF5 \u0111i\u1EC1u n\xE0y."
      }]
    },
    {
      id: "g9-t8-d4",
      name: "D\u1EA1ng 4. X\xE1c su\u1EA5t c\u1EE7a ph\xE9p th\u1EED hai giai \u0111o\u1EA1n",
      level: "VD",
      method: [
        "B\u01B0\u1EDBc 1: l\u1EADp **s\u01A1 \u0111\u1ED3 h\xECnh c\xE2y** ho\u1EB7c b\u1EA3ng \u0111\u1EC3 li\u1EC7t k\xEA \u0111\u1EE7 kh\xF4ng gian m\u1EABu.",
        "B\u01B0\u1EDBc 2: \u0111\u1EBFm s\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i.",
        'B\u01B0\u1EDBc 3: v\u1EDBi bi\u1EBFn c\u1ED1 "\xEDt nh\u1EA5t m\u1ED9t...", t\xEDnh qua **bi\u1EBFn c\u1ED1 \u0111\u1ED1i** r\u1ED3i l\u1EA5y $1$ tr\u1EEB \u0111i.',
        "L\u01B0u \xFD: ch\u1ECDn **kh\xF4ng ho\xE0n l\u1EA1i** th\xEC t\u1ED5ng s\u1ED1 gi\u1EA3m d\u1EA7n qua t\u1EEBng giai \u0111o\u1EA1n."
      ],
      skills: ["V\u1EBD s\u01A1 \u0111\u1ED3 c\xE2y", "D\xF9ng bi\u1EBFn c\u1ED1 \u0111\u1ED1i"],
      pitfalls: ["Li\u1EC7t k\xEA s\xF3t tr\u01B0\u1EDDng h\u1EE3p khi \u0111\u1EBFm nh\u1EA9m.", "Qu\xEAn r\u1EB1ng kh\xF4ng gian m\u1EABu thay \u0111\u1ED5i khi kh\xF4ng ho\xE0n l\u1EA1i."],
      worked: [{
        prompt: 'Tung m\u1ED9t \u0111\u1ED3ng xu c\xE2n \u0111\u1ED1i hai l\u1EA7n. T\xEDnh x\xE1c su\u1EA5t c\u1EE7a bi\u1EBFn c\u1ED1 $A$: "C\xF3 \xEDt nh\u1EA5t m\u1ED9t l\u1EA7n xu\u1EA5t hi\u1EC7n m\u1EB7t ng\u1EEDa".',
        thinking: [
          "M\u1ED7i l\u1EA7n tung c\xF3 $2$ k\u1EBFt qu\u1EA3, tung hai l\u1EA7n cho $2\\times2=4$ k\u1EBFt qu\u1EA3 \u0111\u1ED3ng kh\u1EA3 n\u0103ng.",
          '"\xCDt nh\u1EA5t m\u1ED9t l\u1EA7n ng\u1EEDa" g\u1ED3m nhi\u1EC1u tr\u01B0\u1EDDng h\u1EE3p \u2014 \u0111\u1EBFm bi\u1EBFn c\u1ED1 **\u0111\u1ED1i** s\u1EBD nhanh h\u01A1n.',
          'Bi\u1EBFn c\u1ED1 \u0111\u1ED1i l\xE0 "kh\xF4ng c\xF3 l\u1EA7n n\xE0o ng\u1EEDa", t\u1EE9c c\u1EA3 hai l\u1EA7n \u0111\u1EC1u s\u1EA5p \u2014 ch\u1EC9 \u0111\xFAng **m\u1ED9t** tr\u01B0\u1EDDng h\u1EE3p.'
        ],
        solution: [
          "K\xFD hi\u1EC7u $N$ l\xE0 m\u1EB7t ng\u1EEDa, $S$ l\xE0 m\u1EB7t s\u1EA5p. Kh\xF4ng gian m\u1EABu: $\\{NN;\\;NS;\\;SN;\\;SS\\}$ \u2014 c\xF3 $4$ k\u1EBFt qu\u1EA3 \u0111\u1ED3ng kh\u1EA3 n\u0103ng.",
          'Bi\u1EBFn c\u1ED1 \u0111\u1ED1i $\\ov{A}$: "kh\xF4ng l\u1EA7n n\xE0o xu\u1EA5t hi\u1EC7n m\u1EB7t ng\u1EEDa", t\u1EE9c k\u1EBFt qu\u1EA3 $SS$ \u2014 c\xF3 $1$ k\u1EBFt qu\u1EA3.',
          "$P(\\ov{A})=\\f{1}{4}$.",
          "$P(A)=1-P(\\ov{A})=1-\\f{1}{4}=\\f{3}{4}$."
        ],
        remark: 'H\u1EC5 th\u1EA5y "\xEDt nh\u1EA5t m\u1ED9t" l\xE0 ngh\u0129 ngay t\u1EDBi bi\u1EBFn c\u1ED1 \u0111\u1ED1i \u2014 th\u01B0\u1EDDng ch\u1EC9 c\xF3 \u0111\xFAng m\u1ED9t tr\u01B0\u1EDDng h\u1EE3p, \u0111\u1EBFm c\u1EF1c nhanh.'
      }]
    }
  ]
};

// src/content/skills.ts
var EXTRA_SKILLS = {
  /* --- Bổ sung cho các chuyên đề chưa có bộ kỹ năng luyện bài --- */
  "g6-t7": [
    {
      title: 'K\u1EF9 n\u0103ng "v\u1EBD h\xECnh theo l\u1EDDi \u2014 \u0111\u1ECDc l\u1EDDi t\u1EEB h\xECnh"',
      detail: [
        "B\u01B0\u1EDBc 1: \u0111\u1ECDc \u0111\u1EC1 t\u1EEBng c\xE2u, **v\u1EBD t\u1EDBi \u0111\xE2u ghi k\xFD hi\u1EC7u t\u1EDBi \u0111\xF3** (n\xE9t b\u1EB1ng nhau, g\xF3c vu\xF4ng, s\u1ED1 \u0111o).",
        "B\u01B0\u1EDBc 2: v\u1EBD \u0111\xFAng **th\u1EE9 t\u1EF1 c\xE1c \u0111i\u1EC3m** tr\xEAn tia ho\u1EB7c \u0111\u01B0\u1EDDng th\u1EB3ng \u2014 th\u1EE9 t\u1EF1 sai l\xE0m c\u1ED9ng th\xE0nh tr\u1EEB.",
        "B\u01B0\u1EDBc 3: nh\xECn l\u1EA1i h\xECnh v\xE0 \u0111\u1ECDc ng\u01B0\u1EE3c ra th\xE0nh l\u1EDDi \u0111\u1EC3 ki\u1EC3m tra c\xF3 kh\u1EDBp \u0111\u1EC1 kh\xF4ng.",
        "H\xECnh v\u1EBD \u0111\xFAng \u0111\xE3 l\xE0 n\u1EEDa l\u1EDDi gi\u1EA3i; h\xECnh sai th\xEC m\u1ECDi l\u1EADp lu\u1EADn sau \u0111\xF3 \u0111\u1EC1u v\xF4 ngh\u0129a."
      ]
    },
    {
      title: "K\u1EF9 n\u0103ng chuy\u1EC3n quan h\u1EC7 h\xECnh h\u1ECDc th\xE0nh \u0111\u1EB3ng th\u1EE9c",
      detail: [
        '"$M$ n\u1EB1m gi\u1EEFa $A$ v\xE0 $B$" $Rightarrow AM+MB=AB$.',
        '"$M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $AB$" $Rightarrow MA=MB$ **v\xE0** $MA=\f{AB}{2}$.',
        '"Hai tia $Ox$, $Oy$ \u0111\u1ED1i nhau" $Rightarrow angle xOy=180deg$.',
        '"$Ot$ l\xE0 ph\xE2n gi\xE1c c\u1EE7a $angle xOy$" $Rightarrow angle xOt=angle tOy=\f{1}{2}angle xOy$.',
        "H\u1ECDc thu\u1ED9c b\u1EA3ng chuy\u1EC3n \u0111\u1ED5i n\xE0y th\xEC m\u1ECDi b\xE0i t\xEDnh \u0111\u1ED9 d\xE0i, t\xEDnh g\xF3c \u0111\u1EC1u th\xE0nh ph\u01B0\u01A1ng tr\xECnh \u0111\u01A1n gi\u1EA3n."
      ]
    }
  ],
  "g7-t4": [
    {
      title: 'K\u1EF9 n\u0103ng "g\u1ECDi t\xEAn c\u1EB7p g\xF3c" tr\u01B0\u1EDBc khi t\xEDnh',
      detail: [
        "B\u01B0\u1EDBc 1: x\xE1c \u0111\u1ECBnh r\xF5 **hai \u0111\u01B0\u1EDDng th\u1EB3ng** n\xE0o v\xE0 **c\xE1t tuy\u1EBFn** n\xE0o \u0111ang x\xE9t.",
        "B\u01B0\u1EDBc 2: g\u1ECDi t\xEAn c\u1EB7p g\xF3c: so le trong \xB7 \u0111\u1ED3ng v\u1ECB \xB7 trong c\xF9ng ph\xEDa.",
        "B\u01B0\u1EDBc 3: \xE1p quy t\u1EAFc \u2014 so le trong v\xE0 \u0111\u1ED3ng v\u1ECB th\xEC **b\u1EB1ng nhau**, trong c\xF9ng ph\xEDa th\xEC **b\xF9 nhau**.",
        "G\u1ECDi sai t\xEAn c\u1EB7p g\xF3c l\xE0 nguy\xEAn nh\xE2n c\u1EE7a g\u1EA7n nh\u01B0 m\u1ECDi l\u1ED7i sai \u1EDF chuy\xEAn \u0111\u1EC1 n\xE0y."
      ]
    },
    {
      title: "K\u1EF9 n\u0103ng k\u1EBB \u0111\u01B0\u1EDDng ph\u1EE5",
      detail: [
        'D\u1EA5u hi\u1EC7u c\u1EA7n k\u1EBB: c\xF3 hai \u0111\u01B0\u1EDDng song song v\xE0 m\u1ED9t \u0111i\u1EC3m n\u1EB1m "k\u1EB9p" gi\u1EEFa ch\xFAng.',
        "C\xE1ch k\u1EBB: qua \u0111i\u1EC3m \u0111\xF3 k\u1EBB m\u1ED9t tia **song song** v\u1EDBi hai \u0111\u01B0\u1EDDng \u0111\xE3 cho.",
        "K\u1EBFt qu\u1EA3: g\xF3c l\u1EDBn b\u1ECB t\xE1ch th\xE0nh hai g\xF3c con, m\u1ED7i g\xF3c so le trong v\u1EDBi m\u1ED9t g\xF3c \u0111\xE3 bi\u1EBFt.",
        "Ch\u1EC9 k\u1EBB **m\u1ED9t** \u0111\u01B0\u1EDDng ph\u1EE5 \u2014 k\u1EBB nhi\u1EC1u l\xE0m h\xECnh r\u1ED1i v\xE0 l\u1EADp lu\u1EADn kh\xF3 theo d\xF5i."
      ]
    }
  ],
  "g9-t4": [
    {
      title: "K\u1EF9 n\u0103ng gi\u1EEF \u0111\xFAng chi\u1EC1u b\u1EA5t \u0111\u1EB3ng th\u1EE9c",
      detail: [
        "C\u1ED9ng, tr\u1EEB c\xF9ng m\u1ED9t s\u1ED1 v\xE0o hai v\u1EBF: **gi\u1EEF nguy\xEAn** chi\u1EC1u.",
        "Nh\xE2n, chia hai v\u1EBF cho s\u1ED1 **d\u01B0\u01A1ng**: gi\u1EEF nguy\xEAn chi\u1EC1u.",
        "Nh\xE2n, chia hai v\u1EBF cho s\u1ED1 **\xE2m**: **\u0110\u1ED4I CHI\u1EC0U**.",
        "M\u1EABu ch\u1EE9a \u1EA9n th\xEC ch\u01B0a bi\u1EBFt d\u1EA5u \u2014 kh\xF4ng nh\xE2n ch\xE9o, ph\u1EA3i chuy\u1EC3n v\u1EC1 m\u1ED9t v\u1EBF r\u1ED3i x\xE9t d\u1EA5u.",
        "Th\xF3i quen t\u1ED1t: m\u1ED7i l\u1EA7n nh\xE2n/chia, vi\u1EBFt ngay b\xEAn c\u1EA1nh d\u1EA5u c\u1EE7a s\u1ED1 \u0111\xF3."
      ]
    },
    {
      title: "K\u1EF9 n\u0103ng ba b\u01B0\u1EDBc c\u1EE7a b\xE0i ch\u1EE9ng minh b\u1EA5t \u0111\u1EB3ng th\u1EE9c",
      detail: [
        "B\u01B0\u1EDBc 1: ch\u1EE9ng minh b\u1EA5t \u0111\u1EB3ng th\u1EE9c \u0111\xFAng v\u1EDBi **m\u1ECDi** gi\xE1 tr\u1ECB c\u1EE7a bi\u1EBFn (th\u01B0\u1EDDng b\u1EB1ng t\u1ED5ng b\xECnh ph\u01B0\u01A1ng ho\u1EB7c C\xF4-si).",
        "B\u01B0\u1EDBc 2: ch\u1EC9 ra **gi\xE1 tr\u1ECB c\u1EE5 th\u1EC3** c\u1EE7a bi\u1EBFn l\xE0m d\u1EA5u b\u1EB1ng x\u1EA3y ra.",
        "B\u01B0\u1EDBc 3: k\u1EBFt lu\u1EADn gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t ho\u1EB7c nh\u1ECF nh\u1EA5t.",
        "Thi\u1EBFu b\u01B0\u1EDBc 2 th\xEC ch\u01B0a ch\u1EE9ng minh \u0111\u01B0\u1EE3c \u0111\xF3 l\xE0 c\u1EF1c tr\u1ECB \u2014 m\u1EA5t \u0111i\u1EC3m d\xF9 b\u01B0\u1EDBc 1 ho\xE0n to\xE0n \u0111\xFAng."
      ]
    }
  ],
  "g9-t8": [
    {
      title: "K\u1EF9 n\u0103ng li\u1EC7t k\xEA kh\xF4ng gian m\u1EABu kh\xF4ng s\xF3t",
      detail: [
        "Ph\xE9p th\u1EED m\u1ED9t giai \u0111o\u1EA1n: li\u1EC7t k\xEA theo th\u1EE9 t\u1EF1 t\u0103ng d\u1EA7n ho\u1EB7c theo nh\xF3m.",
        "Ph\xE9p th\u1EED hai giai \u0111o\u1EA1n: d\xF9ng **s\u01A1 \u0111\u1ED3 h\xECnh c\xE2y** ho\u1EB7c **b\u1EA3ng hai chi\u1EC1u** \u2014 \u0111\xE2y l\xE0 c\xE1ch duy nh\u1EA5t b\u1EA3o \u0111\u1EA3m kh\xF4ng s\xF3t.",
        "Ch\u1ECDn **c\xF3 ho\xE0n l\u1EA1i**: t\u1ED5ng s\u1ED1 gi\u1EEF nguy\xEAn qua c\xE1c giai \u0111o\u1EA1n. Ch\u1ECDn **kh\xF4ng ho\xE0n l\u1EA1i**: t\u1ED5ng s\u1ED1 gi\u1EA3m d\u1EA7n.",
        "\u0110\u1EBFm xong lu\xF4n ki\u1EC3m tra: t\u1ED5ng s\u1ED1 k\u1EBFt qu\u1EA3 c\xF3 kh\u1EDBp v\u1EDBi t\xEDch s\u1ED1 kh\u1EA3 n\u0103ng t\u1EEBng giai \u0111o\u1EA1n kh\xF4ng."
      ]
    },
    {
      title: "K\u1EF9 n\u0103ng d\xF9ng bi\u1EBFn c\u1ED1 \u0111\u1ED1i",
      detail: [
        'D\u1EA5u hi\u1EC7u: \u0111\u1EC1 c\xF3 c\u1EE5m "**\xEDt nh\u1EA5t m\u1ED9t**", "**c\xF3 \xEDt nh\u1EA5t**", "**kh\xF4ng ph\u1EA3i t\u1EA5t c\u1EA3**".',
        "C\xE1ch l\xE0m: t\xEDnh $P(ov{A})$ c\u1EE7a bi\u1EBFn c\u1ED1 \u0111\u1ED1i r\u1ED3i l\u1EA5y $P(A)=1-P(ov{A})$.",
        'L\xFD do: bi\u1EBFn c\u1ED1 \u0111\u1ED1i c\u1EE7a "\xEDt nh\u1EA5t m\u1ED9t" l\xE0 "kh\xF4ng c\xF3 c\xE1i n\xE0o" \u2014 th\u01B0\u1EDDng ch\u1EC9 c\xF3 \u0111\xFAng m\u1ED9t tr\u01B0\u1EDDng h\u1EE3p.',
        "\u0110\u1EEBng qu\xEAn b\u01B0\u1EDBc cu\u1ED1i l\u1EA5y $1$ tr\u1EEB \u0111i \u2014 \u0111\xE2y l\xE0 l\u1ED7i hay g\u1EB7p nh\u1EA5t khi d\xF9ng k\u1EF9 thu\u1EADt n\xE0y."
      ]
    }
  ],
  /* ------------------------------ KHỐI 6 ------------------------------ */
  "g6-t3": [
    {
      title: "K\u1EF9 n\u0103ng \u201Ct\xE1ch d\u1EA5u \u2013 t\xE1ch \u0111\u1ED9 l\u1EDBn\u201D khi t\xEDnh v\u1EDBi s\u1ED1 nguy\xEAn",
      detail: [
        "B\u01B0\u1EDBc 1: x\xE1c \u0111\u1ECBnh **d\u1EA5u** c\u1EE7a k\u1EBFt qu\u1EA3 tr\u01B0\u1EDBc (\u0111\u1EBFm s\u1ED1 th\u1EEBa s\u1ED1 \xE2m n\u1EBFu l\xE0 ph\xE9p nh\xE2n).",
        "B\u01B0\u1EDBc 2: t\xEDnh v\u1EDBi c\xE1c **gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i** nh\u01B0 s\u1ED1 t\u1EF1 nhi\xEAn.",
        "B\u01B0\u1EDBc 3: gh\xE9p d\u1EA5u v\xE0o k\u1EBFt qu\u1EA3.",
        "T\xE1ch hai vi\u1EC7c ra l\xE0m gi\u1EA3m h\u01A1n m\u1ED9t n\u1EEDa s\u1ED1 l\u1ED7i sai d\u1EA5u."
      ]
    }
  ],
  "g6-t5": [
    {
      title: "K\u1EF9 n\u0103ng l\xE0m b\xE0i to\xE1n ph\u1EA7n tr\u0103m b\u1EB1ng \u201Ch\u1EC7 s\u1ED1 nh\xE2n\u201D",
      detail: [
        "M\u1ECDi thay \u0111\u1ED5i ph\u1EA7n tr\u0103m \u0111\u1EC1u quy v\u1EC1 m\u1ED9t h\u1EC7 s\u1ED1 nh\xE2n: t\u0103ng $m\\percent\\to(1+\\f{m}{100})$; gi\u1EA3m $m\\percent\\to(1-\\f{m}{100})$.",
        "Nhi\u1EC1u l\u1EA7n thay \u0111\u1ED5i li\xEAn ti\u1EBFp th\xEC **nh\xE2n** c\xE1c h\u1EC7 s\u1ED1, tuy\u1EC7t \u0111\u1ED1i kh\xF4ng c\u1ED9ng ph\u1EA7n tr\u0103m.",
        "Mu\u1ED1n t\xECm gi\xE1 g\u1ED1c t\u1EEB gi\xE1 sau thay \u0111\u1ED5i th\xEC **chia** cho h\u1EC7 s\u1ED1.",
        "Cu\u1ED1i c\xF9ng \u0111\u1ED1i chi\u1EBFu: m\u1EE9c thay \u0111\u1ED5i t\u1ED5ng $=1-$ t\xEDch c\xE1c h\u1EC7 s\u1ED1."
      ]
    }
  ],
  "g6-t8": [
    {
      title: "K\u1EF9 n\u0103ng \u0111\u1ECDc bi\u1EC3u \u0111\u1ED3 trong 30 gi\xE2y",
      detail: [
        "\u0110\u1ECDc **ti\xEAu \u0111\u1EC1** tr\u01B0\u1EDBc \u0111\u1EC3 bi\u1EBFt bi\u1EC3u \u0111\u1ED3 n\xF3i v\u1EC1 c\xE1i g\xEC.",
        "\u0110\u1ECDc **ch\xFA th\xEDch v\xE0 \u0111\u01A1n v\u1ECB** \u2014 v\u1EDBi bi\u1EC3u \u0111\u1ED3 tranh ph\u1EA3i xem m\u1ED7i bi\u1EC3u t\u01B0\u1EE3ng \u1EE9ng v\u1EDBi bao nhi\xEAu.",
        "X\xE1c \u0111\u1ECBnh gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t, nh\u1ECF nh\u1EA5t tr\u01B0\u1EDBc khi t\xEDnh to\xE1n.",
        "N\u1EBFu c\xE2u h\u1ECFi c\xF3 ch\u1EEF \u201Cph\u1EA7n tr\u0103m\u201D th\xEC ph\u1EA3i t\xEDnh t\u1ED5ng tr\u01B0\u1EDBc."
      ]
    }
  ],
  /* ------------------------------ KHỐI 7 ------------------------------ */
  "g7-t3": [
    {
      title: "K\u1EF9 n\u0103ng c\u1ED9ng \u2013 tr\u1EEB \u0111a th\u1EE9c theo c\u1ED9t",
      detail: [
        "Thu g\u1ECDn v\xE0 s\u1EAFp x\u1EBFp c\u1EA3 hai \u0111a th\u1EE9c theo l\u0169y th\u1EEBa **gi\u1EA3m d\u1EA7n** c\u1EE7a bi\u1EBFn.",
        "Vi\u1EBFt hai \u0111a th\u1EE9c th\u1EB3ng c\u1ED9t theo b\u1EADc; b\u1EADc n\xE0o khuy\u1EBFt th\xEC \u0111\u1EC3 tr\u1ED1ng (ho\u1EB7c vi\u1EBFt $0x^{k}$).",
        "C\u1ED9ng/tr\u1EEB theo t\u1EEBng c\u1ED9t \u2014 c\xE1ch n\xE0y g\u1EA7n nh\u01B0 lo\u1EA1i b\u1ECF ho\xE0n to\xE0n l\u1ED7i s\xF3t h\u1EA1ng t\u1EED.",
        "V\u1EDBi ph\xE9p tr\u1EEB: \u0111\u1ED5i d\u1EA5u **to\xE0n b\u1ED9** \u0111a th\u1EE9c tr\u1EEB r\u1ED3i m\u1EDBi c\u1ED9ng."
      ]
    },
    {
      title: "K\u1EF9 n\u0103ng ki\u1EC3m tra k\u1EBFt qu\u1EA3 b\u1EB1ng gi\xE1 tr\u1ECB \u0111\u1EB7c bi\u1EC7t",
      detail: [
        "Sau khi t\xEDnh $P(x)\\pm Q(x)$, ch\u1ECDn m\u1ED9t gi\xE1 tr\u1ECB d\u1EC5 nh\u01B0 $x=1$.",
        "T\xEDnh $P(1)$, $Q(1)$ v\xE0 gi\xE1 tr\u1ECB c\u1EE7a k\u1EBFt qu\u1EA3 t\u1EA1i $x=1$.",
        "N\u1EBFu ba s\u1ED1 kh\xF4ng kh\u1EDBp th\xEC ch\u1EAFc ch\u1EAFn c\xF3 l\u1ED7i \u2014 ki\u1EC3m tra l\u1EA1i ngay.",
        "M\u1EB9o n\xE0y t\u1ED1n 20 gi\xE2y nh\u01B0ng c\u1EE9u \u0111\u01B0\u1EE3c c\u1EA3 c\xE2u."
      ]
    }
  ],
  "g7-t6": [
    {
      title: "K\u1EF9 n\u0103ng x\u1EED l\xFD b\xE0i to\xE1n h\xECnh kh\u1ED1i th\u1EF1c t\u1EBF",
      detail: [
        "B\u01B0\u1EDBc 1: x\xE1c \u0111\u1ECBnh v\u1EADt th\u1EC3 l\xE0 h\xECnh g\xEC (h\u1ED9p ch\u1EEF nh\u1EADt, l\u1EADp ph\u01B0\u01A1ng, l\u0103ng tr\u1EE5).",
        "B\u01B0\u1EDBc 2: \u0111\u1ECDc k\u1EF9 \u0111\u1EC1 h\u1ECFi di\u1EC7n t\xEDch xung quanh, to\xE0n ph\u1EA7n hay th\u1EC3 t\xEDch.",
        "B\u01B0\u1EDBc 3: \u0111\u1ED5i t\u1EA5t c\u1EA3 v\u1EC1 **c\xF9ng m\u1ED9t \u0111\u01A1n v\u1ECB** tr\u01B0\u1EDBc khi thay s\u1ED1.",
        "B\u01B0\u1EDBc 4: ch\xFA \xFD c\xE1c chi ti\u1EBFt th\u1EF1c t\u1EBF \u2014 b\u1EC3 kh\xF4ng n\u1EAFp th\xEC b\u1EDBt m\u1ED9t m\u1EB7t; m\u1EF1c n\u01B0\u1EDBc th\xEC d\xF9ng chi\u1EC1u cao c\u1ED9t n\u01B0\u1EDBc."
      ]
    }
  ],
  "g7-t7": [
    {
      title: "K\u1EF9 n\u0103ng li\u1EC7t k\xEA kh\xF4ng gian m\u1EABu kh\xF4ng b\u1ECF s\xF3t",
      detail: [
        "V\u1EDBi ph\xE9p th\u1EED m\u1ED9t giai \u0111o\u1EA1n: li\u1EC7t k\xEA theo th\u1EE9 t\u1EF1 t\u0103ng d\u1EA7n.",
        "V\u1EDBi ph\xE9p th\u1EED hai giai \u0111o\u1EA1n: v\u1EBD **s\u01A1 \u0111\u1ED3 c\xE2y**, m\u1ED7i nh\xE1nh l\xE0 m\u1ED9t l\u1EF1a ch\u1ECDn.",
        "\u0110\u1EBFm t\u1ED5ng s\u1ED1 k\u1EBFt qu\u1EA3 r\u1ED3i m\u1EDBi \u0111\u1EBFm s\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i.",
        "Ki\u1EC3m tra: x\xE1c su\u1EA5t ph\u1EA3i n\u1EB1m trong \u0111o\u1EA1n t\u1EEB 0 \u0111\u1EBFn 1."
      ]
    }
  ],
  /* ------------------------------ KHỐI 8 ------------------------------ */
  "g8-t2": [
    {
      title: "Quy tr\xECnh 5 b\u01B0\u1EDBc cho b\xE0i r\xFAt g\u1ECDn ph\xE2n th\u1EE9c",
      detail: [
        "B\u01B0\u1EDBc 1: Vi\u1EBFt **\u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh** (m\u1ECDi m\u1EABu kh\xE1c 0) \u2014 lu\xF4n vi\u1EBFt tr\u01B0\u1EDBc ti\xEAn.",
        "B\u01B0\u1EDBc 2: Ph\xE2n t\xEDch **t\u1EA5t c\u1EA3** c\xE1c m\u1EABu th\xE0nh nh\xE2n t\u1EED.",
        "B\u01B0\u1EDBc 3: T\xECm m\u1EABu th\u1EE9c chung nh\u1ECF nh\u1EA5t t\u1EEB c\xE1c nh\xE2n t\u1EED v\u1EEBa c\xF3.",
        "B\u01B0\u1EDBc 4: Quy \u0111\u1ED3ng, thu g\u1ECDn t\u1EED (c\u1EA9n th\u1EADn d\u1EA5u khi b\u1ECF ngo\u1EB7c c\xF3 d\u1EA5u tr\u1EEB).",
        "B\u01B0\u1EDBc 5: R\xFAt g\u1ECDn tri\u1EC7t \u0111\u1EC3, r\u1ED3i l\xE0m c\xE2u h\u1ECFi ph\u1EE5 v\xE0 \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n B\u01B0\u1EDBc 1."
      ]
    }
  ],
  "g8-t3": [
    {
      title: "K\u1EF9 n\u0103ng l\u1EADp b\u1EA3ng d\u1EEF ki\u1EC7n cho b\xE0i to\xE1n l\u1EDDi v\u0103n",
      detail: [
        "K\u1EBB b\u1EA3ng ba c\u1ED9t: **\u0110\u1EA1i l\u01B0\u1EE3ng | T\xECnh hu\u1ED1ng 1 | T\xECnh hu\u1ED1ng 2**.",
        "V\u1EDBi b\xE0i chuy\u1EC3n \u0111\u1ED9ng, ba d\xF2ng l\xE0: qu\xE3ng \u0111\u01B0\u1EDDng \u2013 v\u1EADn t\u1ED1c \u2013 th\u1EDDi gian.",
        "V\u1EDBi b\xE0i n\u0103ng su\u1EA5t, ba d\xF2ng l\xE0: kh\u1ED1i l\u01B0\u1EE3ng c\xF4ng vi\u1EC7c \u2013 n\u0103ng su\u1EA5t \u2013 th\u1EDDi gian.",
        "\u0110i\u1EC1n \xF4 \u0111\xE3 bi\u1EBFt, \xF4 l\xE0 \u1EA9n, \xF4 bi\u1EC3u di\u1EC5n theo \u1EA9n; d\xF2ng n\xE0o c\xF3 d\u1EEF ki\u1EC7n so s\xE1nh ch\xEDnh l\xE0 n\u01A1i l\u1EADp ph\u01B0\u01A1ng tr\xECnh."
      ]
    },
    {
      title: "S\xE1u b\u01B0\u1EDBc b\u1EAFt bu\u1ED9c khi gi\u1EA3i b\xE0i to\xE1n b\u1EB1ng c\xE1ch l\u1EADp ph\u01B0\u01A1ng tr\xECnh",
      detail: [
        "1. G\u1ECDi \u1EA9n \u2014 k\xE8m **\u0111\u01A1n v\u1ECB** v\xE0 **\u0111i\u1EC1u ki\u1EC7n**.",
        "2. Bi\u1EC3u di\u1EC5n c\xE1c \u0111\u1EA1i l\u01B0\u1EE3ng ch\u01B0a bi\u1EBFt kh\xE1c theo \u1EA9n.",
        "3. L\u1EADp ph\u01B0\u01A1ng tr\xECnh t\u1EEB m\u1ED1i quan h\u1EC7 trong \u0111\u1EC1.",
        "4. Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh.",
        "5. **\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n**, lo\u1EA1i nghi\u1EC7m kh\xF4ng h\u1EE3p l\u1EC7.",
        "6. K\u1EBFt lu\u1EADn c\xF3 \u0111\u01A1n v\u1ECB. Thi\u1EBFu b\u01B0\u1EDBc 1, 5 ho\u1EB7c 6 \u0111\u1EC1u b\u1ECB tr\u1EEB \u0111i\u1EC3m."
      ]
    }
  ],
  "g8-t4": [
    {
      title: "K\u1EF9 n\u0103ng v\u1EBD nhanh \u0111\u1ED3 th\u1ECB h\xE0m s\u1ED1 b\u1EADc nh\u1EA5t",
      detail: [
        "\u0110\u1ED3 th\u1ECB l\xE0 \u0111\u01B0\u1EDDng th\u1EB3ng n\xEAn ch\u1EC9 c\u1EA7n **hai \u0111i\u1EC3m**.",
        "Ch\u1ECDn hai \u0111i\u1EC3m d\u1EC5 nh\u1EA5t: giao v\u1EDBi tr\u1EE5c tung $(0;b)$ v\xE0 giao v\u1EDBi tr\u1EE5c ho\xE0nh $\\left(-\\f{b}{a};0\\right)$.",
        "N\u1EBFu $-\\f{b}{a}$ x\u1EA5u, h\xE3y ch\u1ECDn $x=1$ \u0111\u1EC3 c\xF3 \u0111i\u1EC3m $(1;a+b)$.",
        "Ki\u1EC3m tra h\u01B0\u1EDBng: $a>0$ \u0111\u01B0\u1EDDng th\u1EB3ng \u0111i l\xEAn, $a<0$ \u0111i xu\u1ED1ng."
      ]
    }
  ],
  "g8-t7": [
    {
      title: "K\u1EF9 n\u0103ng nh\u1EADn di\u1EC7n nhanh tam gi\xE1c vu\xF4ng",
      detail: [
        "Thu\u1ED9c c\xE1c b\u1ED9 ba Pythagore: $(3;4;5)$, $(5;12;13)$, $(8;15;17)$, $(7;24;25)$, $(20;21;29)$.",
        "M\u1ECDi b\u1ED9i c\u1EE7a m\u1ED9t b\u1ED9 ba c\u0169ng l\xE0 b\u1ED9 ba Pythagore: $(6;8;10)$, $(9;12;15)$\u2026",
        "Khi ki\u1EC3m tra Pythagore \u0111\u1EA3o, lu\xF4n l\u1EA5y **c\u1EA1nh l\u1EDBn nh\u1EA5t** l\xE0m c\u1EA1nh huy\u1EC1n.",
        "N\u1EBFu ra c\u0103n c\u1EE7a s\u1ED1 \xE2m th\xEC ch\u1EAFc ch\u1EAFn \u0111\xE3 \u0111\u1EB7t nh\u1EA7m c\u1EA1nh huy\u1EC1n."
      ]
    }
  ],
  "g8-t8": [
    {
      title: "K\u1EF9 n\u0103ng ph\xE2n bi\u1EC7t x\xE1c su\u1EA5t l\xED thuy\u1EBFt v\xE0 th\u1EF1c nghi\u1EC7m",
      detail: [
        "\u0110\u1EC1 m\xF4 t\u1EA3 **ph\xE9p th\u1EED v\u1EDBi c\xE1c k\u1EBFt qu\u1EA3 nh\u01B0 nhau** \u2192 x\xE1c su\u1EA5t l\xED thuy\u1EBFt, \u0111\u1EBFm tr\u1EF1c ti\u1EBFp.",
        "\u0110\u1EC1 cho **b\u1EA3ng k\u1EBFt qu\u1EA3 sau nhi\u1EC1u l\u1EA7n th\u1EED** \u2192 x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m, l\u1EA5y t\u1EA7n s\u1ED1 chia t\u1ED5ng s\u1ED1 l\u1EA7n.",
        "\u0110\u1EC1 h\u1ECFi \u201C\u01B0\u1EDBc l\u01B0\u1EE3ng s\u1ED1 l\u1EA7n x\u1EA3y ra trong $n$ l\u1EA7n\u201D \u2192 l\u1EA5y $n\\times P$.",
        "Khi s\u1ED1 l\u1EA7n th\u1EED c\xE0ng l\u1EDBn, hai lo\u1EA1i x\xE1c su\u1EA5t c\xE0ng g\u1EA7n nhau."
      ]
    }
  ],
  /* ------------------------------ KHỐI 9 ------------------------------ */
  "g9-t1": [
    {
      title: "K\u1EF9 n\u0103ng ch\u1ECDn ph\u01B0\u01A1ng ph\xE1p gi\u1EA3i h\u1EC7 cho nhanh",
      detail: [
        "C\xF3 m\u1ED9t \u1EA9n h\u1EC7 s\u1ED1 $\\pm1$ \u2192 d\xF9ng **ph\u01B0\u01A1ng ph\xE1p th\u1EBF**.",
        "H\u1EC7 s\u1ED1 c\u1EE7a m\u1ED9t \u1EA9n b\u1EB1ng nhau ho\u1EB7c \u0111\u1ED1i nhau \u2192 d\xF9ng **c\u1ED9ng \u0111\u1EA1i s\u1ED1** ngay.",
        "H\u1EC7 s\u1ED1 \u201Cx\u1EA5u\u201D \u2192 nh\xE2n ch\xE9o hai ph\u01B0\u01A1ng tr\xECnh \u0111\u1EC3 t\u1EA1o h\u1EC7 s\u1ED1 \u0111\u1ED1i, r\u1ED3i c\u1ED9ng.",
        "\u1EA8n n\u1EB1m \u1EDF m\u1EABu \u2192 **\u0111\u1EB7t \u1EA9n ph\u1EE5** $u=\\f{1}{x}$, $v=\\f{1}{y}$; nh\u1EDB \u0111i\u1EC1u ki\u1EC7n v\xE0 b\u01B0\u1EDBc quay v\u1EC1 \u1EA9n g\u1ED1c.",
        "Lu\xF4n th\u1EED l\u1EA1i nghi\u1EC7m v\xE0o **c\u1EA3 hai** ph\u01B0\u01A1ng tr\xECnh tr\u01B0\u1EDBc khi k\u1EBFt lu\u1EADn."
      ]
    }
  ],
  "g9-t3": [
    {
      title: "B\u1ED9 bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng ph\u1EA3i thu\u1ED9c l\xF2ng",
      detail: [
        "$x_1^{2}+x_2^{2}=S^{2}-2P$",
        "$(x_1-x_2)^{2}=S^{2}-4P$ v\xE0 $\\abs{x_1-x_2}=\\s{S^{2}-4P}$",
        "$\\f{1}{x_1}+\\f{1}{x_2}=\\f{S}{P}$ (v\u1EDBi $P\\ne0$)",
        "$x_1^{3}+x_2^{3}=S^{3}-3PS$",
        "$x_1^{2}x_2+x_1x_2^{2}=PS$",
        "M\u1ECDi bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng \u0111\u1EC1u vi\u1EBFt \u0111\u01B0\u1EE3c theo $S$ v\xE0 $P$ \u2014 kh\xF4ng bao gi\u1EDD c\u1EA7n gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh."
      ]
    }
  ],
  "g9-t5": [
    {
      title: "K\u1EF9 n\u0103ng ch\u1ECDn \u0111\xFAng t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c",
      detail: [
        "Ghi r\xF5 tr\xEAn h\xECnh: c\u1EA1nh n\xE0o **\u0111\u1ED1i**, c\u1EA1nh n\xE0o **k\u1EC1** v\u1EDBi g\xF3c \u0111ang x\xE9t, c\u1EA1nh n\xE0o l\xE0 **huy\u1EC1n**.",
        "C\xF3 huy\u1EC1n v\xE0 \u0111\u1ED1i \u2192 d\xF9ng $\\sin$; c\xF3 huy\u1EC1n v\xE0 k\u1EC1 \u2192 d\xF9ng $\\cos$; ch\u1EC9 c\xF3 \u0111\u1ED1i v\xE0 k\u1EC1 \u2192 d\xF9ng $\\tan$.",
        "Sau khi t\xEDnh xong, ki\u1EC3m tra ch\xE9o b\u1EB1ng Pythagore \u2014 l\u1EC7ch nhi\u1EC1u ngh\u0129a l\xE0 ch\u1ECDn nh\u1EA7m t\u1EC9 s\u1ED1.",
        "Nh\u1EDB: v\u1EDBi g\xF3c nh\u1ECDn th\xEC $\\sin$ v\xE0 $\\cos$ lu\xF4n nh\u1ECF h\u01A1n 1."
      ]
    }
  ],
  "g9-t6": [
    {
      title: "Chi\u1EBFn thu\u1EADt l\xE0m c\xE2u h\xECnh thi tuy\u1EC3n sinh v\xE0o 10",
      detail: [
        "V\u1EBD h\xECnh **to, r\xF5**, ghi \u0111\u1EE7 k\xFD hi\u1EC7u vu\xF4ng g\xF3c v\xE0 \u0111o\u1EA1n b\u1EB1ng nhau \u2014 h\xECnh \u0111\xFAng l\xE0 n\u1EEDa l\u1EDDi gi\u1EA3i.",
        "\xDD a (ch\u1EE9ng minh t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp): \u201Cs\u0103n\u201D hai g\xF3c vu\xF4ng c\xF9ng nh\xECn m\u1ED9t \u0111o\u1EA1n, ho\u1EB7c hai g\xF3c \u0111\u1ED1i b\xF9 nhau. \xDD n\xE0y ph\u1EA3i l\u1EA5y tr\u1ECDn \u0111i\u1EC3m.",
        "\xDD b (ch\u1EE9ng minh h\u1EC7 th\u1EE9c / \u0111\u1ED3ng d\u1EA1ng): d\xF9ng g\xF3c n\u1ED9i ti\u1EBFp c\xF9ng ch\u1EAFn m\u1ED9t cung \u0111\u1EC3 c\xF3 c\u1EB7p g\xF3c b\u1EB1ng nhau, r\u1ED3i k\u1EBFt lu\u1EADn g.g.",
        "\xDD c (t\xEDnh \u0111\u1ED9 d\xE0i, di\u1EC7n t\xEDch): d\xF9ng h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng trong tam gi\xE1c vu\xF4ng, t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng, ho\u1EB7c c\xF4ng th\u1EE9c cung \u2013 qu\u1EA1t.",
        "\xDD d (c\xE2u 0,5 \u0111i\u1EC3m cu\u1ED1i): th\u1EED **hai v\u1ECB tr\xED \u0111\u1EB7c bi\u1EC7t** c\u1EE7a \u0111i\u1EC3m di \u0111\u1ED9ng \u0111\u1EC3 d\u1EF1 \u0111o\xE1n k\u1EBFt qu\u1EA3, r\u1ED3i m\u1EDBi ch\u1EE9ng minh.",
        "N\u1EBFu b\xED \xFD d, v\u1EABn ph\u1EA3i tr\xECnh b\xE0y tr\u1ECDn v\u1EB9n \xFD a, b, c \u2014 \u0111\xF3 \u0111\xE3 l\xE0 2,5/3 \u0111i\u1EC3m c\xE2u h\xECnh."
      ]
    },
    {
      title: "B\u1ED9 \u201Cv\u0169 kh\xED\u201D nh\u1EADn di\u1EC7n t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp",
      detail: [
        "Hai g\xF3c vu\xF4ng c\xF9ng nh\xECn m\u1ED9t \u0111o\u1EA1n th\u1EB3ng \u2192 b\u1ED1n \u0111i\u1EC3m thu\u1ED9c \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh \u0111o\u1EA1n \u0111\xF3.",
        "T\u1ED5ng hai g\xF3c **\u0111\u1ED1i** b\u1EB1ng $180\\deg$.",
        "G\xF3c ngo\xE0i t\u1EA1i m\u1ED9t \u0111\u1EC9nh b\u1EB1ng g\xF3c trong c\u1EE7a \u0111\u1EC9nh \u0111\u1ED1i di\u1EC7n.",
        "Hai \u0111\u1EC9nh **k\u1EC1 nhau** c\xF9ng nh\xECn m\u1ED9t c\u1EA1nh d\u01B0\u1EDBi hai g\xF3c b\u1EB1ng nhau.",
        "B\u1ED1n \u0111i\u1EC3m c\xE1ch \u0111\u1EC1u m\u1ED9t \u0111i\u1EC3m c\u1ED1 \u0111\u1ECBnh."
      ]
    }
  ],
  "g9-t7": [
    {
      title: "K\u1EF9 n\u0103ng l\xE0m b\xE0i h\xECnh kh\u1ED1i tr\xF2n xoay",
      detail: [
        "V\u1EBD m\u1EB7t c\u1EAFt qua tr\u1EE5c \u2014 m\u1ECDi b\xE0i h\xECnh n\xF3n, h\xECnh tr\u1EE5 \u0111\u1EC1u tr\u1EDF n\xEAn \u0111\u01A1n gi\u1EA3n khi nh\xECn m\u1EB7t c\u1EAFt.",
        "V\u1EDBi h\xECnh n\xF3n, ba \u0111\u1EA1i l\u01B0\u1EE3ng $r$, $h$, $l$ t\u1EA1o th\xE0nh tam gi\xE1c vu\xF4ng: $l^{2}=r^{2}+h^{2}$.",
        "\u0110\u1ECDc k\u1EF9 \u0111\u1EC1 h\u1ECFi di\u1EC7n t\xEDch xung quanh hay to\xE0n ph\u1EA7n (to\xE0n ph\u1EA7n c\u1ED9ng th\xEAm \u0111\xE1y).",
        "B\xE0i \u201Cv\u1EADt th\u1EC3 gh\xE9p\u201D th\xEC c\u1ED9ng/tr\u1EEB th\u1EC3 t\xEDch t\u1EEBng ph\u1EA7n."
      ]
    }
  ]
};

// src/content/decode-plus.ts
var EXTRA_DECODE = {
  /* ============================== KHỐI 6 ============================== */
  "g6-t1": [
    { signal: "\u0110\u1EC1 cho t\u1EADp h\u1EE3p b\u1EB1ng t\xEDnh ch\u1EA5t \u0111\u1EB7c tr\u01B0ng, h\u1ECFi s\u1ED1 ph\u1EA7n t\u1EED", action: "Li\u1EC7t k\xEA v\xE0i ph\u1EA7n t\u1EED \u0111\u1EA7u \u2014 cu\u1ED1i r\u1ED3i d\xF9ng c\xF4ng th\u1EE9c $(\\text{cu\u1ED1i}-\\text{\u0111\u1EA7u}):\\text{kho\u1EA3ng c\xE1ch}+1$.", why: "D\xE3y c\xE1ch \u0111\u1EC1u n\xEAn \u0111\u1EBFm \u0111\u01B0\u1EE3c b\u1EB1ng c\xF4ng th\u1EE9c, kh\xF4ng c\u1EA7n li\u1EC7t k\xEA h\u1EBFt." },
    { signal: "Bi\u1EC3u th\u1EE9c c\xF3 nhi\u1EC1u t\u1EA7ng ngo\u1EB7c $(\\;)$, $[\\;]$, $\\{\\;\\}$", action: "L\xE0m t\u1EEB trong ra ngo\xE0i: tr\xF2n \u2192 vu\xF4ng \u2192 nh\u1ECDn.", why: "Ngo\u1EB7c trong c\xF9ng r\xE0ng bu\u1ED9c ch\u1EB7t nh\u1EA5t n\xEAn ph\u1EA3i gi\u1EA3i ph\xF3ng tr\u01B0\u1EDBc." },
    { signal: '\u0110\u1EC1 y\xEAu c\u1EA7u "t\xEDnh nhanh" ho\u1EB7c "t\xEDnh h\u1EE3p l\xED"', action: "T\xECm c\u1EB7p c\u1ED9ng tr\xF2n ch\u1EE5c/tr\u0103m, ho\u1EB7c \u0111\u1EB7t nh\xE2n t\u1EED chung.", why: "\u0110\u1EC1 \u0111\xE3 c\xE0i s\u1EB5n c\u1EA5u tr\xFAc \u0111\u1EB9p; t\xEDnh th\u1EB3ng l\xE0 r\u01A1i v\xE0o b\u1EABy m\u1EA5t th\u1EDDi gian." },
    { signal: "So s\xE1nh hai lu\u1EF9 th\u1EEBa $a^{m}$ v\xE0 $b^{n}$", action: "\u0110\u01B0a v\u1EC1 **c\xF9ng c\u01A1 s\u1ED1** ho\u1EB7c **c\xF9ng s\u1ED1 m\u0169** r\u1ED3i so s\xE1nh.", why: "Ch\u1EC9 khi c\xF9ng m\u1ED9t trong hai y\u1EBFu t\u1ED1 m\u1EDBi so s\xE1nh tr\u1EF1c ti\u1EBFp \u0111\u01B0\u1EE3c." }
  ],
  "g6-t2": [
    { signal: 'B\xE0i to\xE1n chia \u0111\u1EC1u, kh\xF4ng th\u1EEBa, h\u1ECFi "nhi\u1EC1u nh\u1EA5t"', action: "T\xECm **\u01AFCLN** c\u1EE7a c\xE1c s\u1ED1 \u0111\xE3 cho.", why: "S\u1ED1 ph\u1EA7n chia ph\u1EA3i l\xE0 \u01B0\u1EDBc chung, v\xE0 ta c\u1EA7n gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t." },
    { signal: 'B\xE0i to\xE1n l\u1EB7p l\u1EA1i, g\u1EB7p l\u1EA1i, h\u1ECFi "\xEDt nh\u1EA5t"', action: "T\xECm **BCNN** c\u1EE7a c\xE1c chu k\u1EF3.", why: "Th\u1EDDi \u0111i\u1EC3m tr\xF9ng nhau l\xE0 b\u1ED9i chung, ta c\u1EA7n gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t." },
    { signal: "S\u1ED1 c\u1EA7n t\xECm chia $a$, $b$, $c$ **\u0111\u1EC1u d\u01B0 $r$**", action: "T\xECm BCNN r\u1ED3i c\u1ED9ng th\xEAm $r$: $n=\\text{BCNN}\\cdot k+r$.", why: "Tr\u1EEB \u0111i $r$ th\xEC s\u1ED1 \u0111\xF3 chia h\u1EBFt cho c\u1EA3 ba, t\u1EE9c l\xE0 b\u1ED9i chung." },
    { signal: "S\u1ED1 c\u1EA7n t\xECm chia $a$, $b$, $c$ **\u0111\u1EC1u thi\u1EBFu $t$**", action: "T\xECm BCNN r\u1ED3i **tr\u1EEB** $t$: $n=\\text{BCNN}\\cdot k-t$.", why: 'C\u1ED9ng th\xEAm $t$ th\xEC s\u1ED1 \u0111\xF3 m\u1EDBi chia h\u1EBFt \u2014 ng\u01B0\u1EE3c chi\u1EC1u v\u1EDBi d\u1EA1ng "d\u01B0".' },
    { signal: "Ch\u1EE9ng minh hai bi\u1EC3u th\u1EE9c ch\u1EE9a $n$ nguy\xEAn t\u1ED1 c\xF9ng nhau", action: "\u0110\u1EB7t $d$ l\xE0 \u01AFCLN, nh\xE2n h\u1EC7 s\u1ED1 \u0111\u1EC3 kh\u1EED $n$, r\u1ED3i ch\u1EB7n $d$ theo \u01B0\u1EDBc c\u1EE7a h\u1EB1ng s\u1ED1.", why: "Kh\u1EED bi\u1EBFn l\xE0 c\xE1ch duy nh\u1EA5t bi\u1EBFn b\xE0i to\xE1n v\xF4 h\u1EA1n th\xE0nh h\u1EEFu h\u1EA1n." }
  ],
  "g6-t3": [
    { signal: "Ph\xE9p t\xEDnh c\xF3 nhi\u1EC1u d\u1EA5u tr\u1EEB li\xEAn ti\u1EBFp", action: "\u0110\u1ED5i m\u1ECDi ph\xE9p tr\u1EEB th\xE0nh ph\xE9p c\u1ED9ng s\u1ED1 \u0111\u1ED1i r\u1ED3i nh\xF3m l\u1EA1i.", why: "Ph\xE9p c\u1ED9ng c\xF3 t\xEDnh giao ho\xE1n v\xE0 k\u1EBFt h\u1EE3p, ph\xE9p tr\u1EEB th\xEC kh\xF4ng." },
    { signal: "T\xEDch nhi\u1EC1u th\u1EEBa s\u1ED1 \xE2m", action: "\u0110\u1EBFm **s\u1ED1 l\u01B0\u1EE3ng th\u1EEBa s\u1ED1 \xE2m**: ch\u1EB5n th\xEC k\u1EBFt qu\u1EA3 d\u01B0\u01A1ng, l\u1EBB th\xEC \xE2m.", why: "M\u1ED7i c\u1EB7p \xE2m nh\xE2n nhau cho m\u1ED9t s\u1ED1 d\u01B0\u01A1ng." },
    { signal: "\u0110\u1EC1 c\xF3 $|x|=a$ v\u1EDBi $a>0$", action: "X\xE9t **hai tr\u01B0\u1EDDng h\u1EE3p** $x=a$ v\xE0 $x=-a$.", why: "Hai s\u1ED1 \u0111\u1ED1i nhau c\xF3 c\xF9ng kho\u1EA3ng c\xE1ch t\u1EDBi $0$." },
    { signal: "\u0110\u1EC1 h\u1ECFi gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a bi\u1EC3u th\u1EE9c ch\u1EE9a $|x-a|$", action: "D\xF9ng $|x-a|\\ge0$, d\u1EA5u b\u1EB1ng khi $x=a$.", why: "Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i lu\xF4n kh\xF4ng \xE2m, c\u1EF1c tr\u1ECB r\u01A1i \u0111\xFAng t\u1EA1i \u0111i\u1EC3m tri\u1EC7t ti\xEAu." },
    { signal: "T\xECm $x$ nguy\xEAn \u0111\u1EC3 m\u1ED9t ph\xE2n s\u1ED1 c\xF3 t\u1EED l\xE0 h\u1EB1ng s\u1ED1 nh\u1EADn gi\xE1 tr\u1ECB nguy\xEAn", action: "Cho m\u1EABu l\xE0 **\u01B0\u1EDBc** c\u1EE7a t\u1EED r\u1ED3i l\u1EADp b\u1EA3ng.", why: "Ph\xE2n s\u1ED1 nguy\xEAn khi v\xE0 ch\u1EC9 khi m\u1EABu chia h\u1EBFt t\u1EED." }
  ],
  "g6-t4": [
    { signal: "C\u1ED9ng, tr\u1EEB hai ph\xE2n s\u1ED1 kh\xE1c m\u1EABu", action: "Quy \u0111\u1ED3ng theo **BCNN c\u1EE7a c\xE1c m\u1EABu**, kh\xF4ng l\u1EA5y t\xEDch c\xE1c m\u1EABu.", why: "BCNN cho m\u1EABu chung nh\u1ECF nh\u1EA5t, s\u1ED1 nh\u1ECF th\xEC \xEDt sai." },
    { signal: "D\xE3y ph\xE2n s\u1ED1 c\xF3 quy lu\u1EADt $\\f{1}{n(n+1)}$", action: "T\xE1ch sai ph\xE2n $\\f{1}{n}-\\f{1}{n+1}$ r\u1ED3i c\u1ED9ng d\u1ED3n.", why: "C\xE1c h\u1EA1ng t\u1EED gi\u1EEFa tri\u1EC7t ti\xEAu d\xE2y chuy\u1EC1n, ch\u1EC9 c\xF2n hai \u0111\u1EA7u." },
    { signal: 'B\xE0i to\xE1n "t\xECm m\u1ED9t s\u1ED1 bi\u1EBFt $\\f{a}{b}$ c\u1EE7a n\xF3 b\u1EB1ng $c$"', action: "L\u1EA5y $c$ **chia** cho $\\f{a}{b}$.", why: "\u0110\xE2y l\xE0 b\xE0i to\xE1n ng\u01B0\u1EE3c c\u1EE7a ph\xE9p nh\xE2n ph\xE2n s\u1ED1." },
    { signal: 'B\xE0i to\xE1n "t\xECm $\\f{a}{b}$ c\u1EE7a m\u1ED9t s\u1ED1"', action: "L\u1EA5y s\u1ED1 \u0111\xF3 **nh\xE2n** v\u1EDBi $\\f{a}{b}$.", why: "Ph\xE2n bi\u1EC7t r\xF5 v\u1EDBi d\u1EA1ng tr\xEAn \u2014 \u0111\u1ECDc k\u1EF9 \u0111\xE2u l\xE0 s\u1ED1 \u0111\xE3 bi\u1EBFt." },
    { signal: "So s\xE1nh hai ph\xE2n s\u1ED1 c\xF3 t\u1EED ho\u1EB7c m\u1EABu g\u1EA7n nhau", action: "So qua **ph\u1EA7n b\xF9 t\u1EDBi $1$** ho\u1EB7c b\u1EAFc c\u1EA7u qua m\u1ED9t ph\xE2n s\u1ED1 trung gian.", why: "Nhanh h\u01A1n quy \u0111\u1ED3ng khi m\u1EABu l\u1EDBn." }
  ],
  "g6-t5": [
    { signal: "\u0110\u1EC1 cho t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m v\xE0 m\u1ED9t \u0111\u1EA1i l\u01B0\u1EE3ng, h\u1ECFi \u0111\u1EA1i l\u01B0\u1EE3ng c\xF2n l\u1EA1i", action: 'X\xE1c \u0111\u1ECBnh r\xF5 \u0111\xE2u l\xE0 "to\xE0n b\u1ED9" ($100\\%$), r\u1ED3i l\u1EADp t\u1EC9 l\u1EC7.', why: 'Ch\u1ECDn sai "to\xE0n b\u1ED9" l\xE0 sai to\xE0n b\xE0i, d\xF9 ph\xE9p t\xEDnh \u0111\xFAng.' },
    { signal: "B\xE0i to\xE1n t\u0103ng gi\xE1 r\u1ED3i gi\u1EA3m gi\xE1 (ho\u1EB7c ng\u01B0\u1EE3c l\u1EA1i)", action: "Nh\xE2n li\xEAn ti\u1EBFp c\xE1c h\u1EC7 s\u1ED1: t\u0103ng $a\\%$ l\xE0 nh\xE2n $\\left(1+\\f{a}{100}\\right)$, gi\u1EA3m $b\\%$ l\xE0 nh\xE2n $\\left(1-\\f{b}{100}\\right)$.", why: "Ph\u1EA7n tr\u0103m sau t\xEDnh tr\xEAn gi\xE1 tr\u1ECB m\u1EDBi, n\xEAn ph\u1EA3i nh\xE2n ch\u1EE9 kh\xF4ng c\u1ED9ng tr\u1EEB." },
    { signal: "Y\xEAu c\u1EA7u l\xE0m tr\xF2n \u0111\u1EBFn h\xE0ng n\xE0o \u0111\xF3", action: "Nh\xECn ch\u1EEF s\u1ED1 **ngay sau** h\xE0ng l\xE0m tr\xF2n: $\\ge5$ th\xEC t\u0103ng, $<5$ th\xEC gi\u1EEF nguy\xEAn.", why: "L\xE0m tr\xF2n kh\xE1c v\u1EDBi c\u1EAFt b\u1ECF \u0111u\xF4i." },
    { signal: "\u0110\u1EC1 cho bi\u1EC3u \u0111\u1ED3 v\xE0 h\u1ECFi s\u1ED1 l\u01B0\u1EE3ng th\u1EF1c t\u1EBF", action: "\u0110\u1ED5i ph\u1EA7n tr\u0103m sang s\u1ED1 l\u01B0\u1EE3ng qua t\u1ED5ng: $\\text{s\u1ED1 l\u01B0\u1EE3ng}=\\text{t\u1ED5ng}\\times\\text{t\u1EC9 l\u1EC7}$.", why: "Bi\u1EC3u \u0111\u1ED3 ch\u1EC9 cho t\u1EC9 l\u1EC7, ph\u1EA3i nh\xE2n v\u1EDBi t\u1ED5ng m\u1EDBi ra s\u1ED1 th\u1EADt." }
  ],
  "g6-t6": [
    { signal: "H\xECnh gh\xE9p t\u1EEB nhi\u1EC1u h\xECnh c\u01A1 b\u1EA3n", action: "Chia nh\u1ECF th\xE0nh h\xECnh ch\u1EEF nh\u1EADt, tam gi\xE1c, h\xECnh thang r\u1ED3i **c\u1ED9ng ho\u1EB7c tr\u1EEB** di\u1EC7n t\xEDch.", why: "Di\u1EC7n t\xEDch c\xF3 t\xEDnh c\u1ED9ng \u0111\u01B0\u1EE3c khi c\xE1c ph\u1EA7n kh\xF4ng ch\u1ED3ng l\xEAn nhau." },
    { signal: "B\xE0i to\xE1n l\xE1t g\u1EA1ch, s\u01A1n t\u01B0\u1EDDng, l\xE0m h\xE0ng r\xE0o", action: "Ph\xE2n bi\u1EC7t: l\xE1t/s\u01A1n d\xF9ng **di\u1EC7n t\xEDch**, h\xE0ng r\xE0o d\xF9ng **chu vi**.", why: "\u0110\xE2y l\xE0 ch\u1ED7 \u0111\u1ECDc \u0111\u1EC1 sai nhi\u1EC1u nh\u1EA5t c\u1EE7a d\u1EA1ng th\u1EF1c t\u1EBF." },
    { signal: "\u0110\u1EC1 cho \u0111\u01A1n v\u1ECB kh\xE1c nhau (m v\xE0 cm, m\xB2 v\xE0 dm\xB2)", action: "\u0110\u1ED5i v\u1EC1 **c\xF9ng m\u1ED9t \u0111\u01A1n v\u1ECB** tr\u01B0\u1EDBc khi t\xEDnh.", why: "\u0110\u01A1n v\u1ECB di\u1EC7n t\xEDch \u0111\u1ED5i theo b\xECnh ph\u01B0\u01A1ng: $1\\;m^{2}=10\\,000\\;cm^{2}$." },
    { signal: "\u0110\u1EC1 h\u1ECFi chi ph\xED", action: "T\xEDnh \u0111\u1EA1i l\u01B0\u1EE3ng h\xECnh h\u1ECDc tr\u01B0\u1EDBc, nh\xE2n \u0111\u01A1n gi\xE1 sau \u2014 t\xE1ch r\xF5 hai b\u01B0\u1EDBc.", why: "G\u1ED9p hai b\u01B0\u1EDBc d\u1EC5 nh\u1EA7m \u0111\u01A1n v\u1ECB v\xE0 m\u1EA5t \u0111i\u1EC3m tr\xECnh b\xE0y." }
  ],
  "g6-t7": [
    { signal: "\u0110\u1EC1 h\u1ECFi s\u1ED1 \u0111o\u1EA1n th\u1EB3ng t\u1EEB $n$ \u0111i\u1EC3m th\u1EB3ng h\xE0ng", action: "D\xF9ng c\xF4ng th\u1EE9c $\\f{n(n-1)}{2}$.", why: "M\u1ED7i \u0111o\u1EA1n th\u1EB3ng \u1EE9ng v\u1EDBi m\u1ED9t c\xE1ch ch\u1ECDn $2$ \u0111i\u1EC3m trong $n$." },
    { signal: "\u0110i\u1EC3m $M$ n\u1EB1m gi\u1EEFa $A$ v\xE0 $B$", action: "Vi\u1EBFt ngay h\u1EC7 th\u1EE9c $AM+MB=AB$.", why: '\u0110\xE2y l\xE0 \u0111i\u1EC1u ki\u1EC7n \u0111\u1ECBnh l\u01B0\u1EE3ng duy nh\u1EA5t c\u1EE7a quan h\u1EC7 "n\u1EB1m gi\u1EEFa".' },
    { signal: "\u0110\u1EC1 n\xF3i $M$ l\xE0 trung \u0111i\u1EC3m c\u1EE7a $AB$", action: "D\xF9ng \u0111\u1ED3ng th\u1EDDi $MA=MB$ **v\xE0** $MA=\\f{AB}{2}$.", why: "Trung \u0111i\u1EC3m c\u1EA7n c\u1EA3 hai: c\xE1ch \u0111\u1EC1u v\xE0 n\u1EB1m gi\u1EEFa." },
    { signal: "Hai tia $Ox$, $Oy$ \u0111\u1ED1i nhau", action: "Suy ra $\\angle xOy=180\\deg$ v\xE0 m\u1ECDi g\xF3c k\u1EC1 nhau \u0111\u1EC1u b\xF9 nhau.", why: "Hai tia \u0111\u1ED1i t\u1EA1o th\xE0nh m\u1ED9t \u0111\u01B0\u1EDDng th\u1EB3ng." }
  ],
  "g6-t8": [
    { signal: "\u0110\u1EC1 cho b\u1EA3ng s\u1ED1 li\u1EC7u, h\u1ECFi v\u1EBD bi\u1EC3u \u0111\u1ED3 tranh ho\u1EB7c c\u1ED9t", action: "Ch\u1ECDn kho\xE1 quy \u0111\u1ED5i cho bi\u1EC3u \u0111\u1ED3 tranh; bi\u1EC3u \u0111\u1ED3 c\u1ED9t th\xEC th\u1ED1ng nh\u1EA5t m\u1ED9t thang chia.", why: "Sai thang chia l\xE0m bi\u1EC3u \u0111\u1ED3 m\u1EA5t \xFD ngh\u0129a so s\xE1nh." },
    { signal: "H\u1ECFi x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m", action: "L\u1EA5y $\\f{\\text{s\u1ED1 l\u1EA7n bi\u1EBFn c\u1ED1 x\u1EA3y ra}}{\\text{t\u1ED5ng s\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n}}$.", why: "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m l\xE0 t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i, ch\u1EC9 **x\u1EA5p x\u1EC9** x\xE1c su\u1EA5t l\xED thuy\u1EBFt." },
    { signal: 'T\u1EEB kho\xE1 "ch\u1EAFc ch\u1EAFn", "kh\xF4ng th\u1EC3", "c\xF3 th\u1EC3"', action: "Ph\xE2n lo\u1EA1i ngay: ch\u1EAFc ch\u1EAFn ($P=1$) \xB7 kh\xF4ng th\u1EC3 ($P=0$) \xB7 ng\u1EABu nhi\xEAn ($0<P<1$).", why: "Ba lo\u1EA1i bi\u1EBFn c\u1ED1 \u1EE9ng v\u1EDBi ba m\u1ED1c x\xE1c su\u1EA5t c\u1ED1 \u0111\u1ECBnh." },
    { signal: "\u0110\u1EC1 h\u1ECFi gi\xE1 tr\u1ECB xu\u1EA5t hi\u1EC7n nhi\u1EC1u nh\u1EA5t", action: "T\xECm **m\u1ED1t** \u2014 ch\u1EC9 c\u1EA7n \u0111\u1EBFm t\u1EA7n s\u1ED1, kh\xF4ng c\u1EA7n t\xEDnh trung b\xECnh.", why: "M\u1ED1t l\xE0 gi\xE1 tr\u1ECB c\xF3 t\u1EA7n s\u1ED1 l\u1EDBn nh\u1EA5t, kh\xE1c h\u1EB3n s\u1ED1 trung b\xECnh." },
    { signal: "S\u1ED1 li\u1EC7u c\xF3 m\u1ED9t gi\xE1 tr\u1ECB l\u1EC7ch h\u1EB3n (r\u1EA5t l\u1EDBn ho\u1EB7c r\u1EA5t nh\u1ECF)", action: "C\xE2n nh\u1EAFc d\xF9ng **trung v\u1ECB** thay cho trung b\xECnh c\u1ED9ng.", why: "Gi\xE1 tr\u1ECB b\u1EA5t th\u01B0\u1EDDng k\xE9o l\u1EC7ch trung b\xECnh nh\u01B0ng \xEDt \u1EA3nh h\u01B0\u1EDFng trung v\u1ECB." }
  ],
  /* ============================== KHỐI 7 ============================== */
  "g7-t1": [
    { signal: "S\u1ED1 th\u1EADp ph\xE2n v\xF4 h\u1EA1n tu\u1EA7n ho\xE0n c\u1EA7n \u0111\u1ED5i ra ph\xE2n s\u1ED1", action: "\u0110\u1EB7t $x$ b\u1EB1ng s\u1ED1 \u0111\xF3, nh\xE2n $10^{k}$ v\u1EDBi $k$ l\xE0 \u0111\u1ED9 d\xE0i chu k\u1EF3 r\u1ED3i tr\u1EEB.", why: "Ph\xE9p tr\u1EEB kh\u1EED \u0111\u01B0\u1EE3c ph\u1EA7n \u0111u\xF4i v\xF4 h\u1EA1n gi\u1ED1ng nhau." },
    { signal: "H\u1ECFi ph\xE2n s\u1ED1 n\xE0o vi\u1EBFt \u0111\u01B0\u1EE3c d\u1EA1ng th\u1EADp ph\xE2n h\u1EEFu h\u1EA1n", action: "R\xFAt g\u1ECDn v\u1EC1 **t\u1ED1i gi\u1EA3n** r\u1ED3i xem m\u1EABu ch\u1EC9 c\xF3 \u01B0\u1EDBc nguy\xEAn t\u1ED1 $2$ v\xE0 $5$ hay kh\xF4ng.", why: "H\u1EC7 th\u1EADp ph\xE2n d\u1EF1a tr\xEAn $10=2\\cdot5$." },
    { signal: "Bi\u1EC3u th\u1EE9c ch\u1EE9a $\\s{A^{2}}$", action: "Vi\u1EBFt th\xE0nh $|A|$ r\u1ED3i **x\xE9t d\u1EA5u $A$** \u0111\u1EC3 b\u1ECF d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i.", why: "C\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc lu\xF4n cho k\u1EBFt qu\u1EA3 kh\xF4ng \xE2m." },
    { signal: "C\xF3 c\u0103n \u1EDF m\u1EABu s\u1ED1", action: "Tr\u1EE5c c\u0103n th\u1EE9c: nh\xE2n v\u1EDBi ch\xEDnh c\u0103n \u0111\xF3, ho\u1EB7c nh\xE2n v\u1EDBi bi\u1EC3u th\u1EE9c li\xEAn h\u1EE3p.", why: "M\u1EABu kh\xF4ng c\u0103n th\xEC m\u1EDBi so s\xE1nh v\xE0 t\xEDnh to\xE1n \u0111\u01B0\u1EE3c." },
    { signal: "Ph\u01B0\u01A1ng tr\xECnh d\u1EA1ng $|A|=|B|$", action: "X\xE9t hai tr\u01B0\u1EDDng h\u1EE3p $A=B$ v\xE0 $A=-B$.", why: "Hai s\u1ED1 c\xF3 c\xF9ng gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i th\xEC b\u1EB1ng nhau ho\u1EB7c \u0111\u1ED1i nhau." }
  ],
  "g7-t2": [
    { signal: "\u0110i\u1EC1u ki\u1EC7n c\xF3 **h\u1EC7 s\u1ED1** nh\u01B0 $2x+3y=k$", action: "Nh\xE2n h\u1EC7 s\u1ED1 v\xE0o **c\u1EA3 t\u1EED v\xE0 m\u1EABu** c\u1EE7a t\u1EC9 s\u1ED1 t\u01B0\u01A1ng \u1EE9ng r\u1ED3i m\u1EDBi c\u1ED9ng.", why: "Ch\u1EC9 \u0111\u01B0\u1EE3c c\u1ED9ng t\u1EED v\u1EDBi t\u1EED khi c\xE1c t\u1EC9 s\u1ED1 \u0111\xE3 \u0111\xFAng d\u1EA1ng \u0111\u1EC1 cho." },
    { signal: "\u0110i\u1EC1u ki\u1EC7n ch\u1EE9a **t\xEDch** ho\u1EB7c **b\xECnh ph\u01B0\u01A1ng**", action: "\u0110\u1EB7t t\u1EC9 s\u1ED1 chung b\u1EB1ng $t$, bi\u1EC3u di\u1EC5n c\xE1c \u1EA9n theo $t$ r\u1ED3i thay v\xE0o.", why: "T\xEDnh ch\u1EA5t c\u1ED9ng t\u1EED m\u1EABu kh\xF4ng \xE1p d\u1EE5ng \u0111\u01B0\u1EE3c cho t\xEDch." },
    { signal: "B\xE0i to\xE1n chia ph\u1EA7n theo t\u1EC9 l\u1EC7 ngh\u1ECBch", action: "Chia **t\u1EC9 l\u1EC7 thu\u1EADn v\u1EDBi ngh\u1ECBch \u0111\u1EA3o** c\u1EE7a c\xE1c s\u1ED1 \u0111\xE3 cho.", why: "T\u1EC9 l\u1EC7 ngh\u1ECBch v\u1EDBi $a$ ch\xEDnh l\xE0 t\u1EC9 l\u1EC7 thu\u1EADn v\u1EDBi $\\f{1}{a}$." },
    { signal: "D\xE3y t\u1EC9 s\u1ED1 m\xE0 m\u1EABu c\xF3 th\u1EC3 b\u1EB1ng $0$", action: "X\xE9t ri\xEAng tr\u01B0\u1EDDng h\u1EE3p t\u1ED5ng c\xE1c m\u1EABu b\u1EB1ng $0$.", why: "T\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau \u0111\xF2i h\u1ECFi m\u1EABu t\u1ED5ng kh\xE1c $0$." }
  ],
  "g7-t3": [
    { signal: "\u0110a th\u1EE9c ch\u01B0a thu g\u1ECDn", action: "Thu g\u1ECDn v\xE0 **s\u1EAFp x\u1EBFp theo lu\u1EF9 th\u1EEBa gi\u1EA3m d\u1EA7n** tr\u01B0\u1EDBc khi l\xE0m b\u1EA5t c\u1EE9 vi\u1EC7c g\xEC.", why: "B\u1EADc, h\u1EC7 s\u1ED1 cao nh\u1EA5t, h\u1EC7 s\u1ED1 t\u1EF1 do ch\u1EC9 \u0111\u1ECDc \u0111\xFAng khi \u0111\xE3 thu g\u1ECDn." },
    { signal: 'H\u1ECFi "$x=a$ c\xF3 l\xE0 nghi\u1EC7m kh\xF4ng"', action: "Thay $a$ v\xE0o v\xE0 ki\u1EC3m tra k\u1EBFt qu\u1EA3 c\xF3 b\u1EB1ng $0$ hay kh\xF4ng.", why: "Nghi\u1EC7m l\xE0 gi\xE1 tr\u1ECB l\xE0m \u0111a th\u1EE9c tri\u1EC7t ti\xEAu." },
    { signal: "T\xECm tham s\u1ED1 \u0111\u1EC3 $x=a$ l\xE0 nghi\u1EC7m", action: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh $P(a)=0$ theo tham s\u1ED1.", why: "\u0110\xE2y l\xE0 b\xE0i to\xE1n ng\u01B0\u1EE3c c\u1EE7a vi\u1EC7c ki\u1EC3m tra nghi\u1EC7m." },
    { signal: "C\u1ED9ng, tr\u1EEB hai \u0111a th\u1EE9c", action: "\u0110\u1EB7t theo c\u1ED9t c\xF9ng b\u1EADc, ch\xFA \xFD **\u0111\u1ED5i d\u1EA5u to\xE0n b\u1ED9** \u0111a th\u1EE9c b\u1ECB tr\u1EEB.", why: "D\u1EA5u tr\u1EEB tr\u01B0\u1EDBc ngo\u1EB7c \u0111\u1ED5i d\u1EA5u t\u1EA5t c\u1EA3 h\u1EA1ng t\u1EED b\xEAn trong." },
    { signal: "Ch\u1EE9ng minh \u0111a th\u1EE9c v\xF4 nghi\u1EC7m", action: "\u0110\u01B0a v\u1EC1 d\u1EA1ng t\u1ED5ng b\xECnh ph\u01B0\u01A1ng c\u1ED9ng h\u1EB1ng s\u1ED1 d\u01B0\u01A1ng.", why: "B\xECnh ph\u01B0\u01A1ng kh\xF4ng \xE2m n\xEAn t\u1ED5ng lu\xF4n d\u01B0\u01A1ng, kh\xF4ng th\u1EC3 b\u1EB1ng $0$." }
  ],
  "g7-t4": [
    { signal: "Hai \u0111\u01B0\u1EDDng th\u1EB3ng song song b\u1ECB c\u1EAFt b\u1EDFi c\xE1t tuy\u1EBFn", action: "Nh\u1EDB ba c\u1EB7p: so le trong **b\u1EB1ng nhau**, \u0111\u1ED3ng v\u1ECB **b\u1EB1ng nhau**, trong c\xF9ng ph\xEDa **b\xF9 nhau**.", why: "\u0110\xE2y l\xE0 to\xE0n b\u1ED9 c\xF4ng c\u1EE5 t\xEDnh g\xF3c c\u1EE7a chuy\xEAn \u0111\u1EC1 n\xE0y." },
    { signal: "Hai \u0111\u01B0\u1EDDng th\u1EB3ng c\xF9ng vu\xF4ng g\xF3c v\u1EDBi \u0111\u01B0\u1EDDng th\u1EE9 ba", action: "K\u1EBFt lu\u1EADn hai \u0111\u01B0\u1EDDng \u0111\xF3 song song v\u1EDBi nhau.", why: "Quan h\u1EC7 vu\xF4ng g\xF3c \u2014 song song b\u1EAFc c\u1EA7u qua \u0111\u01B0\u1EDDng trung gian." },
    { signal: "C\u1EA7n t\xEDnh g\xF3c nh\u01B0ng ch\u01B0a c\xF3 \u0111\u01B0\u1EDDng song song n\xE0o", action: "**K\u1EBB \u0111\u01B0\u1EDDng ph\u1EE5** song song v\u1EDBi m\u1ED9t trong hai \u0111\u01B0\u1EDDng \u0111\xE3 cho, \u0111i qua \u0111\u1EC9nh g\xF3c c\u1EA7n t\xEDnh.", why: "\u0110\u01B0\u1EDDng ph\u1EE5 t\xE1ch g\xF3c l\u1EDBn th\xE0nh hai g\xF3c t\xEDnh \u0111\u01B0\u1EE3c b\u1EB1ng so le trong." },
    { signal: "\u0110\u1EC1 cho tia ph\xE2n gi\xE1c c\u1EE7a m\u1ED9t g\xF3c", action: "Vi\u1EBFt ngay hai g\xF3c con b\u1EB1ng nhau v\xE0 b\u1EB1ng n\u1EEDa g\xF3c \u0111\xE3 cho.", why: "Ph\xE2n gi\xE1c chia g\xF3c th\xE0nh hai ph\u1EA7n b\u1EB1ng nhau \u2014 d\u1EEF ki\u1EC7n \u0111\u1ECBnh l\u01B0\u1EE3ng." }
  ],
  "g7-t5": [
    { signal: "C\u1EA7n ch\u1EE9ng minh hai \u0111o\u1EA1n th\u1EB3ng (ho\u1EB7c hai g\xF3c) b\u1EB1ng nhau", action: "T\xECm **hai tam gi\xE1c ch\u1EE9a ch\xFAng** r\u1ED3i ch\u1EE9ng minh hai tam gi\xE1c \u0111\xF3 b\u1EB1ng nhau.", why: "\u0110\xE2y l\xE0 con \u0111\u01B0\u1EDDng chu\u1EA9n: b\u1EB1ng nhau c\u1EE7a tam gi\xE1c k\xE9o theo b\u1EB1ng nhau c\u1EE7a m\u1ECDi y\u1EBFu t\u1ED1 t\u01B0\u01A1ng \u1EE9ng." },
    { signal: "C\xF3 trung \u0111i\u1EC3m v\xE0 m\u1ED9t \u0111o\u1EA1n k\xE9o d\xE0i g\u1EA5p \u0111\xF4i", action: "Gh\xE9p hai tam gi\xE1c v\u1EDBi **g\xF3c \u0111\u1ED1i \u0111\u1EC9nh** \u1EDF gi\u1EEFa, d\xF9ng c.g.c.", why: "M\xF4 h\xECnh n\xE0y xu\u1EA5t hi\u1EC7n trong h\u1EA7u h\u1EBFt \u0111\u1EC1 h\u1ECDc k\xEC." },
    { signal: "C\u1EA7n ch\u1EE9ng minh t\u1ED5ng hai \u0111o\u1EA1n b\u1EB1ng m\u1ED9t \u0111o\u1EA1n th\u1EE9 ba", action: "C\u1EAFt \u0111o\u1EA1n d\xE0i th\xE0nh \u0111\xFAng hai ph\u1EA7n r\u1ED3i ch\u1EE9ng minh t\u1EEBng ph\u1EA7n b\u1EB1ng nhau.", why: "Bi\u1EBFn b\xE0i to\xE1n t\u1ED5ng th\xE0nh hai b\xE0i to\xE1n b\u1EB1ng nhau \u0111\u01A1n gi\u1EA3n h\u01A1n." },
    { signal: "C\u1EA7n ch\u1EE9ng minh ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng", action: "Ch\u1EE9ng minh hai tia \u0111\u1ED1i nhau, ho\u1EB7c t\u1ED5ng hai g\xF3c k\u1EC1 b\u1EB1ng $180\\deg$.", why: "Th\u1EB3ng h\xE0ng t\u01B0\u01A1ng \u0111\u01B0\u01A1ng g\xF3c b\u1EB9t t\u1EA1i \u0111i\u1EC3m gi\u1EEFa." },
    { signal: "\u0110\u1EC1 cho tam gi\xE1c c\xE2n v\xE0 m\u1ED9t \u0111\u01B0\u1EDDng \u0111\u1EB7c bi\u1EC7t t\u1EEB \u0111\u1EC9nh", action: "D\xF9ng ngay: trong tam gi\xE1c c\xE2n, \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c t\u1EEB \u0111\u1EC9nh \u0111\u1ED3ng th\u1EDDi l\xE0 trung tuy\u1EBFn, \u0111\u01B0\u1EDDng cao v\xE0 trung tr\u1EF1c.", why: "M\u1ED9t d\u1EEF ki\u1EC7n cho b\u1ED1n k\u1EBFt lu\u1EADn \u2014 ti\u1EBFt ki\u1EC7m r\u1EA5t nhi\u1EC1u b\u01B0\u1EDBc." }
  ],
  "g7-t6": [
    { signal: "\u0110\u1EC1 cho h\xECnh l\u0103ng tr\u1EE5 \u0111\u1EE9ng, h\u1ECFi di\u1EC7n t\xEDch xung quanh", action: "D\xF9ng $S_{xq}=C_{\\text{\u0111\xE1y}}\\cdot h$ (chu vi \u0111\xE1y nh\xE2n chi\u1EC1u cao).", why: "Tr\u1EA3i m\u1EB7t xung quanh ra \u0111\u01B0\u1EE3c h\xECnh ch\u1EEF nh\u1EADt c\xF3 k\xEDch th\u01B0\u1EDBc l\xE0 chu vi \u0111\xE1y v\xE0 chi\u1EC1u cao." },
    { signal: "H\u1ECFi di\u1EC7n t\xEDch to\xE0n ph\u1EA7n", action: "C\u1ED9ng th\xEAm **hai** m\u1EB7t \u0111\xE1y: $S_{tp}=S_{xq}+2S_{\\text{\u0111\xE1y}}$.", why: "L\u0103ng tr\u1EE5 c\xF3 hai \u0111\xE1y b\u1EB1ng nhau \u1EDF hai \u0111\u1EA7u." },
    { signal: "B\xE0i to\xE1n l\xE0m h\u1ED9p, th\xF9ng kh\xF4ng n\u1EAFp", action: "Tr\u1EEB b\u1EDBt m\u1ED9t m\u1EB7t \u0111\xE1y kh\u1ECFi di\u1EC7n t\xEDch to\xE0n ph\u1EA7n.", why: '\u0110\u1ECDc k\u1EF9 "c\xF3 n\u1EAFp" hay "kh\xF4ng n\u1EAFp" \u2014 \u0111\xE2y l\xE0 b\u1EABy c\u1EE7a d\u1EA1ng th\u1EF1c t\u1EBF.' },
    { signal: "\u0110\u1EC1 cho th\u1EC3 t\xEDch v\xE0 h\u1ECFi chi\u1EC1u cao (ho\u1EB7c ng\u01B0\u1EE3c l\u1EA1i)", action: "D\xF9ng $V=S_{\\text{\u0111\xE1y}}\\cdot h$ r\u1ED3i gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh m\u1ED9t \u1EA9n.", why: "C\xF4ng th\u1EE9c th\u1EC3 t\xEDch d\xF9ng \u0111\u01B0\u1EE3c theo c\u1EA3 hai chi\u1EC1u xu\xF4i v\xE0 ng\u01B0\u1EE3c." },
    { signal: "B\xE0i to\xE1n \u0111\u1ED5 n\u01B0\u1EDBc, \u0111\u01A1n v\u1ECB l\xEDt", action: "Nh\u1EDB $1\\;dm^{3}=1$ l\xEDt v\xE0 $1\\;m^{3}=1000$ l\xEDt.", why: "Sai quy \u0111\u1ED5i \u0111\u01A1n v\u1ECB l\xE0 m\u1EA5t tr\u1ECDn \u0111i\u1EC3m d\xF9 c\xF4ng th\u1EE9c \u0111\xFAng." }
  ],
  "g7-t7": [
    { signal: "\u0110\u1EC1 cho bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n", action: "Nh\u1EDB hai m\u1ED1c: c\u1EA3 h\xECnh tr\xF2n \u1EE9ng v\u1EDBi $360\\deg$ v\xE0 v\u1EDBi $100\\%$.", why: "M\u1ECDi ph\xE9p t\xEDnh c\u1EE7a d\u1EA1ng n\xE0y \u0111\u1EC1u quy v\u1EC1 hai m\u1ED1c \u0111\xF3." },
    { signal: "H\u1ECFi g\xF3c \u1EDF t\xE2m c\u1EE7a m\u1ED9t ph\u1EA7n", action: "L\u1EA5y $\\f{\\text{ph\u1EA7n \u0111\xF3}}{\\text{t\u1ED5ng}}\\times360\\deg$.", why: "G\xF3c \u1EDF t\xE2m t\u1EC9 l\u1EC7 thu\u1EADn v\u1EDBi s\u1ED1 li\u1EC7u c\u1EE7a ph\u1EA7n t\u01B0\u01A1ng \u1EE9ng." },
    { signal: "\u0110\u1EC1 cho bi\u1EC3u \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng", action: "\u0110\u1ECDc **xu h\u01B0\u1EDBng** qua \u0111\u1ED9 d\u1ED1c: d\u1ED1c l\xEAn l\xE0 t\u0103ng, d\u1ED1c xu\u1ED1ng l\xE0 gi\u1EA3m, d\u1ED1c c\xE0ng \u0111\u1EE9ng bi\u1EBFn \u0111\u1ED9ng c\xE0ng m\u1EA1nh.", why: "Bi\u1EC3u \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng sinh ra \u0111\u1EC3 th\u1EC3 hi\u1EC7n thay \u0111\u1ED5i theo th\u1EDDi gian." },
    { signal: 'H\u1ECFi "t\u0103ng bao nhi\xEAu ph\u1EA7n tr\u0103m so v\u1EDBi..."', action: "L\u1EA5y $\\f{\\text{gi\xE1 tr\u1ECB m\u1EDBi}-\\text{gi\xE1 tr\u1ECB c\u0169}}{\\text{gi\xE1 tr\u1ECB c\u0169}}\\times100\\%$.", why: "M\u1ED1c so s\xE1nh lu\xF4n l\xE0 gi\xE1 tr\u1ECB **c\u0169** \u2014 \u0111\xE2y l\xE0 ch\u1ED7 hay \u0111\u1EB7t sai m\u1EABu s\u1ED1." },
    { signal: "Gieo x\xFAc x\u1EAFc, tung \u0111\u1ED3ng xu, r\xFAt th\u1EBB", action: "\u0110\u1EBFm s\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i chia t\u1ED5ng s\u1ED1 k\u1EBFt qu\u1EA3 **\u0111\u1ED3ng kh\u1EA3 n\u0103ng**.", why: "C\xF4ng th\u1EE9c x\xE1c su\u1EA5t l\xED thuy\u1EBFt ch\u1EC9 \u0111\xFAng khi c\xE1c k\u1EBFt qu\u1EA3 \u0111\u1ED3ng kh\u1EA3 n\u0103ng." }
  ],
  /* ============================== KHỐI 8 ============================== */
  "g8-t1": [
    { signal: "Bi\u1EC3u th\u1EE9c c\xF3 d\u1EA1ng $A^{2}\\pm2AB+B^{2}$", action: "Vi\u1EBFt ngay th\xE0nh $(A\\pm B)^{2}$.", why: "Nh\u1EADn d\u1EA1ng h\u1EB1ng \u0111\u1EB3ng th\u1EE9c nhanh h\u01A1n m\u1ECDi c\xE1ch khai tri\u1EC3n." },
    { signal: "\u0110a th\u1EE9c b\u1EADc hai $ax^{2}+bx+c$ kh\xF3 nh\xF3m", action: "T\xE1ch h\u1EA1ng t\u1EED gi\u1EEFa th\xE0nh hai s\u1ED1 c\xF3 **t\u1ED5ng $b$, t\xEDch $ac$**.", why: "Sau khi t\xE1ch s\u1EBD nh\xF3m \u0111\u01B0\u1EE3c th\xE0nh hai c\u1EB7p c\xF3 nh\xE2n t\u1EED chung." },
    { signal: "C\u1EA7n t\xEDnh nhanh gi\xE1 tr\u1ECB s\u1ED1 nh\u01B0 $99^{2}$, $101\\cdot99$", action: "\u0110\u01B0a v\u1EC1 h\u1EB1ng \u0111\u1EB3ng th\u1EE9c v\u1EDBi s\u1ED1 tr\xF2n ch\u1EE5c, tr\xF2n tr\u0103m.", why: "$99^{2}=(100-1)^{2}$ t\xEDnh nh\u1EA9m \u0111\u01B0\u1EE3c, nh\xE2n tr\u1EF1c ti\u1EBFp th\xEC kh\xF4ng." },
    { signal: "B\u1ED1n th\u1EEBa s\u1ED1 b\u1EADc nh\u1EA5t nh\xE2n nhau c\u1ED9ng h\u1EB1ng s\u1ED1", action: "Gh\xE9p c\u1EB7p sao cho **t\u1ED5ng hai h\u1EB1ng s\u1ED1 trong m\u1ED7i c\u1EB7p b\u1EB1ng nhau**, r\u1ED3i \u0111\u1EB7t \u1EA9n ph\u1EE5.", why: "C\xE1ch gh\xE9p \u0111\xF3 t\u1EA1o ra hai bi\u1EC3u th\u1EE9c ch\u1EC9 kh\xE1c nhau m\u1ED9t h\u1EB1ng s\u1ED1." }
  ],
  "g8-t2": [
    { signal: "B\u1EAFt \u0111\u1EA7u m\u1ECDi b\xE0i ph\xE2n th\u1EE9c", action: "Vi\u1EBFt **\u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh** \u2014 ph\xE2n t\xEDch m\u1EABu th\xE0nh nh\xE2n t\u1EED r\u1ED3i cho t\u1EEBng nh\xE2n t\u1EED kh\xE1c $0$.", why: "Thi\u1EBFu \u0111i\u1EC1u ki\u1EC7n l\xE0 m\u1EA5t \u0111i\u1EC3m ngay c\u1EA3 khi k\u1EBFt qu\u1EA3 \u0111\xFAng." },
    { signal: "C\u1ED9ng, tr\u1EEB ph\xE2n th\u1EE9c kh\xE1c m\u1EABu", action: "Ph\xE2n t\xEDch c\xE1c m\u1EABu th\xE0nh nh\xE2n t\u1EED \u0111\u1EC3 t\xECm **m\u1EABu th\u1EE9c chung nh\u1ECF nh\u1EA5t**.", why: "L\u1EA5y t\xEDch c\xE1c m\u1EABu s\u1EBD cho bi\u1EC3u th\u1EE9c c\u1ED3ng k\u1EC1nh, d\u1EC5 sai." },
    { signal: "C\u1EA7n t\xEDnh gi\xE1 tr\u1ECB c\u1EE7a ph\xE2n th\u1EE9c t\u1EA1i m\u1ED9t \u0111i\u1EC3m", action: "**R\xFAt g\u1ECDn tr\u01B0\u1EDBc, thay s\u1ED1 sau**, v\xE0 lu\xF4n \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n.", why: "Thay s\u1ED1 v\xE0o bi\u1EC3u th\u1EE9c ch\u01B0a r\xFAt g\u1ECDn cho s\u1ED1 r\u1EA5t l\u1EDBn, d\u1EC5 sai." },
    { signal: 'H\u1ECFi "t\xECm $x$ nguy\xEAn \u0111\u1EC3 bi\u1EC3u th\u1EE9c nguy\xEAn"', action: "T\xE1ch ph\u1EA7n nguy\xEAn r\u1ED3i cho m\u1EABu l\xE0 \u01B0\u1EDBc c\u1EE7a ph\u1EA7n d\u01B0.", why: "Sau khi t\xE1ch, ph\u1EA7n ch\u1EE9a bi\u1EBFn ch\u1EC9 c\xF2n \u1EDF m\u1EABu \u2014 b\xE0i to\xE1n v\u1EC1 \u01B0\u1EDBc s\u1ED1." },
    { signal: "\u0110\u1EC1 h\u1ECFi gi\xE1 tr\u1ECB c\u1EE7a bi\u1EC3u th\u1EE9c **kh\xF4ng ph\u1EE5 thu\u1ED9c** v\xE0o bi\u1EBFn", action: "R\xFAt g\u1ECDn tri\u1EC7t \u0111\u1EC3; n\u1EBFu k\u1EBFt qu\u1EA3 l\xE0 h\u1EB1ng s\u1ED1 th\xEC \u0111\xF3 l\xE0 \u0111\xE1p \xE1n.", why: "Nhi\u1EC1u \u0111\u1EC1 c\u1ED1 t\xECnh d\u1EF1ng bi\u1EC3u th\u1EE9c r\xFAt g\u1ECDn ra h\u1EB1ng s\u1ED1 \u0111\u1EC3 ki\u1EC3m tra k\u1EF9 n\u0103ng." }
  ],
  "g8-t3": [
    { signal: "Ph\u01B0\u01A1ng tr\xECnh c\xF3 m\u1EABu s\u1ED1", action: "Nh\xE2n hai v\u1EBF v\u1EDBi **BCNN c\xE1c m\u1EABu**, nh\u1EDB nh\xE2n c\u1EA3 v\u1EBF ph\u1EA3i.", why: "Kh\u1EED m\u1EABu l\xE0 b\u01B0\u1EDBc b\u1EAFt bu\u1ED9c tr\u01B0\u1EDBc khi chuy\u1EC3n v\u1EBF." },
    { signal: "Ph\u01B0\u01A1ng tr\xECnh c\xF3 d\u1EA1ng t\xEDch b\u1EB1ng $0$", action: "Cho **t\u1EEBng th\u1EEBa s\u1ED1** b\u1EB1ng $0$, gi\u1EA3i h\u1EBFt c\xE1c nh\xE1nh.", why: "T\xEDch b\u1EB1ng $0$ khi \xEDt nh\u1EA5t m\u1ED9t th\u1EEBa s\u1ED1 b\u1EB1ng $0$." },
    { signal: "B\xE0i to\xE1n chuy\u1EC3n \u0111\u1ED9ng", action: "L\u1EADp b\u1EA3ng ba c\u1ED9t **qu\xE3ng \u0111\u01B0\u1EDDng \u2013 v\u1EADn t\u1ED1c \u2013 th\u1EDDi gian**, \u0111i\u1EC1n d\u1EEF ki\u1EC7n r\u1ED3i t\xECm quan h\u1EC7 c\xF2n thi\u1EBFu.", why: "B\u1EA3ng gi\xFAp th\u1EA5y ngay \u0111\u1EA1i l\u01B0\u1EE3ng n\xE0o b\u1EB1ng nhau \u0111\u1EC3 l\u1EADp ph\u01B0\u01A1ng tr\xECnh." },
    { signal: "B\xE0i to\xE1n n\u0103ng su\u1EA5t, l\xE0m chung l\xE0m ri\xEAng", action: "\u0110\u1EB7t \u1EA9n l\xE0 **th\u1EDDi gian**, t\xEDnh n\u0103ng su\u1EA5t b\u1EB1ng $\\f{1}{\\text{th\u1EDDi gian}}$ r\u1ED3i c\u1ED9ng n\u0103ng su\u1EA5t.", why: "N\u0103ng su\u1EA5t c\u1ED9ng \u0111\u01B0\u1EE3c, th\u1EDDi gian th\xEC kh\xF4ng." },
    { signal: "B\xE0i to\xE1n gi\u1EA3m gi\xE1 ph\u1EA7n tr\u0103m", action: "Gi\u1EA3m $a\\%$ th\xEC ph\u1EA3i tr\u1EA3 $(100-a)\\%$ \u2014 nh\xE2n v\u1EDBi $1-\\f{a}{100}$.", why: "Nh\u1EA7m ph\u1EA7n \u0111\u01B0\u1EE3c gi\u1EA3m v\u1EDBi ph\u1EA7n ph\u1EA3i tr\u1EA3 l\xE0 sai b\u1EA3n ch\u1EA5t." }
  ],
  "g8-t4": [
    { signal: "H\u1ECFi \u0111i\u1EC3m c\xF3 thu\u1ED9c \u0111\u1ED3 th\u1ECB hay kh\xF4ng", action: "Thay to\u1EA1 \u0111\u1ED9 \u0111i\u1EC3m v\xE0o h\xE0m s\u1ED1, xem \u0111\u1EB3ng th\u1EE9c c\xF3 \u0111\xFAng kh\xF4ng.", why: "\u0110i\u1EC3m thu\u1ED9c \u0111\u1ED3 th\u1ECB khi v\xE0 ch\u1EC9 khi to\u1EA1 \u0111\u1ED9 tho\u1EA3 m\xE3n c\xF4ng th\u1EE9c h\xE0m s\u1ED1." },
    { signal: '\u0110\u1EC1 cho "h\u1EC7 s\u1ED1 g\xF3c"', action: "\u0110\xF3 ch\xEDnh l\xE0 h\u1EC7 s\u1ED1 $a$ \u0111\u1EE9ng tr\u01B0\u1EDBc $x$.", why: "H\u1EC7 s\u1ED1 g\xF3c quy\u1EBFt \u0111\u1ECBnh \u0111\u1ED9 d\u1ED1c v\xE0 chi\u1EC1u bi\u1EBFn thi\xEAn c\u1EE7a \u0111\u01B0\u1EDDng th\u1EB3ng." },
    { signal: "Hai \u0111\u01B0\u1EDDng th\u1EB3ng song song", action: "\u0110\u1EB7t \u0111i\u1EC1u ki\u1EC7n $a=a'$ v\xE0 $b\\ne b'$.", why: "C\xF9ng \u0111\u1ED9 d\u1ED1c nh\u01B0ng kh\xE1c tung \u0111\u1ED9 g\u1ED1c th\xEC kh\xF4ng bao gi\u1EDD g\u1EB7p nhau." },
    { signal: "T\xECm to\u1EA1 \u0111\u1ED9 giao \u0111i\u1EC3m c\u1EE7a hai \u0111\u01B0\u1EDDng th\u1EB3ng", action: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m, r\u1ED3i **thay l\u1EA1i** \u0111\u1EC3 t\xECm tung \u0111\u1ED9.", why: "To\u1EA1 \u0111\u1ED9 c\u1EA7n \u0111\u1EE7 hai s\u1ED1; qu\xEAn b\u01B0\u1EDBc thay l\u1EA1i l\xE0 m\u1EA5t n\u1EEDa \u0111i\u1EC3m." },
    { signal: "T\xECm giao \u0111i\u1EC3m v\u1EDBi hai tr\u1EE5c to\u1EA1 \u0111\u1ED9", action: "Cho $x=0$ \u0111\u1EC3 c\xF3 giao v\u1EDBi tr\u1EE5c tung; cho $y=0$ \u0111\u1EC3 c\xF3 giao v\u1EDBi tr\u1EE5c ho\xE0nh.", why: "Tr\xEAn tr\u1EE5c tung th\xEC ho\xE0nh \u0111\u1ED9 b\u1EB1ng $0$ v\xE0 ng\u01B0\u1EE3c l\u1EA1i." }
  ],
  "g8-t5": [
    { signal: "C\u1EA7n ch\u1EE9ng minh m\u1ED9t t\u1EE9 gi\xE1c l\xE0 h\xECnh b\xECnh h\xE0nh", action: 'Ch\u1ECDn m\u1ED9t trong b\u1ED1n d\u1EA5u hi\u1EC7u; th\u01B0\u1EDDng d\xF9ng nh\u1EA5t l\xE0 "hai \u0111\u01B0\u1EDDng ch\xE9o c\u1EAFt nhau t\u1EA1i trung \u0111i\u1EC3m m\u1ED7i \u0111\u01B0\u1EDDng".', why: "D\u1EA5u hi\u1EC7u n\xE0y ch\u1EC9 c\u1EA7n m\u1ED9t \u0111i\u1EC3m v\xE0 hai \u0111o\u1EA1n b\u1EB1ng nhau." },
    { signal: "\u0110\xE3 c\xF3 h\xECnh b\xECnh h\xE0nh, c\u1EA7n l\xEAn h\xECnh ch\u1EEF nh\u1EADt", action: "Ch\u1EE9ng minh th\xEAm **m\u1ED9t g\xF3c vu\xF4ng** ho\u1EB7c **hai \u0111\u01B0\u1EDDng ch\xE9o b\u1EB1ng nhau**.", why: "S\u01A1 \u0111\u1ED3 nh\u1EADn bi\u1EBFt \u0111i t\u1EEB h\xECnh chung t\u1EDBi h\xECnh ri\xEAng, m\u1ED7i b\u01B0\u1EDBc th\xEAm m\u1ED9t \u0111i\u1EC1u ki\u1EC7n." },
    { signal: "\u0110\xE3 c\xF3 h\xECnh b\xECnh h\xE0nh, c\u1EA7n l\xEAn h\xECnh thoi", action: "Ch\u1EE9ng minh th\xEAm **hai c\u1EA1nh k\u1EC1 b\u1EB1ng nhau** ho\u1EB7c **hai \u0111\u01B0\u1EDDng ch\xE9o vu\xF4ng g\xF3c**.", why: "C\xF9ng s\u01A1 \u0111\u1ED3 nh\u01B0 tr\xEAn nh\u01B0ng theo nh\xE1nh c\u1EA1nh thay v\xEC nh\xE1nh g\xF3c." },
    { signal: "Xu\u1EA5t hi\u1EC7n hai trung \u0111i\u1EC3m c\u1EE7a hai c\u1EA1nh tam gi\xE1c", action: "D\xF9ng ngay **\u0111\u01B0\u1EDDng trung b\xECnh**: song song c\u1EA1nh th\u1EE9 ba v\xE0 b\u1EB1ng n\u1EEDa c\u1EA1nh \u1EA5y.", why: '\u0110\xE2y l\xE0 c\xF4ng c\u1EE5 t\u1EA1o ra quan h\u1EC7 song song "t\u1EEB kh\xF4ng c\xF3 g\xEC".' },
    { signal: "Tam gi\xE1c vu\xF4ng c\xF3 trung \u0111i\u1EC3m c\u1EA1nh huy\u1EC1n", action: "D\xF9ng: trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n b\u1EB1ng n\u1EEDa c\u1EA1nh huy\u1EC1n.", why: "Trung \u0111i\u1EC3m c\u1EA1nh huy\u1EC1n c\xE1ch \u0111\u1EC1u ba \u0111\u1EC9nh." }
  ],
  "g8-t6": [
    { signal: "C\xF3 \u0111\u01B0\u1EDDng th\u1EB3ng song song v\u1EDBi m\u1ED9t c\u1EA1nh tam gi\xE1c", action: "Vi\u1EBFt ngay d\xE3y t\u1EC9 s\u1ED1 theo **\u0111\u1ECBnh l\xED Thal\xE8s**.", why: "Song song l\xE0 ngu\u1ED3n duy nh\u1EA5t sinh ra t\u1EC9 l\u1EC7 \u0111o\u1EA1n th\u1EB3ng \u1EDF chuy\xEAn \u0111\u1EC1 n\xE0y." },
    { signal: "C\u1EA7n ch\u1EE9ng minh hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng", action: "\u01AFu ti\xEAn t\xECm **hai c\u1EB7p g\xF3c b\u1EB1ng nhau** (tr\u01B0\u1EDDng h\u1EE3p g.g) \u2014 nhanh nh\u1EA5t.", why: "G\xF3c d\u1EC5 t\xECm h\u01A1n c\u1EA1nh, nh\u1EA5t l\xE0 khi c\xF3 song song ho\u1EB7c \u0111\u01B0\u1EDDng cao." },
    { signal: "C\u1EA7n ch\u1EE9ng minh h\u1EC7 th\u1EE9c d\u1EA1ng $AB\\cdot CD=EF\\cdot GH$", action: "\u0110\u01B0a v\u1EC1 t\u1EC9 s\u1ED1 $\\f{AB}{EF}=\\f{GH}{CD}$ r\u1ED3i t\xECm hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng cho t\u1EC9 s\u1ED1 \u1EA5y.", why: "M\u1ECDi h\u1EC7 th\u1EE9c t\xEDch \u0111\u1EC1u xu\u1EA5t ph\xE1t t\u1EEB m\u1ED9t c\u1EB7p tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng." },
    { signal: "\u0110\u1EC1 cho tia ph\xE2n gi\xE1c trong tam gi\xE1c", action: "D\xF9ng $\\f{AB}{AC}=\\f{DB}{DC}$ v\u1EDBi $D$ l\xE0 ch\xE2n ph\xE2n gi\xE1c.", why: "Ph\xE2n gi\xE1c chia c\u1EA1nh \u0111\u1ED1i di\u1EC7n theo t\u1EC9 s\u1ED1 hai c\u1EA1nh k\u1EC1." },
    { signal: "H\u1ECFi t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch c\u1EE7a hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng", action: "L\u1EA5y **b\xECnh ph\u01B0\u01A1ng** t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng.", why: "Di\u1EC7n t\xEDch l\xE0 \u0111\u1EA1i l\u01B0\u1EE3ng hai chi\u1EC1u n\xEAn t\u1EC9 l\u1EC7 theo $k^{2}$." }
  ],
  "g8-t7": [
    { signal: "Tam gi\xE1c c\xF3 m\u1ED9t g\xF3c vu\xF4ng, bi\u1EBFt hai c\u1EA1nh", action: "D\xF9ng Pythagore \u0111\u1EC3 t\xECm c\u1EA1nh c\xF2n l\u1EA1i.", why: "Quan h\u1EC7 $a^{2}=b^{2}+c^{2}$ ch\u1EC9 c\u1EA7n hai c\u1EA1nh l\xE0 \u0111\u1EE7." },
    { signal: "Bi\u1EBFt ba c\u1EA1nh, h\u1ECFi tam gi\xE1c c\xF3 vu\xF4ng kh\xF4ng", action: "Ki\u1EC3m tra Pythagore **\u0111\u1EA3o**: b\xECnh ph\u01B0\u01A1ng c\u1EA1nh l\u1EDBn nh\u1EA5t c\xF3 b\u1EB1ng t\u1ED5ng b\xECnh ph\u01B0\u01A1ng hai c\u1EA1nh kia kh\xF4ng.", why: "\u0110\u1ECBnh l\xED \u0111\u1EA3o l\xE0 c\xF4ng c\u1EE5 nh\u1EADn bi\u1EBFt tam gi\xE1c vu\xF4ng t\u1EEB s\u1ED1 \u0111o." },
    { signal: "H\xECnh ch\xF3p \u0111\u1EC1u, h\u1ECFi di\u1EC7n t\xEDch xung quanh", action: "D\xF9ng $S_{xq}=\\f{1}{2}\\cdot C_{\\text{\u0111\xE1y}}\\cdot d$ v\u1EDBi $d$ l\xE0 **trung \u0111o\u1EA1n**.", why: "M\u1ED7i m\u1EB7t b\xEAn l\xE0 tam gi\xE1c c\xE2n c\xF3 \u0111\u01B0\u1EDDng cao ch\xEDnh l\xE0 trung \u0111o\u1EA1n." },
    { signal: "H\xECnh ch\xF3p, h\u1ECFi th\u1EC3 t\xEDch", action: "D\xF9ng $V=\\f{1}{3}S_{\\text{\u0111\xE1y}}\\cdot h$ v\u1EDBi $h$ l\xE0 **chi\u1EC1u cao**, kh\xF4ng ph\u1EA3i trung \u0111o\u1EA1n.", why: "Ph\xE2n bi\u1EC7t trung \u0111o\u1EA1n (cho di\u1EC7n t\xEDch) v\u1EDBi chi\u1EC1u cao (cho th\u1EC3 t\xEDch)." }
  ],
  "g8-t8": [
    { signal: "\u0110\u1EC1 cho b\u1EA3ng t\u1EA7n s\u1ED1, h\u1ECFi x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m", action: "C\u1ED9ng \u0111\xFAng c\xE1c t\u1EA7n s\u1ED1 tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n r\u1ED3i chia cho t\u1ED5ng $N$.", why: 'Sai \u1EDF b\u01B0\u1EDBc "c\u1ED9ng \u0111\xFAng nh\xF3m n\xE0o" l\xE0 sai k\u1EBFt qu\u1EA3.' },
    { signal: 'T\u1EEB kho\xE1 "d\u01B0\u1EDBi", "tr\xEAn", "\xEDt nh\u1EA5t", "kh\xF4ng qu\xE1"', action: 'X\xE1c \u0111\u1ECBnh r\xF5 c\xF3 bao g\u1ED3m gi\xE1 tr\u1ECB m\u1ED1c hay kh\xF4ng: "d\u01B0\u1EDBi/tr\xEAn" th\xEC **kh\xF4ng**, "\xEDt nh\u1EA5t/kh\xF4ng qu\xE1" th\xEC **c\xF3**.', why: "\u0110\xE2y l\xE0 b\u1EABy ng\xF4n ng\u1EEF \u0111\u01B0\u1EE3c c\xE0i trong h\u1EA7u h\u1EBFt \u0111\u1EC1 tr\u1EAFc nghi\u1EC7m." },
    { signal: "B\xE0i to\xE1n ch\u1ECDn ng\u1EABu nhi\xEAn t\u1EEB hai nh\xF3m", action: "\u0110\u1EBFm t\u1ED5ng s\u1ED1 ph\u1EA7n t\u1EED c\u1EE7a **c\u1EA3 hai nh\xF3m** l\xE0m m\u1EABu s\u1ED1.", why: "Kh\xF4ng gian m\u1EABu l\xE0 to\xE0n b\u1ED9 \u0111\u1ED1i t\u01B0\u1EE3ng c\xF3 th\u1EC3 ch\u1ECDn." },
    { signal: "H\u1ECFi \u01B0\u1EDBc l\u01B0\u1EE3ng s\u1ED1 l\u1EA7n x\u1EA3y ra khi l\u1EB7p $n$ l\u1EA7n", action: "L\u1EA5y x\xE1c su\u1EA5t nh\xE2n v\u1EDBi $n$.", why: "X\xE1c su\u1EA5t l\xE0 t\u1EC9 l\u1EC7 k\u1EF3 v\u1ECDng, nh\xE2n v\u1EDBi s\u1ED1 l\u1EA7n th\u1EED cho s\u1ED1 l\u1EA7n d\u1EF1 \u0111o\xE1n." },
    { signal: "S\u1ED1 li\u1EC7u cho \u1EDF d\u1EA1ng bi\u1EC3u \u0111\u1ED3 ch\u1EE9 kh\xF4ng ph\u1EA3i b\u1EA3ng", action: "L\u1EADp b\u1EA3ng th\u1ED1ng k\xEA t\u1EEB bi\u1EC3u \u0111\u1ED3 tr\u01B0\u1EDBc, r\u1ED3i m\u1EDBi t\xEDnh.", why: "\u0110\u1ECDc tr\u1EF1c ti\u1EBFp t\u1EEB bi\u1EC3u \u0111\u1ED3 d\u1EC5 s\xF3t ho\u1EB7c \u0111\u1ECDc nh\u1EA7m c\u1ED9t." }
  ],
  /* ============================== KHỐI 9 ============================== */
  "g9-t1": [
    { signal: "B\xE0i to\xE1n c\xF3 th\xEAm \u0111i\u1EC1u ki\u1EC7n ph\u1EE5 nh\u01B0 $x=y$ ho\u1EB7c $x+y=k$", action: "Thay \u0111i\u1EC1u ki\u1EC7n ph\u1EE5 v\xE0o ph\u01B0\u01A1ng tr\xECnh **kh\xF4ng ch\u1EE9a tham s\u1ED1** tr\u01B0\u1EDBc.", why: "T\xECm \u0111\u01B0\u1EE3c nghi\u1EC7m c\u1EE5 th\u1EC3 r\u1ED3i m\u1EDBi thay v\xE0o ph\u01B0\u01A1ng tr\xECnh c\xF3 tham s\u1ED1 \u2014 ng\u1EAFn h\u01A1n nhi\u1EC1u." },
    { signal: "B\xE0i to\xE1n ph\u1EA7n tr\u0103m hai \u0111\u1ED1i t\u01B0\u1EE3ng", action: "M\u1ED9t ph\u01B0\u01A1ng tr\xECnh cho **t\u1ED5ng s\u1ED1 l\u01B0\u1EE3ng**, m\u1ED9t ph\u01B0\u01A1ng tr\xECnh cho **t\u1ED5ng ph\u1EA7n \u0111\u1EA1t**.", why: "Hai lo\u1EA1i th\xF4ng tin kh\xE1c nhau cho hai ph\u01B0\u01A1ng tr\xECnh \u0111\u1ED9c l\u1EADp." },
    { signal: "B\xE0i to\xE1n ca n\xF4 xu\xF4i ng\u01B0\u1EE3c d\xF2ng", action: "V\u1EADn t\u1ED1c xu\xF4i $=v+v_{n}$, ng\u01B0\u1EE3c $=v-v_{n}$; qu\xE3ng \u0111\u01B0\u1EDDng hai chi\u1EC1u b\u1EB1ng nhau.", why: "D\xF2ng n\u01B0\u1EDBc \u0111\u1EA9y theo ho\u1EB7c c\u1EA3n l\u1EA1i \u0111\xFAng b\u1EB1ng v\u1EADn t\u1ED1c c\u1EE7a n\xF3." }
  ],
  "g9-t2": [
    { signal: "C\u0103n th\u1EE9c n\u1EB1m \u1EDF **m\u1EABu**", action: "\u0110i\u1EC1u ki\u1EC7n l\xE0 bi\u1EC3u th\u1EE9c d\u01B0\u1EDBi c\u0103n $>0$, kh\xF4ng ph\u1EA3i $\\ge0$.", why: "V\u1EEBa c\u1EA7n c\u0103n c\xF3 ngh\u0129a v\u1EEBa c\u1EA7n m\u1EABu kh\xE1c $0$." },
    { signal: "Bi\u1EC3u th\u1EE9c d\u1EA1ng $a\\pm2\\s{b}$ d\u01B0\u1EDBi m\u1ED9t d\u1EA5u c\u0103n l\u1EDBn", action: "T\xE1ch th\xE0nh $(\\s{m}\\pm\\s{n})^{2}$ v\u1EDBi $m+n=a$, $mn=b$.", why: '\u0110\xE2y l\xE0 k\u1EF9 thu\u1EADt "c\u0103n k\xE9p" \u2014 c\xE1ch duy nh\u1EA5t r\xFAt g\u1ECDn \u0111\u01B0\u1EE3c d\u1EA1ng n\xE0y.' },
    { signal: "C\u1EA7n so s\xE1nh hai bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n", action: "B\xECnh ph\u01B0\u01A1ng hai v\u1EBF (khi c\u1EA3 hai kh\xF4ng \xE2m) ho\u1EB7c \u0111\u01B0a h\u1EBFt v\xE0o trong m\u1ED9t d\u1EA5u c\u0103n.", why: "B\xECnh ph\u01B0\u01A1ng l\xE0 ph\xE9p bi\u1EBFn \u0111\u1ED5i t\u01B0\u01A1ng \u0111\u01B0\u01A1ng tr\xEAn mi\u1EC1n kh\xF4ng \xE2m." }
  ],
  "g9-t3": [
    { signal: '\u0110\u1EC1 n\xF3i "ph\u01B0\u01A1ng tr\xECnh c\xF3 hai nghi\u1EC7m" m\xE0 ch\u01B0a cho $\\Delta$', action: "T\xEDnh $\\Delta$ v\xE0 kh\u1EB3ng \u0111\u1ECBnh $\\Delta>0$ **tr\u01B0\u1EDBc** khi d\xF9ng Vi\xE8te.", why: "Kh\xF4ng c\xF3 nghi\u1EC7m th\xEC kh\xF4ng c\xF3 t\u1ED5ng v\xE0 t\xEDch \u0111\u1EC3 n\xF3i t\u1EDBi \u2014 m\u1EA5t \u0111i\u1EC3m l\u1EADp lu\u1EADn." },
    { signal: "Bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng c\u1EE7a hai nghi\u1EC7m", action: "Bi\u1EC3u di\u1EC5n qua $S$ v\xE0 $P$, tuy\u1EC7t \u0111\u1ED1i kh\xF4ng gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh.", why: "M\u1ECDi bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng \u0111\u1EC1u vi\u1EBFt \u0111\u01B0\u1EE3c qua t\u1ED5ng v\xE0 t\xEDch." },
    { signal: "H\u1ECFi \u0111i\u1EC1u ki\u1EC7n \u0111\u1EC3 hai nghi\u1EC7m tr\xE1i d\u1EA5u", action: "Ch\u1EC9 c\u1EA7n $P<0$, kh\xF4ng c\u1EA7n th\xEAm $\\Delta>0$.", why: "$P<0$ \u0111\xE3 t\u1EF1 k\xE9o theo $\\Delta>0$." },
    { signal: "H\u1ECFi s\u1ED1 giao \u0111i\u1EC3m c\u1EE7a parabol v\xE0 \u0111\u01B0\u1EDDng th\u1EB3ng", action: "L\u1EADp ph\u01B0\u01A1ng tr\xECnh ho\xE0nh \u0111\u1ED9 giao \u0111i\u1EC3m r\u1ED3i x\xE9t d\u1EA5u $\\Delta$.", why: "S\u1ED1 giao \u0111i\u1EC3m ch\xEDnh l\xE0 s\u1ED1 nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh \u0111\xF3." },
    { signal: "H\u1ECD \u0111\u01B0\u1EDDng th\u1EB3ng ph\u1EE5 thu\u1ED9c tham s\u1ED1 $m$, h\u1ECFi \u0111i\u1EC3m c\u1ED1 \u0111\u1ECBnh", action: "Nh\xF3m theo $m$ r\u1ED3i cho **c\u1EA3 h\u1EC7 s\u1ED1 c\u1EE7a $m$ v\xE0 ph\u1EA7n c\xF2n l\u1EA1i** b\u1EB1ng $0$.", why: "\u0110\u1EB3ng th\u1EE9c \u0111\xFAng v\u1EDBi m\u1ECDi $m$ khi v\xE0 ch\u1EC9 khi hai ph\u1EA7n \u0111\u1EC1u tri\u1EC7t ti\xEAu." }
  ],
  "g9-t4": [
    { signal: "Nh\xE2n ho\u1EB7c chia hai v\u1EBF b\u1EA5t ph\u01B0\u01A1ng tr\xECnh cho m\u1ED9t s\u1ED1 **\xE2m**", action: "**\u0110\u1ED5i chi\u1EC1u** d\u1EA5u b\u1EA5t \u0111\u1EB3ng th\u1EE9c.", why: "Nh\xE2n s\u1ED1 \xE2m l\xE0m \u0111\u1EA3o th\u1EE9 t\u1EF1 tr\xEAn tr\u1EE5c s\u1ED1." },
    { signal: "B\u1EA5t ph\u01B0\u01A1ng tr\xECnh c\xF3 m\u1EABu ch\u1EE9a \u1EA9n", action: "Kh\xF4ng nh\xE2n ch\xE9o tr\u1EF1c ti\u1EBFp \u2014 chuy\u1EC3n h\u1EBFt v\u1EC1 m\u1ED9t v\u1EBF r\u1ED3i **x\xE9t d\u1EA5u** bi\u1EC3u th\u1EE9c.", why: "Ch\u01B0a bi\u1EBFt d\u1EA5u c\u1EE7a m\u1EABu n\xEAn kh\xF4ng bi\u1EBFt c\xF3 ph\u1EA3i \u0111\u1ED5i chi\u1EC1u hay kh\xF4ng." },
    { signal: "C\u1EA7n ch\u1EE9ng minh $A\\ge B$ v\u1EDBi $A$, $B$ l\xE0 bi\u1EC3u th\u1EE9c", action: "X\xE9t hi\u1EC7u $A-B$ v\xE0 \u0111\u01B0a v\u1EC1 t\u1ED5ng c\xE1c b\xECnh ph\u01B0\u01A1ng.", why: "B\xECnh ph\u01B0\u01A1ng lu\xF4n kh\xF4ng \xE2m \u2014 c\xE1ch ch\u1EE9ng minh ch\u1EAFc ch\u1EAFn nh\u1EA5t." },
    { signal: "B\xE0i c\u1EF1c tr\u1ECB c\xF3 r\xE0ng bu\u1ED9c t\u1ED5ng b\u1EB1ng h\u1EB1ng s\u1ED1", action: "D\u1EF1 \u0111o\xE1n \u0111i\u1EC3m r\u01A1i t\u1EA1i c\xE1c bi\u1EBFn b\u1EB1ng nhau, r\u1ED3i ch\u1ECDn c\xE1ch \xE1p C\xF4-si cho kh\u1EDBp.", why: "Kh\xF4ng d\u1EF1 \u0111o\xE1n \u0111i\u1EC3m r\u01A1i th\xEC b\u1EA5t \u0111\u1EB3ng th\u1EE9c thu \u0111\u01B0\u1EE3c s\u1EBD kh\xF4ng ch\u1EB7t." },
    { signal: "T\u1ED5ng ph\xE2n th\u1EE9c c\xF3 t\u1EED l\xE0 b\xECnh ph\u01B0\u01A1ng", action: "D\xF9ng Cauchy\u2013Schwarz d\u1EA1ng c\u1ED9ng m\u1EABu $\\f{a^{2}}{x}+\\f{b^{2}}{y}\\ge\\f{(a+b)^{2}}{x+y}$.", why: "G\u1ED9p \u0111\u01B0\u1EE3c nhi\u1EC1u ph\xE2n th\u1EE9c th\xE0nh m\u1ED9t, c\u1EF1c k\u1EF3 hi\u1EC7u qu\u1EA3." }
  ],
  "g9-t5": [
    { signal: "Tam gi\xE1c vu\xF4ng c\xF3 \u0111\u01B0\u1EDDng cao \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n", action: "Vi\u1EBFt ngay b\u1ED1n h\u1EC7 th\u1EE9c: $b^{2}=ab'$, $c^{2}=ac'$, $h^{2}=b'c'$, $ah=bc$.", why: "C\u1EA5u h\xECnh n\xE0y lu\xF4n cho ba c\u1EB7p tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng, sinh ra b\u1ED1n h\u1EC7 th\u1EE9c." },
    { signal: "Bi\u1EBFt m\u1ED9t c\u1EA1nh v\xE0 m\u1ED9t g\xF3c nh\u1ECDn c\u1EE7a tam gi\xE1c vu\xF4ng", action: "D\xF9ng t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c \u0111\u1EC3 t\xECm c\u1EA1nh c\xF2n l\u1EA1i.", why: "M\u1ED7i t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c n\u1ED1i m\u1ED9t g\xF3c v\u1EDBi hai c\u1EA1nh c\u1EE5 th\u1EC3." },
    { signal: "B\xE0i to\xE1n th\u1EF1c t\u1EBF \u0111o chi\u1EC1u cao, kho\u1EA3ng c\xE1ch", action: "V\u1EBD tam gi\xE1c vu\xF4ng m\xF4 t\u1EA3, x\xE1c \u0111\u1ECBnh r\xF5 \u0111\xE2u l\xE0 c\u1EA1nh \u0111\u1ED1i, k\u1EC1, huy\u1EC1n so v\u1EDBi g\xF3c \u0111\xE3 cho.", why: "V\u1EBD \u0111\xFAng h\xECnh l\xE0 xong n\u1EEDa b\xE0i; sai vai tr\xF2 c\u1EA1nh l\xE0 sai c\xF4ng th\u1EE9c." },
    { signal: "Hai g\xF3c ph\u1EE5 nhau", action: "D\xF9ng $\\sin\\alpha=\\cos(90\\deg-\\alpha)$ v\xE0 $\\tan\\alpha=\\cot(90\\deg-\\alpha)$.", why: "Hai g\xF3c ph\u1EE5 nhau \u0111\u1ED5i vai tr\xF2 c\u1EA1nh \u0111\u1ED1i v\xE0 c\u1EA1nh k\u1EC1 cho nhau." }
  ],
  "g9-t6": [
    { signal: "C\u1EA7n ch\u1EE9ng minh t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp", action: "Ho\u1EB7c hai g\xF3c \u0111\u1ED1i b\xF9 nhau, ho\u1EB7c hai \u0111\u1EC9nh k\u1EC1 c\xF9ng nh\xECn m\u1ED9t c\u1EA1nh d\u01B0\u1EDBi g\xF3c b\u1EB1ng nhau.", why: "Hai d\u1EA5u hi\u1EC7u n\xE0y ph\u1EE7 g\u1EA7n nh\u01B0 to\xE0n b\u1ED9 \u0111\u1EC1 thi v\xE0o 10." },
    { signal: "\u0110\u1EC1 c\xF3 hai \u0111\u01B0\u1EDDng cao ho\u1EB7c hai g\xF3c vu\xF4ng", action: "S\u0103n ngay t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp \u0111\u01B0\u1EDDng tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh l\xE0 c\u1EA1nh chung.", why: "Hai g\xF3c vu\xF4ng c\xF9ng nh\xECn m\u1ED9t \u0111o\u1EA1n l\xE0 d\u1EA5u hi\u1EC7u m\u1EA1nh nh\u1EA5t." },
    { signal: "T\u1EEB m\u1ED9t \u0111i\u1EC3m ngo\xE0i \u0111\u01B0\u1EDDng tr\xF2n k\u1EBB ti\u1EBFp tuy\u1EBFn v\xE0 c\xE1t tuy\u1EBFn", action: "D\xF9ng h\u1EC7 th\u1EE9c ph\u01B0\u01A1ng t\xEDch $MT^{2}=MA\\cdot MB$.", why: "Sinh ra t\u1EEB c\u1EB7p tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng nh\u1EDD g\xF3c ti\u1EBFp tuy\u1EBFn \u2013 d\xE2y." },
    { signal: "C\u1EA7n ch\u1EE9ng minh m\u1ED9t \u0111\u01B0\u1EDDng l\xE0 ti\u1EBFp tuy\u1EBFn", action: "Ch\u1EE9ng minh n\xF3 vu\xF4ng g\xF3c v\u1EDBi b\xE1n k\xEDnh t\u1EA1i \u0111i\u1EC3m n\u1EB1m tr\xEAn \u0111\u01B0\u1EDDng tr\xF2n.", why: "\u0110\xE2y l\xE0 \u0111\u1ECBnh ngh\u0129a \u2013 d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt ti\u1EBFp tuy\u1EBFn." }
  ],
  "g9-t7": [
    { signal: "Quay tam gi\xE1c vu\xF4ng quanh m\u1ED9t c\u1EA1nh g\xF3c vu\xF4ng", action: "C\u1EA1nh quay l\xE0 **chi\u1EC1u cao**, c\u1EA1nh kia l\xE0 **b\xE1n k\xEDnh**, c\u1EA1nh huy\u1EC1n l\xE0 **\u0111\u01B0\u1EDDng sinh**.", why: "X\xE1c \u0111\u1ECBnh \u0111\xFAng ba vai tr\xF2 n\xE0y th\xEC m\u1ECDi c\xF4ng th\u1EE9c h\xECnh n\xF3n \u0111\u1EC1u d\xF9ng \u0111\u01B0\u1EE3c." },
    { signal: "H\u1ECFi di\u1EC7n t\xEDch xung quanh h\xECnh n\xF3n", action: "D\xF9ng $S_{xq}=\\pi rl$ v\u1EDBi $l$ l\xE0 **\u0111\u01B0\u1EDDng sinh**, kh\xF4ng ph\u1EA3i chi\u1EC1u cao.", why: "Tr\u1EA3i m\u1EB7t xung quanh ra \u0111\u01B0\u1EE3c h\xECnh qu\u1EA1t b\xE1n k\xEDnh $l$." },
    { signal: "Bi\u1EBFt $r$ v\xE0 $h$ c\u1EE7a h\xECnh n\xF3n, c\u1EA7n $l$", action: "D\xF9ng Pythagore: $l=\\s{r^{2}+h^{2}}$.", why: "B\xE1n k\xEDnh, chi\u1EC1u cao v\xE0 \u0111\u01B0\u1EDDng sinh t\u1EA1o th\xE0nh tam gi\xE1c vu\xF4ng." },
    { signal: "B\xE0i to\xE1n b\u1EC3 ch\u1EE9a, phao, qu\u1EA3 b\xF3ng", action: "Nh\u1EADn d\u1EA1ng kh\u1ED1i: tr\u1EE5 ($V=\\pi r^{2}h$) \xB7 n\xF3n ($V=\\f{1}{3}\\pi r^{2}h$) \xB7 c\u1EA7u ($V=\\f{4}{3}\\pi R^{3}$).", why: "Ba c\xF4ng th\u1EE9c ch\u1EC9 kh\xE1c nhau \u1EDF h\u1EC7 s\u1ED1 \u2014 nh\u1EDB theo h\u1EC7 s\u1ED1 l\xE0 an to\xE0n nh\u1EA5t." },
    { signal: "Kh\u1ED1i gh\xE9p t\u1EEB nhi\u1EC1u h\xECnh", action: "T\xE1ch th\xE0nh c\xE1c kh\u1ED1i c\u01A1 b\u1EA3n r\u1ED3i c\u1ED9ng ho\u1EB7c tr\u1EEB th\u1EC3 t\xEDch.", why: "Th\u1EC3 t\xEDch c\u1ED9ng \u0111\u01B0\u1EE3c khi c\xE1c ph\u1EA7n kh\xF4ng ch\u1ED3ng l\xEAn nhau." }
  ],
  "g9-t8": [
    { signal: "\u0110\u1EC1 cho b\u1EA3ng t\u1EA7n s\u1ED1 gh\xE9p nh\xF3m", action: "L\u1EA5y **gi\xE1 tr\u1ECB \u0111\u1EA1i di\u1EC7n** c\u1EE7a m\u1ED7i nh\xF3m (trung \u0111i\u1EC3m) r\u1ED3i t\xEDnh nh\u01B0 b\u1EA3ng th\u01B0\u1EDDng.", why: "Gh\xE9p nh\xF3m l\xE0m m\u1EA5t s\u1ED1 li\u1EC7u g\u1ED1c n\xEAn ph\u1EA3i thay b\u1EB1ng \u0111\u1EA1i di\u1EC7n." },
    { signal: "H\u1ECFi t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i", action: "L\u1EA5y t\u1EA7n s\u1ED1 chia t\u1ED5ng r\u1ED3i nh\xE2n $100\\%$.", why: "T\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i cho ph\xE9p so s\xE1nh gi\u1EEFa c\xE1c b\u1ED9 d\u1EEF li\u1EC7u kh\xE1c c\u1EE1." },
    { signal: "Ph\xE9p th\u1EED g\u1ED3m **hai giai \u0111o\u1EA1n** (tung hai l\u1EA7n, r\xFAt hai th\u1EBB)", action: "L\u1EADp **s\u01A1 \u0111\u1ED3 h\xECnh c\xE2y** ho\u1EB7c b\u1EA3ng \u0111\u1EC3 li\u1EC7t k\xEA \u0111\u1EE7 kh\xF4ng gian m\u1EABu.", why: "Li\u1EC7t k\xEA nh\u1EA9m r\u1EA5t d\u1EC5 s\xF3t tr\u01B0\u1EDDng h\u1EE3p; s\u01A1 \u0111\u1ED3 c\xE2y b\u1EA3o \u0111\u1EA3m kh\xF4ng b\u1ECF s\xF3t." },
    { signal: '\u0110\u1EC1 h\u1ECFi x\xE1c su\u1EA5t c\u1EE7a bi\u1EBFn c\u1ED1 "\xEDt nh\u1EA5t m\u1ED9t..."', action: "T\xEDnh x\xE1c su\u1EA5t bi\u1EBFn c\u1ED1 **\u0111\u1ED1i** r\u1ED3i l\u1EA5y $1$ tr\u1EEB \u0111i.", why: 'Bi\u1EBFn c\u1ED1 \u0111\u1ED1i ("kh\xF4ng c\xF3 c\xE1i n\xE0o") th\u01B0\u1EDDng ch\u1EC9 c\xF3 m\u1ED9t tr\u01B0\u1EDDng h\u1EE3p, \u0111\u1EBFm nhanh h\u01A1n nhi\u1EC1u.' },
    { signal: "R\xFAt th\u1EBB, ch\u1ECDn ng\u01B0\u1EDDi **kh\xF4ng ho\xE0n l\u1EA1i**", action: "Sau m\u1ED7i l\u1EA7n ch\u1ECDn, t\u1ED5ng s\u1ED1 gi\u1EA3m \u0111i $1$.", why: "Kh\xF4ng ho\xE0n l\u1EA1i th\xEC kh\xF4ng gian m\u1EABu thay \u0111\u1ED5i gi\u1EEFa hai giai \u0111o\u1EA1n." }
  ]
};

// src/content/formulas.ts
var FORMULAS = [
  /* ------------------------------ LỚP 6 ------------------------------ */
  { id: "f6-1", grade: 6, strand: "SO_DAI_SO", topic: "L\u0169y th\u1EEBa", name: "Nh\xE2n hai l\u0169y th\u1EEBa c\xF9ng c\u01A1 s\u1ED1", formula: "$a^{m}\\cdot a^{n}=a^{m+n}$", usage: "R\xFAt g\u1ECDn t\xEDch c\xE1c l\u0169y th\u1EEBa c\xF9ng c\u01A1 s\u1ED1.", trap: "C\u1ED9ng s\u1ED1 m\u0169, kh\xF4ng nh\xE2n s\u1ED1 m\u0169." },
  { id: "f6-2", grade: 6, strand: "SO_DAI_SO", topic: "L\u0169y th\u1EEBa", name: "Chia hai l\u0169y th\u1EEBa c\xF9ng c\u01A1 s\u1ED1", formula: "$a^{m}:a^{n}=a^{m-n}$", condition: "$a\\ne0$, $m\\ge n$", usage: "R\xFAt g\u1ECDn th\u01B0\u01A1ng c\xE1c l\u0169y th\u1EEBa.", trap: "Qu\xEAn \u0111i\u1EC1u ki\u1EC7n $a\\ne0$." },
  { id: "f6-3", grade: 6, strand: "SO_DAI_SO", topic: "T\xEDnh chia h\u1EBFt", name: "D\u1EA5u hi\u1EC7u chia h\u1EBFt cho 3 v\xE0 9", formula: "T\u1ED5ng c\xE1c ch\u1EEF s\u1ED1 chia h\u1EBFt cho 3 (ho\u1EB7c 9)", usage: "T\xECm ch\u1EEF s\u1ED1 ch\u01B0a bi\u1EBFt, x\xE9t t\xEDnh chia h\u1EBFt.", trap: "Chia h\u1EBFt cho 9 th\xEC chia h\u1EBFt cho 3, chi\u1EC1u ng\u01B0\u1EE3c l\u1EA1i sai." },
  { id: "f6-4", grade: 6, strand: "SO_DAI_SO", topic: "\u01AFCLN \u2013 BCNN", name: "Quy t\u1EAFc t\xECm \u01AFCLN", formula: "Th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 **chung**, s\u1ED1 m\u0169 **nh\u1ECF nh\u1EA5t**", usage: "B\xE0i to\xE1n chia \u0111\u1EC1u th\xE0nh nhi\u1EC1u ph\u1EA7n nh\u1EA5t.", trap: "Nh\u1EA7m v\u1EDBi BCNN (chung v\xE0 ri\xEAng, m\u0169 l\u1EDBn nh\u1EA5t)." },
  { id: "f6-5", grade: 6, strand: "SO_DAI_SO", topic: "\u01AFCLN \u2013 BCNN", name: "Li\xEAn h\u1EC7 \u01AFCLN v\xE0 BCNN", formula: "$\\text{\u01AFCLN}(a,b)\\cdot\\text{BCNN}(a,b)=a\\cdot b$", usage: "T\xECm nhanh m\u1ED9t trong hai khi bi\u1EBFt c\xE1i c\xF2n l\u1EA1i.", trap: "Ch\u1EC9 \u0111\xFAng cho **hai** s\u1ED1, kh\xF4ng m\u1EDF r\u1ED9ng cho ba s\u1ED1." },
  { id: "f6-6", grade: 6, strand: "SO_DAI_SO", topic: "S\u1ED1 \u01B0\u1EDBc", name: "\u0110\u1EBFm s\u1ED1 \u01B0\u1EDBc c\u1EE7a m\u1ED9t s\u1ED1", formula: "$n=p_1^{a_1}p_2^{a_2}\\cdots p_k^{a_k}\\Rightarrow$ s\u1ED1 \u01B0\u1EDBc $=(a_1+1)(a_2+1)\\cdots(a_k+1)$", usage: "C\xE2u h\u1ECFi \u201Cc\xF3 bao nhi\xEAu \u01B0\u1EDBc\u201D.", trap: "Qu\xEAn c\u1ED9ng 1 v\xE0o m\u1ED7i s\u1ED1 m\u0169." },
  { id: "f6-7", grade: 6, strand: "SO_DAI_SO", topic: "Ph\xE2n s\u1ED1", name: "Hai b\xE0i to\xE1n c\u01A1 b\u1EA3n v\u1EC1 ph\xE2n s\u1ED1", formula: "$\\f{m}{n}$ c\u1EE7a $a$ l\xE0 $a\\cdot\\f{m}{n}$ ; bi\u1EBFt $\\f{m}{n}$ c\u1EE7a $x$ b\u1EB1ng $b$ th\xEC $x=b:\\f{m}{n}$", usage: "B\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EC1 ph\u1EA7n \u2013 to\xE0n th\u1EC3.", trap: "Nh\u1EA7m chi\u1EC1u nh\xE2n/chia." },
  { id: "f6-8", grade: 6, strand: "SO_DAI_SO", topic: "Ph\xE2n s\u1ED1", name: "T\u1ED5ng sai ph\xE2n", formula: "$\\f{1}{n(n+1)}=\\f{1}{n}-\\f{1}{n+1}$", usage: "T\xEDnh t\u1ED5ng d\xE3y ph\xE2n s\u1ED1 c\xF3 quy lu\u1EADt.", trap: "Ch\u1EC9 \xE1p d\u1EE5ng khi m\u1EABu l\xE0 t\xEDch hai s\u1ED1 li\xEAn ti\u1EBFp (ho\u1EB7c c\xE1ch \u0111\u1EC1u)." },
  { id: "f6-9", grade: 6, strand: "SO_DAI_SO", topic: "T\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m", name: "T\u0103ng \u2013 gi\u1EA3m li\xEAn ti\u1EBFp", formula: "$A(1\\pm\\f{m}{100})(1\\pm\\f{n}{100})$", usage: "Gi\u1EA3m gi\xE1 nhi\u1EC1u l\u1EA7n, l\xE3i k\xE9p.", trap: "Kh\xF4ng \u0111\u01B0\u1EE3c c\u1ED9ng d\u1ED3n ph\u1EA7n tr\u0103m c\u1EE7a hai l\u1EA7n." },
  { id: "f6-10", grade: 6, strand: "HINH_HOC", topic: "Di\u1EC7n t\xEDch", name: "Di\u1EC7n t\xEDch h\xECnh thoi", formula: "$S=\\f{1}{2}mn$ ($m$, $n$ l\xE0 hai \u0111\u01B0\u1EDDng ch\xE9o)", usage: "Khi \u0111\u1EC1 cho hai \u0111\u01B0\u1EDDng ch\xE9o.", trap: "Qu\xEAn h\u1EC7 s\u1ED1 $\\f{1}{2}$." },
  { id: "f6-11", grade: 6, strand: "HINH_HOC", topic: "Di\u1EC7n t\xEDch", name: "Di\u1EC7n t\xEDch h\xECnh thang", formula: "$S=\\f{(a+b)h}{2}$", usage: "Hai \u0111\xE1y $a$, $b$ v\xE0 chi\u1EC1u cao $h$.", trap: "L\u1EA5y c\u1EA1nh b\xEAn l\xE0m chi\u1EC1u cao." },
  { id: "f6-12", grade: 6, strand: "HINH_HOC", topic: "\u0110o\u1EA1n th\u1EB3ng", name: "H\u1EC7 th\u1EE9c c\u1ED9ng \u0111o\u1EA1n th\u1EB3ng", formula: "$M$ n\u1EB1m gi\u1EEFa $A$, $B$ $\\Leftrightarrow AM+MB=AB$", usage: "T\xEDnh \u0111\u1ED9 d\xE0i, ch\u1EE9ng minh trung \u0111i\u1EC3m.", trap: "D\xF9ng h\u1EC7 th\u1EE9c khi ch\u01B0a l\u1EADp lu\u1EADn \u0111i\u1EC3m n\u1EB1m gi\u1EEFa." },
  /* ------------------------------ LỚP 7 ------------------------------ */
  { id: "f7-1", grade: 7, strand: "SO_DAI_SO", topic: "L\u0169y th\u1EEBa", name: "L\u0169y th\u1EEBa c\u1EE7a l\u0169y th\u1EEBa", formula: "$(x^{m})^{n}=x^{mn}$", usage: "\u0110\u01B0a v\u1EC1 c\xF9ng c\u01A1 s\u1ED1 khi so s\xE1nh.", trap: "Nh\u1EA7m v\u1EDBi $x^{m}\\cdot x^{n}=x^{m+n}$." },
  { id: "f7-2", grade: 7, strand: "SO_DAI_SO", topic: "Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i", name: "\u0110\u1ECBnh ngh\u0129a hai nh\xE1nh", formula: "$\\abs{x}=x$ n\u1EBFu $x\\ge0$ ; $\\abs{x}=-x$ n\u1EBFu $x<0$", usage: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh, b\u1EA5t ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a d\u1EA5u $\\abs{\\ }$.", trap: "Qu\xEAn nh\xE1nh \xE2m khi gi\u1EA3i $\\abs{A}=a$." },
  { id: "f7-3", grade: 7, strand: "SO_DAI_SO", topic: "Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i", name: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c cho s\u1ED1", formula: "$\\abs{a}+\\abs{b}\\ge\\abs{a+b}$", condition: "D\u1EA5u \u201C=\u201D khi $a$, $b$ c\xF9ng d\u1EA5u", usage: "T\xECm GTNN c\u1EE7a t\u1ED5ng hai gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i.", trap: "Qu\xEAn n\xEAu \u0111i\u1EC1u ki\u1EC7n d\u1EA5u b\u1EB1ng." },
  { id: "f7-4", grade: 7, strand: "SO_DAI_SO", topic: "T\u1EC9 l\u1EC7 th\u1EE9c", name: "T\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau", formula: "$\\f{a}{b}=\\f{c}{d}=\\f{a+c}{b+d}=\\f{a-c}{b-d}$", condition: "$b+d\\ne0$, $b-d\\ne0$", usage: "B\xE0i to\xE1n chia ph\u1EA7n theo t\u1EC9 l\u1EC7.", trap: "\xC1p d\u1EE5ng cho **t\xEDch** \u2014 sai; ph\u1EA3i \u0111\u1EB7t tham s\u1ED1 $t$." },
  { id: "f7-5", grade: 7, strand: "SO_DAI_SO", topic: "\u0110\u1EA1i l\u01B0\u1EE3ng t\u1EC9 l\u1EC7", name: "T\u1EC9 l\u1EC7 ngh\u1ECBch", formula: "$x_1y_1=x_2y_2=a$", usage: "B\xE0i to\xE1n ng\u01B0\u1EDDi \u2013 vi\u1EC7c \u2013 th\u1EDDi gian, v\u1EADn t\u1ED1c \u2013 th\u1EDDi gian.", trap: "\u201CT\u1EC9 l\u1EC7 ngh\u1ECBch v\u1EDBi $m;n;p$\u201D = \u201Ct\u1EC9 l\u1EC7 thu\u1EADn v\u1EDBi $\\f{1}{m};\\f{1}{n};\\f{1}{p}$\u201D." },
  { id: "f7-6", grade: 7, strand: "HINH_HOC", topic: "Tam gi\xE1c", name: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c", formula: "$\\abs{b-c}<a<b+c$", usage: "X\xE9t ba \u0111\u1ED9 d\xE0i c\xF3 l\u1EADp th\xE0nh tam gi\xE1c kh\xF4ng.", trap: "Ch\u1EC9 c\u1EA7n ki\u1EC3m tra v\u1EDBi c\u1EA1nh l\u1EDBn nh\u1EA5t." },
  { id: "f7-7", grade: 7, strand: "HINH_HOC", topic: "Tam gi\xE1c", name: "Tr\u1ECDng t\xE2m chia trung tuy\u1EBFn", formula: "$AG=\\f{2}{3}AM$ ; $GM=\\f{1}{3}AM$", usage: "T\xEDnh \u0111\u1ED9 d\xE0i li\xEAn quan tr\u1ECDng t\xE2m.", trap: "Nh\u1EA7m t\u1EC9 s\u1ED1 $\\f{2}{3}$ v\xE0 $\\f{1}{2}$." },
  { id: "f7-8", grade: 7, strand: "HINH_HOC", topic: "\u0110\u01B0\u1EDDng th\u1EB3ng song song", name: "T\xEDnh ch\u1EA5t hai \u0111\u01B0\u1EDDng song song", formula: "So le trong b\u1EB1ng nhau; \u0111\u1ED3ng v\u1ECB b\u1EB1ng nhau; trong c\xF9ng ph\xEDa b\xF9 nhau", usage: "T\xEDnh s\u1ED1 \u0111o g\xF3c trong h\xECnh c\xF3 hai \u0111\u01B0\u1EDDng song song.", trap: "L\u1EABn chi\u1EC1u \u201Cd\u1EA5u hi\u1EC7u\u201D v\xE0 chi\u1EC1u \u201Ct\xEDnh ch\u1EA5t\u201D." },
  { id: "f7-9", grade: 7, strand: "HINH_HOC", topic: "H\xECnh kh\u1ED1i", name: "L\u0103ng tr\u1EE5 \u0111\u1EE9ng", formula: "$S_{xq}=C_{\\text{\u0111\xE1y}}\\cdot h$ ; $V=S_{\\text{\u0111\xE1y}}\\cdot h$", usage: "B\xE0i to\xE1n l\u1EC1u tr\u1EA1i, th\xF9ng ch\u1EE9a.", trap: "$1\\,dm^{3}=1$ l\xEDt." },
  /* ------------------------------ LỚP 8 ------------------------------ */
  { id: "f8-1", grade: 8, strand: "SO_DAI_SO", topic: "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c", name: "B\xECnh ph\u01B0\u01A1ng c\u1EE7a m\u1ED9t t\u1ED5ng", formula: "$(A+B)^{2}=A^{2}+2AB+B^{2}$", usage: "Khai tri\u1EC3n, ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng.", trap: "Qu\xEAn h\u1EA1ng t\u1EED $2AB$." },
  { id: "f8-2", grade: 8, strand: "SO_DAI_SO", topic: "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c", name: "Hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng", formula: "$A^{2}-B^{2}=(A-B)(A+B)$", usage: "Ph\xE2n t\xEDch nh\xE2n t\u1EED, t\xEDnh nhanh.", trap: "$A^{2}+B^{2}$ kh\xF4ng ph\xE2n t\xEDch \u0111\u01B0\u1EE3c tr\xEAn $\\R$." },
  { id: "f8-3", grade: 8, strand: "SO_DAI_SO", topic: "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c", name: "T\u1ED5ng hai l\u1EADp ph\u01B0\u01A1ng", formula: "$A^{3}+B^{3}=(A+B)(A^{2}-AB+B^{2})$", usage: "Ph\xE2n t\xEDch nh\xE2n t\u1EED b\u1EADc ba.", trap: "Ngo\u1EB7c th\u1EE9 hai l\xE0 b\xECnh ph\u01B0\u01A1ng **thi\u1EBFu**: $-AB$ ch\u1EE9 kh\xF4ng ph\u1EA3i $-2AB$." },
  { id: "f8-4", grade: 8, strand: "SO_DAI_SO", topic: "C\u1EF1c tr\u1ECB", name: "Ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng", formula: "$x^{2}+bx=\\left(x+\\f{b}{2}\\right)^{2}-\\f{b^{2}}{4}$", usage: "T\xECm GTNN, GTLN c\u1EE7a tam th\u1EE9c b\u1EADc hai.", trap: "Qu\xEAn tr\u1EEB l\u1EA1i $\\f{b^{2}}{4}$." },
  { id: "f8-5", grade: 8, strand: "SO_DAI_SO", topic: "N\u0103ng su\u1EA5t", name: "C\u1ED9ng n\u0103ng su\u1EA5t", formula: "$\\f{1}{t_1}+\\f{1}{t_2}=\\f{1}{t}$", usage: "B\xE0i to\xE1n l\xE0m chung \u2013 l\xE0m ri\xEAng.", trap: "Kh\xF4ng bao gi\u1EDD c\u1ED9ng th\u1EDDi gian." },
  { id: "f8-6", grade: 8, strand: "SO_DAI_SO", topic: "H\xE0m s\u1ED1", name: "V\u1ECB tr\xED t\u01B0\u01A1ng \u0111\u1ED1i hai \u0111\u01B0\u1EDDng th\u1EB3ng", formula: "Song song $\\Leftrightarrow a=a'$, $b\\ne b'$ ; C\u1EAFt nhau $\\Leftrightarrow a\\ne a'$", usage: "B\xE0i to\xE1n tham s\u1ED1 v\u1EC1 \u0111\u01B0\u1EDDng th\u1EB3ng.", trap: "Qu\xEAn \u0111i\u1EC1u ki\u1EC7n $b\\ne b'$ khi n\xF3i song song." },
  { id: "f8-7", grade: 8, strand: "HINH_HOC", topic: "Thal\xE8s", name: "\u0110\u1ECBnh l\xED Thal\xE8s", formula: "$MN\\para BC\\Rightarrow\\f{AM}{MB}=\\f{AN}{NC}$", usage: "T\xEDnh \u0111\u1ED9 d\xE0i trong h\xECnh c\xF3 \u0111\u01B0\u1EDDng song song.", trap: "Vi\u1EBFt sai th\u1EE9 t\u1EF1 t\u01B0\u01A1ng \u1EE9ng c\u1EE7a t\u1EC9 s\u1ED1." },
  { id: "f8-8", grade: 8, strand: "HINH_HOC", topic: "Ph\xE2n gi\xE1c", name: "T\xEDnh ch\u1EA5t \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c", formula: "$\\f{DB}{DC}=\\f{AB}{AC}$", condition: "$AD$ l\xE0 ph\xE2n gi\xE1c g\xF3c $A$", usage: "T\xEDnh \u0111\u1ED9 d\xE0i \u0111o\u1EA1n b\u1ECB chia b\u1EDFi ph\xE2n gi\xE1c.", trap: "Nh\u1EA7m th\u1EE9 t\u1EF1 t\u1EED \u2013 m\u1EABu." },
  { id: "f8-9", grade: 8, strand: "HINH_HOC", topic: "\u0110\u1ED3ng d\u1EA1ng", name: "T\u1EC9 s\u1ED1 di\u1EC7n t\xEDch hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng", formula: "$\\f{S_1}{S_2}=k^{2}$", condition: "$k$ l\xE0 t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng", usage: "So s\xE1nh di\u1EC7n t\xEDch.", trap: "D\xF9ng $k$ thay v\xEC $k^{2}$." },
  { id: "f8-10", grade: 8, strand: "HINH_HOC", topic: "Pythagore", name: "\u0110\u1ECBnh l\xED Pythagore", formula: "$BC^{2}=AB^{2}+AC^{2}$", condition: "$\\tri ABC$ vu\xF4ng t\u1EA1i $A$", usage: "T\xEDnh c\u1EA1nh, ki\u1EC3m tra tam gi\xE1c vu\xF4ng.", trap: "C\u1EA1nh huy\u1EC1n lu\xF4n l\xE0 c\u1EA1nh l\u1EDBn nh\u1EA5t." },
  /* ------------------------------ LỚP 9 ------------------------------ */
  { id: "f9-1", grade: 9, strand: "SO_DAI_SO", topic: "C\u0103n th\u1EE9c", name: "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c c\u0103n", formula: "$\\s{A^{2}}=\\abs{A}$", usage: "R\xFAt g\u1ECDn c\u0103n th\u1EE9c.", trap: "Vi\u1EBFt $\\s{A^{2}}=A$ khi ch\u01B0a bi\u1EBFt d\u1EA5u c\u1EE7a $A$." },
  { id: "f9-2", grade: 9, strand: "SO_DAI_SO", topic: "C\u0103n th\u1EE9c", name: "Tr\u1EE5c c\u0103n th\u1EE9c \u1EDF m\u1EABu", formula: "$\\f{C}{\\s{A}\\pm\\s{B}}=\\f{C(\\s{A}\\mp\\s{B})}{A-B}$", condition: "$A\\ne B$, $A,B\\ge0$", usage: "Kh\u1EED c\u0103n \u1EDF m\u1EABu.", trap: "Qu\xEAn \u0111\u1ED5i d\u1EA5u \u1EDF bi\u1EC3u th\u1EE9c li\xEAn h\u1EE3p." },
  { id: "f9-3", grade: 9, strand: "SO_DAI_SO", topic: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai", name: "C\xF4ng th\u1EE9c nghi\u1EC7m", formula: "$x_{1,2}=\\f{-b\\pm\\s{\\Delta}}{2a}$ v\u1EDBi $\\Delta=b^{2}-4ac$", condition: "$a\\ne0$, $\\Delta\\ge0$", usage: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai.", trap: "Qu\xEAn ki\u1EC3m tra $a\\ne0$ khi c\xF3 tham s\u1ED1." },
  { id: "f9-4", grade: 9, strand: "SO_DAI_SO", topic: "Vi\xE8te", name: "H\u1EC7 th\u1EE9c Vi\xE8te", formula: "$S=x_1+x_2=-\\f{b}{a}$ ; $P=x_1x_2=\\f{c}{a}$", condition: "Ph\u01B0\u01A1ng tr\xECnh c\xF3 nghi\u1EC7m ($\\Delta\\ge0$)", usage: "T\xEDnh bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng, b\xE0i to\xE1n tham s\u1ED1.", trap: "D\xF9ng Vi\xE8te m\xE0 ch\u01B0a ki\u1EC3m tra $\\Delta\\ge0$." },
  { id: "f9-5", grade: 9, strand: "SO_DAI_SO", topic: "Vi\xE8te", name: "Bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng th\u01B0\u1EDDng g\u1EB7p", formula: "$x_1^{2}+x_2^{2}=S^{2}-2P$ ; $(x_1-x_2)^{2}=S^{2}-4P$ ; $x_1^{3}+x_2^{3}=S^{3}-3PS$", usage: "C\xE2u ph\xE2n lo\u1EA1i thi v\xE0o 10.", trap: "Nh\u1EDB nh\u1EA7m $S^{2}-4P$ th\xE0nh $S^{2}-2P$." },
  { id: "f9-6", grade: 9, strand: "SO_DAI_SO", topic: "Vi\xE8te", name: "D\u1EA5u c\u1EE7a hai nghi\u1EC7m", formula: "Tr\xE1i d\u1EA5u $\\Leftrightarrow P<0$ ; C\xF9ng d\u01B0\u01A1ng $\\Leftrightarrow\\Delta\\ge0$, $S>0$, $P>0$", usage: "B\xE0i to\xE1n tham s\u1ED1 v\u1EC1 d\u1EA5u nghi\u1EC7m.", trap: "Tr\xE1i d\u1EA5u th\xEC kh\xF4ng c\u1EA7n \u0111i\u1EC1u ki\u1EC7n $\\Delta$ (t\u1EF1 \u0111\u1ED9ng $\\Delta>0$)." },
  { id: "f9-7", grade: 9, strand: "SO_DAI_SO", topic: "Nh\u1EA9m nghi\u1EC7m", name: "Nh\u1EA9m nghi\u1EC7m nhanh", formula: "$a+b+c=0\\Rightarrow x_1=1,\\ x_2=\\f{c}{a}$ ; $a-b+c=0\\Rightarrow x_1=-1,\\ x_2=-\\f{c}{a}$", usage: "Ti\u1EBFt ki\u1EC7m th\u1EDDi gian trong ph\xF2ng thi.", trap: "Ch\u1EC9 d\xF9ng khi ki\u1EC3m tra \u0111\xFAng t\u1ED5ng h\u1EC7 s\u1ED1." },
  { id: "f9-8", grade: 9, strand: "HINH_HOC", topic: "H\u1EC7 th\u1EE9c l\u01B0\u1EE3ng", name: "H\u1EC7 th\u1EE9c v\u1EC1 c\u1EA1nh v\xE0 \u0111\u01B0\u1EDDng cao", formula: "$b^{2}=ab'$ ; $c^{2}=ac'$ ; $h^{2}=b'c'$ ; $ah=bc$ ; $\\f{1}{h^{2}}=\\f{1}{b^{2}}+\\f{1}{c^{2}}$", condition: "Tam gi\xE1c vu\xF4ng c\xF3 \u0111\u01B0\u1EDDng cao \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n", usage: "T\xEDnh c\u1EA1nh, \u0111\u01B0\u1EDDng cao, h\xECnh chi\u1EBFu.", trap: "Nh\u1EA7m h\xECnh chi\u1EBFu c\u1EE7a c\u1EA1nh n\xE0y v\u1EDBi c\u1EA1nh kia." },
  { id: "f9-9", grade: 9, strand: "HINH_HOC", topic: "L\u01B0\u1EE3ng gi\xE1c", name: "H\u1EC7 th\u1EE9c l\u01B0\u1EE3ng gi\xE1c c\u01A1 b\u1EA3n", formula: "$\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$ ; $\\tan\\alpha=\\f{\\sin\\alpha}{\\cos\\alpha}$ ; $\\tan\\alpha\\cot\\alpha=1$", usage: "T\xEDnh t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c c\xF2n l\u1EA1i.", trap: "V\u1EDBi g\xF3c nh\u1ECDn m\u1ECDi t\u1EC9 s\u1ED1 \u0111\u1EC1u d\u01B0\u01A1ng." },
  { id: "f9-10", grade: 9, strand: "HINH_HOC", topic: "\u0110\u01B0\u1EDDng tr\xF2n", name: "G\xF3c n\u1ED9i ti\u1EBFp", formula: "G\xF3c n\u1ED9i ti\u1EBFp $=\\f{1}{2}$ s\u1ED1 \u0111o cung b\u1ECB ch\u1EAFn", usage: "Chuy\u1EC3n g\xF3c th\xE0nh cung v\xE0 ng\u01B0\u1EE3c l\u1EA1i.", trap: "G\xF3c \u1EDF t\xE2m b\u1EB1ng c\u1EA3 cung, kh\xF4ng ph\u1EA3i n\u1EEDa cung." },
  { id: "f9-11", grade: 9, strand: "HINH_HOC", topic: "T\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp", name: "D\u1EA5u hi\u1EC7u t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp", formula: "T\u1ED5ng hai g\xF3c \u0111\u1ED1i $=180\\deg$ ; hai \u0111\u1EC9nh k\u1EC1 c\xF9ng nh\xECn m\u1ED9t c\u1EA1nh d\u01B0\u1EDBi hai g\xF3c b\u1EB1ng nhau", usage: "\xDD a c\u1EE7a c\xE2u h\xECnh thi v\xE0o 10.", trap: "Ph\u1EA3i ch\u1EC9 r\xF5 hai g\xF3c **\u0111\u1ED1i** nhau." },
  { id: "f9-12", grade: 9, strand: "HINH_HOC", topic: "\u0110\u01B0\u1EDDng tr\xF2n", name: "\u0110\u1ED9 d\xE0i cung v\xE0 di\u1EC7n t\xEDch qu\u1EA1t", formula: "$l=\\f{\\pi Rn}{180}$ ; $S_{quat}=\\f{\\pi R^{2}n}{360}=\\f{lR}{2}$", condition: "$n$ t\xEDnh b\u1EB1ng \u0111\u1ED9", usage: "T\xEDnh \u0111\u1ED9 d\xE0i cung, di\u1EC7n t\xEDch h\xECnh qu\u1EA1t.", trap: "Nh\u1EA7m m\u1EABu 180 v\xE0 360." },
  { id: "f9-13", grade: 9, strand: "HINH_HOC", topic: "H\xECnh kh\u1ED1i tr\xF2n xoay", name: "H\xECnh n\xF3n v\xE0 h\xECnh c\u1EA7u", formula: "$S_{xq}^{non}=\\pi rl$ ; $V^{non}=\\f{1}{3}\\pi r^{2}h$ ; $S^{cau}=4\\pi R^{2}$ ; $V^{cau}=\\f{4}{3}\\pi R^{3}$", usage: "B\xE0i to\xE1n h\xECnh kh\u1ED1i tr\xF2n xoay.", trap: "Ph\xE2n bi\u1EC7t \u0111\u01B0\u1EDDng sinh $l$ v\xE0 chi\u1EC1u cao $h$: $l^{2}=r^{2}+h^{2}$." }
];

// src/content/formulas-plus.ts
var FORMULAS_PLUS = [
  /* ------------------------------ LỚP 6 ------------------------------ */
  { id: "f6-13", grade: 6, strand: "SO_DAI_SO", topic: "T\xEDnh nhanh", name: "C\u1EB7p s\u1ED1 tr\xF2n c\u1EA7n thu\u1ED9c", formula: "$25\\cdot4=100$ ; $125\\cdot8=1000$ ; $50\\cdot2=100$ ; $5\\cdot2=10$", usage: "T\xE1ch th\u1EEBa s\u1ED1 \u0111\u1EC3 t\u1EA1o s\u1ED1 tr\xF2n khi t\xEDnh nhanh.", trap: "T\xE1ch xong ph\u1EA3i ki\u1EC3m tra t\xEDch c\xF2n \u0111\xFAng b\u1EB1ng s\u1ED1 ban \u0111\u1EA7u." },
  { id: "f6-14", grade: 6, strand: "SO_DAI_SO", topic: "D\xE3y s\u1ED1", name: "T\u1ED5ng d\xE3y s\u1ED1 c\xE1ch \u0111\u1EC1u", formula: "$S=\\f{(\\text{\u0111\u1EA7u}+\\text{cu\u1ED1i})\\cdot n}{2}$ v\u1EDBi $n=\\f{\\text{cu\u1ED1i}-\\text{\u0111\u1EA7u}}{d}+1$", usage: "T\xEDnh t\u1ED5ng $1+2+\\dots+n$ ho\u1EB7c d\xE3y c\xE1ch \u0111\u1EC1u b\u1EA5t k\u1EF3.", trap: "Qu\xEAn c\u1ED9ng 1 khi \u0111\u1EBFm s\u1ED1 s\u1ED1 h\u1EA1ng." },
  { id: "f6-15", grade: 6, strand: "SO_DAI_SO", topic: "L\u0169y th\u1EEBa", name: "T\u1ED5ng c\xE1c l\u0169y th\u1EEBa li\xEAn ti\u1EBFp", formula: "$S=1+a+a^{2}+\\dots+a^{n}\\Rightarrow S=\\f{a^{n+1}-1}{a-1}$", condition: "$a\\ne1$", usage: "T\xEDnh t\u1ED5ng d\xE3y l\u0169y th\u1EEBa, ch\u1EE9ng minh chia h\u1EBFt.", trap: "C\xE1ch l\xE0m g\u1ED1c: nh\xE2n $S$ v\u1EDBi $a$ r\u1ED3i tr\u1EEB theo v\u1EBF." },
  { id: "f6-16", grade: 6, strand: "SO_DAI_SO", topic: "S\u1ED1 nguy\xEAn", name: "Quy t\u1EAFc d\u1EA5u c\u1EE7a t\xEDch", formula: "Ch\u1EB5n th\u1EEBa s\u1ED1 \xE2m $\\to$ t\xEDch d\u01B0\u01A1ng ; l\u1EBB th\u1EEBa s\u1ED1 \xE2m $\\to$ t\xEDch \xE2m", usage: "X\xE1c \u0111\u1ECBnh d\u1EA5u tr\u01B0\u1EDBc khi nh\xE2n c\xE1c gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i.", trap: "$(-2)^{4}=16$ nh\u01B0ng $-2^{4}=-16$ \u2014 d\u1EA5u ngo\u1EB7c quy\u1EBFt \u0111\u1ECBnh." },
  { id: "f6-17", grade: 6, strand: "SO_DAI_SO", topic: "Ph\xE2n s\u1ED1", name: "So s\xE1nh ph\xE2n s\u1ED1", formula: "C\xF9ng m\u1EABu: so t\u1EED. C\xF9ng t\u1EED: m\u1EABu nh\u1ECF h\u01A1n th\xEC l\u1EDBn h\u01A1n. Kh\xE1c c\u1EA3 hai: quy \u0111\u1ED3ng ho\u1EB7c so v\u1EDBi 1.", usage: "S\u1EAFp th\u1EE9 t\u1EF1 nhi\u1EC1u ph\xE2n s\u1ED1.", trap: "V\u1EDBi ph\xE2n s\u1ED1 \xE2m, m\u1ECDi so s\xE1nh \u0111\u1EA3o chi\u1EC1u." },
  { id: "f6-18", grade: 6, strand: "HINH_HOC", topic: "\u0110\u01A1n v\u1ECB \u0111o", name: "\u0110\u1ED5i \u0111\u01A1n v\u1ECB di\u1EC7n t\xEDch v\xE0 th\u1EC3 t\xEDch", formula: "$1\\,m=100\\,cm$ nh\u01B0ng $1\\,m^{2}=10\\,000\\,cm^{2}$ v\xE0 $1\\,m^{3}=1\\,000\\,000\\,cm^{3}$", usage: "B\xE0i to\xE1n l\xE1t g\u1EA1ch, s\u01A1n t\u01B0\u1EDDng, b\u1EC3 n\u01B0\u1EDBc.", trap: "\u0110\u1ED5i \u0111\u01A1n v\u1ECB theo b\u1EADc 1 cho di\u1EC7n t\xEDch \u2014 l\u1ED7i m\u1EA5t \u0111i\u1EC3m s\u1ED1 1." },
  { id: "f6-19", grade: 6, strand: "HINH_HOC", topic: "\u0110\u01A1n v\u1ECB \u0111o", name: "\u0110\u01A1n v\u1ECB dung t\xEDch", formula: "$1\\,dm^{3}=1$ l\xEDt $=1000\\,cm^{3}$ ; $1\\,m^{3}=1000$ l\xEDt", usage: "B\xE0i to\xE1n b\u1EC3 n\u01B0\u1EDBc, th\xF9ng ch\u1EE9a.", trap: "Nh\u1EDB d\xF9ng chi\u1EC1u cao **c\u1ED9t n\u01B0\u1EDBc**, kh\xF4ng ph\u1EA3i chi\u1EC1u cao b\u1EC3." },
  { id: "f6-20", grade: 6, strand: "HINH_HOC", topic: "G\xF3c", name: "H\u1EC7 th\u1EE9c c\u1ED9ng g\xF3c", formula: "Tia $Oy$ n\u1EB1m gi\u1EEFa $Ox$, $Oz$ $\\Rightarrow\\angle xOy+\\angle yOz=\\angle xOz$", usage: "T\xEDnh s\u1ED1 \u0111o g\xF3c, ch\u1EE9ng minh tia ph\xE2n gi\xE1c.", trap: "Ph\u1EA3i l\u1EADp lu\u1EADn tia n\u1EB1m gi\u1EEFa tr\u01B0\u1EDBc khi d\xF9ng h\u1EC7 th\u1EE9c." },
  { id: "f6-21", grade: 6, strand: "THONG_KE_XS", topic: "X\xE1c su\u1EA5t", name: "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m", formula: "$P=\\f{\\text{s\u1ED1 l\u1EA7n bi\u1EBFn c\u1ED1 x\u1EA3y ra}}{\\text{t\u1ED5ng s\u1ED1 l\u1EA7n th\u1EF1c hi\u1EC7n}}$", condition: "$0\\le P\\le1$", usage: "Tr\xF2 ch\u01A1i gieo x\xFAc x\u1EAFc, tung \u0111\u1ED3ng xu.", trap: "K\u1EBFt qu\u1EA3 ph\u1EA3i n\u1EB1m trong \u0111o\u1EA1n t\u1EEB 0 \u0111\u1EBFn 1 \u2014 n\u1EBFu v\u01B0\u1EE3t th\xEC \u0111\xE3 t\xEDnh sai." },
  /* ------------------------------ LỚP 7 ------------------------------ */
  { id: "f7-10", grade: 7, strand: "SO_DAI_SO", topic: "L\u0169y th\u1EEBa", name: "L\u0169y th\u1EEBa c\u1EE7a m\u1ED9t th\u01B0\u01A1ng", formula: "$\\left(\\f{x}{y}\\right)^{n}=\\f{x^{n}}{y^{n}}$", condition: "$y\\ne0$", usage: "R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c c\xF3 ph\xE2n s\u1ED1 m\u0169.", trap: "Kh\xF4ng \xE1p d\u1EE5ng \u0111\u01B0\u1EE3c cho t\u1ED5ng: $(x+y)^{n}\\ne x^{n}+y^{n}$." },
  { id: "f7-11", grade: 7, strand: "SO_DAI_SO", topic: "S\u1ED1 th\u1EF1c", name: "C\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc", formula: "$\\s{a}=b\\Leftrightarrow b\\ge0$ v\xE0 $b^{2}=a$", condition: "$a\\ge0$", usage: "T\xEDnh gi\xE1 tr\u1ECB c\u0103n, gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh \u0111\u01A1n gi\u1EA3n.", trap: "$\\s{9}=3$ (m\u1ED9t gi\xE1 tr\u1ECB) nh\u01B0ng $x^{2}=9\\Rightarrow x=\\pm3$ (hai gi\xE1 tr\u1ECB)." },
  { id: "f7-12", grade: 7, strand: "SO_DAI_SO", topic: "T\u1EC9 l\u1EC7 th\u1EE9c", name: "D\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau c\xF3 h\u1EC7 s\u1ED1", formula: "$\\f{a}{b}=\\f{c}{d}=\\f{ma+nc}{mb+nd}$", condition: "$mb+nd\\ne0$", usage: "Khi \u0111\u1EC1 cho t\u1ED5ng/hi\u1EC7u c\xF3 h\u1EC7 s\u1ED1, v\xED d\u1EE5 $2a+3c=k$.", trap: "Ch\u1ECDn $m$, $n$ sao cho t\u1EED s\u1ED1 kh\u1EDBp \u0111\xFAng d\u1EEF ki\u1EC7n \u0111\u1EC1 cho." },
  { id: "f7-13", grade: 7, strand: "SO_DAI_SO", topic: "\u0110a th\u1EE9c", name: "\u0110\u1ECBnh l\xED B\xE9zout (l\u1EDBp 7 - 8)", formula: "$P(x)$ chia h\u1EBFt cho $(x-a)\\Leftrightarrow P(a)=0$", usage: "T\xECm tham s\u1ED1 \u0111\u1EC3 \u0111a th\u1EE9c chia h\u1EBFt, x\xE1c \u0111\u1ECBnh nghi\u1EC7m.", trap: "D\xF9ng thay cho ph\xE9p chia d\xE0i \u2014 nhanh h\u01A1n nhi\u1EC1u l\u1EA7n." },
  { id: "f7-14", grade: 7, strand: "HINH_HOC", topic: "Tam gi\xE1c", name: "G\xF3c ngo\xE0i c\u1EE7a tam gi\xE1c", formula: "G\xF3c ngo\xE0i t\u1EA1i m\u1ED9t \u0111\u1EC9nh $=$ t\u1ED5ng hai g\xF3c trong kh\xF4ng k\u1EC1 v\u1EDBi n\xF3", usage: "T\xEDnh g\xF3c nhanh m\xE0 kh\xF4ng c\u1EA7n t\xEDnh g\xF3c trong t\u01B0\u01A1ng \u1EE9ng.", trap: "Ph\u1EA3i l\u1EA5y hai g\xF3c **kh\xF4ng k\u1EC1**, kh\xF4ng ph\u1EA3i hai g\xF3c b\u1EA5t k\u1EF3." },
  { id: "f7-15", grade: 7, strand: "HINH_HOC", topic: "Tam gi\xE1c", name: "B\u1ED1n tr\u01B0\u1EDDng h\u1EE3p b\u1EB1ng nhau c\u1EE7a tam gi\xE1c vu\xF4ng", formula: "Hai c\u1EA1nh g\xF3c vu\xF4ng ; C\u1EA1nh g\xF3c vu\xF4ng \u2013 g\xF3c nh\u1ECDn k\u1EC1 ; C\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn ; C\u1EA1nh huy\u1EC1n \u2013 c\u1EA1nh g\xF3c vu\xF4ng", usage: "Ch\u1EE9ng minh hai tam gi\xE1c vu\xF4ng b\u1EB1ng nhau.", trap: "Tr\u01B0\u1EDDng h\u1EE3p c\u1EA1nh huy\u1EC1n \u2013 c\u1EA1nh g\xF3c vu\xF4ng ch\u1EC9 \u0111\xFAng cho tam gi\xE1c vu\xF4ng." },
  { id: "f7-16", grade: 7, strand: "HINH_HOC", topic: "\u0110\u01B0\u1EDDng trung tr\u1EF1c", name: "T\xEDnh ch\u1EA5t \u0111i\u1EC3m thu\u1ED9c trung tr\u1EF1c", formula: "$M$ thu\u1ED9c trung tr\u1EF1c c\u1EE7a $AB\\Leftrightarrow MA=MB$", usage: "Ch\u1EE9ng minh c\xE1ch \u0111\u1EC1u, ch\u1EE9ng minh thu\u1ED9c trung tr\u1EF1c.", trap: "\u0110\xE2y l\xE0 \u0111i\u1EC1u ki\u1EC7n c\u1EA7n v\xE0 \u0111\u1EE7 \u2014 d\xF9ng \u0111\u01B0\u1EE3c theo c\u1EA3 hai chi\u1EC1u." },
  { id: "f7-17", grade: 7, strand: "THONG_KE_XS", topic: "X\xE1c su\u1EA5t", name: "X\xE1c su\u1EA5t trong m\xF4 h\xECnh \u0111\u1ED3ng kh\u1EA3 n\u0103ng", formula: "$P(A)=\\f{m}{k}$ v\u1EDBi $m$ l\xE0 s\u1ED1 k\u1EBFt qu\u1EA3 thu\u1EADn l\u1EE3i, $k$ l\xE0 t\u1ED5ng s\u1ED1 k\u1EBFt qu\u1EA3", usage: "R\xFAt th\u1EBB, gieo x\xFAc x\u1EAFc, tung \u0111\u1ED3ng xu.", trap: "Ch\u1EC9 d\xF9ng khi c\xE1c k\u1EBFt qu\u1EA3 **\u0111\u1ED3ng kh\u1EA3 n\u0103ng**." },
  /* ------------------------------ LỚP 8 ------------------------------ */
  { id: "f8-11", grade: 8, strand: "SO_DAI_SO", topic: "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c", name: "B\xECnh ph\u01B0\u01A1ng c\u1EE7a m\u1ED9t hi\u1EC7u", formula: "$(A-B)^{2}=A^{2}-2AB+B^{2}$", usage: "Khai tri\u1EC3n, ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng, t\xEDnh nhanh.", trap: "H\u1EA1ng t\u1EED gi\u1EEFa mang d\u1EA5u tr\u1EEB, hai h\u1EA1ng t\u1EED ngo\xE0i lu\xF4n d\u01B0\u01A1ng." },
  { id: "f8-12", grade: 8, strand: "SO_DAI_SO", topic: "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c", name: "L\u1EADp ph\u01B0\u01A1ng c\u1EE7a m\u1ED9t t\u1ED5ng", formula: "$(A+B)^{3}=A^{3}+3A^{2}B+3AB^{2}+B^{3}$", usage: "Khai tri\u1EC3n b\u1EADc ba, ph\xE2n t\xEDch nh\xE2n t\u1EED.", trap: "H\u1EC7 s\u1ED1 l\xE0 $1;3;3;1$ \u2014 d\u1EC5 nh\u1EA7m th\xE0nh $1;2;2;1$." },
  { id: "f8-13", grade: 8, strand: "SO_DAI_SO", topic: "Nh\xE2n t\u1EED", name: "T\xE1ch h\u1EA1ng t\u1EED cho tam th\u1EE9c", formula: "$ax^{2}+bx+c$: t\xECm hai s\u1ED1 c\xF3 t\xEDch $ac$ v\xE0 t\u1ED5ng $b$", usage: "Ph\xE2n t\xEDch tam th\u1EE9c b\u1EADc hai th\xE0nh nh\xE2n t\u1EED.", trap: "Khi $a\\ne1$ ph\u1EA3i l\u1EA5y t\xEDch $ac$, kh\xF4ng ph\u1EA3i $c$." },
  { id: "f8-14", grade: 8, strand: "SO_DAI_SO", topic: "Nh\xE2n t\u1EED", name: "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c Sophie Germain", formula: "$x^{4}+4y^{4}=(x^{2}-2xy+2y^{2})(x^{2}+2xy+2y^{2})$", usage: "\u0110\u1EC1 h\u1ECDc sinh gi\u1ECFi, ph\xE2n t\xEDch $x^{4}+4$.", trap: "K\u1EF9 thu\u1EADt g\u1ED1c: th\xEAm v\xE0 b\u1EDBt $4x^{2}y^{2}$." },
  { id: "f8-15", grade: 8, strand: "SO_DAI_SO", topic: "Chuy\u1EC3n \u0111\u1ED9ng", name: "C\xF4ng th\u1EE9c chuy\u1EC3n \u0111\u1ED9ng", formula: "$s=v\\cdot t$ ; xu\xF4i d\xF2ng $v+v_{n}$ ; ng\u01B0\u1EE3c d\xF2ng $v-v_{n}$", usage: "B\xE0i to\xE1n l\u1EADp ph\u01B0\u01A1ng tr\xECnh v\u1EC1 chuy\u1EC3n \u0111\u1ED9ng.", trap: "\u0110\u1ED5i ph\xFAt sang gi\u1EDD tr\u01B0\u1EDBc khi thay v\xE0o c\xF4ng th\u1EE9c." },
  { id: "f8-16", grade: 8, strand: "SO_DAI_SO", topic: "S\u1ED1 h\u1ECDc", name: "Bi\u1EC3u di\u1EC5n s\u1ED1 c\xF3 hai, ba ch\u1EEF s\u1ED1", formula: "$\\ov{ab}=10a+b$ ; $\\ov{abc}=100a+10b+c$", condition: "$1\\le a\\le9$, $0\\le b,c\\le9$", usage: "B\xE0i to\xE1n t\xECm s\u1ED1 khi \u0111\u1ED5i ch\u1ED7 ch\u1EEF s\u1ED1.", trap: "Nh\u1EDB \u0111i\u1EC1u ki\u1EC7n ch\u1EEF s\u1ED1 \u0111\u1EA7u kh\xE1c 0." },
  { id: "f8-17", grade: 8, strand: "HINH_HOC", topic: "\u0110\u01B0\u1EDDng trung b\xECnh", name: "\u0110\u01B0\u1EDDng trung b\xECnh c\u1EE7a tam gi\xE1c v\xE0 h\xECnh thang", formula: "Tam gi\xE1c: $MN\\para BC$, $MN=\\f{BC}{2}$. H\xECnh thang: $MN\\para$ hai \u0111\xE1y, $MN=\\f{a+b}{2}$", usage: "Ch\u1EE9ng minh song song, t\xEDnh \u0111\u1ED9 d\xE0i.", trap: "Ph\u1EA3i n\u1ED1i trung \u0111i\u1EC3m **hai c\u1EA1nh** m\u1EDBi l\xE0 \u0111\u01B0\u1EDDng trung b\xECnh." },
  { id: "f8-18", grade: 8, strand: "HINH_HOC", topic: "T\u1EE9 gi\xE1c", name: "Trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n", formula: "Tam gi\xE1c vu\xF4ng t\u1EA1i $A$, $M$ l\xE0 trung \u0111i\u1EC3m $BC$ $\\Rightarrow AM=\\f{BC}{2}=MB=MC$", usage: "Cho ngay ba \u0111o\u1EA1n b\u1EB1ng nhau \u2014 r\u1EA5t m\u1EA1nh khi ch\u1EE9ng minh.", trap: "Chi\u1EC1u ng\u01B0\u1EE3c l\u1EA1i c\u0169ng \u0111\xFAng: n\u1EBFu $AM=\\f{BC}{2}$ th\xEC tam gi\xE1c vu\xF4ng t\u1EA1i $A$." },
  { id: "f8-19", grade: 8, strand: "HINH_HOC", topic: "\u0110\u1ED3ng d\u1EA1ng", name: "Ba tr\u01B0\u1EDDng h\u1EE3p \u0111\u1ED3ng d\u1EA1ng", formula: "c.c.c (ba c\u1EA1nh t\u1EC9 l\u1EC7) ; c.g.c (hai c\u1EA1nh t\u1EC9 l\u1EC7, g\xF3c xen gi\u1EEFa b\u1EB1ng nhau) ; g.g (hai g\xF3c b\u1EB1ng nhau)", usage: "g.g l\xE0 tr\u01B0\u1EDDng h\u1EE3p nh\u1EB9 \u0111i\u1EC1u ki\u1EC7n nh\u1EA5t, d\xF9ng nhi\u1EC1u nh\u1EA5t.", trap: "Vi\u1EBFt \u0111\xFAng th\u1EE9 t\u1EF1 \u0111\u1EC9nh t\u01B0\u01A1ng \u1EE9ng khi k\xFD hi\u1EC7u $\\sim$." },
  { id: "f8-20", grade: 8, strand: "HINH_HOC", topic: "H\xECnh ch\xF3p", name: "H\xECnh ch\xF3p \u0111\u1EC1u", formula: "$S_{xq}=p\\cdot d$ ($p$ l\xE0 n\u1EEDa chu vi \u0111\xE1y, $d$ l\xE0 trung \u0111o\u1EA1n) ; $V=\\f{1}{3}S_{\\text{\u0111\xE1y}}\\cdot h$", usage: "B\xE0i to\xE1n m\xF4 h\xECnh kim t\u1EF1 th\xE1p, l\u1EC1u tr\u1EA1i.", trap: "Ph\xE2n bi\u1EC7t trung \u0111o\u1EA1n $d$ (tr\xEAn m\u1EB7t b\xEAn) v\u1EDBi chi\u1EC1u cao $h$ (trong kh\u1ED1i)." },
  /* ------------------------------ LỚP 9 ------------------------------ */
  { id: "f9-14", grade: 9, strand: "SO_DAI_SO", topic: "C\u0103n th\u1EE9c", name: "\u0110\u01B0a th\u1EEBa s\u1ED1 ra ngo\xE0i d\u1EA5u c\u0103n", formula: "$\\s{A^{2}B}=\\abs{A}\\s{B}$", condition: "$B\\ge0$", usage: "R\xFAt g\u1ECDn c\u0103n, c\u1ED9ng tr\u1EEB c\xE1c c\u0103n \u0111\u1ED3ng d\u1EA1ng.", trap: "Gi\u1EEF d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i khi ch\u01B0a bi\u1EBFt d\u1EA5u c\u1EE7a $A$." },
  { id: "f9-15", grade: 9, strand: "SO_DAI_SO", topic: "C\u0103n th\u1EE9c", name: "R\xFAt g\u1ECDn c\u0103n k\xE9p", formula: "$a\\pm2\\s{b}=(\\s{m}\\pm\\s{n})^{2}$ v\u1EDBi $m+n=a$, $mn=b$", usage: "R\xFAt g\u1ECDn $\\s{7+4\\s{3}}$ v\xE0 c\xE1c bi\u1EC3u th\u1EE9c t\u01B0\u01A1ng t\u1EF1.", trap: "K\u1EBFt qu\u1EA3 ph\u1EA3i kh\xF4ng \xE2m \u2014 nh\u1EDB x\xE9t d\u1EA5u tr\u01B0\u1EDBc khi b\u1ECF gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i." },
  { id: "f9-16", grade: 9, strand: "SO_DAI_SO", topic: "H\u1EC7 ph\u01B0\u01A1ng tr\xECnh", name: "S\u1ED1 nghi\u1EC7m c\u1EE7a h\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh", formula: "Nghi\u1EC7m duy nh\u1EA5t $\\Leftrightarrow ab'-a'b\\ne0$ ; v\xF4 nghi\u1EC7m ho\u1EB7c v\xF4 s\u1ED1 nghi\u1EC7m khi $ab'-a'b=0$", usage: "B\xE0i to\xE1n tham s\u1ED1 v\u1EC1 h\u1EC7 ph\u01B0\u01A1ng tr\xECnh.", trap: "D\xF9ng $ab'-a'b$ thay cho t\u1EC9 s\u1ED1 \u0111\u1EC3 tr\xE1nh chia cho 0." },
  { id: "f9-17", grade: 9, strand: "SO_DAI_SO", topic: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai", name: "C\xF4ng th\u1EE9c nghi\u1EC7m thu g\u1ECDn", formula: "V\u1EDBi $b=2b'$: $\\Delta'=b'^{2}-ac$ ; $x_{1,2}=\\f{-b'\\pm\\s{\\Delta'}}{a}$", usage: "Khi h\u1EC7 s\u1ED1 $b$ ch\u1EB5n \u2014 t\xEDnh nhanh v\xE0 s\u1ED1 nh\u1ECF h\u01A1n.", trap: "Nh\u1EDB d\xF9ng $b'=\\f{b}{2}$, kh\xF4ng ph\u1EA3i $b$." },
  { id: "f9-18", grade: 9, strand: "SO_DAI_SO", topic: "Vi\xE8te", name: "Nh\u1EA9m hai s\u1ED1 bi\u1EBFt t\u1ED5ng v\xE0 t\xEDch", formula: "Hai s\u1ED1 c\xF3 t\u1ED5ng $S$ v\xE0 t\xEDch $P$ l\xE0 nghi\u1EC7m c\u1EE7a $X^{2}-SX+P=0$", condition: "$S^{2}-4P\\ge0$", usage: "B\xE0i to\xE1n t\xECm hai s\u1ED1, l\u1EADp ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai t\u1EEB hai nghi\u1EC7m.", trap: "D\u1EA5u trong ph\u01B0\u01A1ng tr\xECnh l\xE0 $-S$ v\xE0 $+P$." },
  { id: "f9-19", grade: 9, strand: "SO_DAI_SO", topic: "Ph\u01B0\u01A1ng tr\xECnh", name: "Ph\u01B0\u01A1ng tr\xECnh tr\xF9ng ph\u01B0\u01A1ng", formula: "$ax^{4}+bx^{2}+c=0$: \u0111\u1EB7t $t=x^{2}\\ge0$ r\u1ED3i gi\u1EA3i theo $t$", usage: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh b\u1EADc b\u1ED1n d\u1EA1ng \u0111\u1EB7c bi\u1EC7t.", trap: "Lo\u1EA1i nghi\u1EC7m $t<0$ tr\u01B0\u1EDBc khi quay v\u1EC1 $x$; m\u1ED7i $t>0$ cho hai gi\xE1 tr\u1ECB $x=\\pm\\s{t}$." },
  { id: "f9-20", grade: 9, strand: "SO_DAI_SO", topic: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c", name: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si (AM\u2013GM)", formula: "$a+b\\ge2\\s{ab}$ ; $a+b+c\\ge3\\cb{abc}$", condition: "$a,b,c\\ge0$; d\u1EA5u \u201C=\u201D khi c\xE1c s\u1ED1 b\u1EB1ng nhau", usage: "T\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a t\u1ED5ng khi t\xEDch l\xE0 h\u1EB1ng s\u1ED1.", trap: "Lu\xF4n n\xEAu \u0111i\u1EC1u ki\u1EC7n kh\xF4ng \xE2m tr\u01B0\u1EDBc khi \xE1p d\u1EE5ng." },
  { id: "f9-21", grade: 9, strand: "SO_DAI_SO", topic: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c", name: "H\u1EC7 qu\u1EA3 C\xF4-si th\u01B0\u1EDDng d\xF9ng", formula: "$x+\\f{1}{x}\\ge2$ v\u1EDBi $x>0$ ; $\\f{a}{b}+\\f{b}{a}\\ge2$ v\u1EDBi $a,b$ c\xF9ng d\u1EA5u", usage: "C\u1EF1c tr\u1ECB bi\u1EC3u th\u1EE9c ph\xE2n th\u1EE9c.", trap: "V\u1EDBi $x<0$ th\xEC b\u1EA5t \u0111\u1EB3ng th\u1EE9c \u0111\u1EA3o chi\u1EC1u: $x+\\f{1}{x}\\le-2$." },
  { id: "f9-22", grade: 9, strand: "HINH_HOC", topic: "L\u01B0\u1EE3ng gi\xE1c", name: "Gi\xE1 tr\u1ECB l\u01B0\u1EE3ng gi\xE1c g\xF3c \u0111\u1EB7c bi\u1EC7t", formula: "$\\sin30\\deg=\\f{1}{2}$ ; $\\sin45\\deg=\\f{\\s{2}}{2}$ ; $\\sin60\\deg=\\f{\\s{3}}{2}$ ; $\\tan45\\deg=1$", usage: "T\xEDnh nhanh trong tam gi\xE1c vu\xF4ng c\xF3 g\xF3c \u0111\u1EB7c bi\u1EC7t.", trap: "$\\cos$ \u0111\u1ECDc ng\u01B0\u1EE3c l\u1EA1i: $\\cos30\\deg=\\f{\\s{3}}{2}$, $\\cos60\\deg=\\f{1}{2}$." },
  { id: "f9-23", grade: 9, strand: "HINH_HOC", topic: "L\u01B0\u1EE3ng gi\xE1c", name: "G\xF3c ph\u1EE5 nhau", formula: "N\u1EBFu $\\alpha+\\beta=90\\deg$ th\xEC $\\sin\\alpha=\\cos\\beta$ ; $\\tan\\alpha=\\cot\\beta$", usage: "R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c l\u01B0\u1EE3ng gi\xE1c, so s\xE1nh t\u1EC9 s\u1ED1.", trap: "Ch\u1EC9 \u0111\xFAng khi hai g\xF3c ph\u1EE5 nhau, kh\xF4ng ph\u1EA3i b\xF9 nhau." },
  { id: "f9-24", grade: 9, strand: "HINH_HOC", topic: "\u0110\u01B0\u1EDDng tr\xF2n", name: "Hai ti\u1EBFp tuy\u1EBFn c\u1EAFt nhau", formula: "$MA=MB$ ; $MO$ l\xE0 ph\xE2n gi\xE1c $\\angle AMB$ v\xE0 $\\angle AOB$ ; $MO\\perp AB$ t\u1EA1i trung \u0111i\u1EC3m $AB$", usage: "M\u1ED9t gi\u1EA3 thi\u1EBFt cho b\u1ED1n k\u1EBFt lu\u1EADn \u2014 khai th\xE1c tri\u1EC7t \u0111\u1EC3.", trap: "\u0110\u1EEBng ch\u1EC9 d\xF9ng $MA=MB$ m\xE0 b\u1ECF qu\xEAn ba k\u1EBFt lu\u1EADn c\xF2n l\u1EA1i." },
  { id: "f9-25", grade: 9, strand: "HINH_HOC", topic: "\u0110\u01B0\u1EDDng tr\xF2n", name: "Ph\u01B0\u01A1ng t\xEDch c\u1EE7a m\u1ED9t \u0111i\u1EC3m", formula: "$MA\\cdot MB=MC\\cdot MD=MT^{2}$", condition: "$MT$ l\xE0 ti\u1EBFp tuy\u1EBFn, $MAB$ v\xE0 $MCD$ l\xE0 c\xE1t tuy\u1EBFn", usage: "Ch\u1EE9ng minh h\u1EC7 th\u1EE9c t\xEDch, \xFD c\u2013d c\u1EE7a c\xE2u h\xECnh thi v\xE0o 10.", trap: "Ch\u1EE9ng minh b\u1EB1ng hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng (g\xF3c ti\u1EBFp tuy\u1EBFn \u2013 d\xE2y)." },
  { id: "f9-26", grade: 9, strand: "HINH_HOC", topic: "\u0110\u01B0\u1EDDng tr\xF2n", name: "G\xF3c c\xF3 \u0111\u1EC9nh trong v\xE0 ngo\xE0i \u0111\u01B0\u1EDDng tr\xF2n", formula: "\u0110\u1EC9nh b\xEAn trong: $\\f{1}{2}$(t\u1ED5ng hai cung b\u1ECB ch\u1EAFn). \u0110\u1EC9nh b\xEAn ngo\xE0i: $\\f{1}{2}$(hi\u1EC7u hai cung b\u1ECB ch\u1EAFn)", usage: "T\xEDnh g\xF3c trong c\xE1c c\u1EA5u h\xECnh c\xE1t tuy\u1EBFn.", trap: "B\xEAn trong l\u1EA5y t\u1ED5ng, b\xEAn ngo\xE0i l\u1EA5y hi\u1EC7u \u2014 r\u1EA5t d\u1EC5 nh\u1EA7m." },
  { id: "f9-27", grade: 9, strand: "HINH_HOC", topic: "H\xECnh kh\u1ED1i", name: "Li\xEAn h\u1EC7 trong h\xECnh n\xF3n", formula: "$l^{2}=r^{2}+h^{2}$", usage: "T\xECm chi\u1EC1u cao khi bi\u1EBFt b\xE1n k\xEDnh v\xE0 \u0111\u01B0\u1EDDng sinh.", trap: "\u0110\u01B0\u1EDDng sinh $l$ lu\xF4n l\xE0 c\u1EA1nh l\u1EDBn nh\u1EA5t trong tam gi\xE1c vu\xF4ng \u0111\xF3." },
  { id: "f9-28", grade: 9, strand: "THONG_KE_XS", topic: "Th\u1ED1ng k\xEA", name: "T\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i", formula: "$f_i=\\f{n_i}{N}\\cdot100\\percent$ ; $\\sum f_i=100\\percent$", usage: "L\u1EADp b\u1EA3ng t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i, v\u1EBD bi\u1EC3u \u0111\u1ED3 qu\u1EA1t tr\xF2n.", trap: "Ki\u1EC3m tra t\u1ED5ng c\xE1c t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i ph\u1EA3i b\u1EB1ng 100%." }
];

// src/content/formulas-merged.ts
var RANK = { SO_DAI_SO: 0, HINH_HOC: 1, THONG_KE_XS: 2, THUC_TIEN: 3 };
var FORMULAS2 = [...FORMULAS, ...FORMULAS_PLUS].sort(
  (a, b) => a.grade - b.grade || RANK[a.strand] - RANK[b.strand] || a.topic.localeCompare(b.topic, "vi")
);

// src/content/hsg.ts
var HSG_TOPICS_BASE = [
  {
    id: "hsg-6-1",
    grade: 6,
    name: "S\u1ED1 h\u1ECDc n\xE2ng cao l\u1EDBp 6 \u2014 Chia h\u1EBFt v\xE0 Nguy\xEAn t\u1ED1 c\xF9ng nhau",
    summary: "K\u1EF9 thu\u1EADt t\u1ED5 h\u1EE3p tuy\u1EBFn t\xEDnh, nguy\xEAn l\xFD Dirichlet c\u01A1 b\u1EA3n, ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng, t\u1ED5ng l\u0169y th\u1EEBa.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 Kh\u1EED \u1EA9n b\u1EB1ng t\u1ED5 h\u1EE3p tuy\u1EBFn t\xEDnh",
        detail: [
          "\u0110\u1EB7t $d$ l\xE0 \u01B0\u1EDBc chung c\u1EE7a hai bi\u1EC3u th\u1EE9c ch\u1EE9a $n$.",
          "Nh\xE2n ch\xE9o h\u1EC7 s\u1ED1 \u0111\u1EC3 tri\u1EC7t ti\xEAu $n$, thu \u0111\u01B0\u1EE3c h\u1EB1ng s\u1ED1 chia h\u1EBFt cho $d$.",
          "Ch\u1EB7n $d$ theo \u01B0\u1EDBc c\u1EE7a h\u1EB1ng s\u1ED1 \u0111\xF3."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 T\u1ED5ng l\u0169y th\u1EEBa b\u1EB1ng nh\xE2n c\u01A1 s\u1ED1 r\u1ED3i tr\u1EEB",
        detail: [
          "V\u1EDBi $S=1+a+a^{2}+\\dots+a^{n}$, x\xE9t $aS$ r\u1ED3i l\u1EA5y $aS-S$.",
          "K\u1EBFt qu\u1EA3: $S=\\f{a^{n+1}-1}{a-1}$.",
          "\u1EE8ng d\u1EE5ng: ch\u1EE9ng minh $S$ chia h\u1EBFt cho m\u1ED9t s\u1ED1, so s\xE1nh hai t\u1ED5ng."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 Ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng theo chu k\u1EF3",
        detail: [
          "Ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng c\u1EE7a $a^{n}$ l\u1EB7p l\u1EA1i theo chu k\u1EF3 (th\u01B0\u1EDDng l\xE0 4).",
          "$2$: chu k\u1EF3 $2;4;8;6$ \u2014 $3$: chu k\u1EF3 $3;9;7;1$ \u2014 $7$: chu k\u1EF3 $7;9;3;1$.",
          "L\u1EA5y $n$ chia 4 \u0111\u1EC3 x\xE1c \u0111\u1ECBnh v\u1ECB tr\xED trong chu k\u1EF3."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 4 \u2014 Nguy\xEAn l\xFD Dirichlet (ng\u0103n k\xE9o)",
        detail: [
          "Nh\u1ED1t $n+1$ con th\u1ECF v\xE0o $n$ c\xE1i l\u1ED3ng th\xEC c\xF3 \xEDt nh\u1EA5t m\u1ED9t l\u1ED3ng ch\u1EE9a t\u1EEB 2 con tr\u1EDF l\xEAn.",
          "B\u01B0\u1EDBc kh\xF3 nh\u1EA5t l\xE0 **thi\u1EBFt k\u1EBF l\u1ED3ng**: th\u01B0\u1EDDng l\xE0 c\xE1c l\u1EDBp s\u1ED1 d\u01B0 khi chia cho $m$."
        ]
      }
    ],
    mindmap: {
      root: "S\u1ED0 H\u1ECCC N\xC2NG CAO L\u1EDAP 6",
      branches: [
        { title: "Chia h\u1EBFt", items: ["T\u1ED5 h\u1EE3p tuy\u1EBFn t\xEDnh", "Ba s\u1ED1 li\xEAn ti\u1EBFp", "\u0110\u1ED3ng d\u01B0 c\u01A1 b\u1EA3n"] },
        { title: "Nguy\xEAn t\u1ED1", items: ["Nguy\xEAn t\u1ED1 c\xF9ng nhau", "Ph\xE2n t\xEDch th\u1EEBa s\u1ED1", "S\u1ED1 \u01B0\u1EDBc, t\u1ED5ng \u01B0\u1EDBc"] },
        { title: "D\xE3y s\u1ED1", items: ["T\u1ED5ng l\u0169y th\u1EEBa", "T\u1ED5ng sai ph\xE2n", "Quy n\u1EA1p"] },
        { title: "Dirichlet", items: ["Thi\u1EBFt k\u1EBF l\u1ED3ng theo s\u1ED1 d\u01B0", "B\xE0i to\xE1n ch\u1ECDn s\u1ED1", "B\xE0i to\xE1n h\xECnh h\u1ECDc r\u1EDDi r\u1EA1c"] }
      ]
    },
    examples: [
      {
        prompt: "Ch\u1EE9ng minh r\u1EB1ng trong 6 s\u1ED1 nguy\xEAn b\u1EA5t k\u1EF3, lu\xF4n t\u1ED3n t\u1EA1i hai s\u1ED1 c\xF3 hi\u1EC7u chia h\u1EBFt cho 5.",
        thinking: [
          "B\xE0i to\xE1n \u201Ct\u1ED3n t\u1EA1i hai s\u1ED1 c\xF3 hi\u1EC7u chia h\u1EBFt cho 5\u201D g\u1EE3i ngay Dirichlet.",
          "Hi\u1EC7u chia h\u1EBFt cho 5 ngh\u0129a l\xE0 hai s\u1ED1 c\xF3 **c\xF9ng s\u1ED1 d\u01B0** khi chia cho 5.",
          "S\u1ED1 d\u01B0 khi chia cho 5 ch\u1EC9 c\xF3 5 kh\u1EA3 n\u0103ng: 0, 1, 2, 3, 4 \u2014 \u0111\xF3 ch\xEDnh l\xE0 5 c\xE1i l\u1ED3ng."
        ],
        solution: [
          "Khi chia m\u1ED9t s\u1ED1 nguy\xEAn cho 5, s\u1ED1 d\u01B0 ch\u1EC9 c\xF3 th\u1EC3 l\xE0 0, 1, 2, 3 ho\u1EB7c 4 \u2014 c\xF3 5 kh\u1EA3 n\u0103ng.",
          "Ta c\xF3 6 s\u1ED1 nguy\xEAn (6 \u201Ccon th\u1ECF\u201D) x\u1EBFp v\xE0o 5 l\u1EDBp s\u1ED1 d\u01B0 (5 \u201Cc\xE1i l\u1ED3ng\u201D).",
          "Theo nguy\xEAn l\xFD Dirichlet, t\u1ED3n t\u1EA1i \xEDt nh\u1EA5t hai s\u1ED1 c\xF9ng thu\u1ED9c m\u1ED9t l\u1EDBp s\u1ED1 d\u01B0.",
          "Hai s\u1ED1 \u0111\xF3 c\xF3 c\xF9ng s\u1ED1 d\u01B0 khi chia cho 5, n\xEAn hi\u1EC7u c\u1EE7a ch\xFAng chia h\u1EBFt cho 5."
        ],
        remark: "M\u1EA5u ch\u1ED1t l\xE0 d\u1ECBch \u201Chi\u1EC7u chia h\u1EBFt cho 5\u201D th\xE0nh \u201Cc\xF9ng s\u1ED1 d\u01B0 khi chia cho 5\u201D."
      }
    ]
  },
  {
    id: "hsg-7-1",
    grade: 7,
    name: "\u0110\u1EA1i s\u1ED1 n\xE2ng cao l\u1EDBp 7 \u2014 C\u1EF1c tr\u1ECB v\xE0 T\u1EC9 l\u1EC7 th\u1EE9c",
    summary: "K\u1EF9 thu\u1EADt ch\u1EB7n, b\u1EA5t \u0111\u1EB3ng th\u1EE9c gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i, d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau n\xE2ng cao.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt ch\u1EB7n hai \u0111\u1EA7u",
        detail: [
          "Mu\u1ED1n ch\u1EE9ng minh $A\\ge m$: bi\u1EBFn \u0111\u1ED5i $A-m$ v\u1EC1 t\u1ED5ng c\xE1c b\xECnh ph\u01B0\u01A1ng ho\u1EB7c gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i.",
          "Lu\xF4n k\xE8m \u0111i\u1EC1u ki\u1EC7n d\u1EA5u b\u1EB1ng, n\u1EBFu kh\xF4ng th\xEC ch\u01B0a k\u1EBFt lu\u1EADn \u0111\u01B0\u1EE3c c\u1EF1c tr\u1ECB."
        ]
      },
      {
        title: "D\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau c\xF3 h\u1EC7 s\u1ED1",
        detail: [
          "$\\f{a}{b}=\\f{c}{d}=\\f{ma+nc}{mb+nd}$ \u2014 ch\u1ECDn $m$, $n$ kh\xE9o \u0111\u1EC3 t\u1EA1o ra t\u1EED/m\u1EABu m\xE0 \u0111\u1EC1 cho.",
          "Khi \u0111\u1EC1 cho t\xEDch, \u0111\u1EB7t t\u1EC9 s\u1ED1 chung b\u1EB1ng $t$ r\u1ED3i thay v\xE0o."
        ]
      }
    ],
    mindmap: {
      root: "\u0110\u1EA0I S\u1ED0 N\xC2NG CAO L\u1EDAP 7",
      branches: [
        { title: "C\u1EF1c tr\u1ECB", items: ["$A^{2}\\ge0$", "$\\abs{A}\\ge0$", "$\\abs{a}+\\abs{b}\\ge\\abs{a+b}$"] },
        { title: "T\u1EC9 l\u1EC7 th\u1EE9c", items: ["D\xE3y t\u1EC9 s\u1ED1 c\xF3 h\u1EC7 s\u1ED1", "\u0110\u1EB7t tham s\u1ED1 $t$", "B\xE0i to\xE1n chia ph\u1EA7n nhi\u1EC1u t\u1EA7ng"] },
        { title: "\u0110a th\u1EE9c", items: ["X\xE1c \u0111\u1ECBnh \u0111a th\u1EE9c", "Nghi\u1EC7m nguy\xEAn", "\u0110\u1ECBnh l\xED B\xE9zout"] }
      ]
    },
    examples: [
      {
        prompt: "Cho $\\f{a}{b}=\\f{c}{d}$. Ch\u1EE9ng minh $\\f{a+b}{a-b}=\\f{c+d}{c-d}$ (gi\u1EA3 thi\u1EBFt c\xE1c m\u1EABu kh\xE1c 0).",
        thinking: [
          "\u0110\u1EB7t t\u1EC9 s\u1ED1 chung b\u1EB1ng $t$ \u0111\u1EC3 bi\u1EC3u di\u1EC5n $a$, $c$ theo $b$, $d$.",
          "Sau \u0111\xF3 r\xFAt g\u1ECDn c\u1EA3 hai v\u1EBF v\xE0 so s\xE1nh."
        ],
        solution: [
          "\u0110\u1EB7t $\\f{a}{b}=\\f{c}{d}=t\\Rightarrow a=bt$, $c=dt$.",
          "$\\f{a+b}{a-b}=\\f{bt+b}{bt-b}=\\f{b(t+1)}{b(t-1)}=\\f{t+1}{t-1}$.",
          "$\\f{c+d}{c-d}=\\f{dt+d}{dt-d}=\\f{d(t+1)}{d(t-1)}=\\f{t+1}{t-1}$.",
          "V\u1EADy $\\f{a+b}{a-b}=\\f{c+d}{c-d}$."
        ]
      }
    ]
  },
  {
    id: "hsg-8-1",
    grade: 8,
    name: "\u0110\u1EA1i s\u1ED1 n\xE2ng cao l\u1EDBp 8 \u2014 Ph\xE2n t\xEDch nh\xE2n t\u1EED v\xE0 B\u1EA5t \u0111\u1EB3ng th\u1EE9c",
    summary: "Th\xEAm b\u1EDBt h\u1EA1ng t\u1EED, h\u1EC7 s\u1ED1 b\u1EA5t \u0111\u1ECBnh, b\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si, ch\u1EE9ng minh chia h\u1EBFt b\u1EB1ng ph\xE2n t\xEDch.",
    techniques: [
      {
        title: "Th\xEAm b\u1EDBt h\u1EA1ng t\u1EED",
        detail: [
          "Th\xEAm v\xE0 b\u1EDBt c\xF9ng m\u1ED9t h\u1EA1ng t\u1EED \u0111\u1EC3 t\u1EA1o h\u1EB1ng \u0111\u1EB3ng th\u1EE9c.",
          "V\xED d\u1EE5: $x^{4}+4=x^{4}+4x^{2}+4-4x^{2}=(x^{2}+2)^{2}-(2x)^{2}=(x^{2}-2x+2)(x^{2}+2x+2)$."
        ]
      },
      {
        title: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si (AM\u2013GM) cho hai s\u1ED1",
        detail: [
          "$a+b\\ge2\\s{ab}$ v\u1EDBi $a,b\\ge0$; d\u1EA5u \u201C=\u201D khi $a=b$.",
          "H\u1EC7 qu\u1EA3 r\u1EA5t hay d\xF9ng: $x+\\f{1}{x}\\ge2$ v\u1EDBi $x>0$.",
          "Lu\xF4n ki\u1EC3m tra \u0111i\u1EC1u ki\u1EC7n kh\xF4ng \xE2m tr\u01B0\u1EDBc khi \xE1p d\u1EE5ng."
        ]
      },
      {
        title: "Ch\u1EE9ng minh chia h\u1EBFt b\u1EB1ng ph\xE2n t\xEDch nh\xE2n t\u1EED",
        detail: [
          "T\xE1ch bi\u1EC3u th\u1EE9c th\xE0nh t\xEDch ch\u1EE9a th\u1EEBa s\u1ED1 c\u1EA7n chia h\u1EBFt.",
          "D\xF9ng \u201Ct\xEDch $k$ s\u1ED1 nguy\xEAn li\xEAn ti\u1EBFp chia h\u1EBFt cho $k!$\u201D."
        ]
      }
    ],
    mindmap: {
      root: "\u0110\u1EA0I S\u1ED0 N\xC2NG CAO L\u1EDAP 8",
      branches: [
        { title: "Nh\xE2n t\u1EED", items: ["Th\xEAm b\u1EDBt h\u1EA1ng t\u1EED", "T\xE1ch h\u1EA1ng t\u1EED", "H\u1EC7 s\u1ED1 b\u1EA5t \u0111\u1ECBnh", "\u0110\u1EB7t \u1EA9n ph\u1EE5"] },
        { title: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c", items: ["C\xF4-si hai s\u1ED1", "$A^{2}\\ge0$", "$x+\\f{1}{x}\\ge2$"] },
        { title: "Chia h\u1EBFt", items: ["S\u1ED1 nguy\xEAn li\xEAn ti\u1EBFp", "\u0110\u1ED3ng d\u01B0", "Quy n\u1EA1p"] },
        { title: "Ph\xE2n th\u1EE9c", items: ["R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c l\u1EDBn", "Gi\xE1 tr\u1ECB nguy\xEAn", "C\u1EF1c tr\u1ECB ph\xE2n th\u1EE9c"] }
      ]
    },
    examples: [
      {
        prompt: "Cho $x>0$. T\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a $A=x+\\f{9}{x}$.",
        thinking: [
          "Hai h\u1EA1ng t\u1EED d\u01B0\u01A1ng, t\xEDch c\u1EE7a ch\xFAng l\xE0 h\u1EB1ng s\u1ED1 $x\\cdot\\f{9}{x}=9$ \u2192 d\xF9ng C\xF4-si."
        ],
        solution: [
          "V\xEC $x>0$ n\xEAn $\\f{9}{x}>0$. \xC1p d\u1EE5ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si cho hai s\u1ED1 d\u01B0\u01A1ng:",
          "$A=x+\\f{9}{x}\\ge2\\s{x\\cdot\\f{9}{x}}=2\\s{9}=6$.",
          "D\u1EA5u \u201C=\u201D x\u1EA3y ra khi $x=\\f{9}{x}\\Leftrightarrow x^{2}=9\\Leftrightarrow x=3$ (v\xEC $x>0$).",
          "V\u1EADy $A_{\\min}=6$ khi $x=3$."
        ]
      }
    ]
  },
  {
    id: "hsg-9-1",
    grade: 9,
    name: "Chuy\xEAn \u0111\u1EC1 HSG l\u1EDBp 9 \u2014 Vi\xE8te n\xE2ng cao, B\u1EA5t \u0111\u1EB3ng th\u1EE9c v\xE0 H\xECnh h\u1ECDc",
    summary: "\u1EE8ng d\u1EE5ng Vi\xE8te cho b\xE0i to\xE1n tham s\u1ED1 kh\xF3, b\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si nhi\u1EC1u bi\u1EBFn, h\xECnh h\u1ECDc ph\u01B0\u01A1ng t\xEDch v\xE0 qu\u1EF9 t\xEDch.",
    techniques: [
      {
        title: "Vi\xE8te n\xE2ng cao",
        detail: [
          "H\u1EC7 th\u1EE9c kh\xF4ng \u0111\u1ED1i x\u1EE9ng ($x_1=kx_2$, $x_1-x_2=m$\u2026): k\u1EBFt h\u1EE3p v\u1EDBi $S$, $P$ th\xE0nh h\u1EC7.",
          "T\xECm h\u1EC7 th\u1EE9c \u0111\u1ED9c l\u1EADp v\u1EDBi tham s\u1ED1: kh\u1EED $m$ gi\u1EEFa hai bi\u1EC3u th\u1EE9c $S$ v\xE0 $P$.",
          "B\xE0i to\xE1n v\u1EC1 d\u1EA5u, v\u1EC1 kho\u1EA3ng ch\u1EE9a nghi\u1EC7m: d\xF9ng $af(\\alpha)$ v\xE0 $S$."
        ]
      },
      {
        title: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si ba s\u1ED1",
        detail: [
          "$a+b+c\\ge3\\cb{abc}$ v\u1EDBi $a,b,c\\ge0$; d\u1EA5u \u201C=\u201D khi $a=b=c$.",
          "K\u1EF9 thu\u1EADt t\xE1ch \u2013 gh\xE9p \u0111\u1EC3 t\u1EA1o t\xEDch h\u1EB1ng s\u1ED1.",
          "K\u1EF9 thu\u1EADt \u201C\u0111i\u1EC3m r\u01A1i\u201D: \u0111o\xE1n tr\u01B0\u1EDBc gi\xE1 tr\u1ECB d\u1EA5u b\u1EB1ng r\u1ED3i chia h\u1EC7 s\u1ED1 cho kh\u1EDBp."
        ]
      },
      {
        title: "H\xECnh h\u1ECDc: ph\u01B0\u01A1ng t\xEDch v\xE0 \u0111i\u1EC3m c\u1ED1 \u0111\u1ECBnh",
        detail: [
          "$MA\\cdot MB=MC\\cdot MD=MT^{2}$ (ph\u01B0\u01A1ng t\xEDch c\u1EE7a \u0111i\u1EC3m $M$).",
          "B\xE0i to\xE1n \u0111i\u1EC3m c\u1ED1 \u0111\u1ECBnh: th\u1EED hai v\u1ECB tr\xED \u0111\u1EB7c bi\u1EC7t \u0111\u1EC3 d\u1EF1 \u0111o\xE1n, r\u1ED3i ch\u1EE9ng minh.",
          "B\xE0i to\xE1n c\u1EF1c tr\u1ECB h\xECnh h\u1ECDc: quy v\u1EC1 m\u1ED9t bi\u1EBFn r\u1ED3i d\xF9ng C\xF4-si."
        ]
      }
    ],
    mindmap: {
      root: "HSG TO\xC1N 9",
      branches: [
        { title: "Vi\xE8te n\xE2ng cao", items: ["H\u1EC7 th\u1EE9c kh\xF4ng \u0111\u1ED1i x\u1EE9ng", "H\u1EC7 th\u1EE9c \u0111\u1ED9c l\u1EADp v\u1EDBi $m$", "D\u1EA5u v\xE0 v\u1ECB tr\xED nghi\u1EC7m"] },
        { title: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c", items: ["C\xF4-si 2, 3 s\u1ED1", "K\u1EF9 thu\u1EADt \u0111i\u1EC3m r\u01A1i", "Bunhiacopxki c\u01A1 b\u1EA3n"] },
        { title: "Ph\u01B0\u01A1ng tr\xECnh", items: ["V\xF4 t\u1EC9", "\u0110\u1EB7t \u1EA9n ph\u1EE5", "H\u1EC7 \u0111\u1ED1i x\u1EE9ng"] },
        { title: "H\xECnh h\u1ECDc", items: ["Ph\u01B0\u01A1ng t\xEDch", "T\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp", "\u0110i\u1EC3m c\u1ED1 \u0111\u1ECBnh \u2013 qu\u1EF9 t\xEDch", "C\u1EF1c tr\u1ECB h\xECnh h\u1ECDc"] }
      ]
    },
    examples: [
      {
        prompt: "Cho ph\u01B0\u01A1ng tr\xECnh $x^{2}-2mx+m-2=0$. Ch\u1EE9ng minh ph\u01B0\u01A1ng tr\xECnh lu\xF4n c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t v\u1EDBi m\u1ECDi $m$, v\xE0 t\xECm h\u1EC7 th\u1EE9c li\xEAn h\u1EC7 gi\u1EEFa $x_1$, $x_2$ kh\xF4ng ph\u1EE5 thu\u1ED9c $m$.",
        thinking: [
          "Ch\u1EE9ng minh $\\Delta'>0$ v\u1EDBi m\u1ECDi $m$ b\u1EB1ng c\xE1ch \u0111\u01B0a v\u1EC1 t\u1ED5ng b\xECnh ph\u01B0\u01A1ng c\u1ED9ng s\u1ED1 d\u01B0\u01A1ng.",
          "H\u1EC7 th\u1EE9c \u0111\u1ED9c l\u1EADp v\u1EDBi $m$: vi\u1EBFt $S$ v\xE0 $P$ theo $m$ r\u1ED3i kh\u1EED $m$."
        ],
        solution: [
          "$\\Delta'=m^{2}-(m-2)=m^{2}-m+2=\\left(m-\\f{1}{2}\\right)^{2}+\\f{7}{4}>0$ v\u1EDBi m\u1ECDi $m$.",
          "V\u1EADy ph\u01B0\u01A1ng tr\xECnh lu\xF4n c\xF3 hai nghi\u1EC7m ph\xE2n bi\u1EC7t.",
          "Theo Vi\xE8te: $S=x_1+x_2=2m$ v\xE0 $P=x_1x_2=m-2$.",
          "T\u1EEB $S=2m$ suy ra $m=\\f{S}{2}$; thay v\xE0o $P$: $P=\\f{S}{2}-2$.",
          "Do \u0111\xF3 $2P=S-4$, t\u1EE9c $2x_1x_2=x_1+x_2-4$, hay $x_1+x_2-2x_1x_2-4=0$.",
          "\u0110\xE2y l\xE0 h\u1EC7 th\u1EE9c li\xEAn h\u1EC7 gi\u1EEFa hai nghi\u1EC7m kh\xF4ng ph\u1EE5 thu\u1ED9c $m$."
        ],
        remark: "D\u1EA1ng \u201Ch\u1EC7 th\u1EE9c \u0111\u1ED9c l\u1EADp v\u1EDBi tham s\u1ED1\u201D g\u1EA7n nh\u01B0 n\u0103m n\xE0o c\u0169ng xu\u1EA5t hi\u1EC7n trong \u0111\u1EC1 HSG v\xE0 \u0111\u1EC1 chuy\xEAn."
      }
    ]
  }
];

// src/content/hsg-plus.ts
var HSG_TOPICS_PLUS = [
  {
    id: "hsg-6-2",
    grade: 6,
    name: "To\xE1n suy lu\u1EADn & B\xE0i to\xE1n th\u1EF1c t\u1EBF n\xE2ng cao l\u1EDBp 6",
    summary: "Suy lu\u1EADn logic, b\xE0i to\xE1n chuy\u1EC3n \u0111\u1ED9ng ng\u01B0\u1EE3c xu\xF4i, b\xE0i to\xE1n tu\u1ED5i, b\xE0i to\xE1n c\xF4ng vi\u1EC7c v\xE0 k\u1EF9 thu\u1EADt gi\u1EA3 thi\u1EBFt t\u1EA1m.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 Gi\u1EA3 thi\u1EBFt t\u1EA1m (b\xE0i to\xE1n \u201Cv\u1EEBa g\xE0 v\u1EEBa ch\xF3\u201D)",
        detail: [
          "Gi\u1EA3 s\u1EED t\u1EA5t c\u1EA3 \u0111\u1EC1u thu\u1ED9c m\u1ED9t lo\u1EA1i, t\xEDnh ra k\u1EBFt qu\u1EA3 t\u1EA1m.",
          "So s\xE1nh v\u1EDBi k\u1EBFt qu\u1EA3 th\u1EADt \u0111\u1EC3 t\xECm ph\u1EA7n ch\xEAnh l\u1EC7ch.",
          "Chia ch\xEAnh l\u1EC7ch cho hi\u1EC7u c\u1EE7a hai lo\u1EA1i \u0111\u1EC3 ra s\u1ED1 l\u01B0\u1EE3ng lo\u1EA1i c\xF2n l\u1EA1i.",
          "Ki\u1EC3m tra l\u1EA1i b\u1EB1ng c\xE1ch thay ng\u01B0\u1EE3c v\xE0o \u0111\u1EC1."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 S\u01A1 \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng cho b\xE0i to\xE1n t\u1ED5ng \u2013 hi\u1EC7u \u2013 t\u1EC9",
        detail: [
          "V\u1EBD m\u1ED7i \u0111\u1EA1i l\u01B0\u1EE3ng l\xE0 m\u1ED9t \u0111o\u1EA1n th\u1EB3ng, chia theo s\u1ED1 ph\u1EA7n trong t\u1EC9 s\u1ED1.",
          "\u0110\xE1nh d\u1EA5u t\u1ED5ng (ho\u1EB7c hi\u1EC7u) l\xEAn s\u01A1 \u0111\u1ED3.",
          "Gi\xE1 tr\u1ECB m\u1ED9t ph\u1EA7n $=$ t\u1ED5ng chia t\u1ED5ng s\u1ED1 ph\u1EA7n (ho\u1EB7c hi\u1EC7u chia hi\u1EC7u s\u1ED1 ph\u1EA7n).",
          "T\u1EEB gi\xE1 tr\u1ECB m\u1ED9t ph\u1EA7n suy ra t\u1EEBng \u0111\u1EA1i l\u01B0\u1EE3ng."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 B\xE0i to\xE1n c\xF4ng vi\u1EC7c",
        detail: [
          "Coi kh\u1ED1i l\u01B0\u1EE3ng c\xF4ng vi\u1EC7c l\xE0 1.",
          "N\u0103ng su\u1EA5t m\u1ED7i gi\u1EDD l\xE0 ngh\u1ECBch \u0111\u1EA3o c\u1EE7a th\u1EDDi gian l\xE0m ri\xEAng.",
          "N\u0103ng su\u1EA5t c\u1ED9ng \u0111\u01B0\u1EE3c, th\u1EDDi gian th\xEC kh\xF4ng.",
          "N\u1EBFu c\xF3 ng\u01B0\u1EDDi ngh\u1EC9 gi\u1EEFa ch\u1EEBng, t\xEDnh ri\xEAng kh\u1ED1i l\u01B0\u1EE3ng t\u1EEBng giai \u0111o\u1EA1n."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 4 \u2014 Suy lu\u1EADn lo\u1EA1i tr\u1EEB v\u1EDBi b\u1EA3ng",
        detail: [
          "K\u1EBB b\u1EA3ng c\xE1c \u0111\u1ED1i t\u01B0\u1EE3ng theo h\xE0ng v\xE0 thu\u1ED9c t\xEDnh theo c\u1ED9t.",
          "M\u1ED7i d\u1EEF ki\u1EC7n \u0111\u1EC1 cho l\xE0 m\u1ED9t d\u1EA5u \u201C\xD7\u201D (lo\u1EA1i tr\u1EEB) ho\u1EB7c \u201C\u2713\u201D (kh\u1EB3ng \u0111\u1ECBnh).",
          "M\u1ED9t h\xE0ng ch\u1EC9 c\xF2n m\u1ED9t \xF4 tr\u1ED1ng th\xEC \xF4 \u0111\xF3 l\xE0 \u2713, k\xE9o theo c\u1EA3 c\u1ED9t b\u1ECB lo\u1EA1i.",
          "L\u1EB7p l\u1EA1i \u0111\u1EBFn khi b\u1EA3ng \u0111\u1EA7y \u0111\u1EE7."
        ]
      }
    ],
    mindmap: {
      root: "TO\xC1N SUY LU\u1EACN L\u1EDAP 6",
      branches: [
        { title: "Gi\u1EA3 thi\u1EBFt t\u1EA1m", items: ["V\u1EEBa g\xE0 v\u1EEBa ch\xF3", "B\xE0i to\xE1n v\xE9, tem", "B\xE0i to\xE1n \u0111\u1EC1 thi c\xF3 \u0111i\u1EC3m tr\u1EEB"] },
        { title: "T\u1ED5ng \u2013 hi\u1EC7u \u2013 t\u1EC9", items: ["S\u01A1 \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng", "Gi\xE1 tr\u1ECB m\u1ED9t ph\u1EA7n", "T\xECm hai s\u1ED1"] },
        { title: "C\xF4ng vi\u1EC7c", items: ["Kh\u1ED1i l\u01B0\u1EE3ng c\xF4ng vi\u1EC7c $=1$", "C\u1ED9ng n\u0103ng su\u1EA5t", "L\xE0m chung \u2013 l\xE0m ri\xEAng"] },
        { title: "Suy lu\u1EADn logic", items: ["B\u1EA3ng lo\u1EA1i tr\u1EEB", "Ph\u1EA3n ch\u1EE9ng \u0111\u01A1n gi\u1EA3n", "Nguy\xEAn l\xFD Dirichlet"] }
      ]
    },
    examples: [
      {
        prompt: "V\u1EEBa g\xE0 v\u1EEBa ch\xF3, b\xF3 l\u1EA1i cho tr\xF2n, ba m\u01B0\u01A1i s\xE1u con, m\u1ED9t tr\u0103m ch\xE2n ch\u1EB5n. H\u1ECFi c\xF3 bao nhi\xEAu con g\xE0, bao nhi\xEAu con ch\xF3?",
        thinking: [
          "Gi\u1EA3 s\u1EED t\u1EA5t c\u1EA3 36 con \u0111\u1EC1u l\xE0 g\xE0 (2 ch\xE2n) \u0111\u1EC3 t\xEDnh ra s\u1ED1 ch\xE2n t\u1EA1m.",
          "So v\u1EDBi s\u1ED1 ch\xE2n th\u1EADt \u0111\u1EC3 t\xECm ch\xEAnh l\u1EC7ch; m\u1ED7i con ch\xF3 c\xF3 nhi\u1EC1u h\u01A1n g\xE0 2 ch\xE2n."
        ],
        solution: [
          "Gi\u1EA3 s\u1EED c\u1EA3 36 con \u0111\u1EC1u l\xE0 g\xE0 th\xEC s\u1ED1 ch\xE2n l\xE0 $36\\cdot2=72$ (ch\xE2n).",
          "S\u1ED1 ch\xE2n thi\u1EBFu so v\u1EDBi th\u1EF1c t\u1EBF: $100-72=28$ (ch\xE2n).",
          "M\u1ED7i con ch\xF3 c\xF3 nhi\u1EC1u h\u01A1n m\u1ED7i con g\xE0: $4-2=2$ (ch\xE2n).",
          "S\u1ED1 con ch\xF3: $28:2=14$ (con).",
          "S\u1ED1 con g\xE0: $36-14=22$ (con).",
          "Th\u1EED l\u1EA1i: $22\\cdot2+14\\cdot4=44+56=100$ (ch\xE2n) \u2713"
        ],
        remark: "K\u1EF9 thu\u1EADt gi\u1EA3 thi\u1EBFt t\u1EA1m gi\u1EA3i \u0111\u01B0\u1EE3c c\u1EA3 m\u1ED9t h\u1ECD b\xE0i to\xE1n: v\xE9 xe, tem th\u01B0, b\xE0i thi c\xF3 \u0111i\u1EC3m tr\u1EEB khi l\xE0m sai."
      }
    ]
  },
  {
    id: "hsg-7-2",
    grade: 7,
    name: "H\xECnh h\u1ECDc n\xE2ng cao l\u1EDBp 7 \u2014 K\u1EF9 thu\u1EADt v\u1EBD th\xEAm \u0111\u01B0\u1EDDng ph\u1EE5",
    summary: "B\u1ED1n k\u1EF9 thu\u1EADt v\u1EBD \u0111\u01B0\u1EDDng ph\u1EE5 kinh \u0111i\u1EC3n: k\xE9o d\xE0i trung tuy\u1EBFn, k\u1EBB song song, d\u1EF1ng tam gi\xE1c \u0111\u1EC1u, l\u1EA5y \u0111i\u1EC3m \u0111\u1ED1i x\u1EE9ng.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 K\xE9o d\xE0i trung tuy\u1EBFn g\u1EA5p \u0111\xF4i",
        detail: [
          "Khi c\xF3 trung tuy\u1EBFn $AM$, k\xE9o d\xE0i \u0111\u1EC3 $MD=MA$.",
          "Ta \u0111\u01B0\u1EE3c h\xECnh b\xECnh h\xE0nh, chuy\u1EC3n \u0111\u01B0\u1EE3c c\xE1c \u0111o\u1EA1n th\u1EB3ng v\xE0 g\xF3c sang v\u1ECB tr\xED thu\u1EADn l\u1EE3i.",
          "D\xF9ng \u0111\u1EC3 ch\u1EE9ng minh b\u1EA5t \u0111\u1EB3ng th\u1EE9c v\u1EC1 trung tuy\u1EBFn, ho\u1EB7c gh\xE9p hai \u0111o\u1EA1n r\u1EDDi nhau v\xE0o m\u1ED9t tam gi\xE1c."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 K\u1EBB \u0111\u01B0\u1EDDng song song",
        detail: [
          "Qua m\u1ED9t \u0111i\u1EC3m \u201Cg\xE3y\u201D, k\u1EBB \u0111\u01B0\u1EDDng song song v\u1EDBi hai \u0111\u01B0\u1EDDng \u0111\xE3 cho.",
          "T\u1EA1o ra c\xE1c c\u1EB7p g\xF3c so le trong, t\xE1ch g\xF3c l\u1EDBn th\xE0nh t\u1ED5ng hai g\xF3c nh\u1ECF.",
          "D\xF9ng nhi\u1EC1u nh\u1EA5t trong c\xE1c b\xE0i t\xEDnh g\xF3c gi\u1EEFa hai \u0111\u01B0\u1EDDng song song."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 L\u1EA5y \u0111i\u1EC3m \u0111\u1ED1i x\u1EE9ng",
        detail: [
          "L\u1EA5y \u0111\u1ED1i x\u1EE9ng m\u1ED9t \u0111i\u1EC3m qua \u0111\u01B0\u1EDDng th\u1EB3ng ho\u1EB7c qua m\u1ED9t \u0111i\u1EC3m.",
          "Bi\u1EBFn hai \u0111o\u1EA1n r\u1EDDi r\u1EA1c th\xE0nh m\u1ED9t \u0111\u01B0\u1EDDng g\u1EA5p kh\xFAc, r\u1ED3i d\xF9ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c.",
          "D\xF9ng cho b\xE0i to\xE1n c\u1EF1c tr\u1ECB: t\xECm v\u1ECB tr\xED \u0111\u1EC3 t\u1ED5ng kho\u1EA3ng c\xE1ch nh\u1ECF nh\u1EA5t."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 4 \u2014 Tr\xEAn tia \u0111\u1ED1i l\u1EA5y \u0111i\u1EC3m b\u1EB1ng \u0111o\u1EA1n cho tr\u01B0\u1EDBc",
        detail: [
          "Khi \u0111\u1EC1 cho t\u1ED5ng ho\u1EB7c hi\u1EC7u hai \u0111o\u1EA1n th\u1EB3ng, h\xE3y \u201Cd\u1EDDi\u201D m\u1ED9t \u0111o\u1EA1n v\u1EC1 n\u1EB1m c\u1EA1nh \u0111o\u1EA1n kia.",
          "Tr\xEAn tia \u0111\u1ED1i, ho\u1EB7c tr\xEAn ch\xEDnh tia \u0111\xF3, l\u1EA5y \u0111i\u1EC3m sao cho \u0111o\u1EA1n m\u1EDBi b\u1EB1ng \u0111o\u1EA1n c\u1EA7n gh\xE9p.",
          "Sau \u0111\xF3 ch\u1EE9ng minh tam gi\xE1c m\u1EDBi t\u1EA1o th\xE0nh l\xE0 tam gi\xE1c c\xE2n ho\u1EB7c b\u1EB1ng m\u1ED9t tam gi\xE1c \u0111\xE3 c\xF3."
        ]
      }
    ],
    mindmap: {
      root: "H\xCCNH H\u1ECCC N\xC2NG CAO L\u1EDAP 7",
      branches: [
        { title: "V\u1EBD \u0111\u01B0\u1EDDng ph\u1EE5", items: ["K\xE9o d\xE0i trung tuy\u1EBFn", "K\u1EBB song song", "L\u1EA5y \u0111\u1ED1i x\u1EE9ng", "D\u1EDDi \u0111o\u1EA1n th\u1EB3ng"] },
        { title: "Ch\u1EE9ng minh b\u1EB1ng nhau", items: ["c.c.c, c.g.c, g.c.g", "B\u1EAFc c\u1EA7u qua tam gi\xE1c trung gian", "Tam gi\xE1c c\xE2n, \u0111\u1EC1u"] },
        { title: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c", items: ["$\\abs{b-c}<a<b+c$", "\u0110\u01B0\u1EDDng vu\xF4ng g\xF3c ng\u1EAFn nh\u1EA5t", "C\u1EF1c tr\u1ECB kho\u1EA3ng c\xE1ch"] },
        { title: "\u0110\u1ED3ng quy - th\u1EB3ng h\xE0ng", items: ["B\u1ED1n \u0111\u01B0\u1EDDng \u0111\u1ED3ng quy", "Trung tr\u1EF1c, ph\xE2n gi\xE1c", "Hai g\xF3c k\u1EC1 b\xF9"] }
      ]
    },
    examples: [
      {
        prompt: "Cho tam gi\xE1c $ABC$, $M$ l\xE0 trung \u0111i\u1EC3m $BC$. Ch\u1EE9ng minh $AM<\\f{AB+AC}{2}$.",
        thinking: [
          "$AM$ l\xE0 trung tuy\u1EBFn; mu\u1ED1n so s\xE1nh v\u1EDBi $AB+AC$ th\xEC ph\u1EA3i gh\xE9p $AB$ v\xE0 $AC$ v\xE0o c\xF9ng m\u1ED9t tam gi\xE1c v\u1EDBi $AM$.",
          "K\u1EF9 thu\u1EADt: k\xE9o d\xE0i $AM$ th\xE0nh $AD$ v\u1EDBi $MD=MA$ \u2014 khi \u0111\xF3 $2AM=AD$ v\xE0 $CD=AB$."
        ],
        solution: [
          "Tr\xEAn tia \u0111\u1ED1i c\u1EE7a tia $MA$ l\u1EA5y \u0111i\u1EC3m $D$ sao cho $MD=MA$.",
          "X\xE9t $\\tri ABM$ v\xE0 $\\tri DCM$: $MB=MC$ ($M$ l\xE0 trung \u0111i\u1EC3m $BC$); $\\angle AMB=\\angle DMC$ (\u0111\u1ED1i \u0111\u1EC9nh); $MA=MD$.",
          "Do \u0111\xF3 $\\tri ABM=\\tri DCM$ (c.g.c), suy ra $AB=DC$.",
          "X\xE9t tam gi\xE1c $ACD$, theo b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c: $AD<AC+CD$.",
          "M\xE0 $AD=2AM$ v\xE0 $CD=AB$, n\xEAn $2AM<AC+AB$.",
          "V\u1EADy $AM<\\f{AB+AC}{2}$."
        ],
        remark: "K\xE9o d\xE0i trung tuy\u1EBFn g\u1EA5p \u0111\xF4i l\xE0 k\u1EF9 thu\u1EADt s\u1ED1 1 cho m\u1ECDi b\xE0i b\u1EA5t \u0111\u1EB3ng th\u1EE9c v\u1EC1 trung tuy\u1EBFn."
      }
    ]
  },
  {
    id: "hsg-8-2",
    grade: 8,
    name: "H\xECnh h\u1ECDc n\xE2ng cao l\u1EDBp 8 \u2014 \u0110\u1ED3ng d\u1EA1ng v\xE0 t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch",
    summary: "K\u1EF9 thu\u1EADt d\xF9ng t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch, \u0111\u1ECBnh l\xED Thal\xE8s m\u1EDF r\u1ED9ng, v\xE0 b\xE0i to\xE1n c\u1EF1c tr\u1ECB h\xECnh h\u1ECDc.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 T\u1EC9 s\u1ED1 di\u1EC7n t\xEDch hai tam gi\xE1c chung chi\u1EC1u cao",
        detail: [
          "Hai tam gi\xE1c c\xF3 chung \u0111\u01B0\u1EDDng cao th\xEC t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch b\u1EB1ng t\u1EC9 s\u1ED1 hai \u0111\xE1y.",
          "Hai tam gi\xE1c c\xF3 chung \u0111\xE1y th\xEC t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch b\u1EB1ng t\u1EC9 s\u1ED1 hai \u0111\u01B0\u1EDDng cao.",
          "\u0110\xE2y l\xE0 c\xF4ng c\u1EE5 chuy\u1EC3n b\xE0i to\xE1n t\u1EC9 s\u1ED1 \u0111o\u1EA1n th\u1EB3ng th\xE0nh b\xE0i to\xE1n di\u1EC7n t\xEDch v\xE0 ng\u01B0\u1EE3c l\u1EA1i."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 T\u1EC9 s\u1ED1 di\u1EC7n t\xEDch c\u1EE7a hai tam gi\xE1c c\xF3 chung g\xF3c",
        detail: [
          "N\u1EBFu $\\tri ABC$ v\xE0 $\\tri AB'C'$ chung g\xF3c $A$ th\xEC $\\f{S_{ABC}}{S_{AB'C'}}=\\f{AB\\cdot AC}{AB'\\cdot AC'}$.",
          "R\u1EA5t m\u1EA1nh khi \u0111\u1EC1 cho c\xE1c \u0111i\u1EC3m chia c\u1EA1nh theo t\u1EC9 l\u1EC7."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 Chu\u1ED7i \u0111\u1ED3ng d\u1EA1ng b\u1EAFc c\u1EA7u",
        detail: [
          "Khi hai tam gi\xE1c c\u1EA7n so s\xE1nh kh\xF4ng c\xF3 quan h\u1EC7 tr\u1EF1c ti\u1EBFp, t\xECm m\u1ED9t tam gi\xE1c trung gian.",
          "$\\tri A\\sim\\tri B$ v\xE0 $\\tri B\\sim\\tri C$ th\xEC $\\tri A\\sim\\tri C$.",
          "Th\u01B0\u1EDDng d\xF9ng trong b\xE0i c\xF3 nhi\u1EC1u \u0111\u01B0\u1EDDng cao ho\u1EB7c nhi\u1EC1u \u0111\u01B0\u1EDDng vu\xF4ng g\xF3c."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 4 \u2014 C\u1EF1c tr\u1ECB h\xECnh h\u1ECDc b\u1EB1ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si",
        detail: [
          "\u0110\u01B0a \u0111\u1EA1i l\u01B0\u1EE3ng c\u1EA7n t\xECm c\u1EF1c tr\u1ECB v\u1EC1 m\u1ED9t bi\u1EBFn.",
          "\xC1p d\u1EE5ng $a+b\\ge2\\s{ab}$ khi t\xEDch l\xE0 h\u1EB1ng s\u1ED1.",
          "Ch\u1EC9 ra v\u1ECB tr\xED h\xECnh h\u1ECDc \u1EE9ng v\u1EDBi d\u1EA5u b\u1EB1ng."
        ]
      }
    ],
    mindmap: {
      root: "H\xCCNH H\u1ECCC N\xC2NG CAO L\u1EDAP 8",
      branches: [
        { title: "Di\u1EC7n t\xEDch", items: ["Chung chi\u1EC1u cao \u2192 t\u1EC9 s\u1ED1 \u0111\xE1y", "Chung g\xF3c \u2192 t\u1EC9 s\u1ED1 t\xEDch hai c\u1EA1nh", "C\u1ED9ng - tr\u1EEB di\u1EC7n t\xEDch"] },
        { title: "\u0110\u1ED3ng d\u1EA1ng", items: ["g.g l\xE0 ch\u1EE7 l\u1EF1c", "Chu\u1ED7i b\u1EAFc c\u1EA7u", "T\u1EC9 s\u1ED1 $k$, di\u1EC7n t\xEDch $k^{2}$"] },
        { title: "Thal\xE8s", items: ["Thu\u1EADn - \u0111\u1EA3o - h\u1EC7 qu\u1EA3", "\u0110\u01B0\u1EDDng ph\xE2n gi\xE1c", "Chia \u0111o\u1EA1n theo t\u1EC9 l\u1EC7"] },
        { title: "C\u1EF1c tr\u1ECB", items: ["\u0110\u01B0a v\u1EC1 m\u1ED9t bi\u1EBFn", "B\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si", "\u0110\u01B0\u1EDDng vu\xF4ng g\xF3c ng\u1EAFn nh\u1EA5t"] }
      ]
    },
    examples: [
      {
        prompt: "Cho tam gi\xE1c $ABC$. Tr\xEAn c\u1EA1nh $AB$ l\u1EA5y $M$ v\u1EDBi $AM=\\f{1}{3}AB$; tr\xEAn c\u1EA1nh $AC$ l\u1EA5y $N$ v\u1EDBi $AN=\\f{2}{5}AC$. T\xEDnh t\u1EC9 s\u1ED1 $\\f{S_{AMN}}{S_{ABC}}$.",
        thinking: [
          "Hai tam gi\xE1c $AMN$ v\xE0 $ABC$ **chung g\xF3c $A$** \u2192 d\xF9ng ngay c\xF4ng th\u1EE9c t\u1EC9 s\u1ED1 t\xEDch hai c\u1EA1nh k\u1EC1 g\xF3c chung."
        ],
        solution: [
          "Hai tam gi\xE1c $AMN$ v\xE0 $ABC$ c\xF3 chung g\xF3c $A$.",
          "$\\f{S_{AMN}}{S_{ABC}}=\\f{AM\\cdot AN}{AB\\cdot AC}=\\f{1}{3}\\cdot\\f{2}{5}=\\f{2}{15}$.",
          "V\u1EADy $S_{AMN}=\\f{2}{15}S_{ABC}$."
        ],
        remark: "Kh\xF4ng c\u1EA7n bi\u1EBFt h\xECnh d\u1EA1ng c\u1EE5 th\u1EC3 c\u1EE7a tam gi\xE1c \u2014 c\xF4ng th\u1EE9c t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch theo g\xF3c chung x\u1EED l\xFD g\u1ECDn trong m\u1ED9t d\xF2ng."
      }
    ]
  },
  {
    id: "hsg-9-2",
    grade: 9,
    name: "HSG l\u1EDBp 9 \u2014 Ph\u01B0\u01A1ng tr\xECnh v\xF4 t\u1EC9, h\u1EC7 \u0111\u1ED1i x\u1EE9ng v\xE0 b\u1EA5t \u0111\u1EB3ng th\u1EE9c",
    summary: "K\u1EF9 thu\u1EADt \u0111\u1EB7t \u1EA9n ph\u1EE5, \u0111\xE1nh gi\xE1 hai v\u1EBF, h\u1EC7 \u0111\u1ED1i x\u1EE9ng lo\u1EA1i I \u2013 II, v\xE0 b\u1EA5t \u0111\u1EB3ng th\u1EE9c c\xF3 \u0111i\u1EC3m r\u01A1i.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 \u0110\u1EB7t \u1EA9n ph\u1EE5 cho ph\u01B0\u01A1ng tr\xECnh v\xF4 t\u1EC9",
        detail: [
          "Nh\u1EADn d\u1EA1ng bi\u1EC3u th\u1EE9c l\u1EB7p l\u1EA1i d\u01B0\u1EDBi c\u0103n, \u0111\u1EB7t n\xF3 l\xE0 $t$ v\u1EDBi \u0111i\u1EC1u ki\u1EC7n $t\\ge0$.",
          "\u0110\u01B0a ph\u01B0\u01A1ng tr\xECnh v\u1EC1 b\u1EADc hai theo $t$.",
          "Gi\u1EA3i theo $t$, lo\u1EA1i nghi\u1EC7m \xE2m, r\u1ED3i quay v\u1EC1 $x$.",
          "B\u1EAFt bu\u1ED9c th\u1EED l\u1EA1i nghi\u1EC7m v\xE0o ph\u01B0\u01A1ng tr\xECnh g\u1ED1c."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 \u0110\xE1nh gi\xE1 hai v\u1EBF",
        detail: [
          "Khi hai v\u1EBF c\xF3 b\u1EA3n ch\u1EA5t kh\xE1c nhau, h\xE3y ch\u1EB7n: v\u1EBF tr\xE1i $\\ge m$ v\xE0 v\u1EBF ph\u1EA3i $\\le m$.",
          "Ph\u01B0\u01A1ng tr\xECnh c\xF3 nghi\u1EC7m khi v\xE0 ch\u1EC9 khi c\u1EA3 hai v\u1EBF c\xF9ng b\u1EB1ng $m$.",
          "Gi\u1EA3i h\u1EC7 \u0111i\u1EC1u ki\u1EC7n d\u1EA5u b\u1EB1ng \u0111\u1EC3 t\xECm nghi\u1EC7m."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 H\u1EC7 \u0111\u1ED1i x\u1EE9ng lo\u1EA1i I",
        detail: [
          "H\u1EC7 kh\xF4ng \u0111\u1ED5i khi ho\xE1n v\u1ECB $x$ v\xE0 $y$ \u2192 \u0111\u1EB7t $S=x+y$, $P=xy$.",
          "\u0110\u01B0a h\u1EC7 v\u1EC1 hai ph\u01B0\u01A1ng tr\xECnh theo $S$, $P$.",
          "Gi\u1EA3i xong, $x$ v\xE0 $y$ l\xE0 nghi\u1EC7m c\u1EE7a $X^{2}-SX+P=0$.",
          "\u0110i\u1EC1u ki\u1EC7n t\u1ED3n t\u1EA1i: $S^{2}-4P\\ge0$."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 4 \u2014 B\u1EA5t \u0111\u1EB3ng th\u1EE9c c\xF3 \u0111i\u1EC3m r\u01A1i",
        detail: [
          "D\u1EF1 \u0111o\xE1n tr\u01B0\u1EDBc gi\xE1 tr\u1ECB l\xE0m d\u1EA5u b\u1EB1ng x\u1EA3y ra (th\u01B0\u1EDDng l\xE0 \u0111i\u1EC3m \u0111\u1ED1i x\u1EE9ng, v\xED d\u1EE5 $a=b=c$).",
          "Chia t\xE1ch h\u1EC7 s\u1ED1 sao cho t\u1EA1i \u0111i\u1EC3m r\u01A1i, c\xE1c s\u1ED1 h\u1EA1ng trong C\xF4-si b\u1EB1ng nhau.",
          "N\u1EBFu \xE1p d\u1EE5ng C\xF4-si \u201Cth\xF4\u201D m\xE0 d\u1EA5u b\u1EB1ng kh\xF4ng \u0111\u1EA1t \u0111\u01B0\u1EE3c th\xEC \u0111\xE1nh gi\xE1 \u0111\xF3 v\xF4 ngh\u0129a."
        ]
      }
    ],
    mindmap: {
      root: "HSG TO\xC1N 9 \u2014 \u0110\u1EA0I S\u1ED0 N\xC2NG CAO",
      branches: [
        { title: "Ph\u01B0\u01A1ng tr\xECnh v\xF4 t\u1EC9", items: ["\u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh", "\u0110\u1EB7t \u1EA9n ph\u1EE5", "Nh\xE2n li\xEAn h\u1EE3p", "\u0110\xE1nh gi\xE1 hai v\u1EBF"] },
        { title: "H\u1EC7 ph\u01B0\u01A1ng tr\xECnh", items: ["\u0110\u1ED1i x\u1EE9ng lo\u1EA1i I: $S$, $P$", "\u0110\u1ED1i x\u1EE9ng lo\u1EA1i II: tr\u1EEB theo v\u1EBF", "\u0110\u1EB7t \u1EA9n ph\u1EE5"] },
        { title: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c", items: ["C\xF4-si 2, 3 s\u1ED1", "K\u1EF9 thu\u1EADt \u0111i\u1EC3m r\u01A1i", "Bunhiacopxki", "Ch\u1EB7n hai \u0111\u1EA7u"] },
        { title: "C\u1EF1c tr\u1ECB", items: ["\u0110\u01B0a v\u1EC1 m\u1ED9t bi\u1EBFn", "Ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng", "D\u1EA5u b\u1EB1ng ph\u1EA3i \u0111\u1EA1t \u0111\u01B0\u1EE3c"] }
      ]
    },
    examples: [
      {
        prompt: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh $x^{2}+3x+\\s{x^{2}+3x+3}=9$.",
        thinking: [
          "Bi\u1EC3u th\u1EE9c $x^{2}+3x$ l\u1EB7p l\u1EA1i c\u1EA3 ngo\xE0i v\xE0 trong c\u0103n \u2192 \u0111\u1EB7t \u1EA9n ph\u1EE5 cho ph\u1EA7n d\u01B0\u1EDBi c\u0103n.",
          "\u0110\u1EB7t $t=\\s{x^{2}+3x+3}\\ge0$, khi \u0111\xF3 $x^{2}+3x=t^{2}-3$."
        ],
        solution: [
          "\u0110i\u1EC1u ki\u1EC7n: $x^{2}+3x+3=\\left(x+\\f{3}{2}\\right)^{2}+\\f{3}{4}>0$ v\u1EDBi m\u1ECDi $x$, n\xEAn ph\u01B0\u01A1ng tr\xECnh x\xE1c \u0111\u1ECBnh tr\xEAn $\\R$.",
          "\u0110\u1EB7t $t=\\s{x^{2}+3x+3}$, $t>0$. Suy ra $x^{2}+3x=t^{2}-3$.",
          "Ph\u01B0\u01A1ng tr\xECnh tr\u1EDF th\xE0nh $t^{2}-3+t=9\\Leftrightarrow t^{2}+t-12=0$.",
          "$(t-3)(t+4)=0\\Rightarrow t=3$ (nh\u1EADn) ho\u1EB7c $t=-4$ (lo\u1EA1i v\xEC $t>0$).",
          "V\u1EDBi $t=3$: $x^{2}+3x+3=9\\Leftrightarrow x^{2}+3x-6=0$.",
          "$\\Delta=9+24=33\\Rightarrow x=\\f{-3\\pm\\s{33}}{2}$.",
          "Th\u1EED l\u1EA1i: c\u1EA3 hai gi\xE1 tr\u1ECB \u0111\u1EC1u tho\u1EA3 (v\xEC ph\u01B0\u01A1ng tr\xECnh x\xE1c \u0111\u1ECBnh tr\xEAn $\\R$ v\xE0 $t=3>0$).",
          "V\u1EADy $x=\\f{-3\\pm\\s{33}}{2}$."
        ],
        remark: "D\u1EA5u hi\u1EC7u \u0111\u1EB7t \u1EA9n ph\u1EE5: m\u1ED9t bi\u1EC3u th\u1EE9c xu\u1EA5t hi\u1EC7n c\u1EA3 trong v\xE0 ngo\xE0i d\u1EA5u c\u0103n. Nh\u1EADn ra \u0111\u01B0\u1EE3c l\xE0 b\xE0i gi\u1EA3i xong m\u1ED9t n\u1EEDa."
      },
      {
        prompt: "Cho $a,b>0$ v\xE0 $a+b=1$. T\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a $P=\\f{1}{a}+\\f{1}{b}$.",
        thinking: [
          "D\u1EF1 \u0111o\xE1n \u0111i\u1EC3m r\u01A1i: bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng theo $a$, $b$ n\xEAn d\u1EA5u b\u1EB1ng c\xF3 th\u1EC3 x\u1EA3y ra khi $a=b=\\f{1}{2}$.",
          "Ki\u1EC3m tra: khi \u0111\xF3 $P=2+2=4$. V\u1EADy c\u1EA7n ch\u1EE9ng minh $P\\ge4$."
        ],
        solution: [
          "$P=\\f{1}{a}+\\f{1}{b}=\\f{a+b}{ab}=\\f{1}{ab}$ (v\xEC $a+b=1$).",
          "Theo b\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si: $1=a+b\\ge2\\s{ab}\\Rightarrow\\s{ab}\\le\\f{1}{2}\\Rightarrow ab\\le\\f{1}{4}$.",
          "Do \u0111\xF3 $P=\\f{1}{ab}\\ge4$.",
          "D\u1EA5u \u201C=\u201D x\u1EA3y ra khi $a=b$, k\u1EBFt h\u1EE3p $a+b=1$ \u0111\u01B0\u1EE3c $a=b=\\f{1}{2}$.",
          "V\u1EADy $P_{\\min}=4$ khi $a=b=\\f{1}{2}$."
        ],
        remark: "Quy tr\xECnh chu\u1EA9n: d\u1EF1 \u0111o\xE1n \u0111i\u1EC3m r\u01A1i \u2192 t\xEDnh gi\xE1 tr\u1ECB t\u1EA1i \u0111\xF3 \u2192 ch\u1EE9ng minh b\u1EA5t \u0111\u1EB3ng th\u1EE9c \u2192 ch\u1EC9 ra d\u1EA5u b\u1EB1ng."
      }
    ]
  }
];

// src/content/hsg-gita.ts
var HSG_TOPICS_GITA = [
  /* ---------------------------------------------------------------- */
  {
    id: "hsg-7-3",
    grade: 7,
    name: "D\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau \u2014 K\u1EF9 thu\u1EADt c\u1EE7a b\u1ED9 HSG GITA",
    summary: "B\u1ED1n k\u1EF9 thu\u1EADt chu\u1EA9n: nh\xE2n h\u1EC7 s\u1ED1 v\xE0o t\u1EED\u2013m\u1EABu, \u0111\u1EB7t tham s\u1ED1 t, t\u1EA1o t\u1ED5ng/hi\u1EC7u theo \u0111\u1EC1, v\xE0 x\u1EED l\xFD \u0111i\u1EC1u ki\u1EC7n m\u1EABu b\u1EB1ng 0.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 Nh\xE2n h\u1EC7 s\u1ED1 v\xE0o c\u1EA3 t\u1EED v\xE0 m\u1EABu",
        detail: [
          "\u0110i\u1EC1u ki\u1EC7n c\xF3 h\u1EC7 s\u1ED1 ($mx+ny=k$) th\xEC ph\u1EA3i nh\xE2n h\u1EC7 s\u1ED1 v\xE0o **c\u1EA3 t\u1EED v\xE0 m\u1EABu** c\u1EE7a t\u1EC9 s\u1ED1 t\u01B0\u01A1ng \u1EE9ng.",
          "$\\f{x}{a}=\\f{mx}{ma}$ \u2014 sau \u0111\xF3 m\u1EDBi \u0111\u01B0\u1EE3c c\u1ED9ng t\u1EED v\u1EDBi t\u1EED, m\u1EABu v\u1EDBi m\u1EABu.",
          "Sai l\u1EA7m kinh \u0111i\u1EC3n: c\u1ED9ng th\u1EB3ng $\\f{x+y}{a+b}$ khi \u0111\u1EC1 cho $mx+ny$."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 \u0110\u1EB7t tham s\u1ED1 $t$",
        detail: [
          "\u0110\u1EB7t $\\f{x}{a}=\\f{y}{b}=\\f{z}{c}=t$ r\u1ED3i vi\u1EBFt $x=at$, $y=bt$, $z=ct$.",
          "Thay v\xE0o \u0111i\u1EC1u ki\u1EC7n c\xF2n l\u1EA1i \u0111\u1EC3 t\xECm $t$ \u2014 c\xE1ch n\xE0y **lu\xF4n d\xF9ng \u0111\u01B0\u1EE3c**, k\u1EC3 c\u1EA3 khi \u0111i\u1EC1u ki\u1EC7n l\xE0 t\xEDch ho\u1EB7c b\u1EADc hai.",
          "Khi \u0111i\u1EC1u ki\u1EC7n ch\u1EE9a t\xEDch ($xy=k$ hay $x^{2}+y^{2}=k$) th\xEC \u0111\xE2y l\xE0 c\xE1ch duy nh\u1EA5t g\u1ECDn g\xE0ng."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 T\u1EA1o t\u1ED5ng ho\u1EB7c hi\u1EC7u \u0111\xFAng nh\u01B0 \u0111\u1EC1",
        detail: [
          "T\u1EEB $\\f{a}{b}=\\f{c}{d}$ suy ra $\\f{a}{b}=\\f{c}{d}=\\f{a\\pm c}{b\\pm d}=\\f{ma+nc}{mb+nd}$.",
          'Nh\xECn v\xE0o bi\u1EC3u th\u1EE9c \u0111\u1EC1 h\u1ECFi \u0111\u1EC3 ch\u1ECDn $m$, $n$ cho kh\u1EDBp \u2014 \u0111\xE2y l\xE0 b\u01B0\u1EDBc "\u0111\u1ECDc v\u1ECB" c\u1EE7a d\u1EA1ng n\xE0y.'
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 4 \u2014 Ki\u1EC3m tra m\u1EABu kh\xE1c 0",
        detail: [
          "T\xEDnh ch\u1EA5t $\\f{a+c}{b+d}$ ch\u1EC9 d\xF9ng \u0111\u01B0\u1EE3c khi $b+d\\ne0$.",
          "V\u1EDBi b\xE0i d\u1EA1ng $\\f{x}{y+z}=\\f{y}{z+x}=\\f{z}{x+y}$, ph\u1EA3i x\xE9t ri\xEAng hai tr\u01B0\u1EDDng h\u1EE3p $x+y+z=0$ v\xE0 $x+y+z\\ne0$."
        ]
      }
    ],
    mindmap: {
      root: "D\xC3Y T\u1EC8 S\u1ED0 B\u1EB0NG NHAU (HSG 7)",
      branches: [
        { title: "V\xE0o b\xE0i", items: ["\u0110i\u1EC1u ki\u1EC7n d\u1EA1ng t\u1ED5ng \u2192 c\u1ED9ng t\u1EED m\u1EABu", "\u0110i\u1EC1u ki\u1EC7n d\u1EA1ng t\xEDch \u2192 \u0111\u1EB7t $t$", "C\xF3 h\u1EC7 s\u1ED1 \u2192 nh\xE2n v\xE0o t\u1EED m\u1EABu"] },
        { title: "Ch\u1EE9ng minh \u0111\u1EB3ng th\u1EE9c", items: ["\u0110\u1EB7t $t$ r\u1ED3i thay hai v\u1EBF", "Bi\u1EBFn \u0111\u1ED5i t\u01B0\u01A1ng \u0111\u01B0\u01A1ng", "D\xF9ng t\xEDnh ch\u1EA5t t\u1EC9 l\u1EC7 th\u1EE9c $ad=bc$"] },
        { title: "B\u1EABy", items: ["Qu\xEAn x\xE9t m\u1EABu $=0$", "C\u1ED9ng th\u1EB3ng khi c\xF3 h\u1EC7 s\u1ED1", "Qu\xEAn tr\u01B0\u1EDDng h\u1EE3p $x+y+z=0$"] }
      ]
    },
    examples: [
      {
        prompt: "Cho $\\f{x}{y+z}=\\f{y}{z+x}=\\f{z}{x+y}$ v\u1EDBi $x$, $y$, $z$ kh\xE1c $0$. T\xEDnh gi\xE1 tr\u1ECB c\u1EE7a $M=\\f{x}{y+z}$.",
        thinking: [
          "Th\u1EA5y d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau, ph\u1EA3n x\u1EA1 \u0111\u1EA7u ti\xEAn l\xE0 c\u1ED9ng t\u1EED v\u1EDBi t\u1EED, m\u1EABu v\u1EDBi m\u1EABu.",
          "Nh\u01B0ng ph\u1EA3i c\u1EA9n th\u1EADn: m\u1EABu t\u1ED5ng l\xE0 $2(x+y+z)$, ch\u1EC9 d\xF9ng \u0111\u01B0\u1EE3c khi $x+y+z\\ne0$.",
          "V\u1EADy b\u1EAFt bu\u1ED9c chia **hai tr\u01B0\u1EDDng h\u1EE3p** \u2014 \u0111\xE2y ch\xEDnh l\xE0 \u0111i\u1EC3m ph\xE2n lo\u1EA1i c\u1EE7a b\xE0i n\xE0y."
        ],
        solution: [
          "**Tr\u01B0\u1EDDng h\u1EE3p 1:** $x+y+z\\ne0$.",
          "\xC1p d\u1EE5ng t\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau: $\\f{x}{y+z}=\\f{y}{z+x}=\\f{z}{x+y}=\\f{x+y+z}{2(x+y+z)}=\\f{1}{2}$.",
          "V\u1EADy $M=\\f{1}{2}$.",
          "**Tr\u01B0\u1EDDng h\u1EE3p 2:** $x+y+z=0$.",
          "Khi \u0111\xF3 $y+z=-x$, n\xEAn $M=\\f{x}{y+z}=\\f{x}{-x}=-1$ (v\xEC $x\\ne0$).",
          "V\u1EADy $M=\\f{1}{2}$ ho\u1EB7c $M=-1$."
        ],
        remark: "B\u1ECF qu\xEAn tr\u01B0\u1EDDng h\u1EE3p $x+y+z=0$ l\xE0 l\u1ED7i m\u1EA5t \u0111i\u1EC3m ph\u1ED5 bi\u1EBFn nh\u1EA5t c\u1EE7a d\u1EA1ng n\xE0y \u1EDF k\u1EF3 thi HSG."
      },
      {
        prompt: "T\xECm $x$, $y$ bi\u1EBFt $\\f{x}{3}=\\f{y}{5}$ v\xE0 $2x^{2}-y^{2}=-7$.",
        thinking: [
          "\u0110i\u1EC1u ki\u1EC7n th\u1EE9 hai ch\u1EE9a **b\xECnh ph\u01B0\u01A1ng**, kh\xF4ng c\u1ED9ng t\u1EED m\u1EABu \u0111\u01B0\u1EE3c \u2014 ph\u1EA3i \u0111\u1EB7t tham s\u1ED1.",
          "\u0110\u1EB7t t\u1EC9 s\u1ED1 chung b\u1EB1ng $t$ r\u1ED3i bi\u1EC3u di\u1EC5n $x$, $y$ qua $t$, thay v\xE0o \u0111i\u1EC1u ki\u1EC7n l\xE0 ra ph\u01B0\u01A1ng tr\xECnh m\u1ED9t \u1EA9n."
        ],
        solution: [
          "\u0110\u1EB7t $\\f{x}{3}=\\f{y}{5}=t$, suy ra $x=3t$ v\xE0 $y=5t$.",
          "Thay v\xE0o: $2(3t)^{2}-(5t)^{2}=-7\\Leftrightarrow 18t^{2}-25t^{2}=-7\\Leftrightarrow -7t^{2}=-7$.",
          "$t^{2}=1\\Rightarrow t=1$ ho\u1EB7c $t=-1$.",
          "V\u1EDBi $t=1$: $x=3$, $y=5$. V\u1EDBi $t=-1$: $x=-3$, $y=-5$.",
          "V\u1EADy $(x;y)\\in\\{(3;5);(-3;-5)\\}$."
        ],
        remark: "H\u1EC5 \u0111i\u1EC1u ki\u1EC7n ch\u1EE9a t\xEDch ho\u1EB7c lu\u1EF9 th\u1EEBa, h\xE3y \u0111\u1EB7t tham s\u1ED1 $t$ ngay \u2014 \u0111\u1EEBng c\u1ED1 c\u1ED9ng t\u1EED m\u1EABu."
      }
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    id: "hsg-7-4",
    grade: 7,
    name: "Gi\xE1 tr\u1ECB nguy\xEAn c\u1EE7a bi\u1EBFn v\xE0 c\u1EE7a bi\u1EC3u th\u1EE9c",
    summary: "T\xE1ch ph\u1EA7n nguy\xEAn, \u0111\u01B0a v\u1EC1 b\xE0i to\xE1n \u01B0\u1EDBc s\u1ED1, ph\u01B0\u01A1ng tr\xECnh nghi\u1EC7m nguy\xEAn d\u1EA1ng t\xEDch, v\xE0 ch\u1EB7n mi\u1EC1n gi\xE1 tr\u1ECB.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 T\xE1ch ph\u1EA7n nguy\xEAn r\u1ED3i x\xE9t \u01B0\u1EDBc",
        detail: [
          "V\u1EDBi $A=\\f{f(x)}{g(x)}$, chia $f$ cho $g$ \u0111\u1EC3 vi\u1EBFt $A=q(x)+\\f{r}{g(x)}$ v\u1EDBi $r$ l\xE0 **h\u1EB1ng s\u1ED1**.",
          "$A$ nguy\xEAn $\\Leftrightarrow g(x)$ l\xE0 \u01B0\u1EDBc c\u1EE7a $r$ \u2014 b\xE0i to\xE1n chuy\u1EC3n th\xE0nh l\u1EADp b\u1EA3ng \u01B0\u1EDBc.",
          "N\u1EBFu chia m\xE0 ph\u1EA7n d\u01B0 v\u1EABn ch\u1EE9a bi\u1EBFn th\xEC h\xE3y nh\xE2n th\xEAm h\u1EC7 s\u1ED1 cho t\u1EED tr\u01B0\u1EDBc khi chia."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 \u0110\u01B0a v\u1EC1 ph\u01B0\u01A1ng tr\xECnh d\u1EA1ng t\xEDch",
        detail: [
          "V\u1EDBi ph\u01B0\u01A1ng tr\xECnh nghi\u1EC7m nguy\xEAn hai \u1EA9n, nh\xF3m l\u1EA1i th\xE0nh $(\\text{bi\u1EC3u th\u1EE9c}_1)(\\text{bi\u1EC3u th\u1EE9c}_2)=k$.",
          "V\xED d\u1EE5 $xy+3x-y=6\\Leftrightarrow(x-1)(y+3)=3$.",
          "Sau \u0111\xF3 l\u1EADp b\u1EA3ng c\xE1c c\u1EB7p \u01B0\u1EDBc c\u1EE7a $k$ (nh\u1EDB c\u1EA3 **\u01B0\u1EDBc \xE2m**)."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 Ch\u1EB7n mi\u1EC1n gi\xE1 tr\u1ECB",
        detail: [
          "D\xF9ng t\xEDnh kh\xF4ng \xE2m c\u1EE7a b\xECnh ph\u01B0\u01A1ng v\xE0 gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i \u0111\u1EC3 ch\u1EB7n bi\u1EBFn v\xE0o m\u1ED9t kho\u1EA3ng h\u1EEFu h\u1EA1n.",
          "V\xED d\u1EE5 t\u1EEB $7(x-2004)^{2}=23-y^{2}$ suy ra $y^{2}\\le23$, t\u1EE9c $y\\in\\{0;1;2;3;4\\}$ \u2014 ch\u1EC9 c\xF2n v\xE0i tr\u01B0\u1EDDng h\u1EE3p \u0111\u1EC3 th\u1EED."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 4 \u2014 D\xF9ng t\xEDnh ch\u1EA5t s\u1ED1 nguy\xEAn t\u1ED1",
        detail: [
          "N\u1EBFu $p$ nguy\xEAn t\u1ED1 v\xE0 $p\\;|\\;ab$ th\xEC $p\\;|\\;a$ ho\u1EB7c $p\\;|\\;b$.",
          'V\u1EDBi b\xE0i "t\xECm s\u1ED1 nguy\xEAn t\u1ED1", h\xE3y x\xE9t ri\xEAng $p=2$ (s\u1ED1 nguy\xEAn t\u1ED1 ch\u1EB5n duy nh\u1EA5t) r\u1ED3i x\xE9t $p$ l\u1EBB.'
        ]
      }
    ],
    mindmap: {
      root: "GI\xC1 TR\u1ECA NGUY\xCAN (HSG 7)",
      branches: [
        { title: "Ph\xE2n th\u1EE9c nguy\xEAn", items: ["T\xE1ch ph\u1EA7n nguy\xEAn", "L\u1EADp b\u1EA3ng \u01B0\u1EDBc", "\u0110\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n"] },
        { title: "Nghi\u1EC7m nguy\xEAn", items: ["\u0110\u01B0a v\u1EC1 d\u1EA1ng t\xEDch", "Ch\u1EB7n mi\u1EC1n gi\xE1 tr\u1ECB", "X\xE9t theo s\u1ED1 d\u01B0"] },
        { title: "S\u1ED1 nguy\xEAn t\u1ED1", items: ["T\xE1ch $p=2$ v\xE0 $p$ l\u1EBB", "T\xEDnh ch\u1EA5t $p\\;|\\;ab$", "Ch\u1EB7n r\u1ED3i th\u1EED"] }
      ]
    },
    examples: [
      {
        prompt: "T\xECm c\xE1c s\u1ED1 nguy\xEAn $x$, $y$ tho\u1EA3 m\xE3n $xy+3x-y=6$.",
        thinking: [
          "M\u1ED9t ph\u01B0\u01A1ng tr\xECnh, hai \u1EA9n nguy\xEAn \u2192 ph\u1EA3i \u0111\u01B0a v\u1EC1 **d\u1EA1ng t\xEDch** r\u1ED3i x\xE9t \u01B0\u1EDBc.",
          "Nh\xF3m $x$ ra: $x(y+3)-y=6$. Mu\u1ED1n ngo\u1EB7c th\u1EE9 hai c\u0169ng ch\u1EE9a $(y+3)$ th\xEC c\u1ED9ng th\xEAm $3$ v\xE0o hai v\u1EBF.",
          "Sau khi c\xF3 t\xEDch b\u1EB1ng h\u1EB1ng s\u1ED1, nh\u1EDB li\u1EC7t k\xEA **c\u1EA3 \u01B0\u1EDBc \xE2m**."
        ],
        solution: [
          "$xy+3x-y=6\\Leftrightarrow x(y+3)-(y+3)=6-3$",
          "$\\Leftrightarrow (x-1)(y+3)=3$.",
          "V\xEC $x$, $y$ nguy\xEAn n\xEAn $x-1$ v\xE0 $y+3$ l\xE0 c\xE1c \u01B0\u1EDBc nguy\xEAn c\u1EE7a $3$: $\\{1;3;-1;-3\\}$.",
          "\u2022 $x-1=1$, $y+3=3\\Rightarrow x=2$, $y=0$.",
          "\u2022 $x-1=3$, $y+3=1\\Rightarrow x=4$, $y=-2$.",
          "\u2022 $x-1=-1$, $y+3=-3\\Rightarrow x=0$, $y=-6$.",
          "\u2022 $x-1=-3$, $y+3=-1\\Rightarrow x=-2$, $y=-4$.",
          "V\u1EADy $(x;y)\\in\\{(2;0);(4;-2);(0;-6);(-2;-4)\\}$."
        ],
        remark: "Ch\u1EC9 li\u1EC7t k\xEA \u01B0\u1EDBc d\u01B0\u01A1ng l\xE0 m\u1EA5t m\u1ED9t n\u1EEDa s\u1ED1 nghi\u1EC7m \u2014 \u0111\xE2y l\xE0 b\u1EABy \u0111\u01B0\u1EE3c c\xE0i trong h\u1EA7u h\u1EBFt \u0111\u1EC1 HSG."
      },
      {
        prompt: "T\xECm s\u1ED1 nguy\xEAn $m$ \u0111\u1EC3 gi\xE1 tr\u1ECB c\u1EE7a bi\u1EC3u th\u1EE9c $m-1$ chia h\u1EBFt cho gi\xE1 tr\u1ECB c\u1EE7a bi\u1EC3u th\u1EE9c $2m+1$.",
        thinking: [
          "Mu\u1ED1n so s\xE1nh $m-1$ v\u1EDBi $2m+1$, h\xE3y **nh\xE2n \u0111\xF4i** $m-1$ \u0111\u1EC3 hai bi\u1EC3u th\u1EE9c c\xF9ng b\u1EADc theo $m$.",
          "Khi \u0111\xF3 hi\u1EC7u c\u1EE7a ch\xFAng l\xE0 h\u1EB1ng s\u1ED1 \u2014 b\xE0i to\xE1n quy v\u1EC1 x\xE9t \u01B0\u1EDBc c\u1EE7a h\u1EB1ng s\u1ED1 \u1EA5y."
        ],
        solution: [
          "Ta c\xF3 $(m-1)\\;\\vdots\\;(2m+1)\\Rightarrow 2(m-1)\\;\\vdots\\;(2m+1)$.",
          "$2(m-1)=2m-2=(2m+1)-3$.",
          "V\xEC $(2m+1)\\;\\vdots\\;(2m+1)$ n\xEAn suy ra $3\\;\\vdots\\;(2m+1)$.",
          "Do \u0111\xF3 $2m+1\\in\\text{\u01AF}(3)=\\{1;-1;3;-3\\}$.",
          "$2m+1=1\\Rightarrow m=0$ \xB7 $2m+1=-1\\Rightarrow m=-1$ \xB7 $2m+1=3\\Rightarrow m=1$ \xB7 $2m+1=-3\\Rightarrow m=-2$.",
          "Th\u1EED l\u1EA1i c\u1EA3 b\u1ED1n gi\xE1 tr\u1ECB \u0111\u1EC1u tho\u1EA3. V\u1EADy $m\\in\\{-2;-1;0;1\\}$."
        ],
        remark: 'M\u1EB9o "nh\xE2n h\u1EC7 s\u1ED1 cho c\xF9ng b\u1EADc r\u1ED3i tr\u1EEB" l\xE0 ch\xECa kho\xE1 c\u1EE7a m\u1ECDi b\xE0i chia h\u1EBFt ch\u1EE9a tham s\u1ED1.'
      }
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    id: "hsg-7-5",
    grade: 7,
    name: "C\u1EF1c tr\u1ECB c\u1EE7a bi\u1EC3u th\u1EE9c \u2014 K\u1EF9 thu\u1EADt ho\xE0n ch\u1EC9nh b\xECnh ph\u01B0\u01A1ng",
    summary: "\u0110\u01B0a v\u1EC1 t\u1ED5ng b\xECnh ph\u01B0\u01A1ng, d\xF9ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i, v\xE0 k\u1EF9 thu\u1EADt v\u1EDBi ph\xE2n th\u1EE9c c\xF3 t\u1EED h\u1EB1ng s\u1ED1.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 Ho\xE0n ch\u1EC9nh b\xECnh ph\u01B0\u01A1ng",
        detail: [
          "$ax^{2}+bx+c=a\\left(x+\\f{b}{2a}\\right)^{2}+\\f{4ac-b^{2}}{4a}$.",
          "$a>0$: bi\u1EC3u th\u1EE9c c\xF3 **gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t** $\\f{4ac-b^{2}}{4a}$ khi $x=-\\f{b}{2a}$.",
          "$a<0$: bi\u1EC3u th\u1EE9c c\xF3 **gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t** c\u0169ng t\u1EA1i $x=-\\f{b}{2a}$."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 B\u1EA5t \u0111\u1EB3ng th\u1EE9c gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i",
        detail: [
          "$|A|+|B|\\ge|A+B|$, d\u1EA5u b\u1EB1ng khi $A\\cdot B\\ge0$.",
          "$|A|-|B|\\le|A-B|$, d\u1EA5u b\u1EB1ng khi $A$, $B$ c\xF9ng d\u1EA5u v\xE0 $|A|\\ge|B|$.",
          "M\u1EB9o t\xECm GTNN c\u1EE7a $|x-a|+|x-b|$: k\u1EBFt qu\u1EA3 l\xE0 $|a-b|$, \u0111\u1EA1t \u0111\u01B0\u1EE3c khi $x$ n\u1EB1m **gi\u1EEFa** $a$ v\xE0 $b$."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 Ph\xE2n th\u1EE9c c\xF3 t\u1EED l\xE0 h\u1EB1ng s\u1ED1",
        detail: [
          "V\u1EDBi $P=\\f{k}{f(x)}$ v\xE0 $k>0$: $P$ l\u1EDBn nh\u1EA5t khi $f(x)$ **nh\u1ECF nh\u1EA5t v\xE0 d\u01B0\u01A1ng**.",
          "Th\u01B0\u1EDDng g\u1EB7p $f(x)=|x-a|+m$, nh\u1ECF nh\u1EA5t b\u1EB1ng $m$ khi $x=a$."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 4 \u2014 Ba b\u01B0\u1EDBc b\u1EAFt bu\u1ED9c c\u1EE7a l\u1EDDi gi\u1EA3i c\u1EF1c tr\u1ECB",
        detail: [
          "B\u01B0\u1EDBc 1: ch\u1EE9ng minh b\u1EA5t \u0111\u1EB3ng th\u1EE9c $A\\ge m$ (ho\u1EB7c $A\\le M$) \u0111\xFAng v\u1EDBi **m\u1ECDi** gi\xE1 tr\u1ECB c\u1EE7a bi\u1EBFn.",
          "B\u01B0\u1EDBc 2: ch\u1EC9 ra gi\xE1 tr\u1ECB c\u1EE5 th\u1EC3 c\u1EE7a bi\u1EBFn l\xE0m d\u1EA5u b\u1EB1ng x\u1EA3y ra.",
          "B\u01B0\u1EDBc 3: k\u1EBFt lu\u1EADn. **Thi\u1EBFu b\u01B0\u1EDBc 2 th\xEC ch\u01B0a \u0111\u01B0\u1EE3c t\xEDnh \u0111i\u1EC3m** d\xF9 b\u1EA5t \u0111\u1EB3ng th\u1EE9c \u0111\xFAng."
        ]
      }
    ],
    mindmap: {
      root: "C\u1EF0C TR\u1ECA BI\u1EC2U TH\u1EE8C (HSG 7)",
      branches: [
        { title: "C\xF4ng c\u1EE5", items: ["$A^{2}\\ge0$", "$|A|\\ge0$", "$|A|+|B|\\ge|A+B|$"] },
        { title: "\u0110a th\u1EE9c b\u1EADc hai", items: ["Ho\xE0n ch\u1EC9nh b\xECnh ph\u01B0\u01A1ng", "X\xE9t d\u1EA5u h\u1EC7 s\u1ED1 $a$", "\u0110i\u1EC3m r\u01A1i $x=-\\f{b}{2a}$"] },
        { title: "Ch\u1EE9a tr\u1ECB tuy\u1EC7t \u0111\u1ED1i", items: ["$|x-a|+|x-b|$", "Nh\xF3m c\u1EB7p \u0111\u1ED1i nhau", "X\xE9t kho\u1EA3ng"] },
        { title: "Ph\xE2n th\u1EE9c", items: ["T\u1EED d\u01B0\u01A1ng \u2192 m\u1EABu nh\u1ECF nh\u1EA5t", "T\u1EED \xE2m \u2192 m\u1EABu l\u1EDBn nh\u1EA5t", "Lu\xF4n ki\u1EC3m tra m\u1EABu $\\ne0$"] }
      ]
    },
    examples: [
      {
        prompt: "T\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t c\u1EE7a bi\u1EC3u th\u1EE9c $A=|x-3|+|x-7|$.",
        thinking: [
          "T\u1ED5ng hai gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i c\xF3 d\u1EA1ng $|x-a|+|x-b|$ \u2014 m\xF4 h\xECnh quen thu\u1ED9c, k\u1EBFt qu\u1EA3 l\xE0 $|a-b|$.",
          "Ch\u1EE9ng minh b\u1EB1ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c $|M|+|N|\\ge|M+N|$; mu\u1ED1n t\u1ED5ng b\xEAn trong ra h\u1EB1ng s\u1ED1 th\xEC ph\u1EA3i **\u0111\u1ED5i d\u1EA5u m\u1ED9t h\u1EA1ng t\u1EED**.",
          "Vi\u1EBFt $|x-7|=|7-x|$ r\u1ED3i c\u1ED9ng v\u1EDBi $|x-3|$: b\xEAn trong tri\u1EC7t ti\xEAu $x$, ch\u1EC9 c\xF2n $4$."
        ],
        solution: [
          "Ta c\xF3 $A=|x-3|+|x-7|=|x-3|+|7-x|$.",
          "\xC1p d\u1EE5ng $|M|+|N|\\ge|M+N|$ v\u1EDBi $M=x-3$, $N=7-x$:",
          "$A\\ge|(x-3)+(7-x)|=|4|=4$.",
          'D\u1EA5u "$=$" x\u1EA3y ra khi $(x-3)(7-x)\\ge0$, t\u1EE9c $3\\le x\\le7$.',
          "V\u1EADy $A_{\\min}=4$, \u0111\u1EA1t \u0111\u01B0\u1EE3c v\u1EDBi m\u1ECDi $x$ tho\u1EA3 $3\\le x\\le7$."
        ],
        remark: "K\u1EBFt qu\u1EA3 t\u1ED5ng qu\xE1t \u0111\xE1ng nh\u1EDB: $|x-a|+|x-b|$ nh\u1ECF nh\u1EA5t b\u1EB1ng $|a-b|$ khi $x$ n\u1EB1m gi\u1EEFa $a$ v\xE0 $b$."
      },
      {
        prompt: "T\xECm gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t c\u1EE7a bi\u1EC3u th\u1EE9c $B=-a^{2}+3a+4$.",
        thinking: [
          "H\u1EC7 s\u1ED1 c\u1EE7a $a^{2}$ l\xE0 $-1<0$ n\xEAn bi\u1EC3u th\u1EE9c c\xF3 **gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t**.",
          "\u0110\u01B0a v\u1EC1 d\u1EA1ng $-(\\text{b\xECnh ph\u01B0\u01A1ng})+\\text{h\u1EB1ng s\u1ED1}$ b\u1EB1ng c\xE1ch ho\xE0n ch\u1EC9nh b\xECnh ph\u01B0\u01A1ng.",
          "Nh\u1EDB: khi r\xFAt $-1$ ra ngo\xE0i th\xEC **m\u1ECDi d\u1EA5u b\xEAn trong \u0111\u1EC1u \u0111\u1ED5i**."
        ],
        solution: [
          "$B=-a^{2}+3a+4=-\\left(a^{2}-3a\\right)+4$",
          "$=-\\left(a^{2}-2\\cdot a\\cdot\\f{3}{2}+\\f{9}{4}\\right)+4+\\f{9}{4}$",
          "$=-\\left(a-\\f{3}{2}\\right)^{2}+\\f{25}{4}$.",
          "V\xEC $\\left(a-\\f{3}{2}\\right)^{2}\\ge0$ v\u1EDBi m\u1ECDi $a$ n\xEAn $-\\left(a-\\f{3}{2}\\right)^{2}\\le0$, do \u0111\xF3 $B\\le\\f{25}{4}$.",
          'D\u1EA5u "$=$" x\u1EA3y ra khi $a=\\f{3}{2}$.',
          "V\u1EADy $B_{\\max}=\\f{25}{4}$ khi $a=\\f{3}{2}$."
        ],
        remark: "Khi th\xEAm $\\f{9}{4}$ v\xE0o trong ngo\u1EB7c c\xF3 d\u1EA5u tr\u1EEB \u0111\u1EB1ng tr\u01B0\u1EDBc, ph\u1EA3i **c\u1ED9ng b\xF9** $\\f{9}{4}$ ra ngo\xE0i \u2014 \u0111\xE2y l\xE0 ch\u1ED7 sai d\u1EA5u nhi\u1EC1u nh\u1EA5t."
      }
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    id: "hsg-7-6",
    grade: 7,
    name: "Ch\u1EE9ng minh chia h\u1EBFt b\u1EADc THCS",
    summary: "Nh\xF3m theo lu\u1EF9 th\u1EEBa chung, khai tri\u1EC3n nh\u1ECB th\u1EE9c d\u1EA1ng $(k+1)^{n}$, x\xE9t theo s\u1ED1 d\u01B0 v\xE0 ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng theo chu k\u1EF3.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 \u0110\u1EB7t lu\u1EF9 th\u1EEBa chung",
        detail: [
          "V\u1EDBi bi\u1EC3u th\u1EE9c ch\u1EE9a $a^{n+k}$, h\xE3y vi\u1EBFt $a^{n+k}=a^{n}\\cdot a^{k}$ r\u1ED3i \u0111\u1EB7t $a^{n}$ l\xE0m nh\xE2n t\u1EED chung.",
          "V\xED d\u1EE5 $3^{n+2}-2^{n+2}+3^{n}-2^{n}=3^{n}(3^{2}+1)-2^{n}(2^{2}+1)=3^{n}\\cdot10-2^{n}\\cdot5$.",
          "Sau khi nh\xF3m, t\xECm nh\xE2n t\u1EED chung b\u1EB1ng s\u1ED1 \u0111\u1EC3 k\u1EBFt lu\u1EADn chia h\u1EBFt."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 Vi\u1EBFt c\u01A1 s\u1ED1 th\xE0nh $k+1$ r\u1ED3i khai tri\u1EC3n",
        detail: [
          "$10^{n}=(9+1)^{n}=9A+1$ \u2014 m\u1ECDi lu\u1EF9 th\u1EEBa c\u1EE7a $10$ chia $9$ \u0111\u1EC1u d\u01B0 $1$.",
          "T\u1ED5ng qu\xE1t $(k+1)^{n}=kA+1$, r\u1EA5t m\u1EA1nh khi c\u1EA7n x\xE9t s\u1ED1 d\u01B0 khi chia cho $k$.",
          "V\xED d\u1EE5: $2^{3k}=8^{k}=(7+1)^{k}=7A+1$ n\xEAn $2^{3k}-1$ chia h\u1EBFt cho $7$."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 X\xE9t theo l\u1EDBp s\u1ED1 d\u01B0",
        detail: [
          "Mu\u1ED1n ch\u1EE9ng minh m\u1EC7nh \u0111\u1EC1 \u0111\xFAng v\u1EDBi m\u1ECDi $n$, h\xE3y vi\u1EBFt $n=qk+r$ v\u1EDBi $r\\in\\{0;1;\\dots;k-1\\}$.",
          "X\xE9t l\u1EA7n l\u01B0\u1EE3t t\u1EEBng l\u1EDBp s\u1ED1 d\u01B0 \u2014 s\u1ED1 tr\u01B0\u1EDDng h\u1EE3p h\u1EEFu h\u1EA1n n\xEAn lu\xF4n ki\u1EC3m tra h\u1EBFt \u0111\u01B0\u1EE3c."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 4 \u2014 T\u1ED5ng lu\u1EF9 th\u1EEBa",
        detail: [
          "$S=1+a+a^{2}+\\dots+a^{n}$ th\xEC $aS-S=a^{n+1}-1$, suy ra $S=\\f{a^{n+1}-1}{a-1}$.",
          "Ho\u1EB7c nh\xF3m $k$ s\u1ED1 h\u1EA1ng li\xEAn ti\u1EBFp \u0111\u1EC3 t\u1EA1o nh\xE2n t\u1EED chung \u2014 c\xE1ch n\xE0y g\u1ECDn h\u01A1n khi c\u1EA7n ch\u1EE9ng minh chia h\u1EBFt."
        ]
      }
    ],
    mindmap: {
      root: "CH\u1EE8NG MINH CHIA H\u1EBET (HSG 7)",
      branches: [
        { title: "Bi\u1EBFn \u0111\u1ED5i", items: ["\u0110\u1EB7t lu\u1EF9 th\u1EEBa chung", "Nh\xF3m $k$ s\u1ED1 h\u1EA1ng", "T\u1ED5ng lu\u1EF9 th\u1EEBa"] },
        { title: "S\u1ED1 d\u01B0", items: ["$(k+1)^{n}=kA+1$", "X\xE9t l\u1EDBp s\u1ED1 d\u01B0 c\u1EE7a $n$", "Chu k\u1EF3 ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng"] },
        { title: "T\xEDnh ch\u1EA5t", items: ["Chia h\u1EBFt c\u1EE7a t\u1ED5ng, hi\u1EC7u", "T\xEDch li\xEAn ti\u1EBFp", "$p$ nguy\xEAn t\u1ED1 v\xE0 $p\\;|\\;ab$"] }
      ]
    },
    examples: [
      {
        prompt: "Ch\u1EE9ng minh r\u1EB1ng v\u1EDBi m\u1ECDi s\u1ED1 nguy\xEAn d\u01B0\u01A1ng $n$: $3^{n+2}-2^{n+2}+3^{n}-2^{n}$ chia h\u1EBFt cho $10$.",
        thinking: [
          "C\xF3 b\u1ED1n h\u1EA1ng t\u1EED nh\u01B0ng ch\u1EC9 hai c\u01A1 s\u1ED1 l\xE0 $3$ v\xE0 $2$ \u2014 h\xE3y **nh\xF3m theo c\u01A1 s\u1ED1**.",
          "M\u1ED7i nh\xF3m \u0111\u1EB7t $3^{n}$ v\xE0 $2^{n}$ l\xE0m nh\xE2n t\u1EED chung, ph\u1EA7n c\xF2n l\u1EA1i l\xE0 h\u1EB1ng s\u1ED1.",
          "\u0110\xEDch \u0111\u1EBFn l\xE0 l\xE0m xu\u1EA5t hi\u1EC7n th\u1EEBa s\u1ED1 $10$ \u1EDF c\u1EA3 hai nh\xF3m."
        ],
        solution: [
          "Nh\xF3m theo c\u01A1 s\u1ED1: $\\left(3^{n+2}+3^{n}\\right)-\\left(2^{n+2}+2^{n}\\right)$.",
          "$=3^{n}\\left(3^{2}+1\\right)-2^{n}\\left(2^{2}+1\\right)=3^{n}\\cdot10-2^{n}\\cdot5$.",
          "V\u1EDBi $n\\ge1$: $2^{n}=2\\cdot2^{n-1}$ n\xEAn $2^{n}\\cdot5=2^{n-1}\\cdot10$.",
          "Do \u0111\xF3 bi\u1EC3u th\u1EE9c $=3^{n}\\cdot10-2^{n-1}\\cdot10=10\\left(3^{n}-2^{n-1}\\right)$.",
          "V\xEC $3^{n}-2^{n-1}$ l\xE0 s\u1ED1 nguy\xEAn n\xEAn bi\u1EC3u th\u1EE9c chia h\u1EBFt cho $10$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
        ],
        remark: 'B\u01B0\u1EDBc "bi\u1EBFn $5$ th\xE0nh $10$ nh\u1EDD m\u01B0\u1EE3n m\u1ED9t th\u1EEBa s\u1ED1 $2$ t\u1EEB $2^{n}$" l\xE0 m\u1EA5u ch\u1ED1t c\u1EE7a b\xE0i.'
      },
      {
        prompt: "T\xECm t\u1EA5t c\u1EA3 c\xE1c s\u1ED1 nguy\xEAn d\u01B0\u01A1ng $n$ sao cho $2^{n}-1$ chia h\u1EBFt cho $7$.",
        thinking: [
          "Lu\u1EF9 th\u1EEBa c\u1EE7a $2$ khi chia cho $7$ c\xF3 **chu k\u1EF3**: $2^{1}=2$, $2^{2}=4$, $2^{3}=8\\equiv1$ \u2014 chu k\u1EF3 $3$.",
          "V\u1EADy h\xE3y vi\u1EBFt $n$ theo ba l\u1EDBp s\u1ED1 d\u01B0 $3k$, $3k+1$, $3k+2$ r\u1ED3i x\xE9t t\u1EEBng l\u1EDBp.",
          "C\xF4ng c\u1EE5 \u0111\u1EC3 x\xE9t: $8^{k}=(7+1)^{k}=7A+1$."
        ],
        solution: [
          "X\xE9t ba tr\u01B0\u1EDDng h\u1EE3p theo s\u1ED1 d\u01B0 c\u1EE7a $n$ khi chia cho $3$.",
          "\u2022 $n=3k$: $2^{n}-1=8^{k}-1=(7+1)^{k}-1=(7A+1)-1=7A\\;\\vdots\\;7$ \u2713",
          "\u2022 $n=3k+1$: $2^{n}-1=2\\cdot8^{k}-1=2(7A+1)-1=14A+1$, chia $7$ d\u01B0 $1$ \u2014 kh\xF4ng tho\u1EA3.",
          "\u2022 $n=3k+2$: $2^{n}-1=4\\cdot8^{k}-1=4(7A+1)-1=28A+3$, chia $7$ d\u01B0 $3$ \u2014 kh\xF4ng tho\u1EA3.",
          "V\u1EADy $2^{n}-1$ chia h\u1EBFt cho $7$ khi v\xE0 ch\u1EC9 khi $n$ l\xE0 **b\u1ED9i c\u1EE7a $3$**."
        ],
        remark: 'H\u1EC5 g\u1EB7p "lu\u1EF9 th\u1EEBa chia h\u1EBFt cho m\u1ED9t s\u1ED1", h\xE3y t\xECm chu k\u1EF3 tr\u01B0\u1EDBc \u2014 chu k\u1EF3 c\xF3 bao nhi\xEAu b\u01B0\u1EDBc th\xEC chia $n$ th\xE0nh b\u1EA5y nhi\xEAu l\u1EDBp.'
      }
    ]
  },
  /* ---------------------------------------------------------------- */
  {
    id: "hsg-7-7",
    grade: 7,
    name: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c v\xE0 k\u1EF9 thu\u1EADt l\xE0m tr\u1ED9i",
    summary: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si, k\u1EF9 thu\u1EADt l\xE0m tr\u1ED9i \u0111\u1EC3 ch\u1EB7n t\u1ED5ng, v\xE0 ch\u1EE9ng minh m\u1ED9t bi\u1EC3u th\u1EE9c kh\xF4ng nguy\xEAn.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 B\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si",
        detail: [
          "$a+b\\ge2\\s{ab}$ v\u1EDBi $a,b\\ge0$; d\u1EA5u b\u1EB1ng khi $a=b$.",
          "H\u1EC7 qu\u1EA3 r\u1EA5t hay d\xF9ng: $(a+b)\\left(\\f{1}{a}+\\f{1}{b}\\right)\\ge4$ v\xE0 $(a+b+c)\\left(\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\right)\\ge9$.",
          "Ch\u1EE9ng minh g\u1ED1c: m\u1ECDi b\u1EA5t \u0111\u1EB3ng th\u1EE9c tr\xEAn \u0111\u1EC1u quy v\u1EC1 $(a-b)^{2}\\ge0$."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 L\xE0m tr\u1ED9i, l\xE0m gi\u1EA3m",
        detail: [
          "Thay m\u1ED7i m\u1EABu s\u1ED1 b\u1EB1ng m\u1ED9t m\u1EABu **l\u1EDBn h\u01A1n** (\u0111\u1EC3 l\xE0m gi\u1EA3m) ho\u1EB7c **nh\u1ECF h\u01A1n** (\u0111\u1EC3 l\xE0m tr\u1ED9i) m\xE0 v\u1EABn t\xEDnh \u0111\u01B0\u1EE3c t\u1ED5ng.",
          "$\\f{1}{a(a+1)}<\\f{1}{a^{2}}<\\f{1}{a(a-1)}$ \u2014 k\u1EB9p gi\u1EEFa hai t\u1ED5ng sai ph\xE2n t\xEDnh \u0111\u01B0\u1EE3c.",
          "Sai ph\xE2n: $\\f{1}{a(a+1)}=\\f{1}{a}-\\f{1}{a+1}$, c\u1ED9ng l\u1EA1i th\xEC c\xE1c h\u1EA1ng t\u1EED tri\u1EC7t ti\xEAu d\xE2y chuy\u1EC1n."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 Ch\u1EB7n hai \u0111\u1EA7u \u0111\u1EC3 ch\u1EE9ng minh kh\xF4ng nguy\xEAn",
        detail: [
          "Mu\u1ED1n ch\u1EE9ng minh $M$ kh\xF4ng nguy\xEAn, h\xE3y ch\u1EB7n $k<M<k+1$ v\u1EDBi $k$ nguy\xEAn.",
          "M\u1EB9o ch\u1EB7n tr\xEAn: vi\u1EBFt $M=n-N$ v\u1EDBi $N$ \u0111\xE3 ch\u1EB7n d\u01B0\u1EDBi \u0111\u01B0\u1EE3c.",
          "V\xED d\u1EE5 v\u1EDBi $M=\\f{a}{a+b}+\\f{b}{b+c}+\\f{c}{c+a}$: ch\u1EB7n \u0111\u01B0\u1EE3c $1<M<2$."
        ]
      }
    ],
    mindmap: {
      root: "B\u1EA4T \u0110\u1EB2NG TH\u1EE8C (HSG 7)",
      branches: [
        { title: "C\xF4ng c\u1EE5 n\u1EC1n", items: ["$(a-b)^{2}\\ge0$", "C\xF4-si hai s\u1ED1, ba s\u1ED1", "$|A|\\ge A$"] },
        { title: "L\xE0m tr\u1ED9i", items: ["So s\xE1nh t\u1EEBng m\u1EABu", "Sai ph\xE2n tri\u1EC7t ti\xEAu", "K\u1EB9p gi\u1EEFa hai t\u1ED5ng"] },
        { title: "\u1EE8ng d\u1EE5ng", items: ["Ch\u1EE9ng minh kh\xF4ng nguy\xEAn", "Ch\u1EB7n t\u1ED5ng d\xE3y", "T\xECm c\u1EF1c tr\u1ECB"] }
      ]
    },
    examples: [
      {
        prompt: "Cho $a$, $b$, $c$ l\xE0 c\xE1c s\u1ED1 d\u01B0\u01A1ng. Ch\u1EE9ng minh r\u1EB1ng $(a+b+c)\\left(\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\right)\\ge9$.",
        thinking: [
          "V\u1EBF tr\xE1i l\xE0 t\xEDch c\u1EE7a m\u1ED9t t\u1ED5ng v\u1EDBi t\u1ED5ng c\xE1c ngh\u1ECBch \u0111\u1EA3o \u2014 \u0111\xFAng m\xF4 h\xECnh \xE1p d\u1EE5ng C\xF4-si hai l\u1EA7n.",
          "C\xF4-si cho ba s\u1ED1: $a+b+c\\ge3\\cb{abc}$ v\xE0 $\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\ge3\\cb{\\f{1}{abc}}$.",
          "Nh\xE2n hai b\u1EA5t \u0111\u1EB3ng th\u1EE9c c\xF9ng chi\u1EC1u (hai v\u1EBF \u0111\u1EC1u d\u01B0\u01A1ng) th\xEC ph\u1EA7n c\u0103n tri\u1EC7t ti\xEAu, c\xF2n l\u1EA1i \u0111\xFAng $9$."
        ],
        solution: [
          "V\xEC $a$, $b$, $c$ d\u01B0\u01A1ng n\xEAn \xE1p d\u1EE5ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si cho ba s\u1ED1:",
          "$a+b+c\\ge3\\cb{abc}>0$. (1)",
          "$\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\ge3\\cb{\\f{1}{abc}}>0$. (2)",
          "Nh\xE2n (1) v\u1EDBi (2) theo v\u1EBF (\u0111\u01B0\u1EE3c ph\xE9p v\xEC c\u1EA3 b\u1ED1n v\u1EBF \u0111\u1EC1u d\u01B0\u01A1ng):",
          "$(a+b+c)\\left(\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\right)\\ge9\\cb{abc}\\cdot\\cb{\\f{1}{abc}}=9$.",
          'D\u1EA5u "$=$" x\u1EA3y ra khi $a=b=c$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)'
        ],
        remark: "Ch\u1EC9 \u0111\u01B0\u1EE3c nh\xE2n hai b\u1EA5t \u0111\u1EB3ng th\u1EE9c theo v\u1EBF khi **t\u1EA5t c\u1EA3 c\xE1c v\u1EBF \u0111\u1EC1u d\u01B0\u01A1ng** \u2014 lu\xF4n ghi r\xF5 \u0111i\u1EC1u ki\u1EC7n n\xE0y."
      },
      {
        prompt: "Cho $a$, $b$, $c>0$. Ch\u1EE9ng minh r\u1EB1ng $M=\\f{a}{a+b}+\\f{b}{b+c}+\\f{c}{c+a}$ kh\xF4ng ph\u1EA3i l\xE0 s\u1ED1 nguy\xEAn.",
        thinking: [
          "Kh\xF4ng t\xEDnh \u0111\u01B0\u1EE3c gi\xE1 tr\u1ECB c\u1EE5 th\u1EC3, v\u1EADy h\u01B0\u1EDBng \u0111i l\xE0 **ch\u1EB7n hai \u0111\u1EA7u**: ch\u1EC9 ra $1<M<2$ th\xEC $M$ kh\xF4ng th\u1EC3 nguy\xEAn.",
          "Ch\u1EB7n d\u01B0\u1EDBi: thay m\u1ED7i m\u1EABu b\u1EB1ng m\u1EABu **l\u1EDBn h\u01A1n** $a+b+c$ \u0111\u1EC3 m\u1ED7i ph\xE2n s\u1ED1 **nh\u1ECF \u0111i**, t\u1ED5ng ba ph\xE2n s\u1ED1 m\u1EDBi b\u1EB1ng \u0111\xFAng $1$.",
          'Ch\u1EB7n tr\xEAn: x\xE9t bi\u1EC3u th\u1EE9c "b\xF9" $N=\\f{b}{a+b}+\\f{c}{b+c}+\\f{a}{c+a}$ th\xEC $M+N=3$; m\xE0 $N>1$ theo c\xE1ch tr\xEAn, n\xEAn $M<2$.'
        ],
        solution: [
          "**Ch\u1EB7n d\u01B0\u1EDBi.** V\xEC $a,b,c>0$ n\xEAn $a+b<a+b+c$, do \u0111\xF3 $\\f{a}{a+b}>\\f{a}{a+b+c}$.",
          "T\u01B0\u01A1ng t\u1EF1 $\\f{b}{b+c}>\\f{b}{a+b+c}$ v\xE0 $\\f{c}{c+a}>\\f{c}{a+b+c}$.",
          "C\u1ED9ng ba b\u1EA5t \u0111\u1EB3ng th\u1EE9c: $M>\\f{a+b+c}{a+b+c}=1$.",
          "**Ch\u1EB7n tr\xEAn.** \u0110\u1EB7t $N=\\f{b}{a+b}+\\f{c}{b+c}+\\f{a}{c+a}$.",
          "Ta c\xF3 $M+N=\\f{a+b}{a+b}+\\f{b+c}{b+c}+\\f{c+a}{c+a}=3$.",
          "L\u1EADp lu\u1EADn ho\xE0n to\xE0n t\u01B0\u01A1ng t\u1EF1 ph\u1EA7n tr\xEAn cho $N$, ta \u0111\u01B0\u1EE3c $N>1$, suy ra $M=3-N<2$.",
          "V\u1EADy $1<M<2$. Gi\u1EEFa $1$ v\xE0 $2$ kh\xF4ng c\xF3 s\u1ED1 nguy\xEAn n\xE0o, n\xEAn $M$ kh\xF4ng ph\u1EA3i s\u1ED1 nguy\xEAn. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
        ],
        remark: 'K\u1EF9 thu\u1EADt "t\u1EA1o bi\u1EC3u th\u1EE9c b\xF9 \u0111\u1EC3 ch\u1EB7n \u0111\u1EA7u c\xF2n l\u1EA1i" d\xF9ng \u0111\u01B0\u1EE3c cho r\u1EA5t nhi\u1EC1u b\xE0i ch\u1EB7n t\u1ED5ng ph\xE2n th\u1EE9c.'
      }
    ]
  }
];

// src/content/hsg-gita2.ts
var HSG_TOPICS_GITA2 = [
  /* ============================== KHỐI 6 ============================== */
  {
    id: "hsg-6-3",
    grade: 6,
    name: "Ph\xE2n s\u1ED1 t\u1ED1i gi\u1EA3n, s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng v\xE0 so s\xE1nh bi\u1EC3u th\u1EE9c",
    summary: "Ch\u1EE9ng minh ph\xE2n s\u1ED1 t\u1ED1i gi\u1EA3n b\u1EB1ng t\u1ED5 h\u1EE3p tuy\u1EBFn t\xEDnh, nh\u1EADn d\u1EA1ng s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng, v\xE0 ba k\u1EF9 thu\u1EADt so s\xE1nh ph\xE2n s\u1ED1.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 Ch\u1EE9ng minh ph\xE2n s\u1ED1 t\u1ED1i gi\u1EA3n",
        detail: [
          "G\u1ECDi $d=$ \u01AFCLN c\u1EE7a t\u1EED v\xE0 m\u1EABu, suy ra t\u1EED $\\;\\vdots\\;d$ v\xE0 m\u1EABu $\\;\\vdots\\;d$.",
          "Nh\xE2n ch\xE9o h\u1EC7 s\u1ED1 r\u1ED3i tr\u1EEB \u0111\u1EC3 **kh\u1EED bi\u1EBFn $n$**, thu \u0111\u01B0\u1EE3c m\u1ED9t h\u1EB1ng s\u1ED1 chia h\u1EBFt cho $d$.",
          "T\u1EEB \u0111\xF3 $d$ l\xE0 \u01B0\u1EDBc c\u1EE7a h\u1EB1ng s\u1ED1 \u1EA5y; lo\u1EA1i c\xE1c gi\xE1 tr\u1ECB kh\xF4ng tho\u1EA3 \u0111\u1EC3 k\u1EBFt lu\u1EADn $d=1$."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 Nh\u1EADn d\u1EA1ng s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng",
        detail: [
          "S\u1ED1 ch\xEDnh ph\u01B0\u01A1ng ch\u1EC9 c\xF3 ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng l\xE0 $0;1;4;5;6;9$ \u2014 t\u1EADn c\xF9ng $2;3;7;8$ th\xEC lo\u1EA1i ngay.",
          "S\u1ED1 ch\xEDnh ph\u01B0\u01A1ng chia $3$ d\u01B0 $0$ ho\u1EB7c $1$; chia $4$ d\u01B0 $0$ ho\u1EB7c $1$ \u2014 c\xF4ng c\u1EE5 lo\u1EA1i tr\u1EEB r\u1EA5t m\u1EA1nh.",
          "V\u1EDBi $n^{2}+k$ l\xE0 ch\xEDnh ph\u01B0\u01A1ng, \u0111\u1EB7t $n^{2}+k=m^{2}$ r\u1ED3i \u0111\u01B0a v\u1EC1 $(m-n)(m+n)=k$ \u2014 b\xE0i to\xE1n d\u1EA1ng t\xEDch."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 Ba c\xE1ch so s\xE1nh ph\xE2n s\u1ED1",
        detail: [
          "C\xE1ch 1 \u2014 **ph\u1EA7n b\xF9**: n\u1EBFu $\\f{a}{b}$ v\xE0 $\\f{c}{d}$ \u0111\u1EC1u g\u1EA7n $1$, so s\xE1nh $1-\\f{a}{b}$ v\u1EDBi $1-\\f{c}{d}$.",
          "C\xE1ch 2 \u2014 **b\u1EAFc c\u1EA7u**: t\xECm ph\xE2n s\u1ED1 trung gian (th\u01B0\u1EDDng l\xE0 $1$ ho\u1EB7c $\\f{a}{d}$) r\u1ED3i so s\xE1nh qua n\xF3.",
          "C\xE1ch 3 \u2014 v\u1EDBi $a,b,n>0$: $\\f{a}{b}<1\\Rightarrow\\f{a}{b}<\\f{a+n}{b+n}$ v\xE0 $\\f{a}{b}>1\\Rightarrow\\f{a}{b}>\\f{a+n}{b+n}$."
        ]
      }
    ],
    mindmap: {
      root: "PH\xC2N S\u1ED0 & CH\xCDNH PH\u01AF\u01A0NG (HSG 6)",
      branches: [
        { title: "T\u1ED1i gi\u1EA3n", items: ["\u0110\u1EB7t $d=$ \u01AFCLN", "Kh\u1EED bi\u1EBFn b\u1EB1ng t\u1ED5 h\u1EE3p", "Ch\u1EB7n $d$ theo \u01B0\u1EDBc"] },
        { title: "Ch\xEDnh ph\u01B0\u01A1ng", items: ["Ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng", "S\u1ED1 d\u01B0 khi chia $3$, $4$", "\u0110\u01B0a v\u1EC1 d\u1EA1ng t\xEDch"] },
        { title: "So s\xE1nh", items: ["Ph\u1EA7n b\xF9", "B\u1EAFc c\u1EA7u qua $1$", "Th\xEAm c\xF9ng m\u1ED9t s\u1ED1 v\xE0o t\u1EED m\u1EABu"] }
      ]
    },
    examples: [
      {
        prompt: "Ch\u1EE9ng minh r\u1EB1ng v\u1EDBi m\u1ECDi s\u1ED1 t\u1EF1 nhi\xEAn $n$, ph\xE2n s\u1ED1 $\\f{12n+1}{30n+2}$ l\xE0 ph\xE2n s\u1ED1 t\u1ED1i gi\u1EA3n.",
        thinking: [
          "T\u1ED1i gi\u1EA3n ngh\u0129a l\xE0 \u01AFCLN c\u1EE7a t\u1EED v\xE0 m\u1EABu b\u1EB1ng $1$ \u2014 h\xE3y \u0111\u1EB7t t\xEAn cho \u01AFCLN \u0111\xF3 l\xE0 $d$.",
          "C\u1EA3 t\u1EED v\xE0 m\u1EABu \u0111\u1EC1u ch\u1EE9a $n$; mu\u1ED1n kh\u1EED $n$ h\xE3y nh\xE2n t\u1EED v\u1EDBi $5$ v\xE0 m\u1EABu v\u1EDBi $2$ (v\xEC $12\\cdot5=30\\cdot2=60$).",
          "Sau khi tr\u1EEB, ph\u1EA7n ch\u1EE9a $n$ tri\u1EC7t ti\xEAu, c\xF2n l\u1EA1i m\u1ED9t h\u1EB1ng s\u1ED1 nh\u1ECF \u2014 \u0111\xF3 l\xE0 ch\xECa kho\xE1."
        ],
        solution: [
          "G\u1ECDi $d=\\text{\u01AFCLN}(12n+1;\\;30n+2)$ v\u1EDBi $d\\in\\N^{*}$.",
          "Khi \u0111\xF3 $(12n+1)\\;\\vdots\\;d$ v\xE0 $(30n+2)\\;\\vdots\\;d$.",
          "Suy ra $5(12n+1)\\;\\vdots\\;d$ v\xE0 $2(30n+2)\\;\\vdots\\;d$, t\u1EE9c $(60n+5)\\;\\vdots\\;d$ v\xE0 $(60n+4)\\;\\vdots\\;d$.",
          "Hi\u1EC7u c\u1EE7a ch\xFAng c\u0169ng chia h\u1EBFt cho $d$: $(60n+5)-(60n+4)=1\\;\\vdots\\;d$.",
          "V\u1EADy $d=1$, ngh\u0129a l\xE0 ph\xE2n s\u1ED1 $\\f{12n+1}{30n+2}$ t\u1ED1i gi\u1EA3n v\u1EDBi m\u1ECDi $n\\in\\N$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
        ],
        remark: "Ch\u1ECDn h\u1EC7 s\u1ED1 nh\xE2n l\xE0 ch\xECa kho\xE1: l\u1EA5y BCNN c\u1EE7a hai h\u1EC7 s\u1ED1 c\u1EE7a $n$ r\u1ED3i chia ng\u01B0\u1EE3c l\u1EA1i."
      },
      {
        prompt: "T\xECm s\u1ED1 t\u1EF1 nhi\xEAn $n$ \u0111\u1EC3 $n^{2}+2006$ l\xE0 m\u1ED9t s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng.",
        thinking: [
          "\u0110\u1EB7t $n^{2}+2006=m^{2}$ r\u1ED3i chuy\u1EC3n v\u1EBF: $m^{2}-n^{2}=2006$ \u2014 xu\u1EA5t hi\u1EC7n **hi\u1EC7u hai b\xECnh ph\u01B0\u01A1ng**.",
          "Ph\xE2n t\xEDch th\xE0nh $(m-n)(m+n)=2006$ \u0111\u1EC3 \u0111\u01B0a v\u1EC1 b\xE0i to\xE1n \u01B0\u1EDBc s\u1ED1.",
          "\u0110i\u1EC3m m\u1EA5u ch\u1ED1t: $m-n$ v\xE0 $m+n$ lu\xF4n **c\xF9ng t\xEDnh ch\u1EB5n l\u1EBB** (v\xEC hi\u1EC7u c\u1EE7a ch\xFAng l\xE0 $2n$, m\u1ED9t s\u1ED1 ch\u1EB5n)."
        ],
        solution: [
          "Gi\u1EA3 s\u1EED $n^{2}+2006=m^{2}$ v\u1EDBi $m\\in\\N$, suy ra $m^{2}-n^{2}=2006$.",
          "$\\Leftrightarrow (m-n)(m+n)=2006$.",
          "Nh\u1EADn x\xE9t: $(m+n)-(m-n)=2n$ l\xE0 s\u1ED1 ch\u1EB5n, n\xEAn $m-n$ v\xE0 $m+n$ **c\xF9ng ch\u1EB5n ho\u1EB7c c\xF9ng l\u1EBB**.",
          "\u2022 N\u1EBFu c\xF9ng l\u1EBB th\xEC t\xEDch $(m-n)(m+n)$ l\u1EBB, kh\xF4ng th\u1EC3 b\u1EB1ng $2006$ (s\u1ED1 ch\u1EB5n).",
          "\u2022 N\u1EBFu c\xF9ng ch\u1EB5n th\xEC t\xEDch chia h\u1EBFt cho $4$. Nh\u01B0ng $2006=2\\cdot17\\cdot59$ ch\u1EC9 chia h\u1EBFt cho $2$, kh\xF4ng chia h\u1EBFt cho $4$.",
          "C\u1EA3 hai tr\u01B0\u1EDDng h\u1EE3p \u0111\u1EC1u m\xE2u thu\u1EABn. V\u1EADy **kh\xF4ng t\u1ED3n t\u1EA1i** s\u1ED1 t\u1EF1 nhi\xEAn $n$ n\xE0o \u0111\u1EC3 $n^{2}+2006$ l\xE0 s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng."
        ],
        remark: "Quy t\u1EAFc v\xE0ng: $a^{2}-b^{2}=N$ c\xF3 nghi\u1EC7m nguy\xEAn khi v\xE0 ch\u1EC9 khi $N$ l\u1EBB ho\u1EB7c $N$ chia h\u1EBFt cho $4$."
      }
    ]
  },
  {
    id: "hsg-6-4",
    grade: 6,
    name: "Nguy\xEAn l\xFD Dirichlet v\xE0 b\xE0i to\xE1n \u0111\u1EBFm",
    summary: 'Thi\u1EBFt k\u1EBF "l\u1ED3ng" theo l\u1EDBp s\u1ED1 d\u01B0, b\xE0i to\xE1n t\u1ED5ng d\xE3y con chia h\u1EBFt, v\xE0 c\xF4ng th\u1EE9c \u0111\u1EBFm giao \u0111i\u1EC3m \u2014 \u0111o\u1EA1n th\u1EB3ng.',
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 Thi\u1EBFt k\u1EBF l\u1ED3ng theo l\u1EDBp s\u1ED1 d\u01B0",
        detail: [
          "Mu\u1ED1n c\xF3 hai s\u1ED1 **hi\u1EC7u chia h\u1EBFt cho $m$**, h\xE3y nh\u1ED1t ch\xFAng theo $m$ l\u1EDBp s\u1ED1 d\u01B0 khi chia cho $m$.",
          "C\xF3 $m+1$ s\u1ED1 th\xEC ch\u1EAFc ch\u1EAFn hai s\u1ED1 c\xF9ng l\u1EDBp, hi\u1EC7u c\u1EE7a ch\xFAng chia h\u1EBFt cho $m$.",
          'B\u01B0\u1EDBc kh\xF3 l\xE0 ch\u1ECDn \u0111\xFAng \u0111\u1ED1i t\u01B0\u1EE3ng l\xE0m "th\u1ECF" \u2014 nhi\u1EC1u khi ph\u1EA3i t\u1EF1 d\u1EF1ng ra d\xE3y t\u1ED5ng \u0111\u1EC3 l\xE0m th\u1ECF.'
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 D\xE3y t\u1ED5ng ri\xEAng",
        detail: [
          "Cho d\xE3y $a_1,a_2,\\dots,a_n$, l\u1EADp c\xE1c **t\u1ED5ng ri\xEAng** $S_k=a_1+a_2+\\dots+a_k$.",
          "N\u1EBFu hai t\u1ED5ng ri\xEAng $S_i$ v\xE0 $S_j$ ($i<j$) c\xF9ng s\u1ED1 d\u01B0 khi chia $n$ th\xEC $S_j-S_i=a_{i+1}+\\dots+a_j$ chia h\u1EBFt cho $n$.",
          '\u0110\xE2y l\xE0 c\xE1ch ch\u1EE9ng minh "t\u1ED3n t\u1EA1i m\u1ED9t s\u1ED1 s\u1ED1 li\xEAn ti\u1EBFp c\xF3 t\u1ED5ng chia h\u1EBFt cho $n$".'
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 C\xF4ng th\u1EE9c \u0111\u1EBFm c\u01A1 b\u1EA3n",
        detail: [
          "$n$ \u0111\u01B0\u1EDDng th\u1EB3ng \u0111\xF4i m\u1ED9t c\u1EAFt nhau, kh\xF4ng ba \u0111\u01B0\u1EDDng n\xE0o \u0111\u1ED3ng quy: s\u1ED1 giao \u0111i\u1EC3m $=\\f{n(n-1)}{2}$.",
          "$n$ \u0111i\u1EC3m ph\xE2n bi\u1EC7t tr\xEAn m\u1ED9t \u0111\u01B0\u1EDDng th\u1EB3ng: s\u1ED1 \u0111o\u1EA1n th\u1EB3ng $=\\f{n(n-1)}{2}$.",
          '$n$ tia chung g\u1ED1c: s\u1ED1 g\xF3c t\u1EA1o th\xE0nh $=\\f{n(n-1)}{2}$. C\u1EA3 ba \u0111\u1EC1u l\xE0 "ch\u1ECDn 2 trong $n$".'
        ]
      }
    ],
    mindmap: {
      root: "DIRICHLET & \u0110\u1EBEM (HSG 6)",
      branches: [
        { title: "Dirichlet", items: ["$n+1$ th\u1ECF, $n$ l\u1ED3ng", "L\u1ED3ng = l\u1EDBp s\u1ED1 d\u01B0", "Th\u1ECF = t\u1ED5ng ri\xEAng"] },
        { title: "D\u1EA1ng b\xE0i", items: ["Hi\u1EC7u chia h\u1EBFt", "T\u1ED5ng d\xE3y con chia h\u1EBFt", "Hai s\u1ED1 c\xF9ng t\xEDnh ch\u1EA5t"] },
        { title: "\u0110\u1EBFm", items: ["Giao \u0111i\u1EC3m $\\f{n(n-1)}{2}$", "\u0110o\u1EA1n th\u1EB3ng", "G\xF3c t\u1EEB tia chung g\u1ED1c"] }
      ]
    },
    examples: [
      {
        prompt: "Cho $10$ s\u1ED1 t\u1EF1 nhi\xEAn b\u1EA5t k\u1EF3 $a_1,a_2,\\dots,a_{10}$. Ch\u1EE9ng minh r\u1EB1ng lu\xF4n t\u1ED3n t\u1EA1i m\u1ED9t s\u1ED1 ho\u1EB7c m\u1ED9t t\u1ED5ng m\u1ED9t s\u1ED1 s\u1ED1 li\xEAn ti\u1EBFp trong d\xE3y chia h\u1EBFt cho $10$.",
        thinking: [
          '\u0110\u1EC1 n\xF3i v\u1EC1 "t\u1ED5ng c\xE1c s\u1ED1 **li\xEAn ti\u1EBFp**", \u0111\xF3 ch\xEDnh l\xE0 d\u1EA5u hi\u1EC7u d\xF9ng **d\xE3y t\u1ED5ng ri\xEAng**.',
          "L\u1EADp $10$ t\u1ED5ng ri\xEAng $S_1,\\dots,S_{10}$; n\u1EBFu m\u1ED9t t\u1ED5ng n\xE0o chia h\u1EBFt cho $10$ th\xEC xong ngay.",
          "N\u1EBFu kh\xF4ng, c\u1EA3 $10$ t\u1ED5ng \u0111\u1EC1u c\xF3 s\u1ED1 d\u01B0 thu\u1ED9c $\\{1;2;\\dots;9\\}$ \u2014 $10$ con th\u1ECF, $9$ c\xE1i l\u1ED3ng!"
        ],
        solution: [
          "L\u1EADp c\xE1c t\u1ED5ng ri\xEAng $S_1=a_1$, $S_2=a_1+a_2$, ..., $S_{10}=a_1+a_2+\\dots+a_{10}$.",
          "**Tr\u01B0\u1EDDng h\u1EE3p 1:** c\xF3 m\u1ED9t $S_k$ chia h\u1EBFt cho $10$ \u2014 khi \u0111\xF3 $a_1+\\dots+a_k$ ch\xEDnh l\xE0 t\u1ED5ng c\u1EA7n t\xECm.",
          "**Tr\u01B0\u1EDDng h\u1EE3p 2:** kh\xF4ng c\xF3 $S_k$ n\xE0o chia h\u1EBFt cho $10$.",
          "Khi \u0111\xF3 m\u1ED7i $S_k$ c\xF3 s\u1ED1 d\u01B0 khi chia $10$ thu\u1ED9c t\u1EADp $\\{1;2;\\dots;9\\}$ \u2014 ch\u1EC9 $9$ gi\xE1 tr\u1ECB.",
          "Ta c\xF3 $10$ t\u1ED5ng ri\xEAng nh\u01B0ng ch\u1EC9 $9$ l\u1EDBp s\u1ED1 d\u01B0, theo Dirichlet t\u1ED3n t\u1EA1i $i<j$ v\u1EDBi $S_i$ v\xE0 $S_j$ c\xF9ng s\u1ED1 d\u01B0.",
          "Khi \u0111\xF3 $S_j-S_i=a_{i+1}+a_{i+2}+\\dots+a_j$ chia h\u1EBFt cho $10$ \u2014 \u0111\xF3 l\xE0 t\u1ED5ng c\xE1c s\u1ED1 li\xEAn ti\u1EBFp c\u1EA7n t\xECm.",
          "C\u1EA3 hai tr\u01B0\u1EDDng h\u1EE3p \u0111\u1EC1u cho k\u1EBFt lu\u1EADn. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)"
        ],
        remark: 'M\u1EB9o d\u1EF1ng th\u1ECF: khi \u0111\u1EC1 n\xF3i "m\u1ED9t s\u1ED1 s\u1ED1 li\xEAn ti\u1EBFp", h\xE3y ngh\u0129 ngay t\u1EDBi hi\u1EC7u c\u1EE7a hai t\u1ED5ng ri\xEAng.'
      },
      {
        prompt: "Cho $2006$ \u0111\u01B0\u1EDDng th\u1EB3ng, trong \u0111\xF3 b\u1EA5t k\u1EF3 hai \u0111\u01B0\u1EDDng n\xE0o c\u0169ng c\u1EAFt nhau v\xE0 kh\xF4ng c\xF3 ba \u0111\u01B0\u1EDDng n\xE0o \u0111\u1ED3ng quy. T\xEDnh s\u1ED1 giao \u0111i\u1EC3m c\u1EE7a ch\xFAng.",
        thinking: [
          "Kh\xF4ng c\xF3 ba \u0111\u01B0\u1EDDng \u0111\u1ED3ng quy ngh\u0129a l\xE0 **m\u1ED7i giao \u0111i\u1EC3m \u1EE9ng v\u1EDBi \u0111\xFAng m\u1ED9t c\u1EB7p** \u0111\u01B0\u1EDDng th\u1EB3ng.",
          "V\u1EADy s\u1ED1 giao \u0111i\u1EC3m b\u1EB1ng s\u1ED1 c\xE1ch ch\u1ECDn $2$ \u0111\u01B0\u1EDDng trong $2006$ \u0111\u01B0\u1EDDng.",
          "C\xE1ch \u0111\u1EBFm: m\u1ED7i \u0111\u01B0\u1EDDng c\u1EAFt $2005$ \u0111\u01B0\u1EDDng c\xF2n l\u1EA1i, nh\u01B0ng m\u1ED7i giao \u0111i\u1EC3m b\u1ECB \u0111\u1EBFm **hai l\u1EA7n**."
        ],
        solution: [
          "M\u1ED7i \u0111\u01B0\u1EDDng th\u1EB3ng c\u1EAFt $2005$ \u0111\u01B0\u1EDDng c\xF2n l\u1EA1i, t\u1EA1o ra $2005$ giao \u0111i\u1EC3m.",
          "V\u1EDBi $2006$ \u0111\u01B0\u1EDDng, t\u1ED5ng s\u1ED1 l\u01B0\u1EE3t \u0111\u1EBFm l\xE0 $2006\\times2005$.",
          "M\u1ED7i giao \u0111i\u1EC3m l\xE0 giao c\u1EE7a \u0111\xFAng m\u1ED9t c\u1EB7p \u0111\u01B0\u1EDDng (v\xEC kh\xF4ng c\xF3 ba \u0111\u01B0\u1EDDng \u0111\u1ED3ng quy) n\xEAn b\u1ECB \u0111\u1EBFm **hai l\u1EA7n**.",
          "S\u1ED1 giao \u0111i\u1EC3m $=\\f{2006\\times2005}{2}=1003\\times2005=2\\,011\\,015$."
        ],
        remark: 'N\u1EBFu \u0111\u1EC1 b\u1ECF \u0111i\u1EC1u ki\u1EC7n "kh\xF4ng ba \u0111\u01B0\u1EDDng \u0111\u1ED3ng quy" th\xEC k\u1EBFt qu\u1EA3 ch\u1EC9 c\xF2n l\xE0 **gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t** c\u1EE7a s\u1ED1 giao \u0111i\u1EC3m.'
      }
    ]
  },
  /* ============================== KHỐI 8 ============================== */
  {
    id: "hsg-8-3",
    grade: 8,
    name: "Ph\xE2n t\xEDch nh\xE2n t\u1EED n\xE2ng cao v\xE0 chia h\u1EBFt \u0111a th\u1EE9c",
    summary: "Th\xEAm b\u1EDBt h\u1EA1ng t\u1EED, t\xE1ch h\u1EA1ng t\u1EED gi\u1EEFa, \u0111\u1EB7t \u1EA9n ph\u1EE5, v\xE0 \u0111\u1ECBnh l\xED B\xE9zout \u0111\u1EC3 ch\u1EE9ng minh chia h\u1EBFt.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 T\xE1ch h\u1EA1ng t\u1EED gi\u1EEFa",
        detail: [
          "V\u1EDBi $ax^{2}+bx+c$, t\xECm hai s\u1ED1 c\xF3 **t\u1ED5ng b\u1EB1ng $b$** v\xE0 **t\xEDch b\u1EB1ng $ac$** r\u1ED3i t\xE1ch $bx$ th\xE0nh hai ph\u1EA7n.",
          "Sau khi t\xE1ch th\xEC nh\xF3m hai c\u1EB7p v\xE0 \u0111\u1EB7t nh\xE2n t\u1EED chung.",
          "V\xED d\u1EE5: $x^{2}-7x+12$ c\xF3 $-3-4=-7$ v\xE0 $(-3)(-4)=12$, t\xE1ch th\xE0nh $x^{2}-3x-4x+12$."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 Th\xEAm b\u1EDBt c\xF9ng m\u1ED9t h\u1EA1ng t\u1EED",
        detail: [
          "C\u1ED9ng r\u1ED3i tr\u1EEB c\xF9ng m\u1ED9t h\u1EA1ng t\u1EED \u0111\u1EC3 t\u1EA1o ra h\u1EB1ng \u0111\u1EB3ng th\u1EE9c.",
          "Kinh \u0111i\u1EC3n: $x^{4}+4=x^{4}+4x^{2}+4-4x^{2}=(x^{2}+2)^{2}-(2x)^{2}=(x^{2}-2x+2)(x^{2}+2x+2)$.",
          "M\xF4 h\xECnh chung $a^{4}+4b^{4}=(a^{2}-2ab+2b^{2})(a^{2}+2ab+2b^{2})$ \u2014 g\u1ECDi l\xE0 \u0111\u1EB3ng th\u1EE9c Sophie Germain."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 \u0110\u1EB7t \u1EA9n ph\u1EE5",
        detail: [
          "V\u1EDBi bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng nh\u01B0 $(x+1)(x+2)(x+3)(x+4)+1$, gh\xE9p c\u1EB7p sao cho hai t\xEDch c\xF3 ph\u1EA7n chung.",
          "Gh\xE9p $(x+1)(x+4)=x^{2}+5x+4$ v\xE0 $(x+2)(x+3)=x^{2}+5x+6$, \u0111\u1EB7t $t=x^{2}+5x+4$.",
          "Bi\u1EC3u th\u1EE9c tr\u1EDF th\xE0nh $t(t+2)+1=(t+1)^{2}$ \u2014 b\xECnh ph\u01B0\u01A1ng ho\xE0n h\u1EA3o."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 4 \u2014 \u0110\u1ECBnh l\xED B\xE9zout",
        detail: [
          "\u0110a th\u1EE9c $f(x)$ chia h\u1EBFt cho $(x-a)$ khi v\xE0 ch\u1EC9 khi $f(a)=0$.",
          "Mu\u1ED1n t\xECm tham s\u1ED1 \u0111\u1EC3 $f(x)\\;\\vdots\\;(x-a)$, ch\u1EC9 c\u1EA7n gi\u1EA3i $f(a)=0$ \u2014 kh\xF4ng c\u1EA7n chia \u0111a th\u1EE9c.",
          "Mu\u1ED1n ch\u1EE9ng minh $f(x)\\;\\vdots\\;g(x)$ v\u1EDBi $g$ b\u1EADc hai, h\xE3y ph\xE2n t\xEDch $g$ th\xE0nh t\xEDch r\u1ED3i ki\u1EC3m tra t\u1EEBng nghi\u1EC7m."
        ]
      }
    ],
    mindmap: {
      root: "NH\xC2N T\u1EEC N\xC2NG CAO (HSG 8)",
      branches: [
        { title: "\u0110a th\u1EE9c b\u1EADc hai", items: ["T\xE1ch h\u1EA1ng t\u1EED gi\u1EEFa", "T\u1ED5ng $b$ t\xEDch $ac$", "Nh\xF3m v\xE0 \u0111\u1EB7t chung"] },
        { title: "B\u1EADc cao", items: ["Th\xEAm b\u1EDBt h\u1EA1ng t\u1EED", "Sophie Germain", "\u0110\u1EB7t \u1EA9n ph\u1EE5 \u0111\u1ED1i x\u1EE9ng"] },
        { title: "Chia h\u1EBFt", items: ["\u0110\u1ECBnh l\xED B\xE9zout", "Chia c\xF3 d\u01B0", "X\xE9t theo nghi\u1EC7m c\u1EE7a \u01B0\u1EDBc"] }
      ]
    },
    examples: [
      {
        prompt: "Ph\xE2n t\xEDch \u0111a th\u1EE9c $A=(x+1)(x+2)(x+3)(x+4)+1$ th\xE0nh nh\xE2n t\u1EED.",
        thinking: [
          "B\u1ED1n th\u1EEBa s\u1ED1 b\u1EADc nh\u1EA5t \u2014 n\u1EBFu nh\xE2n bung ra s\u1EBD \u0111\u01B0\u1EE3c b\u1EADc b\u1ED1n, r\u1EA5t r\u1ED1i. Ph\u1EA3i **gh\xE9p c\u1EB7p kh\xE9o**.",
          "Gh\xE9p sao cho hai t\xEDch thu \u0111\u01B0\u1EE3c c\xF3 ph\u1EA7n $x^{2}+bx$ **gi\u1ED1ng nhau**: ch\u1ECDn c\u1EB7p c\xF3 t\u1ED5ng hai h\u1EB1ng s\u1ED1 b\u1EB1ng nhau.",
          "$1+4=2+3=5$, n\xEAn gh\xE9p $(x+1)(x+4)$ v\u1EDBi $(x+2)(x+3)$."
        ],
        solution: [
          "$A=\\left[(x+1)(x+4)\\right]\\cdot\\left[(x+2)(x+3)\\right]+1$",
          "$=\\left(x^{2}+5x+4\\right)\\left(x^{2}+5x+6\\right)+1$.",
          "\u0110\u1EB7t $t=x^{2}+5x+4$, khi \u0111\xF3 $A=t(t+2)+1=t^{2}+2t+1=(t+1)^{2}$.",
          "Thay l\u1EA1i: $A=\\left(x^{2}+5x+5\\right)^{2}$.",
          "Nh\u1EADn x\xE9t th\xEAm: v\xEC $A$ l\xE0 b\xECnh ph\u01B0\u01A1ng c\u1EE7a m\u1ED9t bi\u1EC3u th\u1EE9c n\xEAn $A\\ge0$ v\u1EDBi m\u1ECDi $x$."
        ],
        remark: "Quy t\u1EAFc gh\xE9p c\u1EB7p: ch\u1ECDn hai c\u1EB7p sao cho **t\u1ED5ng hai h\u1EB1ng s\u1ED1 trong m\u1ED7i c\u1EB7p b\u1EB1ng nhau**."
      },
      {
        prompt: "T\xECm $a$ v\xE0 $b$ \u0111\u1EC3 \u0111a th\u1EE9c $f(x)=x^{4}+ax^{2}+b$ chia h\u1EBFt cho $g(x)=x^{2}-3x+2$.",
        thinking: [
          "Kh\xF4ng c\u1EA7n \u0111\u1EB7t ph\xE9p chia \u2014 h\xE3y ph\xE2n t\xEDch $g(x)$ th\xE0nh t\xEDch c\xE1c nh\xE2n t\u1EED b\u1EADc nh\u1EA5t.",
          "$x^{2}-3x+2=(x-1)(x-2)$, n\xEAn $f$ chia h\u1EBFt cho $g$ khi $f$ chia h\u1EBFt cho c\u1EA3 $(x-1)$ v\xE0 $(x-2)$.",
          "Theo B\xE9zout, \u0111i\u1EC1u \u0111\xF3 t\u01B0\u01A1ng \u0111\u01B0\u01A1ng $f(1)=0$ v\xE0 $f(2)=0$ \u2014 m\u1ED9t h\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh hai \u1EA9n."
        ],
        solution: [
          "$g(x)=x^{2}-3x+2=(x-1)(x-2)$.",
          "$f(x)\\;\\vdots\\;g(x)\\Leftrightarrow f(x)\\;\\vdots\\;(x-1)$ v\xE0 $f(x)\\;\\vdots\\;(x-2)$.",
          "Theo \u0111\u1ECBnh l\xED B\xE9zout, \u0111i\u1EC1u n\xE0y t\u01B0\u01A1ng \u0111\u01B0\u01A1ng $f(1)=0$ v\xE0 $f(2)=0$.",
          "$f(1)=1+a+b=0\\Rightarrow a+b=-1$. (1)",
          "$f(2)=16+4a+b=0\\Rightarrow 4a+b=-16$. (2)",
          "L\u1EA5y (2) tr\u1EEB (1): $3a=-15\\Rightarrow a=-5$; thay v\xE0o (1) \u0111\u01B0\u1EE3c $b=4$.",
          "V\u1EADy $a=-5$, $b=4$, khi \u0111\xF3 $f(x)=x^{4}-5x^{2}+4=(x^{2}-1)(x^{2}-4)=(x-1)(x+1)(x-2)(x+2)$ \u2713"
        ],
        remark: "Lu\xF4n ph\xE2n t\xEDch \u0111a th\u1EE9c chia th\xE0nh nh\xE2n t\u1EED tr\u01B0\u1EDBc \u2014 B\xE9zout bi\u1EBFn b\xE0i chia \u0111a th\u1EE9c th\xE0nh h\u1EC7 ph\u01B0\u01A1ng tr\xECnh \u0111\u01A1n gi\u1EA3n."
      }
    ]
  },
  {
    id: "hsg-8-4",
    grade: 8,
    name: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c v\xE0 c\u1EF1c tr\u1ECB \u0111\u1EA1i s\u1ED1 l\u1EDBp 8",
    summary: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c C\xF4-si v\u1EDBi k\u1EF9 thu\u1EADt \u0111i\u1EC3m r\u01A1i, ph\u01B0\u01A1ng ph\xE1p SOS, v\xE0 c\u1EF1c tr\u1ECB c\u1EE7a ph\xE2n th\u1EE9c b\u1EADc hai.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 C\xF4-si v\xE0 \u0111i\u1EC3m r\u01A1i",
        detail: [
          "$a+b\\ge2\\s{ab}$; d\u1EA5u b\u1EB1ng khi $a=b$ \u2014 \u0111\xE2y l\xE0 **\u0111i\u1EC3m r\u01A1i**.",
          "Khi bi\u1EBFn b\u1ECB r\xE0ng bu\u1ED9c (v\xED d\u1EE5 $x\\ge2$), \u0111i\u1EC3m r\u01A1i t\u1EF1 nhi\xEAn c\xF3 th\u1EC3 n\u1EB1m ngo\xE0i mi\u1EC1n; khi \u0111\xF3 ph\u1EA3i **t\xE1ch h\u1EC7 s\u1ED1** cho \u0111i\u1EC3m r\u01A1i r\u01A1i \u0111\xFAng v\xE0o bi\xEAn.",
          "V\xED d\u1EE5 t\xECm min c\u1EE7a $x+\\f{1}{x}$ v\u1EDBi $x\\ge2$: t\xE1ch $x+\\f{1}{x}=\\f{x}{4}+\\f{1}{x}+\\f{3x}{4}$ \u0111\u1EC3 \u0111i\u1EC3m r\u01A1i v\u1EC1 $x=2$."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 Ph\u01B0\u01A1ng ph\xE1p SOS (t\u1ED5ng b\xECnh ph\u01B0\u01A1ng)",
        detail: [
          "Chuy\u1EC3n to\xE0n b\u1ED9 v\u1EC1 m\u1ED9t v\u1EBF r\u1ED3i bi\u1EBFn \u0111\u1ED5i th\xE0nh **t\u1ED5ng c\xE1c b\xECnh ph\u01B0\u01A1ng**.",
          "$a^{2}+b^{2}+c^{2}\\ge ab+bc+ca$ v\xEC hi\u1EC7u b\u1EB1ng $\\f{1}{2}\\left[(a-b)^{2}+(b-c)^{2}+(c-a)^{2}\\right]$.",
          "\u0110\xE2y l\xE0 c\xE1ch ch\u1EE9ng minh ch\u1EAFc ch\u1EAFn nh\u1EA5t \u2014 kh\xF4ng c\u1EA7n \u0111i\u1EC1u ki\u1EC7n d\u1EA5u c\u1EE7a bi\u1EBFn."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 C\u1EF1c tr\u1ECB ph\xE2n th\u1EE9c b\u1EADc hai",
        detail: [
          "V\u1EDBi $P=\\f{ax^{2}+bx+c}{dx^{2}+ex+f}$ (m\u1EABu lu\xF4n d\u01B0\u01A1ng), \u0111\u1EB7t $P=m$ r\u1ED3i chuy\u1EC3n th\xE0nh ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai theo $x$.",
          "Ph\u01B0\u01A1ng tr\xECnh c\xF3 nghi\u1EC7m $\\Leftrightarrow \\Delta\\ge0$ \u2014 \u0111i\u1EC1u ki\u1EC7n n\xE0y cho mi\u1EC1n gi\xE1 tr\u1ECB c\u1EE7a $m$.",
          "Hai \u0111\u1EA7u m\xFAt c\u1EE7a mi\u1EC1n ch\xEDnh l\xE0 gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t v\xE0 l\u1EDBn nh\u1EA5t c\u1EE7a $P$."
        ]
      }
    ],
    mindmap: {
      root: "B\u1EA4T \u0110\u1EB2NG TH\u1EE8C (HSG 8)",
      branches: [
        { title: "C\xF4-si", items: ["$a+b\\ge2\\s{ab}$", "\u0110i\u1EC3m r\u01A1i", "T\xE1ch h\u1EC7 s\u1ED1"] },
        { title: "SOS", items: ["Chuy\u1EC3n v\u1EC1 m\u1ED9t v\u1EBF", "Gh\xE9p b\xECnh ph\u01B0\u01A1ng", "K\u1EBFt lu\u1EADn d\u1EA5u b\u1EB1ng"] },
        { title: "Ph\xE2n th\u1EE9c", items: ["\u0110\u1EB7t $P=m$", "\u0110i\u1EC1u ki\u1EC7n $\\Delta\\ge0$", "\u0110\u1ECDc mi\u1EC1n gi\xE1 tr\u1ECB"] }
      ]
    },
    examples: [
      {
        prompt: "Cho $a$, $b$, $c$ l\xE0 c\xE1c s\u1ED1 th\u1EF1c. Ch\u1EE9ng minh r\u1EB1ng $a^{2}+b^{2}+c^{2}\\ge ab+bc+ca$.",
        thinking: [
          "\u0110\u1EC1 kh\xF4ng cho \u0111i\u1EC1u ki\u1EC7n d\u01B0\u01A1ng, n\xEAn **kh\xF4ng d\xF9ng \u0111\u01B0\u1EE3c C\xF4-si** \u2014 ph\u1EA3i d\xF9ng SOS.",
          "Chuy\u1EC3n t\u1EA5t c\u1EA3 v\u1EC1 v\u1EBF tr\xE1i r\u1ED3i t\xECm c\xE1ch gh\xE9p th\xE0nh t\u1ED5ng b\xECnh ph\u01B0\u01A1ng.",
          "M\u1EB9o: nh\xE2n hai v\u1EBF v\u1EDBi $2$ \u0111\u1EC3 m\u1ED7i $a^{2}$ \u0111\u1EE7 d\xF9ng cho hai b\xECnh ph\u01B0\u01A1ng kh\xE1c nhau."
        ],
        solution: [
          "B\u1EA5t \u0111\u1EB3ng th\u1EE9c c\u1EA7n ch\u1EE9ng minh t\u01B0\u01A1ng \u0111\u01B0\u01A1ng v\u1EDBi $a^{2}+b^{2}+c^{2}-ab-bc-ca\\ge0$.",
          "Nh\xE2n hai v\u1EBF v\u1EDBi $2$ (kh\xF4ng \u0111\u1ED5i chi\u1EC1u v\xEC $2>0$): $2a^{2}+2b^{2}+2c^{2}-2ab-2bc-2ca\\ge0$.",
          "Nh\xF3m l\u1EA1i: $\\left(a^{2}-2ab+b^{2}\\right)+\\left(b^{2}-2bc+c^{2}\\right)+\\left(c^{2}-2ca+a^{2}\\right)\\ge0$",
          "$\\Leftrightarrow (a-b)^{2}+(b-c)^{2}+(c-a)^{2}\\ge0$.",
          "B\u1EA5t \u0111\u1EB3ng th\u1EE9c cu\u1ED1i lu\xF4n \u0111\xFAng v\xEC l\xE0 t\u1ED5ng ba b\xECnh ph\u01B0\u01A1ng.",
          'D\u1EA5u "$=$" x\u1EA3y ra khi $a=b=c$. (\u0111i\u1EC1u ph\u1EA3i ch\u1EE9ng minh)'
        ],
        remark: "Nh\xE2n $2$ tr\u01B0\u1EDBc khi nh\xF3m l\xE0 b\u01B0\u1EDBc then ch\u1ED1t \u2014 n\u1EBFu kh\xF4ng, m\u1ED7i $a^{2}$ ch\u1EC9 \u0111\u1EE7 cho m\u1ED9t b\xECnh ph\u01B0\u01A1ng."
      },
      {
        prompt: "T\xECm gi\xE1 tr\u1ECB nh\u1ECF nh\u1EA5t v\xE0 gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t c\u1EE7a bi\u1EC3u th\u1EE9c $P=\\f{x^{2}+x+1}{x^{2}+1}$.",
        thinking: [
          "M\u1EABu $x^{2}+1>0$ v\u1EDBi m\u1ECDi $x$ n\xEAn $P$ x\xE1c \u0111\u1ECBnh tr\xEAn to\xE0n $\\R$ \u2014 kh\xF4ng ph\u1EA3i \u0111\u1EB7t \u0111i\u1EC1u ki\u1EC7n.",
          "K\u1EF9 thu\u1EADt chu\u1EA9n: \u0111\u1EB7t $P=m$, quy \u0111\u1ED3ng r\u1ED3i xem nh\u01B0 **ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai theo $x$**.",
          "$P$ nh\u1EADn gi\xE1 tr\u1ECB $m$ khi v\xE0 ch\u1EC9 khi ph\u01B0\u01A1ng tr\xECnh \u0111\xF3 **c\xF3 nghi\u1EC7m**, t\u1EE9c $\\Delta\\ge0$."
        ],
        solution: [
          "\u0110\u1EB7t $P=m$, ta c\xF3 $\\f{x^{2}+x+1}{x^{2}+1}=m$ v\u1EDBi m\u1ECDi $x$ (m\u1EABu lu\xF4n d\u01B0\u01A1ng).",
          "$\\Leftrightarrow x^{2}+x+1=m\\left(x^{2}+1\\right)\\Leftrightarrow (m-1)x^{2}-x+(m-1)=0$. (\\*)",
          "**Tr\u01B0\u1EDDng h\u1EE3p $m=1$:** (\\*) th\xE0nh $-x=0\\Rightarrow x=0$ \u2014 c\xF3 nghi\u1EC7m, n\xEAn $m=1$ nh\u1EADn \u0111\u01B0\u1EE3c.",
          "**Tr\u01B0\u1EDDng h\u1EE3p $m\\ne1$:** (\\*) l\xE0 ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai, c\xF3 nghi\u1EC7m $\\Leftrightarrow\\Delta\\ge0$.",
          "$\\Delta=1-4(m-1)^{2}\\ge0\\Leftrightarrow (m-1)^{2}\\le\\f{1}{4}\\Leftrightarrow -\\f{1}{2}\\le m-1\\le\\f{1}{2}$.",
          "Suy ra $\\f{1}{2}\\le m\\le\\f{3}{2}$.",
          "$P_{\\min}=\\f{1}{2}$ khi $x=-1$; $P_{\\max}=\\f{3}{2}$ khi $x=1$."
        ],
        remark: "\u0110\u1EEBng qu\xEAn x\xE9t ri\xEAng tr\u01B0\u1EDDng h\u1EE3p h\u1EC7 s\u1ED1 b\u1EADc hai b\u1EB1ng $0$ \u2014 n\u1EBFu b\u1ECF qua, l\u1EDDi gi\u1EA3i thi\u1EBFu ch\u1EB7t ch\u1EBD."
      }
    ]
  },
  /* ============================== KHỐI 9 ============================== */
  {
    id: "hsg-9-3",
    grade: 9,
    name: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c thi HSG l\u1EDBp 9",
    summary: "C\xF4-si ba s\u1ED1, b\u1EA5t \u0111\u1EB3ng th\u1EE9c Bunhiacopxki, k\u1EF9 thu\u1EADt Cauchy\u2013Schwarz d\u1EA1ng c\u1ED9ng m\u1EABu v\xE0 k\u1EF9 thu\u1EADt \u0111i\u1EC3m r\u01A1i.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 C\xF4-si cho ba s\u1ED1",
        detail: [
          "$a+b+c\\ge3\\cb{abc}$ v\u1EDBi $a,b,c\\ge0$; d\u1EA5u b\u1EB1ng khi $a=b=c$.",
          "D\u1EA1ng hay d\xF9ng: $\\f{a}{b}+\\f{b}{c}+\\f{c}{a}\\ge3$ v\u1EDBi $a,b,c>0$ (t\xEDch ba s\u1ED1 h\u1EA1ng b\u1EB1ng $1$).",
          "Mu\u1ED1n t\xE1ch m\u1ED9t h\u1EA1ng t\u1EED th\xE0nh ba ph\u1EA7n b\u1EB1ng nhau t\u1EA1i \u0111i\u1EC3m r\u01A1i th\xEC ph\u1EA3i ch\u1ECDn h\u1EC7 s\u1ED1 c\u1EA9n th\u1EADn."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 Bunhiacopxki",
        detail: [
          "$\\left(a^{2}+b^{2}\\right)\\left(x^{2}+y^{2}\\right)\\ge(ax+by)^{2}$; d\u1EA5u b\u1EB1ng khi $\\f{a}{x}=\\f{b}{y}$.",
          "R\u1EA5t hi\u1EC7u qu\u1EA3 khi \u0111\u1EC1 cho **t\u1ED5ng b\xECnh ph\u01B0\u01A1ng** v\xE0 h\u1ECFi v\u1EC1 **t\u1ED5ng b\u1EADc nh\u1EA5t** (ho\u1EB7c ng\u01B0\u1EE3c l\u1EA1i).",
          "M\u1EDF r\u1ED9ng cho ba s\u1ED1: $\\left(a^{2}+b^{2}+c^{2}\\right)\\left(x^{2}+y^{2}+z^{2}\\right)\\ge(ax+by+cz)^{2}$."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 Cauchy\u2013Schwarz d\u1EA1ng c\u1ED9ng m\u1EABu",
        detail: [
          "$\\f{a^{2}}{x}+\\f{b^{2}}{y}\\ge\\f{(a+b)^{2}}{x+y}$ v\u1EDBi $x,y>0$; d\u1EA5u b\u1EB1ng khi $\\f{a}{x}=\\f{b}{y}$.",
          "M\u1EDF r\u1ED9ng ba s\u1ED1: $\\f{a^{2}}{x}+\\f{b^{2}}{y}+\\f{c^{2}}{z}\\ge\\f{(a+b+c)^{2}}{x+y+z}$.",
          "\u0110\xE2y l\xE0 c\xF4ng c\u1EE5 m\u1EA1nh nh\u1EA5t cho c\xE1c b\xE0i t\u1ED5ng ph\xE2n th\u1EE9c c\xF3 t\u1EED l\xE0 b\xECnh ph\u01B0\u01A1ng."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 4 \u2014 D\u1EF1 \u0111o\xE1n \u0111i\u1EC3m r\u01A1i tr\u01B0\u1EDBc khi l\xE0m",
        detail: [
          "B\xE0i \u0111\u1ED1i x\u1EE9ng th\xEC \u0111i\u1EC3m r\u01A1i th\u01B0\u1EDDng t\u1EA1i $a=b=c$; thay v\xE0o r\xE0ng bu\u1ED9c \u0111\u1EC3 t\xECm gi\xE1 tr\u1ECB c\u1EE5 th\u1EC3.",
          "Bi\u1EBFt \u0111i\u1EC3m r\u01A1i r\u1ED3i m\u1EDBi ch\u1ECDn c\xE1ch t\xE1ch h\u1EA1ng t\u1EED sao cho d\u1EA5u b\u1EB1ng x\u1EA3y ra \u0111\xFAng t\u1EA1i \u0111\xF3.",
          "Kh\xF4ng d\u1EF1 \u0111o\xE1n \u0111i\u1EC3m r\u01A1i tr\u01B0\u1EDBc th\xEC r\u1EA5t d\u1EC5 \xE1p C\xF4-si sai ch\u1ED7 v\xE0 b\u1EA5t \u0111\u1EB3ng th\u1EE9c kh\xF4ng ch\u1EB7t."
        ]
      }
    ],
    mindmap: {
      root: "B\u1EA4T \u0110\u1EB2NG TH\u1EE8C (HSG 9)",
      branches: [
        { title: "C\xF4ng c\u1EE5", items: ["C\xF4-si $n$ s\u1ED1", "Bunhiacopxki", "Cauchy\u2013Schwarz c\u1ED9ng m\u1EABu"] },
        { title: "Quy tr\xECnh", items: ["D\u1EF1 \u0111o\xE1n \u0111i\u1EC3m r\u01A1i", "Ch\u1ECDn c\xE1ch t\xE1ch", "Ki\u1EC3m tra d\u1EA5u b\u1EB1ng"] },
        { title: "D\u1EA1ng th\u01B0\u1EDDng g\u1EB7p", items: ["T\u1ED5ng ph\xE2n th\u1EE9c", "R\xE0ng bu\u1ED9c t\u1ED5ng b\u1EB1ng h\u1EB1ng s\u1ED1", "C\u1EF1c tr\u1ECB c\xF3 \u0111i\u1EC1u ki\u1EC7n"] }
      ]
    },
    examples: [
      {
        prompt: "Cho $a$, $b$, $c$ l\xE0 c\xE1c s\u1ED1 d\u01B0\u01A1ng tho\u1EA3 m\xE3n $a+b+c=1$. Ch\u1EE9ng minh r\u1EB1ng $\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\ge9$.",
        thinking: [
          "B\xE0i \u0111\u1ED1i x\u1EE9ng v\xE0 r\xE0ng bu\u1ED9c l\xE0 t\u1ED5ng b\u1EB1ng $1$, n\xEAn \u0111i\u1EC3m r\u01A1i ch\u1EAFc ch\u1EAFn t\u1EA1i $a=b=c=\\f{1}{3}$.",
          "Th\u1EED t\u1EA1i \u0111i\u1EC3m r\u01A1i: v\u1EBF tr\xE1i b\u1EB1ng $3+3+3=9$ \u2014 kh\u1EDBp v\u1EDBi v\u1EBF ph\u1EA3i, v\u1EADy b\u1EA5t \u0111\u1EB3ng th\u1EE9c l\xE0 **ch\u1EB7t**.",
          "C\xF3 hai \u0111\u01B0\u1EDDng: Cauchy\u2013Schwarz d\u1EA1ng c\u1ED9ng m\u1EABu (nhanh nh\u1EA5t), ho\u1EB7c nh\xE2n v\u1EDBi $a+b+c$ r\u1ED3i d\xF9ng C\xF4-si."
        ],
        solution: [
          "\xC1p d\u1EE5ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c Cauchy\u2013Schwarz d\u1EA1ng c\u1ED9ng m\u1EABu v\u1EDBi $a,b,c>0$:",
          "$\\f{1}{a}+\\f{1}{b}+\\f{1}{c}=\\f{1^{2}}{a}+\\f{1^{2}}{b}+\\f{1^{2}}{c}\\ge\\f{(1+1+1)^{2}}{a+b+c}$.",
          "Thay $a+b+c=1$: $\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\ge\\f{9}{1}=9$.",
          'D\u1EA5u "$=$" x\u1EA3y ra khi $\\f{1}{a}=\\f{1}{b}=\\f{1}{c}$, t\u1EE9c $a=b=c=\\f{1}{3}$.',
          "(C\xE1ch 2: t\u1EEB C\xF4-si, $(a+b+c)\\left(\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\right)\\ge9$, r\u1ED3i thay $a+b+c=1$.)"
        ],
        remark: "Lu\xF4n th\u1EED \u0111i\u1EC3m r\u01A1i tr\u01B0\u1EDBc: n\u1EBFu hai v\u1EBF b\u1EB1ng nhau t\u1EA1i \u0111\xF3 th\xEC b\u1EA5t \u0111\u1EB3ng th\u1EE9c ch\u1EB7t v\xE0 c\xE1ch l\xE0m s\u1EBD \u0111i \u0111\xFAng h\u01B0\u1EDBng."
      },
      {
        prompt: "Cho $x$, $y$ l\xE0 c\xE1c s\u1ED1 th\u1EF1c tho\u1EA3 m\xE3n $x^{2}+y^{2}=1$. T\xECm gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t c\u1EE7a $P=x+y$.",
        thinking: [
          "\u0110\u1EC1 cho **t\u1ED5ng b\xECnh ph\u01B0\u01A1ng**, h\u1ECFi v\u1EC1 **t\u1ED5ng b\u1EADc nh\u1EA5t** \u2014 \u0111\xFAng m\xF4 h\xECnh c\u1EE7a Bunhiacopxki.",
          "\xC1p d\u1EE5ng v\u1EDBi b\u1ED9 $(1;1)$ v\xE0 $(x;y)$ \u0111\u1EC3 n\u1ED1i hai \u0111\u1EA1i l\u01B0\u1EE3ng \u0111\xF3.",
          "Nh\u1EDB r\u1EB1ng $P$ c\xF3 th\u1EC3 \xE2m, n\xEAn k\u1EBFt qu\u1EA3 l\xE0 $|P|\\le\\s{2}$; gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t l\xE0 $\\s{2}$."
        ],
        solution: [
          "\xC1p d\u1EE5ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c Bunhiacopxki cho hai b\u1ED9 s\u1ED1 $(1;1)$ v\xE0 $(x;y)$:",
          "$(x+y)^{2}=(1\\cdot x+1\\cdot y)^{2}\\le\\left(1^{2}+1^{2}\\right)\\left(x^{2}+y^{2}\\right)=2\\cdot1=2$.",
          "Suy ra $|x+y|\\le\\s{2}$, t\u1EE9c $-\\s{2}\\le P\\le\\s{2}$.",
          'D\u1EA5u "$=$" \u1EDF v\u1EBF ph\u1EA3i x\u1EA3y ra khi $\\f{x}{1}=\\f{y}{1}$ v\xE0 $x+y>0$, t\u1EE9c $x=y=\\f{\\s{2}}{2}$.',
          "Ki\u1EC3m tra: $x^{2}+y^{2}=\\f{1}{2}+\\f{1}{2}=1$ \u2713 v\xE0 $P=\\s{2}$.",
          "V\u1EADy $P_{\\max}=\\s{2}$ khi $x=y=\\f{\\s{2}}{2}$."
        ],
        remark: "Bunhiacopxki cho $(x+y)^{2}$ n\xEAn k\u1EBFt qu\u1EA3 l\xE0 ch\u1EB7n hai ph\xEDa \u2014 ph\u1EA3i n\xF3i r\xF5 l\u1EA5y d\u1EA5u n\xE0o \u0111\u1EC3 c\xF3 gi\xE1 tr\u1ECB l\u1EDBn nh\u1EA5t."
      }
    ]
  },
  {
    id: "hsg-9-4",
    grade: 9,
    name: "Ph\u01B0\u01A1ng tr\xECnh v\xF4 t\u1EC9 v\xE0 h\u1EC7 ph\u01B0\u01A1ng tr\xECnh n\xE2ng cao",
    summary: "\u0110\u1EB7t \u1EA9n ph\u1EE5, nh\xE2n li\xEAn h\u1EE3p, \u0111\xE1nh gi\xE1 hai v\u1EBF, v\xE0 c\xE1c h\u1EC7 \u0111\u1ED1i x\u1EE9ng lo\u1EA1i I \u2013 lo\u1EA1i II.",
    techniques: [
      {
        title: "K\u1EF9 thu\u1EADt 1 \u2014 \u0110\u1EB7t \u1EA9n ph\u1EE5",
        detail: [
          "Th\u1EA5y m\u1ED9t bi\u1EC3u th\u1EE9c l\u1EB7p l\u1EA1i d\u01B0\u1EDBi nhi\u1EC1u d\u1EA1ng th\xEC \u0111\u1EB7t n\xF3 l\xE0m \u1EA9n ph\u1EE5 $t$ (nh\u1EDB k\xE8m **\u0111i\u1EC1u ki\u1EC7n c\u1EE7a $t$**).",
          "V\u1EDBi $\\s{f(x)}$ xu\u1EA5t hi\u1EC7n c\xF9ng $f(x)$, \u0111\u1EB7t $t=\\s{f(x)}\\ge0$ th\xEC $f(x)=t^{2}$.",
          "V\u1EDBi hai c\u0103n $\\s{a}$, $\\s{b}$ m\xE0 $a+b$ ho\u1EB7c $a-b$ l\xE0 h\u1EB1ng s\u1ED1, \u0111\u1EB7t c\u1EA3 hai l\xE0m \u1EA9n r\u1ED3i l\u1EADp h\u1EC7."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 2 \u2014 Nh\xE2n li\xEAn h\u1EE3p",
        detail: [
          "$\\s{A}-\\s{B}=\\f{A-B}{\\s{A}+\\s{B}}$ \u2014 bi\u1EBFn hi\u1EC7u hai c\u0103n th\xE0nh ph\xE2n th\u1EE9c kh\xF4ng c\xF2n c\u0103n \u1EDF t\u1EED.",
          "D\xF9ng khi nh\u1EA9m \u0111\u01B0\u1EE3c m\u1ED9t nghi\u1EC7m $x_0$: t\xE1ch nh\xE2n t\u1EED $(x-x_0)$ ra kh\u1ECFi c\u1EA3 hai v\u1EBF.",
          "Ph\u1EA7n c\xF2n l\u1EA1i sau khi t\xE1ch th\u01B0\u1EDDng v\xF4 nghi\u1EC7m do \u0111\xE1nh gi\xE1 \u0111\u01B0\u1EE3c d\u1EA5u."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 3 \u2014 \u0110\xE1nh gi\xE1 hai v\u1EBF",
        detail: [
          "Ch\u1EE9ng minh v\u1EBF tr\xE1i $\\ge m$ v\xE0 v\u1EBF ph\u1EA3i $\\le m$; ph\u01B0\u01A1ng tr\xECnh c\xF3 nghi\u1EC7m khi c\u1EA3 hai c\xF9ng b\u1EB1ng $m$.",
          "Th\u01B0\u1EDDng d\xF9ng khi m\u1ED9t v\u1EBF l\xE0 t\u1ED5ng c\xE1c c\u0103n, v\u1EBF kia l\xE0 \u0111a th\u1EE9c b\u1EADc hai.",
          "Nghi\u1EC7m t\xECm \u0111\u01B0\u1EE3c ph\u1EA3i tho\u1EA3 **\u0111\u1ED3ng th\u1EDDi** c\u1EA3 hai \u0111i\u1EC1u ki\u1EC7n d\u1EA5u b\u1EB1ng."
        ]
      },
      {
        title: "K\u1EF9 thu\u1EADt 4 \u2014 H\u1EC7 \u0111\u1ED1i x\u1EE9ng",
        detail: [
          "H\u1EC7 **\u0111\u1ED1i x\u1EE9ng lo\u1EA1i I** (\u0111\u1ED5i ch\u1ED7 $x$, $y$ h\u1EC7 kh\xF4ng \u0111\u1ED5i): \u0111\u1EB7t $S=x+y$, $P=xy$ r\u1ED3i gi\u1EA3i theo $S$, $P$; \u0111i\u1EC1u ki\u1EC7n $S^{2}\\ge4P$.",
          "H\u1EC7 **\u0111\u1ED1i x\u1EE9ng lo\u1EA1i II** (\u0111\u1ED5i ch\u1ED7 $x$, $y$ th\xEC hai ph\u01B0\u01A1ng tr\xECnh ho\xE1n v\u1ECB cho nhau): **tr\u1EEB v\u1EBF theo v\u1EBF** \u0111\u1EC3 c\xF3 nh\xE2n t\u1EED $(x-y)$.",
          "Sau khi c\xF3 $(x-y)(\\dots)=0$, x\xE9t hai nh\xE1nh: $x=y$ v\xE0 nh\xE1nh c\xF2n l\u1EA1i."
        ]
      }
    ],
    mindmap: {
      root: "PT V\xD4 T\u1EC8 & H\u1EC6 PT (HSG 9)",
      branches: [
        { title: "Ph\u01B0\u01A1ng tr\xECnh v\xF4 t\u1EC9", items: ["\u0110\u1EB7t \u1EA9n ph\u1EE5", "Nh\xE2n li\xEAn h\u1EE3p", "\u0110\xE1nh gi\xE1 hai v\u1EBF", "B\xECnh ph\u01B0\u01A1ng c\xF3 \u0111i\u1EC1u ki\u1EC7n"] },
        { title: "H\u1EC7 \u0111\u1ED1i x\u1EE9ng I", items: ["\u0110\u1EB7t $S$, $P$", "\u0110i\u1EC1u ki\u1EC7n $S^{2}\\ge4P$", "Vi\xE8te \u0111\u1EA3o"] },
        { title: "H\u1EC7 \u0111\u1ED1i x\u1EE9ng II", items: ["Tr\u1EEB theo v\u1EBF", "Nh\xE2n t\u1EED $(x-y)$", "X\xE9t hai nh\xE1nh"] }
      ]
    },
    examples: [
      {
        prompt: "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh $x^{2}+\\s{x+1}=1$.",
        thinking: [
          "C\xF3 $\\s{x+1}$ v\xE0 c\u0169ng c\xF3 $x^{2}$; n\u1EBFu \u0111\u1EB7t $t=\\s{x+1}$ th\xEC $x=t^{2}-1$ v\xE0 m\u1ECDi th\u1EE9 quy v\u1EC1 \u1EA9n $t$.",
          "\u0110i\u1EC1u ki\u1EC7n b\u1EAFt bu\u1ED9c: $x+1\\ge0$ t\u1EE9c $x\\ge-1$, v\xE0 $t\\ge0$.",
          "Sau khi \u0111\u1EB7t s\u1EBD ra ph\u01B0\u01A1ng tr\xECnh b\u1EADc b\u1ED1n theo $t$ \u2014 nh\u01B0ng n\xF3 ph\xE2n t\xEDch \u0111\u01B0\u1EE3c th\xE0nh t\xEDch."
        ],
        solution: [
          "\u0110i\u1EC1u ki\u1EC7n: $x+1\\ge0\\Leftrightarrow x\\ge-1$.",
          "\u0110\u1EB7t $t=\\s{x+1}\\ge0$, suy ra $x=t^{2}-1$.",
          "Ph\u01B0\u01A1ng tr\xECnh th\xE0nh $\\left(t^{2}-1\\right)^{2}+t=1\\Leftrightarrow t^{4}-2t^{2}+1+t=1$",
          "$\\Leftrightarrow t^{4}-2t^{2}+t=0\\Leftrightarrow t\\left(t^{3}-2t+1\\right)=0$.",
          "$t^{3}-2t+1$ c\xF3 nghi\u1EC7m $t=1$ n\xEAn t\xE1ch \u0111\u01B0\u1EE3c: $t^{3}-2t+1=(t-1)\\left(t^{2}+t-1\\right)$.",
          "V\u1EADy $t\\left(t-1\\right)\\left(t^{2}+t-1\\right)=0$.",
          "\u2022 $t=0\\Rightarrow x=-1$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n).",
          "\u2022 $t=1\\Rightarrow x=0$ (tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n).",
          "\u2022 $t^{2}+t-1=0\\Rightarrow t=\\f{-1+\\s{5}}{2}$ (l\u1EA5y nghi\u1EC7m kh\xF4ng \xE2m) $\\Rightarrow x=t^{2}-1=\\f{1-\\s{5}}{2}$.",
          "Th\u1EED l\u1EA1i c\u1EA3 ba gi\xE1 tr\u1ECB \u0111\u1EC1u tho\u1EA3 m\xE3n. V\u1EADy $x\\in\\left\\{-1;\\;0;\\;\\f{1-\\s{5}}{2}\\right\\}$."
        ],
        remark: "\u0110\u1EB7t \u1EA9n ph\u1EE5 ph\u1EA3i k\xE8m \u0111i\u1EC1u ki\u1EC7n $t\\ge0$; n\u1EBFu qu\xEAn, ta s\u1EBD nh\u1EADn th\xEAm nghi\u1EC7m ngo\u1EA1i lai t\u1EEB $t^{2}+t-1=0$."
      },
      {
        prompt: "Gi\u1EA3i h\u1EC7 ph\u01B0\u01A1ng tr\xECnh $\\sys{x^{2}=3x+2y\\\\y^{2}=3y+2x}$.",
        thinking: [
          "\u0110\u1ED5i ch\u1ED7 $x$ v\xE0 $y$ th\xEC hai ph\u01B0\u01A1ng tr\xECnh ho\xE1n v\u1ECB cho nhau \u2014 \u0111\xE2y l\xE0 h\u1EC7 **\u0111\u1ED1i x\u1EE9ng lo\u1EA1i II**.",
          "Ph\u1EA3n x\u1EA1 chu\u1EA9n: **tr\u1EEB v\u1EBF theo v\u1EBF** \u0111\u1EC3 t\u1EA1o ra nh\xE2n t\u1EED $(x-y)$.",
          "Sau \u0111\xF3 x\xE9t hai nh\xE1nh $x=y$ v\xE0 nh\xE1nh c\xF2n l\u1EA1i; m\u1ED7i nh\xE1nh thay l\u1EA1i v\xE0o m\u1ED9t ph\u01B0\u01A1ng tr\xECnh ban \u0111\u1EA7u."
        ],
        solution: [
          "Tr\u1EEB v\u1EBF theo v\u1EBF: $x^{2}-y^{2}=3x+2y-3y-2x=x-y$.",
          "$\\Leftrightarrow (x-y)(x+y)=(x-y)\\Leftrightarrow (x-y)(x+y-1)=0$.",
          "**Nh\xE1nh 1:** $x=y$. Thay v\xE0o ph\u01B0\u01A1ng tr\xECnh \u0111\u1EA7u: $x^{2}=3x+2x=5x\\Leftrightarrow x(x-5)=0$.",
          "\u0110\u01B0\u1EE3c $x=0$ ho\u1EB7c $x=5$, t\u01B0\u01A1ng \u1EE9ng $(x;y)=(0;0)$ v\xE0 $(5;5)$.",
          "**Nh\xE1nh 2:** $x+y=1$, t\u1EE9c $y=1-x$. Thay v\xE0o ph\u01B0\u01A1ng tr\xECnh \u0111\u1EA7u:",
          "$x^{2}=3x+2(1-x)=x+2\\Leftrightarrow x^{2}-x-2=0\\Leftrightarrow (x-2)(x+1)=0$.",
          "\u0110\u01B0\u1EE3c $x=2$, $y=-1$ ho\u1EB7c $x=-1$, $y=2$.",
          "V\u1EADy h\u1EC7 c\xF3 b\u1ED1n nghi\u1EC7m: $(0;0)$, $(5;5)$, $(2;-1)$, $(-1;2)$."
        ],
        remark: "Sau khi tr\u1EEB v\u1EBF, tuy\u1EC7t \u0111\u1ED1i kh\xF4ng chia cho $(x-y)$ \u2014 l\xE0m v\u1EADy s\u1EBD **m\u1EA5t nghi\u1EC7m** \u1EDF nh\xE1nh $x=y$."
      }
    ]
  }
];

// src/content/hsg-all.ts
var HSG_TOPICS = [...HSG_TOPICS_BASE, ...HSG_TOPICS_PLUS, ...HSG_TOPICS_GITA, ...HSG_TOPICS_GITA2].sort((a, b) => a.grade - b.grade || a.id.localeCompare(b.id));

// src/content/roadmap.ts
var hk = (t) => t === "HK1" ? "H\u1ECDc k\u1EF3 I" : "H\u1ECDc k\u1EF3 II";
var ROADMAPS = [
  {
    grade: 6,
    headline: "Chuy\u1EC3n c\u1EA5p v\u1EEFng v\xE0ng \u2014 x\xE2y l\u1EA1i n\u1EC1n s\u1ED1 h\u1ECDc v\xE0 l\xE0m quen t\u01B0 duy ch\u1EE9ng minh.",
    target: "\u0110\u1EA1t 9+ b\xE0i ki\u1EC3m tra \u0111\u1ECBnh k\u1EF3; t\u1EF1 tr\xECnh b\xE0y tr\u1ECDn v\u1EB9n m\u1ED9t b\xE0i to\xE1n c\xF3 l\u1EDDi v\u0103n.",
    weeklyLoad: "4\u20135 bu\u1ED5i/tu\u1EA7n \xD7 30 ph\xFAt + 1 \u0111\u1EC1 t\u1ED5ng h\u1EE3p cu\u1ED1i tu\u1EA7n",
    milestones: [
      { week: "Tu\u1EA7n 1\u20134", phase: "NEN_TANG", title: `${hk("HK1")} \xB7 T\u1EADp h\u1EE3p, s\u1ED1 t\u1EF1 nhi\xEAn, l\u0169y th\u1EEBa`, topicIds: ["g6-t1"], goals: ["Thu\u1ED9c quy t\u1EAFc th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh.", "T\xEDnh nhanh b\u1EB1ng t\xEDnh ch\u1EA5t ph\xE2n ph\u1ED1i.", "Th\xE0nh th\u1EA1o b\xE0i \u201CT\xECm x\u201D hai l\u1EDBp."], output: "20 c\xE2u NB\u2013TH \u0111\xFAng \u2265 18/20", minScore: 8 },
      { week: "Tu\u1EA7n 5\u20138", phase: "NEN_TANG", title: "T\xEDnh chia h\u1EBFt, s\u1ED1 nguy\xEAn t\u1ED1, \u01AFCLN \u2013 BCNN", topicIds: ["g6-t2"], goals: ["Thu\u1ED9c d\u1EA5u hi\u1EC7u chia h\u1EBFt cho 2, 3, 5, 9.", "Ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 trong 30 gi\xE2y.", "Ph\xE2n bi\u1EC7t b\xE0i to\xE1n \u01AFCLN v\xE0 BCNN qua t\u1EEB kho\xE1."], output: "Gi\u1EA3i \u0111\xFAng 5 b\xE0i to\xE1n th\u1EF1c t\u1EBF chia \u0111\u1EC1u / g\u1EB7p l\u1EA1i", minScore: 8 },
      { week: "Tu\u1EA7n 9\u201312", phase: "NANG_CAO", title: "S\u1ED1 nguy\xEAn v\xE0 h\xECnh h\u1ECDc tr\u1EF1c quan", topicIds: ["g6-t3", "g6-t6"], goals: ["Kh\xF4ng sai d\u1EA5u trong m\u1ECDi ph\xE9p t\xEDnh s\u1ED1 nguy\xEAn.", "Thu\u1ED9c b\u1EA3ng c\xF4ng th\u1EE9c chu vi \u2013 di\u1EC7n t\xEDch.", "X\u1EED l\xFD b\u1EABy \u0111\u1ED5i \u0111\u01A1n v\u1ECB."], output: "\u0110\u1EC1 c\u01B0\u01A1ng gi\u1EEFa k\u1EF3 I \u0111\u1EA1t \u2265 8,5", minScore: 8.5 },
      { week: "Tu\u1EA7n 13\u201320", phase: "NANG_CAO", title: `${hk("HK2")} \xB7 Ph\xE2n s\u1ED1, s\u1ED1 th\u1EADp ph\xE2n, t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m`, topicIds: ["g6-t4", "g6-t5"], goals: ["N\u1EAFm ch\u1EAFc hai b\xE0i to\xE1n c\u01A1 b\u1EA3n v\u1EC1 ph\xE2n s\u1ED1.", "Kh\xF4ng m\u1EAFc b\u1EABy \u201Cph\u1EA7n c\xF2n l\u1EA1i\u201D.", "X\u1EED l\xFD b\xE0i gi\u1EA3m gi\xE1 li\xEAn ti\u1EBFp."], output: "B\xE0i ki\u1EC3m tra chuy\xEAn \u0111\u1EC1 ph\xE2n s\u1ED1 \u2265 9", minScore: 9 },
      { week: "Tu\u1EA7n 21\u201326", phase: "NANG_CAO", title: "H\xECnh h\u1ECDc ph\u1EB3ng v\xE0 Th\u1ED1ng k\xEA \u2013 X\xE1c su\u1EA5t", topicIds: ["g6-t7", "g6-t8"], goals: ["Tr\xECnh b\xE0y \u0111\u1EE7 hai \xFD khi ch\u1EE9ng minh trung \u0111i\u1EC3m.", "\u0110\u1ECDc th\xE0nh th\u1EA1o m\u1ECDi lo\u1EA1i bi\u1EC3u \u0111\u1ED3."], output: "B\xE0i h\xECnh 3 \xFD \u0111\u1EA1t tr\u1ECDn \u0111i\u1EC3m", minScore: 8.5 },
      { week: "Tu\u1EA7n 27\u201332", phase: "LUYEN_DE", title: "Luy\u1EC7n \u0111\u1EC1 & T\u1ED5ng \xF4n c\u1EA3 n\u0103m", topicIds: [], goals: ["L\xE0m 15 \u0111\u1EC1 trong b\u1ED9 100 \u0111\u1EC1 kh\u1ED1i 6.", "R\xFAt ng\u1EAFn th\u1EDDi gian ph\u1EA7n NB xu\u1ED1ng \u2264 1 ph\xFAt/c\xE2u.", "Ho\xE0n thi\u1EC7n S\u1ED5 tay l\u1ED7i sai."], output: "3 \u0111\u1EC1 li\xEAn ti\u1EBFp \u0111\u1EA1t \u2265 9", minScore: 9 }
    ]
  },
  {
    grade: 7,
    headline: "Tr\u01B0\u1EDFng th\xE0nh v\u1EC1 t\u01B0 duy \u0111\u1EA1i s\u1ED1 v\xE0 b\u01B0\u1EDBc v\xE0o ch\u1EE9ng minh h\xECnh h\u1ECDc c\xF3 l\u1EADp lu\u1EADn.",
    target: "\u0110\u1EA1t 9+ \u0111\u1ECBnh k\u1EF3; vi\u1EBFt \u0111\u01B0\u1EE3c b\xE0i ch\u1EE9ng minh h\xECnh h\u1ECDc \u0111\u1EE7 c\u0103n c\u1EE9.",
    weeklyLoad: "5 bu\u1ED5i/tu\u1EA7n \xD7 35 ph\xFAt + 1 \u0111\u1EC1 t\u1ED5ng h\u1EE3p cu\u1ED1i tu\u1EA7n",
    milestones: [
      { week: "Tu\u1EA7n 1\u20135", phase: "NEN_TANG", title: `${hk("HK1")} \xB7 S\u1ED1 h\u1EEFu t\u1EC9 \u2013 S\u1ED1 th\u1EF1c`, topicIds: ["g7-t1"], goals: ["T\xEDnh h\u1EE3p l\xED th\xE0nh th\u1EA1o v\u1EDBi ph\xE2n s\u1ED1.", "N\u1EAFm quy t\u1EAFc l\u0169y th\u1EEBa theo c\u1EA3 hai chi\u1EC1u.", "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i."], output: "20 c\xE2u NB\u2013TH \u0111\xFAng \u2265 18/20", minScore: 8 },
      { week: "Tu\u1EA7n 6\u201310", phase: "NEN_TANG", title: "G\xF3c v\xE0 \u0111\u01B0\u1EDDng th\u1EB3ng song song", topicIds: ["g7-t4"], goals: ["Ph\xE2n bi\u1EC7t d\u1EA5u hi\u1EC7u v\xE0 t\xEDnh ch\u1EA5t.", "Th\xE0nh th\u1EA1o k\u1EF9 thu\u1EADt k\u1EBB \u0111\u01B0\u1EDDng ph\u1EE5 song song."], output: "B\xE0i h\xECnh 2 \xFD \u0111\u1EA1t tr\u1ECDn \u0111i\u1EC3m", minScore: 8 },
      { week: "Tu\u1EA7n 11\u201316", phase: "NANG_CAO", title: `${hk("HK2")} \xB7 T\u1EC9 l\u1EC7 th\u1EE9c v\xE0 \u0111\u1EA1i l\u01B0\u1EE3ng t\u1EC9 l\u1EC7`, topicIds: ["g7-t2"], goals: ["D\u1EF1ng d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau t\u1EEB \u0111\u1EC1 b\xE0i l\u1EDDi v\u0103n.", "Ph\xE2n bi\u1EC7t t\u1EC9 l\u1EC7 thu\u1EADn \u2013 ngh\u1ECBch.", "X\u1EED l\xFD d\u1EA1ng c\xF3 t\xEDch (\u0111\u1EB7t tham s\u1ED1 $t$)."], output: "Gi\u1EA3i \u0111\xFAng 5 b\xE0i to\xE1n chia t\u1EC9 l\u1EC7 th\u1EF1c t\u1EBF", minScore: 8.5 },
      { week: "Tu\u1EA7n 17\u201322", phase: "NANG_CAO", title: "\u0110a th\u1EE9c m\u1ED9t bi\u1EBFn v\xE0 Tam gi\xE1c", topicIds: ["g7-t3", "g7-t5"], goals: ["Th\xE0nh th\u1EA1o c\u1ED9ng tr\u1EEB \u0111a th\u1EE9c theo c\u1ED9t.", "Vi\u1EBFt \u0111\u1EE7 4 b\u01B0\u1EDBc ch\u1EE9ng minh hai tam gi\xE1c b\u1EB1ng nhau.", "N\u1EAFm c\xE1c \u0111\u01B0\u1EDDng \u0111\u1ED3ng quy."], output: "\u0110\u1EC1 c\u01B0\u01A1ng cu\u1ED1i k\u1EF3 II \u0111\u1EA1t \u2265 8,5", minScore: 8.5 },
      { week: "Tu\u1EA7n 23\u201328", phase: "NANG_CAO", title: "H\xECnh kh\u1ED1i v\xE0 Th\u1ED1ng k\xEA \u2013 X\xE1c su\u1EA5t", topicIds: ["g7-t6", "g7-t7"], goals: ["Thu\u1ED9c c\xF4ng th\u1EE9c l\u0103ng tr\u1EE5.", "\u0110\u1ECDc v\xE0 ph\xE2n t\xEDch bi\u1EC3u \u0111\u1ED3 qu\u1EA1t tr\xF2n."], output: "B\xE0i ki\u1EC3m tra chuy\xEAn \u0111\u1EC1 \u2265 9", minScore: 9 },
      { week: "Tu\u1EA7n 29\u201334", phase: "LUYEN_DE", title: "Luy\u1EC7n \u0111\u1EC1 & T\u1ED5ng \xF4n c\u1EA3 n\u0103m", topicIds: [], goals: ["L\xE0m 15 \u0111\u1EC1 trong b\u1ED9 100 \u0111\u1EC1 kh\u1ED1i 7.", "Luy\u1EC7n t\u1ED1c \u0111\u1ED9 v\xE0 chi\u1EBFn thu\u1EADt ph\xE2n b\u1ED5 th\u1EDDi gian."], output: "3 \u0111\u1EC1 li\xEAn ti\u1EBFp \u0111\u1EA1t \u2265 9", minScore: 9 }
    ]
  },
  {
    grade: 8,
    headline: "N\u0103m b\u1EA3n l\u1EC1: l\xE0m ch\u1EE7 h\u1EB1ng \u0111\u1EB3ng th\u1EE9c, ph\xE2n th\u1EE9c v\xE0 tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng.",
    target: "\u0110\u1EA1t 9+ \u0111\u1ECBnh k\u1EF3; chu\u1EA9n b\u1ECB n\u1EC1n cho ch\u01B0\u01A1ng tr\xECnh \xF4n thi v\xE0o 10.",
    weeklyLoad: "5 bu\u1ED5i/tu\u1EA7n \xD7 40 ph\xFAt + 1 \u0111\u1EC1 t\u1ED5ng h\u1EE3p cu\u1ED1i tu\u1EA7n",
    milestones: [
      { week: "Tu\u1EA7n 1\u20135", phase: "NEN_TANG", title: `${hk("HK1")} \xB7 H\u1EB1ng \u0111\u1EB3ng th\u1EE9c v\xE0 ph\xE2n t\xEDch nh\xE2n t\u1EED`, topicIds: ["g8-t1"], goals: ["Thu\u1ED9c 7 h\u1EB1ng \u0111\u1EB3ng th\u1EE9c theo c\u1EA3 hai chi\u1EC1u.", "Th\xE0nh th\u1EA1o quy tr\xECnh 4 b\u01B0\u1EDBc ph\xE2n t\xEDch nh\xE2n t\u1EED.", "X\u1EED l\xFD b\xE0i c\u1EF1c tr\u1ECB b\u1EB1ng ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng."], output: "Ph\xE2n t\xEDch \u0111\xFAng 20/20 \u0111a th\u1EE9c trong 25 ph\xFAt", minScore: 8.5 },
      { week: "Tu\u1EA7n 6\u201310", phase: "NEN_TANG", title: "Ph\xE2n th\u1EE9c \u0111\u1EA1i s\u1ED1", topicIds: ["g8-t2"], goals: ["Lu\xF4n vi\u1EBFt \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh.", "R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c 3 t\u1EA7ng ph\xE2n th\u1EE9c.", "L\xE0m \u0111\u01B0\u1EE3c c\xE2u h\u1ECFi ph\u1EE5 sau r\xFAt g\u1ECDn."], output: "B\xE0i r\xFAt g\u1ECDn 4 \xFD \u0111\u1EA1t tr\u1ECDn \u0111i\u1EC3m", minScore: 8.5 },
      { week: "Tu\u1EA7n 11\u201315", phase: "NANG_CAO", title: "T\u1EE9 gi\xE1c v\xE0 \u0110\u1ECBnh l\xED Pythagore", topicIds: ["g8-t5", "g8-t7"], goals: ["Thu\u1ED9c s\u01A1 \u0111\u1ED3 quan h\u1EC7 gi\u1EEFa c\xE1c t\u1EE9 gi\xE1c.", "\xC1p d\u1EE5ng chi\u1EBFn thu\u1EADt \u201Cleo thang\u201D khi ch\u1EE9ng minh."], output: "\u0110\u1EC1 c\u01B0\u01A1ng h\u1ECDc k\u1EF3 I \u0111\u1EA1t \u2265 8,5", minScore: 8.5 },
      { week: "Tu\u1EA7n 16\u201322", phase: "NANG_CAO", title: `${hk("HK2")} \xB7 Ph\u01B0\u01A1ng tr\xECnh v\xE0 l\u1EADp ph\u01B0\u01A1ng tr\xECnh`, topicIds: ["g8-t3", "g8-t4"], goals: ["Vi\u1EBFt \u0111\u1EE7 6 b\u01B0\u1EDBc gi\u1EA3i b\xE0i to\xE1n b\u1EB1ng c\xE1ch l\u1EADp ph\u01B0\u01A1ng tr\xECnh.", "Th\xE0nh th\u1EA1o ba m\xF4 h\xECnh: chuy\u1EC3n \u0111\u1ED9ng, n\u0103ng su\u1EA5t, ph\u1EA7n tr\u0103m."], output: "Gi\u1EA3i \u0111\xFAng 8/10 b\xE0i to\xE1n l\u1EDDi v\u0103n", minScore: 8.5 },
      { week: "Tu\u1EA7n 23\u201328", phase: "NANG_CAO", title: "Thal\xE8s v\xE0 Tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng", topicIds: ["g8-t6"], goals: ["K\u1EF9 n\u0103ng truy ng\u01B0\u1EE3c t\u1EEB h\u1EC7 th\u1EE9c c\u1EA7n ch\u1EE9ng minh.", "Th\xE0nh th\u1EA1o tr\u01B0\u1EDDng h\u1EE3p g.g.", "N\u1EAFm t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch $k^{2}$."], output: "B\xE0i h\xECnh 3 \xFD \u0111\u1EA1t \u2265 90% s\u1ED1 \u0111i\u1EC3m", minScore: 9 },
      { week: "Tu\u1EA7n 29\u201334", phase: "LUYEN_DE", title: "Luy\u1EC7n \u0111\u1EC1 & T\u1ED5ng \xF4n c\u1EA3 n\u0103m", topicIds: [], goals: ["L\xE0m 20 \u0111\u1EC1 trong b\u1ED9 100 \u0111\u1EC1 kh\u1ED1i 8.", "B\u1EAFt \u0111\u1EA7u l\xE0m quen c\u1EA5u tr\xFAc \u0111\u1EC1 thi v\xE0o 10."], output: "3 \u0111\u1EC1 li\xEAn ti\u1EBFp \u0111\u1EA1t \u2265 9", minScore: 9 }
    ]
  },
  {
    grade: 9,
    headline: "N\u0103m quy\u1EBFt \u0111\u1ECBnh: ho\xE0n thi\u1EC7n ki\u1EBFn th\u1EE9c v\xE0 luy\u1EC7n chi\u1EBFn thu\u1EADt thi tuy\u1EC3n sinh v\xE0o l\u1EDBp 10.",
    target: "\u0110\u1EA1t 9+ \u0111\u1ECBnh k\u1EF3; \u0111\u1EA1t 8,5+ m\xF4n To\xE1n k\u1EF3 thi tuy\u1EC3n sinh v\xE0o l\u1EDBp 10 (m\u1EE5c ti\xEAu chuy\xEAn/CLC: 9+).",
    weeklyLoad: "6 bu\u1ED5i/tu\u1EA7n \xD7 45 ph\xFAt + 2 \u0111\u1EC1 t\u1ED5ng h\u1EE3p cu\u1ED1i tu\u1EA7n",
    milestones: [
      { week: "Tu\u1EA7n 1\u20135", phase: "NEN_TANG", title: `${hk("HK1")} \xB7 C\u0103n b\u1EADc hai v\xE0 c\u0103n th\u1EE9c`, topicIds: ["g9-t2"], goals: ["Th\xE0nh th\u1EA1o quy tr\xECnh 5 b\u01B0\u1EDBc b\xE0i r\xFAt g\u1ECDn.", "Tr\u1EE5c c\u0103n th\u1EE9c, d\xF9ng bi\u1EC3u th\u1EE9c li\xEAn h\u1EE3p.", "L\xE0m \u0111\u01B0\u1EE3c c\xE2u h\u1ECFi ph\u1EE5 (P nguy\xEAn, so s\xE1nh, c\u1EF1c tr\u1ECB)."], output: "B\xE0i r\xFAt g\u1ECDn 3 \xFD \u0111\u1EA1t tr\u1ECDn \u0111i\u1EC3m trong 15 ph\xFAt", minScore: 8.5 },
      { week: "Tu\u1EA7n 6\u201310", phase: "NEN_TANG", title: "H\u1EC7 ph\u01B0\u01A1ng tr\xECnh v\xE0 b\u1EA5t ph\u01B0\u01A1ng tr\xECnh", topicIds: ["g9-t1", "g9-t4"], goals: ["Ch\u1ECDn \u0111\xFAng ph\u01B0\u01A1ng ph\xE1p gi\u1EA3i h\u1EC7.", "Th\xE0nh th\u1EA1o \u0111\u1EB7t \u1EA9n ph\u1EE5.", "Vi\u1EBFt \u0111\u1EE7 6 b\u01B0\u1EDBc b\xE0i to\xE1n l\u1EADp h\u1EC7."], output: "Gi\u1EA3i \u0111\xFAng 8/10 b\xE0i to\xE1n l\u1EADp h\u1EC7", minScore: 8.5 },
      { week: "Tu\u1EA7n 11\u201316", phase: "NANG_CAO", title: "H\u1EC7 th\u1EE9c l\u01B0\u1EE3ng v\xE0 \u0110\u01B0\u1EDDng tr\xF2n", topicIds: ["g9-t5", "g9-t6"], goals: ["Thu\u1ED9c 5 h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng trong tam gi\xE1c vu\xF4ng.", "Th\xE0nh th\u1EA1o ch\u1EE9ng minh t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp.", "N\u1EAFm h\u1EC7 th\u1EE9c ph\u01B0\u01A1ng t\xEDch."], output: "\u0110\u1EC1 c\u01B0\u01A1ng h\u1ECDc k\u1EF3 I \u0111\u1EA1t \u2265 8,5", minScore: 8.5 },
      { week: "Tu\u1EA7n 17\u201323", phase: "NANG_CAO", title: `${hk("HK2")} \xB7 H\xE0m s\u1ED1 $y=ax^{2}$, ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai, Vi\xE8te`, topicIds: ["g9-t3"], goals: ["Th\xE0nh th\u1EA1o quy tr\xECnh 3 b\u01B0\u1EDBc b\xE0i to\xE1n tham s\u1ED1.", "Thu\u1ED9c b\u1ED9 bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng theo $S$, $P$.", "Kh\xF4ng qu\xEAn b\u01B0\u1EDBc \u0111\u1ED1i chi\u1EBFu \u0111i\u1EC1u ki\u1EC7n."], output: "C\xE2u Vi\xE8te trong \u0111\u1EC1 thi th\u1EED \u0111\u1EA1t tr\u1ECDn \u0111i\u1EC3m", minScore: 9 },
      { week: "Tu\u1EA7n 24\u201328", phase: "LUYEN_DE", title: "T\u1ED5ng \xF4n chuy\xEAn \u0111\u1EC1 + H\xECnh kh\u1ED1i tr\xF2n xoay", topicIds: ["g9-t7", "g9-t8"], goals: ["H\u1EC7 th\u1ED1ng l\u1EA1i b\u1EB1ng s\u01A1 \u0111\u1ED3 t\u01B0 duy to\xE0n kh\u1ED1i 9.", "B\u1ECBt c\xE1c l\u1ED7 h\u1ED5ng c\xF2n l\u1EA1i theo b\xE1o c\xE1o c\u1EE7a h\u1EC7 th\u1ED1ng."], output: "To\xE0n b\u1ED9 chuy\xEAn \u0111\u1EC1 \u0111\u1EA1t t\u1EC9 l\u1EC7 \u0111\xFAng \u2265 85%", minScore: 8.5 },
      { week: "Tu\u1EA7n 29\u201336", phase: "LUYEN_DE", title: "Luy\u1EC7n \u0111\u1EC1 thi v\xE0o 10 \u2014 30 \u0111\u1EC1 b\u1EA5m gi\u1EDD", topicIds: [], goals: ["L\xE0m 30 \u0111\u1EC1 trong b\u1ED9 100 \u0111\u1EC1 kh\u1ED1i 9, b\u1EA5m gi\u1EDD nghi\xEAm t\xFAc.", "Ch\u1ED1t chi\u1EBFn thu\u1EADt: th\u1EE9 t\u1EF1 l\xE0m b\xE0i, th\u1EDDi gian cho t\u1EEBng c\xE2u.", "M\u1ED7i ng\xE0y 1 c\xE2u V\u1EADn d\u1EE5ng cao."], output: "5 \u0111\u1EC1 li\xEAn ti\u1EBFp \u0111\u1EA1t \u2265 8,5 (m\u1EE5c ti\xEAu chuy\xEAn: \u2265 9)", minScore: 8.5 }
    ]
  }
];

// src/content/lessons.ts
var G6 = [
  {
    id: "c6-1",
    grade: 6,
    roman: "I",
    name: "S\u1ED0 T\u1EF0 NHI\xCAN",
    term: "HK1",
    review: ["\xD4n t\u1EADp t\u1EADp h\u1EE3p c\xE1c s\u1ED1 t\u1EF1 nhi\xEAn (S1\u2013S6)", "\xD4n t\u1EADp quan h\u1EC7 chia h\u1EBFt (S7\u2013S13)"],
    lessons: [
      {
        code: "S1+S2",
        title: "T\u1EADp h\u1EE3p \u2014 T\u1EADp h\u1EE3p c\xE1c s\u1ED1 t\u1EF1 nhi\xEAn",
        topicId: "g6-t1",
        goals: ["D\xF9ng \u0111\xFAng k\xFD hi\u1EC7u $\\in$, $\\notin$", "Vi\u1EBFt t\u1EADp h\u1EE3p b\u1EB1ng hai c\xE1ch", "\u0110\u1ECDc v\xE0 vi\u1EBFt s\u1ED1 La M\xE3"],
        basic: [
          "K\xFD hi\u1EC7u t\u1EADp h\u1EE3p, ph\u1EA7n t\u1EED; \u0111i\u1EC1n $\\in$ / $\\notin$",
          "Vi\u1EBFt t\u1EADp h\u1EE3p b\u1EB1ng c\xE1ch li\u1EC7t k\xEA ph\u1EA7n t\u1EED",
          "Vi\u1EBFt t\u1EADp h\u1EE3p b\u1EB1ng c\xE1ch n\xEAu t\xEDnh ch\u1EA5t \u0111\u1EB7c tr\u01B0ng",
          "T\u1EADp h\u1EE3p $\\N$ v\xE0 $\\Nstar$; c\u1EA5u t\u1EA1o s\u1ED1",
          "S\u1ED1 La M\xE3: \u0111\u1ECDc, vi\u1EBFt, quy t\u1EAFc c\u1ED9ng \u2013 tr\u1EEB k\xFD hi\u1EC7u"
        ],
        advanced: [
          "T\u1EADp h\u1EE3p con, t\u1EADp h\u1EE3p r\u1ED7ng",
          "T\xECm c\xE1c s\u1ED1 t\u1EF1 nhi\xEAn tho\u1EA3 nhi\u1EC1u \u0111i\u1EC1u ki\u1EC7n \u0111\u1ED3ng th\u1EDDi",
          "Vi\u1EBFt t\u1EADp h\u1EE3p s\u1ED1 c\xF3 ba ch\u1EEF s\u1ED1 theo \u0111i\u1EC1u ki\u1EC7n t\u1ED5ng ch\u1EEF s\u1ED1",
          "B\xE0i to\xE1n di chuy\u1EC3n m\u1ED9t que di\xEAm v\u1EDBi s\u1ED1 La M\xE3"
        ]
      },
      {
        code: "S3+S4",
        title: "C\u1ED9ng, tr\u1EEB, nh\xE2n, chia s\u1ED1 t\u1EF1 nhi\xEAn",
        topicId: "g6-t1",
        goals: ["Th\xE0nh th\u1EA1o b\u1ED1n ph\xE9p t\xEDnh", "T\xEDnh nhanh b\u1EB1ng t\xEDnh ch\u1EA5t", "Th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh"],
        basic: [
          "T\xEDnh ch\u1EA5t giao ho\xE1n, k\u1EBFt h\u1EE3p, ph\xE2n ph\u1ED1i",
          "T\xEDnh nhanh b\u1EB1ng c\xE1ch nh\xF3m s\u1ED1 tr\xF2n",
          "Th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh c\xF3 ngo\u1EB7c",
          "T\xECm $x$ d\u1EA1ng c\u01A1 b\u1EA3n"
        ],
        advanced: [
          "T\xEDnh nhanh v\u1EDBi bi\u1EC3u th\u1EE9c nhi\u1EC1u t\u1EA7ng ngo\u1EB7c",
          "T\xEDnh t\u1ED5ng d\xE3y s\u1ED1 c\xE1ch \u0111\u1EC1u",
          "T\xECm $x$ c\xF3 nhi\u1EC1u l\u1EDBp ph\xE9p t\xEDnh",
          "B\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EC1 ph\xE9p chia c\xF3 d\u01B0"
        ]
      },
      {
        code: "S5+S6",
        title: "L\u0169y th\u1EEBa v\u1EDBi s\u1ED1 m\u0169 t\u1EF1 nhi\xEAn",
        topicId: "g6-t1",
        goals: ["Hi\u1EC3u b\u1EA3n ch\u1EA5t l\u0169y th\u1EEBa", "Nh\xE2n, chia l\u0169y th\u1EEBa c\xF9ng c\u01A1 s\u1ED1", "So s\xE1nh l\u0169y th\u1EEBa"],
        basic: [
          "\u0110\u1ECBnh ngh\u0129a $a^{n}$, c\u01A1 s\u1ED1 v\xE0 s\u1ED1 m\u0169",
          "$a^{m}\\cdot a^{n}=a^{m+n}$ ; $a^{m}:a^{n}=a^{m-n}$",
          "Vi\u1EBFt g\u1ECDn t\xEDch th\xE0nh l\u0169y th\u1EEBa; s\u1ED1 ch\xEDnh ph\u01B0\u01A1ng",
          "Th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh c\xF3 l\u0169y th\u1EEBa"
        ],
        advanced: [
          "So s\xE1nh hai l\u0169y th\u1EEBa l\u1EDBn (\u0111\u01B0a v\u1EC1 c\xF9ng c\u01A1 s\u1ED1 ho\u1EB7c c\xF9ng s\u1ED1 m\u0169)",
          "T\xECm $x$ trong \u0111\u1EB3ng th\u1EE9c ch\u1EE9a l\u0169y th\u1EEBa",
          "T\xEDnh t\u1ED5ng c\xE1c l\u0169y th\u1EEBa li\xEAn ti\u1EBFp b\u1EB1ng k\u1EF9 thu\u1EADt nh\xE2n \u2013 tr\u1EEB",
          "T\xECm ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng c\u1EE7a m\u1ED9t l\u0169y th\u1EEBa"
        ]
      },
      {
        code: "S7",
        title: "Quan h\u1EC7 chia h\u1EBFt v\xE0 t\xEDnh ch\u1EA5t",
        topicId: "g6-t2",
        goals: ["Hi\u1EC3u quan h\u1EC7 chia h\u1EBFt", "V\u1EADn d\u1EE5ng t\xEDnh ch\u1EA5t chia h\u1EBFt c\u1EE7a t\u1ED5ng, hi\u1EC7u"],
        basic: ["\u0110\u1ECBnh ngh\u0129a $a;\\vdots;b$; \u01B0\u1EDBc v\xE0 b\u1ED9i", "T\xEDnh ch\u1EA5t chia h\u1EBFt c\u1EE7a t\u1ED5ng, hi\u1EC7u", "X\xE9t t\xEDnh chia h\u1EBFt kh\xF4ng c\u1EA7n t\xEDnh t\u1ED5ng"],
        advanced: ["Ch\u1EE9ng minh bi\u1EC3u th\u1EE9c chia h\u1EBFt cho m\u1ED9t s\u1ED1", "T\xECm $n$ \u0111\u1EC3 bi\u1EC3u th\u1EE9c chia h\u1EBFt", "K\u1EF9 thu\u1EADt t\xE1ch h\u1EA1ng t\u1EED \u0111\u1EC3 x\xE9t chia h\u1EBFt"]
      },
      {
        code: "S8",
        title: "D\u1EA5u hi\u1EC7u chia h\u1EBFt cho 2 v\xE0 cho 5",
        topicId: "g6-t2",
        goals: ["Thu\u1ED9c d\u1EA5u hi\u1EC7u chia h\u1EBFt cho 2, 5", "T\xECm ch\u1EEF s\u1ED1 ch\u01B0a bi\u1EBFt"],
        basic: ["D\u1EA5u hi\u1EC7u chia h\u1EBFt cho 2, cho 5, cho c\u1EA3 2 v\xE0 5", "T\xECm ch\u1EEF s\u1ED1 t\u1EADn c\xF9ng tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n", "L\u1EADp s\u1ED1 t\u1EEB c\xE1c ch\u1EEF s\u1ED1 cho tr\u01B0\u1EDBc"],
        advanced: ["S\u1ED1 v\u1EEBa chia h\u1EBFt cho 2 v\u1EEBa chia h\u1EBFt cho 5 trong m\u1ED9t kho\u1EA3ng", "B\xE0i to\xE1n l\u1EADp s\u1ED1 c\xF3 \u0111i\u1EC1u ki\u1EC7n k\xE9p"]
      },
      {
        code: "S9",
        title: "D\u1EA5u hi\u1EC7u chia h\u1EBFt cho 3 v\xE0 cho 9",
        topicId: "g6-t2",
        goals: ["Thu\u1ED9c d\u1EA5u hi\u1EC7u chia h\u1EBFt cho 3, 9", "T\xECm ch\u1EEF s\u1ED1 b\u1EB1ng c\xE1ch x\xE9t t\u1ED5ng ch\u1EEF s\u1ED1"],
        basic: ["D\u1EA5u hi\u1EC7u chia h\u1EBFt cho 3, cho 9", "T\xECm ch\u1EEF s\u1ED1 $*$ trong s\u1ED1 $\\ov{a*b}$", "X\xE9t t\xEDnh chia h\u1EBFt c\u1EE7a t\u1ED5ng nhi\u1EC1u s\u1ED1"],
        advanced: ["T\xECm \u0111\u1ED3ng th\u1EDDi hai ch\u1EEF s\u1ED1 ch\u01B0a bi\u1EBFt", "S\u1ED1 chia h\u1EBFt cho c\u1EA3 2, 3, 5, 9", "Ch\u1EE9ng minh chia h\u1EBFt d\u1EF1a v\xE0o t\u1ED5ng ch\u1EEF s\u1ED1"]
      },
      {
        code: "S10+S11",
        title: "S\u1ED1 nguy\xEAn t\u1ED1, h\u1EE3p s\u1ED1 \u2014 Ph\xE2n t\xEDch m\u1ED9t s\u1ED1 ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1",
        topicId: "g6-t2",
        goals: ["Ph\xE2n bi\u1EC7t s\u1ED1 nguy\xEAn t\u1ED1 v\xE0 h\u1EE3p s\u1ED1", "Ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1", "\u0110\u1EBFm s\u1ED1 \u01B0\u1EDBc"],
        basic: ["\u0110\u1ECBnh ngh\u0129a s\u1ED1 nguy\xEAn t\u1ED1, h\u1EE3p s\u1ED1", "B\u1EA3ng s\u1ED1 nguy\xEAn t\u1ED1 nh\u1ECF h\u01A1n 100", "Ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1 theo c\u1ED9t d\u1ECDc", "T\xECm t\u1EADp h\u1EE3p c\xE1c \u01B0\u1EDBc c\u1EE7a m\u1ED9t s\u1ED1"],
        advanced: ["\u0110\u1EBFm s\u1ED1 \u01B0\u1EDBc b\u1EB1ng c\xF4ng th\u1EE9c $(a_1+1)(a_2+1)\\cdots$", "Ch\u1EE9ng minh m\u1ED9t s\u1ED1 l\xE0 h\u1EE3p s\u1ED1", "T\xECm s\u1ED1 nguy\xEAn t\u1ED1 tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n cho tr\u01B0\u1EDBc"]
      },
      {
        code: "S12",
        title: "\u01AF\u1EDBc chung \u2014 \u01AF\u1EDBc chung l\u1EDBn nh\u1EA5t",
        topicId: "g6-t2",
        goals: ["T\xECm \u01AFC, \u01AFCLN", "Gi\u1EA3i b\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EC1 chia \u0111\u1EC1u"],
        basic: ["T\xECm \u01B0\u1EDBc c\u1EE7a t\u1EEBng s\u1ED1 r\u1ED3i t\xECm \u01B0\u1EDBc chung", "Vi\u1EBFt t\u1EADp h\u1EE3p \u01AFC c\u1EE7a hai, ba s\u1ED1", "T\xECm \u01AFCLN b\u1EB1ng ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1", "B\xE0i to\xE1n chia nh\xF3m, chia ph\u1EA7n qu\xE0"],
        advanced: [
          "B\xE0i to\xE1n chia \u0111\u1EC1u c\xF3 ph\u1EA7n d\u01B0: \u201C130 chia $a$ d\u01B0 10 v\xE0 172 chia $a$ d\u01B0 12\u201D",
          "T\xECm \u01AFC c\u1EE7a hai bi\u1EC3u th\u1EE9c ch\u1EE9a $n$ (v\xED d\u1EE5 $n+3$ v\xE0 $2n+5$)",
          "T\xECm s\u1ED1 t\u1EF1 nhi\xEAn l\u1EDBn nh\u1EA5t tho\u1EA3 nhi\u1EC1u \u0111i\u1EC1u ki\u1EC7n chia h\u1EBFt"
        ]
      },
      {
        code: "S13",
        title: "B\u1ED9i chung \u2014 B\u1ED9i chung nh\u1ECF nh\u1EA5t",
        topicId: "g6-t2",
        goals: ["T\xECm BC, BCNN", "Gi\u1EA3i b\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EC1 chu k\u1EF3 l\u1EB7p l\u1EA1i"],
        basic: ["T\xECm b\u1ED9i c\u1EE7a m\u1ED9t s\u1ED1; vi\u1EBFt t\u1EADp h\u1EE3p BC", "T\xECm BCNN b\u1EB1ng ph\xE2n t\xEDch ra th\u1EEBa s\u1ED1 nguy\xEAn t\u1ED1", "B\xE0i to\xE1n x\u1EBFp h\xE0ng, g\u1EB7p l\u1EA1i"],
        advanced: ["B\xE0i to\xE1n BCNN c\xF3 ph\u1EA7n d\u01B0 (x\u1EBFp h\xE0ng \u0111\u1EC1u th\u1EEBa $r$)", "Li\xEAn h\u1EC7 \u01AFCLN \xB7 BCNN = t\xEDch hai s\u1ED1", "B\xE0i to\xE1n chu k\u1EF3 ba \u0111\u1ED1i t\u01B0\u1EE3ng"]
      }
    ]
  },
  {
    id: "c6-2",
    grade: 6,
    roman: "II",
    name: "S\u1ED0 NGUY\xCAN",
    term: "HK1",
    review: ["Quy t\u1EAFc d\u1EA5u ngo\u1EB7c", "\xD4n t\u1EADp s\u1ED1 nguy\xEAn"],
    lessons: [
      {
        code: "S1",
        title: "T\u1EADp h\u1EE3p c\xE1c s\u1ED1 nguy\xEAn",
        topicId: "g6-t3",
        goals: ["Nh\u1EADn bi\u1EBFt s\u1ED1 nguy\xEAn \xE2m", "Bi\u1EC3u di\u1EC5n v\xE0 so s\xE1nh tr\xEAn tr\u1EE5c s\u1ED1"],
        basic: ["T\u1EADp h\u1EE3p $\\Z$; s\u1ED1 nguy\xEAn \xE2m trong th\u1EF1c t\u1EBF", "Bi\u1EC3u di\u1EC5n tr\xEAn tr\u1EE5c s\u1ED1", "So s\xE1nh hai s\u1ED1 nguy\xEAn", "S\u1ED1 \u0111\u1ED1i, gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i"],
        advanced: ["S\u1EAFp th\u1EE9 t\u1EF1 nhi\u1EC1u s\u1ED1 nguy\xEAn", "T\xECm s\u1ED1 nguy\xEAn tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n v\u1EC1 gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i", "B\xE0i to\xE1n nhi\u1EC7t \u0111\u1ED9, \u0111\u1ED9 cao, n\u0103m tr\u01B0\u1EDBc C\xF4ng nguy\xEAn"]
      },
      {
        code: "S2+S3",
        title: "C\u1ED9ng, tr\u1EEB s\u1ED1 nguy\xEAn",
        topicId: "g6-t3",
        goals: ["C\u1ED9ng, tr\u1EEB th\xE0nh th\u1EA1o", "T\xEDnh h\u1EE3p l\xED b\u1EB1ng c\xE1ch nh\xF3m"],
        basic: ["C\u1ED9ng hai s\u1ED1 nguy\xEAn c\xF9ng d\u1EA5u, kh\xE1c d\u1EA5u", "Ph\xE9p tr\u1EEB $a-b=a+(-b)$", "T\xEDnh ch\u1EA5t giao ho\xE1n, k\u1EBFt h\u1EE3p"],
        advanced: ["T\xEDnh h\u1EE3p l\xED bi\u1EC3u th\u1EE9c d\xE0i", "T\xECm $x$ v\u1EDBi s\u1ED1 nguy\xEAn", "B\xE0i to\xE1n th\u1EF1c t\u1EBF thu \u2013 chi, l\xE3i \u2013 l\u1ED7"]
      },
      {
        code: "S4",
        title: "Ph\xE9p nh\xE2n s\u1ED1 nguy\xEAn",
        topicId: "g6-t3",
        goals: ["N\u1EAFm quy t\u1EAFc d\u1EA5u", "T\xEDnh nhanh b\u1EB1ng t\xEDnh ch\u1EA5t ph\xE2n ph\u1ED1i"],
        basic: ["Quy t\u1EAFc d\u1EA5u khi nh\xE2n", "T\xEDnh ch\u1EA5t c\u1EE7a ph\xE9p nh\xE2n", "L\u0169y th\u1EEBa c\u1EE7a s\u1ED1 nguy\xEAn \xE2m"],
        advanced: ["T\xEDch nhi\u1EC1u th\u1EEBa s\u1ED1 \xE2m", "So s\xE1nh t\xEDch v\u1EDBi 0 kh\xF4ng c\u1EA7n t\xEDnh", "T\xEDnh h\u1EE3p l\xED b\u1EB1ng \u0111\u1EB7t nh\xE2n t\u1EED chung"]
      },
      {
        code: "S5",
        title: "Ph\xE9p chia s\u1ED1 nguy\xEAn \u2014 \u01AF\u1EDBc v\xE0 b\u1ED9i c\u1EE7a s\u1ED1 nguy\xEAn",
        topicId: "g6-t3",
        goals: ["Chia h\u1EBFt trong $\\Z$", "T\xECm \u01B0\u1EDBc v\xE0 b\u1ED9i c\u1EE7a s\u1ED1 nguy\xEAn"],
        basic: ["Quy t\u1EAFc d\u1EA5u khi chia", "\u01AF\u1EDBc v\xE0 b\u1ED9i c\u1EE7a m\u1ED9t s\u1ED1 nguy\xEAn", "T\xECm $x$ trong \u0111\u1EB3ng th\u1EE9c chia h\u1EBFt"],
        advanced: ["T\xECm $x$ nguy\xEAn \u0111\u1EC3 ph\xE2n th\u1EE9c nh\u1EADn gi\xE1 tr\u1ECB nguy\xEAn", "Ch\u1EE9ng minh chia h\u1EBFt trong $\\Z$", "T\xECm c\u1EB7p s\u1ED1 nguy\xEAn tho\u1EA3 t\xEDch cho tr\u01B0\u1EDBc"]
      }
    ]
  },
  {
    id: "c6-3",
    grade: 6,
    roman: "III",
    name: "H\xCCNH H\u1ECCC TR\u1EF0C QUAN",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "Tam gi\xE1c \u0111\u1EC1u, h\xECnh vu\xF4ng, l\u1EE5c gi\xE1c \u0111\u1EC1u",
        topicId: "g6-t6",
        goals: ["Nh\u1EADn bi\u1EBFt v\xE0 m\xF4 t\u1EA3 c\xE1c h\xECnh \u0111\u1EC1u", "T\xEDnh chu vi"],
        basic: ["Y\u1EBFu t\u1ED1 c\u1EE7a tam gi\xE1c \u0111\u1EC1u, h\xECnh vu\xF4ng, l\u1EE5c gi\xE1c \u0111\u1EC1u", "V\u1EBD h\xECnh b\u1EB1ng th\u01B0\u1EDBc v\xE0 compa", "Chu vi c\xE1c h\xECnh \u0111\u1EC1u"],
        advanced: ["Gh\xE9p h\xECnh t\u1EEB tam gi\xE1c \u0111\u1EC1u", "B\xE0i to\xE1n \u0111\u1EBFm h\xECnh", "T\xEDnh chu vi h\xECnh gh\xE9p"]
      },
      {
        code: "S2",
        title: "H\xECnh ch\u1EEF nh\u1EADt, h\xECnh thoi, h\xECnh b\xECnh h\xE0nh, h\xECnh thang c\xE2n",
        topicId: "g6-t6",
        goals: ["Nh\u1EADn bi\u1EBFt b\u1ED1n t\u1EE9 gi\xE1c \u0111\u1EB7c bi\u1EC7t", "N\u1EAFm d\u1EA5u hi\u1EC7u qua c\u1EA1nh, g\xF3c, \u0111\u01B0\u1EDDng ch\xE9o"],
        basic: ["Y\u1EBFu t\u1ED1 v\xE0 t\xEDnh ch\u1EA5t t\u1EEBng h\xECnh", "V\u1EBD h\xECnh theo s\u1ED1 \u0111o cho tr\u01B0\u1EDBc", "Nh\u1EADn d\u1EA1ng h\xECnh qua d\u1EA5u hi\u1EC7u"],
        advanced: ["Ph\xE2n bi\u1EC7t c\xE1c h\xECnh d\u1EC5 nh\u1EA7m", "B\xE0i to\xE1n v\u1EC1 \u0111\u01B0\u1EDDng ch\xE9o", "H\xECnh c\xF3 tr\u1EE5c \u0111\u1ED1i x\u1EE9ng, t\xE2m \u0111\u1ED1i x\u1EE9ng"]
      },
      {
        code: "S3",
        title: "Chu vi v\xE0 di\u1EC7n t\xEDch c\xE1c h\xECnh",
        topicId: "g6-t6",
        goals: ["Thu\u1ED9c b\u1EA3ng c\xF4ng th\u1EE9c", "Gi\u1EA3i b\xE0i to\xE1n th\u1EF1c t\u1EBF"],
        basic: ["C\xF4ng th\u1EE9c chu vi, di\u1EC7n t\xEDch c\u1EE7a s\xE1u h\xECnh \u0111\xE3 h\u1ECDc", "\u0110\u1ED5i \u0111\u01A1n v\u1ECB \u0111o \u0111\u1ED9 d\xE0i v\xE0 di\u1EC7n t\xEDch", "B\xE0i to\xE1n m\u1EA3nh v\u01B0\u1EDDn, n\u1EC1n nh\xE0"],
        advanced: ["Di\u1EC7n t\xEDch h\xECnh gh\xE9p: chia h\xECnh ho\u1EB7c b\xF9 h\xECnh", "B\xE0i to\xE1n l\xE1t g\u1EA1ch, s\u01A1n t\u01B0\u1EDDng c\xF3 b\u1EABy \u0111\u01A1n v\u1ECB", "B\xE0i to\xE1n t\u1ED1i \u01B0u chi ph\xED"]
      }
    ]
  },
  {
    id: "c6-4",
    grade: 6,
    roman: "IV",
    name: "M\u1ED8T S\u1ED0 Y\u1EBEU T\u1ED0 TH\u1ED0NG K\xCA V\xC0 X\xC1C SU\u1EA4T",
    term: "HK2",
    lessons: [
      {
        code: "S1",
        title: "Thu th\u1EADp v\xE0 bi\u1EC3u di\u1EC5n d\u1EEF li\u1EC7u",
        topicId: "g6-t8",
        goals: ["Ph\xE2n lo\u1EA1i d\u1EEF li\u1EC7u", "\u0110\u1ECDc b\u1EA3ng v\xE0 bi\u1EC3u \u0111\u1ED3"],
        basic: ["D\u1EEF li\u1EC7u \u0111\u1ECBnh t\xEDnh v\xE0 \u0111\u1ECBnh l\u01B0\u1EE3ng", "B\u1EA3ng th\u1ED1ng k\xEA", "Bi\u1EC3u \u0111\u1ED3 tranh, bi\u1EC3u \u0111\u1ED3 c\u1ED9t"],
        advanced: ["Ph\xE1t hi\u1EC7n d\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\xED", "Bi\u1EC3u \u0111\u1ED3 c\u1ED9t k\xE9p", "Vi\u1EBFt nh\u1EADn x\xE9t c\xF3 d\u1EABn ch\u1EE9ng s\u1ED1 li\u1EC7u"]
      },
      {
        code: "S2",
        title: "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m",
        topicId: "g6-t8",
        goals: ["Nh\u1EADn bi\u1EBFt s\u1EF1 ki\u1EC7n", "T\xEDnh x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m"],
        basic: ["S\u1EF1 ki\u1EC7n trong tr\xF2 ch\u01A1i \u0111\u01A1n gi\u1EA3n", "C\xF4ng th\u1EE9c x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m", "Tung \u0111\u1ED3ng xu, gieo x\xFAc x\u1EAFc"],
        advanced: ["So s\xE1nh x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m khi s\u1ED1 l\u1EA7n th\u1EED t\u0103ng", "B\xE0i to\xE1n r\xFAt th\u1EBB nhi\u1EC1u \u0111i\u1EC1u ki\u1EC7n"]
      }
    ]
  },
  {
    id: "c6-5",
    grade: 6,
    roman: "V",
    name: "PH\xC2N S\u1ED0 V\xC0 S\u1ED0 TH\u1EACP PH\xC2N",
    term: "HK2",
    review: ["N\xE2ng cao v\u1EC1 ph\xE2n s\u1ED1"],
    lessons: [
      {
        code: "S1",
        title: "Ph\xE2n s\u1ED1 \u2014 R\xFAt g\u1ECDn, quy \u0111\u1ED3ng, so s\xE1nh",
        topicId: "g6-t4",
        goals: ["R\xFAt g\u1ECDn v\u1EC1 t\u1ED1i gi\u1EA3n", "Quy \u0111\u1ED3ng v\xE0 so s\xE1nh"],
        basic: ["Ph\xE2n s\u1ED1 v\u1EDBi t\u1EED v\xE0 m\u1EABu nguy\xEAn", "Hai ph\xE2n s\u1ED1 b\u1EB1ng nhau", "R\xFAt g\u1ECDn, quy \u0111\u1ED3ng m\u1EABu", "So s\xE1nh ph\xE2n s\u1ED1"],
        advanced: ["So s\xE1nh ph\xE2n s\u1ED1 b\u1EB1ng ph\xE2n s\u1ED1 trung gian", "So s\xE1nh ph\u1EA7n b\xF9 v\u1EDBi 1", "T\xECm ph\xE2n s\u1ED1 n\u1EB1m gi\u1EEFa hai ph\xE2n s\u1ED1"]
      },
      {
        code: "S2",
        title: "C\xE1c ph\xE9p t\xEDnh v\u1EDBi ph\xE2n s\u1ED1",
        topicId: "g6-t4",
        goals: ["B\u1ED1n ph\xE9p t\xEDnh th\xE0nh th\u1EA1o", "T\xEDnh h\u1EE3p l\xED"],
        basic: ["C\u1ED9ng, tr\u1EEB c\xF9ng m\u1EABu v\xE0 kh\xE1c m\u1EABu", "Nh\xE2n, chia ph\xE2n s\u1ED1", "S\u1ED1 \u0111\u1ED1i, s\u1ED1 ngh\u1ECBch \u0111\u1EA3o", "H\u1ED7n s\u1ED1"],
        advanced: ["T\xEDnh h\u1EE3p l\xED b\u1EB1ng \u0111\u1EB7t nh\xE2n t\u1EED chung", "T\u1ED5ng d\xE3y ph\xE2n s\u1ED1 c\xF3 quy lu\u1EADt (sai ph\xE2n)", "T\xECm $x$ v\u1EDBi ph\xE2n s\u1ED1"]
      },
      {
        code: "S3",
        title: "Hai b\xE0i to\xE1n c\u01A1 b\u1EA3n v\u1EC1 ph\xE2n s\u1ED1",
        topicId: "g6-t4",
        goals: ["Ph\xE2n bi\u1EC7t hai chi\u1EC1u nh\xE2n / chia", "Gi\u1EA3i b\xE0i to\xE1n th\u1EF1c t\u1EBF"],
        basic: ["T\xECm gi\xE1 tr\u1ECB ph\xE2n s\u1ED1 c\u1EE7a m\u1ED9t s\u1ED1", "T\xECm m\u1ED9t s\u1ED1 bi\u1EBFt gi\xE1 tr\u1ECB ph\xE2n s\u1ED1 c\u1EE7a n\xF3", "B\xE0i to\xE1n \u0111\u01A1n gi\u1EA3n m\u1ED9t b\u01B0\u1EDBc"],
        advanced: ["B\u1EABy \u201Cph\u1EA7n c\xF2n l\u1EA1i\u201D nhi\u1EC1u t\u1EA7ng", "B\xE0i to\xE1n ba giai \u0111o\u1EA1n", "V\u1EBD s\u01A1 \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng \u0111\u1EC3 ph\xE2n t\xEDch"]
      },
      {
        code: "S4",
        title: "S\u1ED1 th\u1EADp ph\xE2n \u2014 T\u1EC9 s\u1ED1 v\xE0 t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m",
        topicId: "g6-t5",
        goals: ["B\u1ED1n ph\xE9p t\xEDnh v\u1EDBi s\u1ED1 th\u1EADp ph\xE2n", "Ba b\xE0i to\xE1n ph\u1EA7n tr\u0103m"],
        basic: ["S\u1ED1 th\u1EADp ph\xE2n \xE2m; b\u1ED1n ph\xE9p t\xEDnh", "L\xE0m tr\xF2n v\xE0 \u01B0\u1EDBc l\u01B0\u1EE3ng", "T\u1EC9 s\u1ED1, t\u1EC9 s\u1ED1 ph\u1EA7n tr\u0103m"],
        advanced: ["B\xE0i to\xE1n gi\u1EA3m gi\xE1 li\xEAn ti\u1EBFp", "L\xE3i su\u1EA5t, thu\u1EBF VAT", "B\xE0i to\xE1n t\u0103ng \u2013 gi\u1EA3m nhi\u1EC1u giai \u0111o\u1EA1n"]
      }
    ]
  },
  {
    id: "c6-6",
    grade: 6,
    roman: "VI",
    name: "H\xCCNH H\u1ECCC PH\u1EB2NG",
    term: "HK2",
    review: ["\xD4n t\u1EADp h\xECnh h\u1ECDc ph\u1EB3ng \u2014 ph\u1EA7n tr\u1EAFc nghi\u1EC7m", "\xD4n t\u1EADp h\xECnh h\u1ECDc ph\u1EB3ng \u2014 ph\u1EA7n t\u1EF1 lu\u1EADn"],
    lessons: [
      {
        code: "S1",
        title: "\u0110i\u1EC3m, \u0111\u01B0\u1EDDng th\u1EB3ng, tia",
        topicId: "g6-t7",
        goals: ["Nh\u1EADn bi\u1EBFt \u0111i\u1EC3m thu\u1ED9c \u0111\u01B0\u1EDDng th\u1EB3ng", "Ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng, tia"],
        basic: ["\u0110i\u1EC3m, \u0111\u01B0\u1EDDng th\u1EB3ng; k\xFD hi\u1EC7u $\\in$, $\\notin$", "Ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng, \u0111i\u1EC3m n\u1EB1m gi\u1EEFa", "Tia, hai tia \u0111\u1ED1i nhau"],
        advanced: ["\u0110\u1EBFm s\u1ED1 \u0111\u01B0\u1EDDng th\u1EB3ng qua $n$ \u0111i\u1EC3m", "B\xE0i to\xE1n v\u1EC1 s\u1ED1 giao \u0111i\u1EC3m", "Ch\u1EE9ng minh ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng"]
      },
      {
        code: "S2",
        title: "\u0110o\u1EA1n th\u1EB3ng, \u0111\u1ED9 d\xE0i, trung \u0111i\u1EC3m c\u1EE7a \u0111o\u1EA1n th\u1EB3ng",
        topicId: "g6-t7",
        goals: ["H\u1EC7 th\u1EE9c c\u1ED9ng \u0111o\u1EA1n th\u1EB3ng", "Ch\u1EE9ng minh trung \u0111i\u1EC3m"],
        basic: ["\u0110o\u1EA1n th\u1EB3ng v\xE0 \u0111\u1ED9 d\xE0i", "$AM+MB=AB$ khi $M$ n\u1EB1m gi\u1EEFa", "Trung \u0111i\u1EC3m: hai \u0111i\u1EC1u ki\u1EC7n"],
        advanced: ["B\xE0i to\xE1n nhi\u1EC1u \u0111i\u1EC3m tr\xEAn m\u1ED9t tia", "Ch\u1EE9ng minh trung \u0111i\u1EC3m qua nhi\u1EC1u b\u01B0\u1EDBc", "T\xEDnh \u0111\u1ED9 d\xE0i d\u1EF1a v\xE0o t\u1EC9 l\u1EC7"]
      },
      {
        code: "S3",
        title: "G\xF3c, s\u1ED1 \u0111o g\xF3c",
        topicId: "g6-t7",
        goals: ["\u0110o v\xE0 v\u1EBD g\xF3c", "H\u1EC7 th\u1EE9c c\u1ED9ng g\xF3c"],
        basic: ["G\xF3c, \u0111\u1EC9nh, c\u1EA1nh; \u0111o g\xF3c b\u1EB1ng th\u01B0\u1EDBc \u0111o \u0111\u1ED9", "Ph\xE2n lo\u1EA1i g\xF3c: nh\u1ECDn, vu\xF4ng, t\xF9, b\u1EB9t", "H\u1EC7 th\u1EE9c c\u1ED9ng g\xF3c"],
        advanced: ["Tia ph\xE2n gi\xE1c v\xE0 b\xE0i to\xE1n t\xEDnh g\xF3c", "B\xE0i to\xE1n nhi\u1EC1u tia chung g\u1ED1c", "\u0110\u1EBFm s\u1ED1 g\xF3c t\u1EA1o b\u1EDFi $n$ tia"]
      }
    ]
  }
];
var G7 = [
  {
    id: "c7-1",
    grade: 7,
    roman: "I",
    name: "S\u1ED0 H\u1EEEU T\u1EC8",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "T\u1EADp h\u1EE3p s\u1ED1 h\u1EEFu t\u1EC9",
        topicId: "g7-t1",
        goals: ["Nh\u1EADn bi\u1EBFt s\u1ED1 h\u1EEFu t\u1EC9", "Bi\u1EC3u di\u1EC5n v\xE0 so s\xE1nh"],
        basic: ["S\u1ED1 h\u1EEFu t\u1EC9, bi\u1EC3u di\u1EC5n tr\xEAn tr\u1EE5c s\u1ED1", "So s\xE1nh hai s\u1ED1 h\u1EEFu t\u1EC9", "S\u1ED1 \u0111\u1ED1i"],
        advanced: ["So s\xE1nh b\u1EB1ng ph\xE2n s\u1ED1 trung gian", "T\xECm s\u1ED1 h\u1EEFu t\u1EC9 tho\u1EA3 \u0111i\u1EC1u ki\u1EC7n"]
      },
      {
        code: "S2+S3",
        title: "C\xE1c ph\xE9p t\xEDnh v\u1EDBi s\u1ED1 h\u1EEFu t\u1EC9",
        topicId: "g7-t1",
        goals: ["B\u1ED1n ph\xE9p t\xEDnh", "T\xEDnh h\u1EE3p l\xED"],
        basic: ["C\u1ED9ng, tr\u1EEB, nh\xE2n, chia s\u1ED1 h\u1EEFu t\u1EC9", "Quy t\u1EAFc chuy\u1EC3n v\u1EBF", "Th\u1EE9 t\u1EF1 th\u1EF1c hi\u1EC7n ph\xE9p t\xEDnh"],
        advanced: ["T\xEDnh h\u1EE3p l\xED bi\u1EC3u th\u1EE9c d\xE0i", "T\xECm $x$ nhi\u1EC1u l\u1EDBp", "T\u1ED5ng d\xE3y c\xF3 quy lu\u1EADt"]
      },
      {
        code: "S4",
        title: "L\u0169y th\u1EEBa c\u1EE7a m\u1ED9t s\u1ED1 h\u1EEFu t\u1EC9",
        topicId: "g7-t1",
        goals: ["N\u1EAFm c\xE1c quy t\u1EAFc l\u0169y th\u1EEBa"],
        basic: ["$x^{m}x^{n}$, $x^{m}:x^{n}$, $(x^{m})^{n}$", "$(xy)^{n}$ v\xE0 $\\left(\\f{x}{y}\\right)^{n}$"],
        advanced: ["So s\xE1nh hai l\u0169y th\u1EEBa l\u1EDBn", "T\xECm $x$ trong \u0111\u1EB3ng th\u1EE9c l\u0169y th\u1EEBa", "T\xEDnh t\u1ED5ng l\u0169y th\u1EEBa"]
      }
    ]
  },
  {
    id: "c7-2",
    grade: 7,
    roman: "II",
    name: "S\u1ED0 TH\u1EF0C",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "S\u1ED1 v\xF4 t\u1EC9 \u2014 C\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc",
        topicId: "g7-t1",
        goals: ["Ph\xE2n bi\u1EC7t s\u1ED1 h\u1EEFu t\u1EC9 v\xE0 v\xF4 t\u1EC9", "T\xEDnh c\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc"],
        basic: ["S\u1ED1 th\u1EADp ph\xE2n v\xF4 h\u1EA1n kh\xF4ng tu\u1EA7n ho\xE0n", "C\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc", "T\u1EADp h\u1EE3p $\\R$"],
        advanced: ["Ch\u1EE9ng minh m\u1ED9t s\u1ED1 l\xE0 v\xF4 t\u1EC9", "So s\xE1nh bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n", "\u01AF\u1EDBc l\u01B0\u1EE3ng gi\xE1 tr\u1ECB c\u0103n"]
      },
      {
        code: "S2",
        title: "Gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i \u2014 L\xE0m tr\xF2n v\xE0 \u01B0\u1EDBc l\u01B0\u1EE3ng",
        topicId: "g7-t1",
        goals: ["\u0110\u1ECBnh ngh\u0129a hai nh\xE1nh", "L\xE0m tr\xF2n theo y\xEAu c\u1EA7u"],
        basic: ["$\\abs{x}$ v\xE0 t\xEDnh ch\u1EA5t", "Ph\u01B0\u01A1ng tr\xECnh $\\abs{A}=a$", "L\xE0m tr\xF2n, \u01B0\u1EDBc l\u01B0\u1EE3ng"],
        advanced: ["Ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a nhi\u1EC1u d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i", "T\xECm GTNN c\u1EE7a bi\u1EC3u th\u1EE9c ch\u1EE9a $\\abs{\\ }$", "B\u1EA5t \u0111\u1EB3ng th\u1EE9c $\\abs{a}+\\abs{b}\\ge\\abs{a+b}$"]
      }
    ]
  },
  {
    id: "c7-3",
    grade: 7,
    roman: "III",
    name: "H\xCCNH H\u1ECCC TR\u1EF0C QUAN",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "H\xECnh h\u1ED9p ch\u1EEF nh\u1EADt \u2014 H\xECnh l\u1EADp ph\u01B0\u01A1ng",
        topicId: "g7-t6",
        goals: ["M\xF4 t\u1EA3 c\xE1c y\u1EBFu t\u1ED1", "T\xEDnh di\u1EC7n t\xEDch, th\u1EC3 t\xEDch"],
        basic: ["\u0110\u1EC9nh, c\u1EA1nh, m\u1EB7t, \u0111\u01B0\u1EDDng ch\xE9o", "$S_{xq}$, $S_{tp}$, $V$"],
        advanced: ["B\xE0i to\xE1n b\u1EC3 n\u01B0\u1EDBc, th\xF9ng carton", "B\u1EABy \u0111\u1ED5i \u0111\u01A1n v\u1ECB l\xEDt"]
      },
      {
        code: "S2",
        title: "L\u0103ng tr\u1EE5 \u0111\u1EE9ng tam gi\xE1c, t\u1EE9 gi\xE1c",
        topicId: "g7-t6",
        goals: ["Nh\u1EADn bi\u1EBFt l\u0103ng tr\u1EE5 \u0111\u1EE9ng", "T\xEDnh di\u1EC7n t\xEDch xung quanh v\xE0 th\u1EC3 t\xEDch"],
        basic: ["Y\u1EBFu t\u1ED1 c\u1EE7a l\u0103ng tr\u1EE5 \u0111\u1EE9ng", "$S_{xq}=C\\cdot h$ ; $V=S\\cdot h$"],
        advanced: ["B\xE0i to\xE1n l\u1EC1u tr\u1EA1i, m\xE1ng n\u01B0\u1EDBc", "V\u1EADt th\u1EC3 gh\xE9p nhi\u1EC1u kh\u1ED1i"]
      }
    ]
  },
  {
    id: "c7-4",
    grade: 7,
    roman: "IV",
    name: "G\xD3C \u2014 \u0110\u01AF\u1EDCNG TH\u1EB2NG SONG SONG",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "G\xF3c \u0111\u1ED1i \u0111\u1EC9nh \u2014 Hai \u0111\u01B0\u1EDDng th\u1EB3ng vu\xF4ng g\xF3c",
        topicId: "g7-t4",
        goals: ["T\xEDnh ch\u1EA5t g\xF3c \u0111\u1ED1i \u0111\u1EC9nh", "\u0110\u01B0\u1EDDng trung tr\u1EF1c"],
        basic: ["Hai g\xF3c k\u1EC1 b\xF9, hai g\xF3c \u0111\u1ED1i \u0111\u1EC9nh", "Hai \u0111\u01B0\u1EDDng th\u1EB3ng vu\xF4ng g\xF3c", "\u0110\u01B0\u1EDDng trung tr\u1EF1c c\u1EE7a \u0111o\u1EA1n th\u1EB3ng"],
        advanced: ["B\xE0i to\xE1n t\xEDnh g\xF3c nhi\u1EC1u b\u01B0\u1EDBc", "Ch\u1EE9ng minh vu\xF4ng g\xF3c"]
      },
      {
        code: "S2",
        title: "Hai \u0111\u01B0\u1EDDng th\u1EB3ng song song \u2014 Ti\xEAn \u0111\u1EC1 Euclid",
        topicId: "g7-t4",
        goals: ["Ph\xE2n bi\u1EC7t d\u1EA5u hi\u1EC7u v\xE0 t\xEDnh ch\u1EA5t", "V\u1EADn d\u1EE5ng ti\xEAn \u0111\u1EC1 Euclid"],
        basic: ["C\xE1c c\u1EB7p g\xF3c so le trong, \u0111\u1ED3ng v\u1ECB, trong c\xF9ng ph\xEDa", "D\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt hai \u0111\u01B0\u1EDDng song song", "T\xEDnh ch\u1EA5t hai \u0111\u01B0\u1EDDng song song"],
        advanced: ["K\u1EF9 thu\u1EADt k\u1EBB \u0111\u01B0\u1EDDng ph\u1EE5 song song", "Ch\u1EE9ng minh song song qua trung gian", "B\xE0i to\xE1n t\xEDnh g\xF3c c\xF3 \u0111i\u1EC3m g\xE3y"]
      },
      {
        code: "S3",
        title: "\u0110\u1ECBnh l\xED \u2014 Ch\u1EE9ng minh \u0111\u1ECBnh l\xED",
        topicId: "g7-t4",
        goals: ["Vi\u1EBFt gi\u1EA3 thi\u1EBFt \u2013 k\u1EBFt lu\u1EADn", "Tr\xECnh b\xE0y m\u1ED9t ch\u1EE9ng minh"],
        basic: ["C\u1EA5u tr\xFAc \u201CN\u1EBFu \u2026 th\xEC \u2026\u201D", "Vi\u1EBFt GT/KL b\u1EB1ng k\xFD hi\u1EC7u"],
        advanced: ["Ch\u1EE9ng minh \u0111\u1ECBnh l\xED v\u1EC1 quan h\u1EC7 vu\xF4ng g\xF3c \u2013 song song"]
      }
    ]
  },
  {
    id: "c7-5",
    grade: 7,
    roman: "V",
    name: "M\u1ED8T S\u1ED0 Y\u1EBEU T\u1ED0 TH\u1ED0NG K\xCA V\xC0 X\xC1C SU\u1EA4T",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "Thu th\u1EADp, ph\xE2n lo\u1EA1i v\xE0 bi\u1EC3u di\u1EC5n d\u1EEF li\u1EC7u",
        topicId: "g7-t7",
        goals: ["Ch\u1ECDn bi\u1EC3u \u0111\u1ED3 ph\xF9 h\u1EE3p"],
        basic: ["B\u1EA3ng th\u1ED1ng k\xEA", "Bi\u1EC3u \u0111\u1ED3 \u0111o\u1EA1n th\u1EB3ng", "Bi\u1EC3u \u0111\u1ED3 h\xECnh qu\u1EA1t tr\xF2n"],
        advanced: ["Ph\xE2n t\xEDch v\xE0 nh\u1EADn x\xE9t s\u1ED1 li\u1EC7u", "Ph\xE1t hi\u1EC7n d\u1EEF li\u1EC7u kh\xF4ng \u0111\u1EA1i di\u1EC7n"]
      },
      {
        code: "S2",
        title: "Bi\u1EBFn c\u1ED1 v\xE0 x\xE1c su\u1EA5t c\u1EE7a bi\u1EBFn c\u1ED1",
        topicId: "g7-t7",
        goals: ["Ph\xE2n lo\u1EA1i bi\u1EBFn c\u1ED1", "T\xEDnh x\xE1c su\u1EA5t"],
        basic: ["Bi\u1EBFn c\u1ED1 ch\u1EAFc ch\u1EAFn, kh\xF4ng th\u1EC3, ng\u1EABu nhi\xEAn", "$P(A)=\\f{m}{k}$"],
        advanced: ["B\xE0i to\xE1n r\xFAt th\u1EBB, gieo x\xFAc x\u1EAFc nhi\u1EC1u \u0111i\u1EC1u ki\u1EC7n", "D\xF9ng bi\u1EBFn c\u1ED1 \u0111\u1ED1i"]
      }
    ]
  },
  {
    id: "c7-6",
    grade: 7,
    roman: "VI",
    name: "BI\u1EC2U TH\u1EE8C \u0110\u1EA0I S\u1ED0 \u2014 T\u1EC8 L\u1EC6 TH\u1EE8C",
    term: "HK2",
    lessons: [
      {
        code: "S1",
        title: "T\u1EC9 l\u1EC7 th\u1EE9c \u2014 D\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau",
        topicId: "g7-t2",
        goals: ["T\xEDnh ch\u1EA5t t\u1EC9 l\u1EC7 th\u1EE9c", "T\xEDnh ch\u1EA5t d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau"],
        basic: ["T\xEDch ch\xE9o $ad=bc$", "D\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau v\u1EDBi t\u1ED5ng, hi\u1EC7u", "T\xECm $x$, $y$"],
        advanced: ["D\xE3y t\u1EC9 s\u1ED1 c\xF3 h\u1EC7 s\u1ED1", "\u0110i\u1EC1u ki\u1EC7n l\xE0 t\xEDch: \u0111\u1EB7t tham s\u1ED1 $t$", "Chia t\u1EC9 l\u1EC7 nhi\u1EC1u t\u1EA7ng"]
      },
      {
        code: "S2",
        title: "\u0110\u1EA1i l\u01B0\u1EE3ng t\u1EC9 l\u1EC7 thu\u1EADn, t\u1EC9 l\u1EC7 ngh\u1ECBch",
        topicId: "g7-t2",
        goals: ["Ph\xE2n bi\u1EC7t hai lo\u1EA1i t\u1EC9 l\u1EC7", "Gi\u1EA3i b\xE0i to\xE1n th\u1EF1c t\u1EBF"],
        basic: ["$y=kx$ v\xE0 $xy=a$", "B\u1EA3ng gi\xE1 tr\u1ECB t\u01B0\u01A1ng \u1EE9ng", "B\xE0i to\xE1n chia ph\u1EA7n"],
        advanced: ["B\xE0i to\xE1n ng\u01B0\u1EDDi \u2013 vi\u1EC7c \u2013 th\u1EDDi gian", "Chia t\u1EC9 l\u1EC7 ngh\u1ECBch", "B\xE0i to\xE1n chuy\u1EC3n \u0111\u1ED9ng"]
      },
      {
        code: "S3",
        title: "Bi\u1EC3u th\u1EE9c \u0111\u1EA1i s\u1ED1 \u2014 \u0110a th\u1EE9c m\u1ED9t bi\u1EBFn",
        topicId: "g7-t3",
        goals: ["Thu g\u1ECDn, s\u1EAFp x\u1EBFp, x\xE1c \u0111\u1ECBnh b\u1EADc"],
        basic: ["Gi\xE1 tr\u1ECB c\u1EE7a bi\u1EC3u th\u1EE9c", "\u0110\u01A1n th\u1EE9c, \u0111a th\u1EE9c m\u1ED9t bi\u1EBFn", "Thu g\u1ECDn v\xE0 s\u1EAFp x\u1EBFp"],
        advanced: ["X\xE1c \u0111\u1ECBnh h\u1EC7 s\u1ED1 theo \u0111i\u1EC1u ki\u1EC7n", "B\xE0i to\xE1n v\u1EC1 b\u1EADc c\u1EE7a \u0111a th\u1EE9c"]
      },
      {
        code: "S4",
        title: "Ph\xE9p t\xEDnh v\u1EDBi \u0111a th\u1EE9c m\u1ED9t bi\u1EBFn \u2014 Nghi\u1EC7m c\u1EE7a \u0111a th\u1EE9c",
        topicId: "g7-t3",
        goals: ["C\u1ED9ng, tr\u1EEB, nh\xE2n, chia \u0111a th\u1EE9c", "T\xECm nghi\u1EC7m"],
        basic: ["C\u1ED9ng, tr\u1EEB theo c\u1ED9t", "Nh\xE2n \u0111a th\u1EE9c", "Nghi\u1EC7m c\u1EE7a \u0111a th\u1EE9c b\u1EADc nh\u1EA5t"],
        advanced: ["Chia \u0111a th\u1EE9c c\xF3 d\u01B0", "\u0110\u1ECBnh l\xED B\xE9zout: t\xECm tham s\u1ED1", "Ch\u1EE9ng minh \u0111a th\u1EE9c v\xF4 nghi\u1EC7m"]
      }
    ]
  },
  {
    id: "c7-7",
    grade: 7,
    roman: "VII",
    name: "TAM GI\xC1C",
    term: "HK2",
    review: ["\xD4n t\u1EADp c\xE1c tr\u01B0\u1EDDng h\u1EE3p b\u1EB1ng nhau trong tam gi\xE1c"],
    lessons: [
      {
        code: "S1",
        title: "T\u1ED5ng ba g\xF3c trong m\u1ED9t tam gi\xE1c",
        topicId: "g7-t5",
        goals: ["\u0110\u1ECBnh l\xED t\u1ED5ng ba g\xF3c", "G\xF3c ngo\xE0i c\u1EE7a tam gi\xE1c"],
        basic: ["T\u1ED5ng ba g\xF3c b\u1EB1ng $180\\deg$", "G\xF3c ngo\xE0i b\u1EB1ng t\u1ED5ng hai g\xF3c trong kh\xF4ng k\u1EC1", "Tam gi\xE1c vu\xF4ng: hai g\xF3c nh\u1ECDn ph\u1EE5 nhau"],
        advanced: ["B\xE0i to\xE1n t\xEDnh g\xF3c nhi\u1EC1u b\u01B0\u1EDBc", "Tam gi\xE1c c\xF3 g\xF3c theo t\u1EC9 l\u1EC7", "Ch\u1EE9ng minh quan h\u1EC7 gi\u1EEFa c\xE1c g\xF3c"]
      },
      {
        code: "S2",
        title: "Hai tam gi\xE1c b\u1EB1ng nhau \u2014 Tr\u01B0\u1EDDng h\u1EE3p c.c.c",
        topicId: "g7-t5",
        goals: ["K\xFD hi\u1EC7u hai tam gi\xE1c b\u1EB1ng nhau", "Ch\u1EE9ng minh theo c.c.c"],
        basic: ["\u0110\u1ECBnh ngh\u0129a hai tam gi\xE1c b\u1EB1ng nhau", "Tr\u01B0\u1EDDng h\u1EE3p c.c.c", "Suy ra c\u1EA1nh v\xE0 g\xF3c t\u01B0\u01A1ng \u1EE9ng"],
        advanced: ["Ch\u1EE9ng minh hai \u0111o\u1EA1n th\u1EB3ng, hai g\xF3c b\u1EB1ng nhau qua c.c.c", "B\xE0i to\xE1n c\xF3 trung \u0111i\u1EC3m"]
      },
      {
        code: "S3",
        title: "Tr\u01B0\u1EDDng h\u1EE3p c.g.c v\xE0 g.c.g",
        topicId: "g7-t5",
        goals: ["Ch\u1ECDn \u0111\xFAng tr\u01B0\u1EDDng h\u1EE3p b\u1EB1ng nhau"],
        basic: ["Tr\u01B0\u1EDDng h\u1EE3p c.g.c (g\xF3c xen gi\u1EEFa)", "Tr\u01B0\u1EDDng h\u1EE3p g.c.g (c\u1EA1nh xen gi\u1EEFa)", "Quy tr\xECnh 4 b\u01B0\u1EDBc tr\xECnh b\xE0y"],
        advanced: ["B\xE0i to\xE1n c\xF3 tia \u0111\u1ED1i, g\xF3c \u0111\u1ED1i \u0111\u1EC9nh", "Ch\u1EE9ng minh song song t\u1EEB hai tam gi\xE1c b\u1EB1ng nhau", "Gh\xE9p nhi\u1EC1u b\u01B0\u1EDBc ch\u1EE9ng minh"]
      },
      {
        code: "S4",
        title: "C\xE1c tr\u01B0\u1EDDng h\u1EE3p b\u1EB1ng nhau c\u1EE7a tam gi\xE1c vu\xF4ng",
        topicId: "g7-t5",
        goals: ["B\u1ED1n tr\u01B0\u1EDDng h\u1EE3p ri\xEAng c\u1EE7a tam gi\xE1c vu\xF4ng"],
        basic: ["Hai c\u1EA1nh g\xF3c vu\xF4ng", "C\u1EA1nh g\xF3c vu\xF4ng \u2013 g\xF3c nh\u1ECDn k\u1EC1", "C\u1EA1nh huy\u1EC1n \u2013 g\xF3c nh\u1ECDn", "C\u1EA1nh huy\u1EC1n \u2013 c\u1EA1nh g\xF3c vu\xF4ng"],
        advanced: ["B\xE0i to\xE1n c\xF3 \u0111\u01B0\u1EDDng cao, \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c", "Ch\u1EE9ng minh c\xE1ch \u0111\u1EC1u"]
      },
      {
        code: "S5",
        title: "Tam gi\xE1c c\xE2n \u2014 \u0110\u01B0\u1EDDng trung tr\u1EF1c",
        topicId: "g7-t5",
        goals: ["T\xEDnh ch\u1EA5t tam gi\xE1c c\xE2n, \u0111\u1EC1u", "T\xEDnh ch\u1EA5t \u0111\u01B0\u1EDDng trung tr\u1EF1c"],
        basic: ["Tam gi\xE1c c\xE2n: hai c\u1EA1nh b\xEAn, hai g\xF3c \u0111\xE1y", "Tam gi\xE1c \u0111\u1EC1u", "\u0110\u01B0\u1EDDng trung tr\u1EF1c v\xE0 t\xEDnh ch\u1EA5t c\xE1ch \u0111\u1EC1u"],
        advanced: ["B\u1ED1n \u0111\u01B0\u1EDDng tr\xF9ng nhau trong tam gi\xE1c c\xE2n", "Ch\u1EE9ng minh tam gi\xE1c c\xE2n qua nhi\u1EC1u b\u01B0\u1EDBc", "B\xE0i to\xE1n v\u1EC1 tia \u0111\u1ED1i v\xE0 g\xF3c k\u1EC1 b\xF9"]
      }
    ]
  },
  {
    id: "c7-8",
    grade: 7,
    roman: "VIII",
    name: "QUAN H\u1EC6 GI\u1EEEA C\xC1C Y\u1EBEU T\u1ED0 TRONG TAM GI\xC1C",
    term: "HK2",
    lessons: [
      {
        code: "S1",
        title: "Quan h\u1EC7 gi\u1EEFa g\xF3c v\xE0 c\u1EA1nh \u0111\u1ED1i di\u1EC7n \u2014 B\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c",
        topicId: "g7-t5",
        goals: ["So s\xE1nh c\u1EA1nh v\xE0 g\xF3c", "V\u1EADn d\u1EE5ng b\u1EA5t \u0111\u1EB3ng th\u1EE9c tam gi\xE1c"],
        basic: ["G\xF3c l\u1EDBn h\u01A1n \u0111\u1ED1i di\u1EC7n c\u1EA1nh l\u1EDBn h\u01A1n", "$\\abs{b-c}<a<b+c$", "X\xE9t ba \u0111\u1ED9 d\xE0i c\xF3 l\u1EADp th\xE0nh tam gi\xE1c"],
        advanced: ["T\xECm mi\u1EC1n gi\xE1 tr\u1ECB c\u1EE7a c\u1EA1nh th\u1EE9 ba", "B\xE0i to\xE1n chu vi tam gi\xE1c c\xE2n c\xF3 \u0111i\u1EC1u ki\u1EC7n", "Ch\u1EE9ng minh b\u1EA5t \u0111\u1EB3ng th\u1EE9c v\u1EC1 \u0111\u1ED9 d\xE0i"]
      },
      {
        code: "S2",
        title: "\u0110\u01B0\u1EDDng vu\xF4ng g\xF3c v\xE0 \u0111\u01B0\u1EDDng xi\xEAn",
        topicId: "g7-t5",
        goals: ["So s\xE1nh \u0111\u01B0\u1EDDng vu\xF4ng g\xF3c v\xE0 \u0111\u01B0\u1EDDng xi\xEAn"],
        basic: ["\u0110\u01B0\u1EDDng vu\xF4ng g\xF3c ng\u1EAFn nh\u1EA5t", "Quan h\u1EC7 gi\u1EEFa \u0111\u01B0\u1EDDng xi\xEAn v\xE0 h\xECnh chi\u1EBFu"],
        advanced: ["B\xE0i to\xE1n c\u1EF1c tr\u1ECB kho\u1EA3ng c\xE1ch", "Ch\u1EE9ng minh b\u1EA5t \u0111\u1EB3ng th\u1EE9c h\xECnh h\u1ECDc"]
      },
      {
        code: "S3",
        title: "C\xE1c \u0111\u01B0\u1EDDng \u0111\u1ED3ng quy trong tam gi\xE1c",
        topicId: "g7-t5",
        goals: ["B\u1ED1n \u0111i\u1EC3m \u0111\u1EB7c bi\u1EC7t c\u1EE7a tam gi\xE1c"],
        basic: ["Trung tuy\u1EBFn \u2013 tr\u1ECDng t\xE2m ($\\f{2}{3}$)", "Ph\xE2n gi\xE1c \u2013 t\xE2m n\u1ED9i ti\u1EBFp", "Trung tr\u1EF1c \u2013 t\xE2m ngo\u1EA1i ti\u1EBFp", "\u0110\u01B0\u1EDDng cao \u2013 tr\u1EF1c t\xE2m"],
        advanced: ["B\xE0i to\xE1n t\xEDnh \u0111\u1ED9 d\xE0i qua tr\u1ECDng t\xE2m", "Ch\u1EE9ng minh ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng", "B\xE0i to\xE1n t\u1ED5ng h\u1EE3p nhi\u1EC1u \u0111\u01B0\u1EDDng \u0111\u1ED3ng quy"]
      }
    ]
  }
];
var G8 = [
  {
    id: "c8-1",
    grade: 8,
    roman: "I",
    name: "\u0110A TH\u1EE8C",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "\u0110\u01A1n th\u1EE9c \u2014 \u0110a th\u1EE9c nhi\u1EC1u bi\u1EBFn",
        topicId: "g8-t1",
        goals: ["Thu g\u1ECDn, x\xE1c \u0111\u1ECBnh b\u1EADc"],
        basic: ["\u0110\u01A1n th\u1EE9c, \u0111\u01A1n th\u1EE9c \u0111\u1ED3ng d\u1EA1ng", "\u0110a th\u1EE9c nhi\u1EC1u bi\u1EBFn, thu g\u1ECDn, b\u1EADc", "Gi\xE1 tr\u1ECB c\u1EE7a \u0111a th\u1EE9c"],
        advanced: ["X\xE1c \u0111\u1ECBnh h\u1EC7 s\u1ED1 theo \u0111i\u1EC1u ki\u1EC7n", "B\xE0i to\xE1n v\u1EC1 b\u1EADc c\u1EE7a t\xEDch, t\u1ED5ng"]
      },
      {
        code: "S2",
        title: "C\u1ED9ng, tr\u1EEB, nh\xE2n, chia \u0111a th\u1EE9c",
        topicId: "g8-t1",
        goals: ["B\u1ED1n ph\xE9p t\xEDnh v\u1EDBi \u0111a th\u1EE9c"],
        basic: ["C\u1ED9ng, tr\u1EEB \u0111a th\u1EE9c", "Nh\xE2n \u0111\u01A1n th\u1EE9c v\u1EDBi \u0111a th\u1EE9c, \u0111a th\u1EE9c v\u1EDBi \u0111a th\u1EE9c", "Chia \u0111a th\u1EE9c cho \u0111\u01A1n th\u1EE9c"],
        advanced: ["Ch\u1EE9ng minh bi\u1EC3u th\u1EE9c kh\xF4ng ph\u1EE5 thu\u1ED9c bi\u1EBFn", "R\xFAt g\u1ECDn r\u1ED3i t\xEDnh gi\xE1 tr\u1ECB", "Chia \u0111a th\u1EE9c m\u1ED9t bi\u1EBFn c\xF3 d\u01B0"]
      }
    ]
  },
  {
    id: "c8-2",
    grade: 8,
    roman: "II",
    name: "H\u1EB0NG \u0110\u1EB2NG TH\u1EE8C \u0110\xC1NG NH\u1EDA",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c 1, 2, 3",
        topicId: "g8-t1",
        goals: ["Thu\u1ED9c v\xE0 d\xF9ng theo hai chi\u1EC1u"],
        basic: ["$(A+B)^{2}$, $(A-B)^{2}$, $A^{2}-B^{2}$", "Khai tri\u1EC3n v\xE0 r\xFAt g\u1ECDn", "T\xEDnh nhanh gi\xE1 tr\u1ECB s\u1ED1"],
        advanced: ["Ch\u1EE9ng minh \u0111\u1EB3ng th\u1EE9c", "T\xECm GTNN, GTLN b\u1EB1ng ho\xE0n th\xE0nh b\xECnh ph\u01B0\u01A1ng", "Ch\u1EE9ng minh bi\u1EC3u th\u1EE9c lu\xF4n d\u01B0\u01A1ng"]
      },
      {
        code: "S2",
        title: "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c 4, 5, 6, 7",
        topicId: "g8-t1",
        goals: ["L\u1EADp ph\u01B0\u01A1ng v\xE0 t\u1ED5ng, hi\u1EC7u hai l\u1EADp ph\u01B0\u01A1ng"],
        basic: ["$(A\\pm B)^{3}$", "$A^{3}\\pm B^{3}$", "Khai tri\u1EC3n, r\xFAt g\u1ECDn"],
        advanced: ["R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c b\u1EADc ba ph\u1EE9c t\u1EA1p", "Ch\u1EE9ng minh chia h\u1EBFt", "B\xE0i to\xE1n v\u1EC1 $a^{3}+b^{3}+c^{3}-3abc$"]
      },
      {
        code: "S3+S4",
        title: "Ph\xE2n t\xEDch \u0111a th\u1EE9c th\xE0nh nh\xE2n t\u1EED",
        topicId: "g8-t1",
        goals: ["B\u1ED1n ph\u01B0\u01A1ng ph\xE1p v\xE0 ph\u1ED1i h\u1EE3p"],
        basic: ["\u0110\u1EB7t nh\xE2n t\u1EED chung", "D\xF9ng h\u1EB1ng \u0111\u1EB3ng th\u1EE9c", "Nh\xF3m h\u1EA1ng t\u1EED", "T\xECm $x$ b\u1EB1ng ph\xE2n t\xEDch nh\xE2n t\u1EED"],
        advanced: ["T\xE1ch h\u1EA1ng t\u1EED khi $a\\ne1$", "Th\xEAm b\u1EDBt h\u1EA1ng t\u1EED (Sophie Germain)", "\u0110\u1EB7t \u1EA9n ph\u1EE5", "Ch\u1EE9ng minh chia h\u1EBFt b\u1EB1ng ph\xE2n t\xEDch"]
      }
    ]
  },
  {
    id: "c8-3",
    grade: 8,
    roman: "III",
    name: "T\u1EE8 GI\xC1C",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "T\u1EE9 gi\xE1c \u2014 H\xECnh thang c\xE2n",
        topicId: "g8-t5",
        goals: ["T\u1ED5ng b\u1ED1n g\xF3c, h\xECnh thang c\xE2n"],
        basic: ["T\u1ED5ng b\u1ED1n g\xF3c b\u1EB1ng $360\\deg$", "H\xECnh thang, h\xECnh thang c\xE2n v\xE0 d\u1EA5u hi\u1EC7u"],
        advanced: ["B\xE0i to\xE1n t\xEDnh g\xF3c trong t\u1EE9 gi\xE1c", "Ch\u1EE9ng minh h\xECnh thang c\xE2n"]
      },
      {
        code: "S2",
        title: "H\xECnh b\xECnh h\xE0nh",
        topicId: "g8-t5",
        goals: ["N\u0103m d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt"],
        basic: ["T\xEDnh ch\u1EA5t v\u1EC1 c\u1EA1nh, g\xF3c, \u0111\u01B0\u1EDDng ch\xE9o", "N\u0103m d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt"],
        advanced: ["Ch\u1EE9ng minh h\xECnh b\xECnh h\xE0nh qua \u0111\u1ED1i x\u1EE9ng t\xE2m", "B\xE0i to\xE1n c\xF3 trung \u0111i\u1EC3m v\xE0 tia \u0111\u1ED1i"]
      },
      {
        code: "S3",
        title: "H\xECnh ch\u1EEF nh\u1EADt, h\xECnh thoi, h\xECnh vu\xF4ng",
        topicId: "g8-t5",
        goals: ["S\u01A1 \u0111\u1ED3 quan h\u1EC7 v\xE0 chi\u1EBFn thu\u1EADt leo thang"],
        basic: ["D\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt ba h\xECnh", "Trung tuy\u1EBFn \u1EE9ng v\u1EDBi c\u1EA1nh huy\u1EC1n", "\u0110\u01B0\u1EDDng trung b\xECnh"],
        advanced: ["T\xECm \u0111i\u1EC1u ki\u1EC7n \u0111\u1EC3 t\u1EE9 gi\xE1c l\xE0 h\xECnh \u0111\u1EB7c bi\u1EC7t", "B\xE0i to\xE1n t\u1ED5ng h\u1EE3p nhi\u1EC1u \xFD", "Ch\u1EE9ng minh ba \u0111i\u1EC3m th\u1EB3ng h\xE0ng"]
      }
    ]
  },
  {
    id: "c8-4",
    grade: 8,
    roman: "IV",
    name: "\u0110\u1ECANH L\xCD THAL\xC8S",
    term: "HK2",
    lessons: [
      {
        code: "S1",
        title: "\u0110\u1ECBnh l\xED Thal\xE8s \u2014 Thal\xE8s \u0111\u1EA3o v\xE0 h\u1EC7 qu\u1EA3",
        topicId: "g8-t6",
        goals: ["Ba d\u1EA1ng c\u1EE7a \u0111\u1ECBnh l\xED Thal\xE8s"],
        basic: ["\u0110\u1ECBnh l\xED thu\u1EADn: $\\f{AM}{MB}=\\f{AN}{NC}$", "\u0110\u1ECBnh l\xED \u0111\u1EA3o", "H\u1EC7 qu\u1EA3: $\\f{AM}{AB}=\\f{MN}{BC}$"],
        advanced: ["Chia \u0111o\u1EA1n th\u1EB3ng theo t\u1EC9 l\u1EC7 cho tr\u01B0\u1EDBc", "Ch\u1EE9ng minh song song b\u1EB1ng Thal\xE8s \u0111\u1EA3o", "B\xE0i to\xE1n c\xF3 nhi\u1EC1u \u0111\u01B0\u1EDDng song song"]
      },
      {
        code: "S2",
        title: "\u0110\u01B0\u1EDDng trung b\xECnh \u2014 T\xEDnh ch\u1EA5t \u0111\u01B0\u1EDDng ph\xE2n gi\xE1c",
        topicId: "g8-t6",
        goals: ["\u0110\u01B0\u1EDDng trung b\xECnh tam gi\xE1c, h\xECnh thang", "T\xEDnh ch\u1EA5t ph\xE2n gi\xE1c"],
        basic: ["\u0110\u01B0\u1EDDng trung b\xECnh c\u1EE7a tam gi\xE1c, h\xECnh thang", "$\\f{DB}{DC}=\\f{AB}{AC}$"],
        advanced: ["B\xE0i to\xE1n t\xEDnh \u0111\u1ED9 d\xE0i qua ph\xE2n gi\xE1c", "K\u1EBFt h\u1EE3p ph\xE2n gi\xE1c v\u1EDBi d\xE3y t\u1EC9 s\u1ED1 b\u1EB1ng nhau"]
      }
    ]
  },
  {
    id: "c8-5",
    grade: 8,
    roman: "VI",
    name: "PH\xC2N TH\u1EE8C \u0110\u1EA0I S\u1ED0",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "Ph\xE2n th\u1EE9c \u2014 R\xFAt g\u1ECDn, quy \u0111\u1ED3ng",
        topicId: "g8-t2",
        goals: ["\u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh v\xE0 r\xFAt g\u1ECDn"],
        basic: ["\u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh", "Hai ph\xE2n th\u1EE9c b\u1EB1ng nhau", "R\xFAt g\u1ECDn, quy \u0111\u1ED3ng m\u1EABu"],
        advanced: ["R\xFAt g\u1ECDn ph\xE2n th\u1EE9c c\xF3 m\u1EABu b\u1EADc cao", "Ch\u1EE9ng minh ph\xE2n th\u1EE9c kh\xF4ng \u0111\u1ED5i"]
      },
      {
        code: "S2+S3",
        title: "C\xE1c ph\xE9p t\xEDnh v\u1EDBi ph\xE2n th\u1EE9c",
        topicId: "g8-t2",
        goals: ["B\u1ED1n ph\xE9p t\xEDnh v\xE0 bi\u1EC3u th\u1EE9c t\u1ED5ng h\u1EE3p"],
        basic: ["C\u1ED9ng, tr\u1EEB, nh\xE2n, chia ph\xE2n th\u1EE9c", "R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c hai t\u1EA7ng"],
        advanced: ["Quy tr\xECnh 5 b\u01B0\u1EDBc cho bi\u1EC3u th\u1EE9c nhi\u1EC1u t\u1EA7ng", "T\xECm $x$ \u0111\u1EC3 $P$ nguy\xEAn", "X\xE9t d\u1EA5u $P$, t\xECm c\u1EF1c tr\u1ECB"]
      }
    ]
  },
  {
    id: "c8-6",
    grade: 8,
    roman: "VII",
    name: "PH\u01AF\u01A0NG TR\xCCNH B\u1EACC NH\u1EA4T M\u1ED8T \u1EA8N",
    term: "HK2",
    lessons: [
      {
        code: "S1",
        title: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n",
        topicId: "g8-t3",
        goals: ["Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh \u0111\u01B0a \u0111\u01B0\u1EE3c v\u1EC1 b\u1EADc nh\u1EA5t"],
        basic: ["$ax+b=0$; quy t\u1EAFc chuy\u1EC3n v\u1EBF, quy t\u1EAFc nh\xE2n", "Quy \u0111\u1ED3ng kh\u1EED m\u1EABu", "Ph\u01B0\u01A1ng tr\xECnh t\xEDch"],
        advanced: ["Ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a \u1EA9n \u1EDF m\u1EABu v\xE0 \u0111i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh", "Ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a tham s\u1ED1", "Ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i"]
      },
      {
        code: "S2+S3",
        title: "Gi\u1EA3i b\xE0i to\xE1n b\u1EB1ng c\xE1ch l\u1EADp ph\u01B0\u01A1ng tr\xECnh",
        topicId: "g8-t3",
        goals: ["S\xE1u b\u01B0\u1EDBc chu\u1EA9n", "Ba m\xF4 h\xECnh b\xE0i to\xE1n"],
        basic: ["S\xE1u b\u01B0\u1EDBc gi\u1EA3i", "B\xE0i to\xE1n v\u1EC1 s\u1ED1, v\u1EC1 tu\u1ED5i", "B\xE0i to\xE1n chuy\u1EC3n \u0111\u1ED9ng c\u01A1 b\u1EA3n"],
        advanced: ["B\xE0i to\xE1n n\u0103ng su\u1EA5t (l\xE0m chung \u2013 l\xE0m ri\xEAng)", "B\xE0i to\xE1n ca n\xF4 xu\xF4i ng\u01B0\u1EE3c d\xF2ng", "B\xE0i to\xE1n ph\u1EA7n tr\u0103m s\u1EA3n l\u01B0\u1EE3ng"]
      },
      {
        code: "S4",
        title: "H\xE0m s\u1ED1 b\u1EADc nh\u1EA5t v\xE0 \u0111\u1ED3 th\u1ECB",
        topicId: "g8-t4",
        goals: ["V\u1EBD \u0111\u1ED3 th\u1ECB, x\xE1c \u0111\u1ECBnh h\u1EC7 s\u1ED1 g\xF3c"],
        basic: ["M\u1EB7t ph\u1EB3ng to\u1EA1 \u0111\u1ED9", "$y=ax+b$, h\u1EC7 s\u1ED1 g\xF3c", "V\u1EBD \u0111\u1ED3 th\u1ECB qua hai \u0111i\u1EC3m"],
        advanced: ["X\xE1c \u0111\u1ECBnh h\xE0m s\u1ED1 qua hai \u0111i\u1EC3m", "V\u1ECB tr\xED t\u01B0\u01A1ng \u0111\u1ED1i hai \u0111\u01B0\u1EDDng th\u1EB3ng", "B\xE0i to\xE1n tham s\u1ED1 v\u1EC1 \u0111\u01B0\u1EDDng th\u1EB3ng"]
      }
    ]
  },
  {
    id: "c8-7",
    grade: 8,
    roman: "VIII",
    name: "X\xC1C SU\u1EA4T C\u1EE6A BI\u1EBEN C\u1ED0",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "D\u1EEF li\u1EC7u v\xE0 bi\u1EC3u \u0111\u1ED3",
        topicId: "g8-t8",
        goals: ["Ch\u1ECDn v\xE0 \u0111\u1ECDc bi\u1EC3u \u0111\u1ED3 ph\xF9 h\u1EE3p"],
        basic: ["Thu th\u1EADp, ph\xE2n lo\u1EA1i d\u1EEF li\u1EC7u", "Bi\u1EC3u \u0111\u1ED3 c\u1ED9t, c\u1ED9t k\xE9p, \u0111o\u1EA1n th\u1EB3ng, qu\u1EA1t tr\xF2n"],
        advanced: ["Ph\xE1t hi\u1EC7n d\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\xED", "Ph\xE2n t\xEDch s\u1ED1 li\u1EC7u v\xE0 vi\u1EBFt nh\u1EADn x\xE9t"]
      },
      {
        code: "S2",
        title: "X\xE1c su\u1EA5t l\xED thuy\u1EBFt v\xE0 x\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m",
        topicId: "g8-t8",
        goals: ["Ph\xE2n bi\u1EC7t hai lo\u1EA1i x\xE1c su\u1EA5t"],
        basic: ["$P(A)=\\f{m}{k}$ trong m\xF4 h\xECnh \u0111\u1ED3ng kh\u1EA3 n\u0103ng", "X\xE1c su\u1EA5t th\u1EF1c nghi\u1EC7m"],
        advanced: ["\u01AF\u1EDBc l\u01B0\u1EE3ng t\u1EA7n s\u1ED1: $n\\cdot P(A)$", "Ph\xE9p th\u1EED hai giai \u0111o\u1EA1n, s\u01A1 \u0111\u1ED3 c\xE2y"]
      }
    ]
  },
  {
    id: "c8-8",
    grade: 8,
    roman: "IX",
    name: "TAM GI\xC1C \u0110\u1ED2NG D\u1EA0NG",
    term: "HK2",
    lessons: [
      {
        code: "S1",
        title: "Hai tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng \u2014 Ba tr\u01B0\u1EDDng h\u1EE3p",
        topicId: "g8-t6",
        goals: ["Ch\u1EE9ng minh \u0111\u1ED3ng d\u1EA1ng theo c.c.c, c.g.c, g.g"],
        basic: ["\u0110\u1ECBnh ngh\u0129a v\xE0 t\u1EC9 s\u1ED1 \u0111\u1ED3ng d\u1EA1ng", "Ba tr\u01B0\u1EDDng h\u1EE3p \u0111\u1ED3ng d\u1EA1ng", "Tr\u01B0\u1EDDng h\u1EE3p \u0111\u1ED3ng d\u1EA1ng c\u1EE7a tam gi\xE1c vu\xF4ng"],
        advanced: ["Chu\u1ED7i \u0111\u1ED3ng d\u1EA1ng b\u1EAFc c\u1EA7u", "Ch\u1EE9ng minh h\u1EC7 th\u1EE9c t\xEDch", "T\u1EC9 s\u1ED1 chu vi, t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch $k^{2}$"]
      },
      {
        code: "S2",
        title: "\u1EE8ng d\u1EE5ng c\u1EE7a tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng",
        topicId: "g8-t6",
        goals: ["\u0110o gi\xE1n ti\u1EBFp, gi\u1EA3i b\xE0i to\xE1n th\u1EF1c t\u1EBF"],
        basic: ["\u0110o chi\u1EC1u cao, kho\u1EA3ng c\xE1ch gi\xE1n ti\u1EBFp", "B\xE0i to\xE1n b\xF3ng n\u1EAFng"],
        advanced: ["B\xE0i to\xE1n t\u1EC9 s\u1ED1 di\u1EC7n t\xEDch v\u1EDBi \u0111i\u1EC3m chia c\u1EA1nh", "C\u1EF1c tr\u1ECB h\xECnh h\u1ECDc"]
      },
      {
        code: "S3",
        title: "\u0110\u1ECBnh l\xED Pythagore \u2014 H\xECnh ch\xF3p \u0111\u1EC1u",
        topicId: "g8-t7",
        goals: ["Pythagore thu\u1EADn, \u0111\u1EA3o; h\xECnh ch\xF3p \u0111\u1EC1u"],
        basic: ["$a^{2}=b^{2}+c^{2}$; b\u1ED9 ba Pythagore", "Pythagore \u0111\u1EA3o", "H\xECnh ch\xF3p tam gi\xE1c \u0111\u1EC1u, t\u1EE9 gi\xE1c \u0111\u1EC1u"],
        advanced: ["B\xE0i to\xE1n thang d\u1EF1a t\u01B0\u1EDDng, \u0111\u01B0\u1EDDng ch\xE9o", "$S_{xq}=p\\cdot d$; $V=\\f{1}{3}Sh$", "V\u1EADt th\u1EC3 gh\xE9p nhi\u1EC1u kh\u1ED1i"]
      }
    ]
  }
];
var G9 = [
  {
    id: "c9-1",
    grade: 9,
    roman: "I",
    name: "PH\u01AF\u01A0NG TR\xCCNH V\xC0 H\u1EC6 HAI PH\u01AF\u01A0NG TR\xCCNH B\u1EACC NH\u1EA4T HAI \u1EA8N",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "Ph\u01B0\u01A1ng tr\xECnh v\xE0 h\u1EC7 hai ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t hai \u1EA9n",
        topicId: "g9-t1",
        goals: ["Gi\u1EA3i h\u1EC7 b\u1EB1ng hai ph\u01B0\u01A1ng ph\xE1p"],
        basic: ["Nghi\u1EC7m c\u1EE7a ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t hai \u1EA9n", "Ph\u01B0\u01A1ng ph\xE1p th\u1EBF", "Ph\u01B0\u01A1ng ph\xE1p c\u1ED9ng \u0111\u1EA1i s\u1ED1"],
        advanced: ["H\u1EC7 c\xF3 \u1EA9n \u1EDF m\u1EABu \u2014 \u0111\u1EB7t \u1EA9n ph\u1EE5", "H\u1EC7 ch\u1EE9a tham s\u1ED1: bi\u1EC7n lu\u1EADn s\u1ED1 nghi\u1EC7m", "H\u1EC7 \u0111\u1ED1i x\u1EE9ng \u0111\u01A1n gi\u1EA3n"]
      },
      {
        code: "S2+S3",
        title: "Gi\u1EA3i b\xE0i to\xE1n b\u1EB1ng c\xE1ch l\u1EADp h\u1EC7 ph\u01B0\u01A1ng tr\xECnh",
        topicId: "g9-t1",
        goals: ["S\xE1u b\u01B0\u1EDBc chu\u1EA9n v\u1EDBi hai \u1EA9n"],
        basic: ["B\xE0i to\xE1n v\u1EC1 s\u1ED1, v\u1EC1 tu\u1ED5i", "B\xE0i to\xE1n chuy\u1EC3n \u0111\u1ED9ng", "B\xE0i to\xE1n n\u0103ng su\u1EA5t c\u01A1 b\u1EA3n"],
        advanced: ["B\xE0i to\xE1n hai v\xF2i n\u01B0\u1EDBc", "B\xE0i to\xE1n ca n\xF4 xu\xF4i ng\u01B0\u1EE3c d\xF2ng", "B\xE0i to\xE1n ph\u1EA7n tr\u0103m hai \u0111\u1EA1i l\u01B0\u1EE3ng"]
      }
    ]
  },
  {
    id: "c9-2",
    grade: 9,
    roman: "II",
    name: "C\u0102N B\u1EACC HAI V\xC0 C\u0102N B\u1EACC BA",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "C\u0103n b\u1EADc hai \u2014 C\u0103n th\u1EE9c b\u1EADc hai",
        topicId: "g9-t2",
        goals: ["\u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh", "H\u1EB1ng \u0111\u1EB3ng th\u1EE9c $\\s{A^{2}}=\\abs{A}$"],
        basic: ["C\u0103n b\u1EADc hai s\u1ED1 h\u1ECDc; \u0111i\u1EC1u ki\u1EC7n c\xF3 ngh\u0129a", "$\\s{A^{2}}=\\abs{A}$", "C\u0103n b\u1EADc ba"],
        advanced: ["\u0110i\u1EC1u ki\u1EC7n x\xE1c \u0111\u1ECBnh ph\u1EE9c t\u1EA1p (k\u1EBFt h\u1EE3p m\u1EABu)", "R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c c\xF3 d\u1EA5u gi\xE1 tr\u1ECB tuy\u1EC7t \u0111\u1ED1i"]
      },
      {
        code: "S2",
        title: "C\xE1c ph\xE9p bi\u1EBFn \u0111\u1ED5i c\u0103n th\u1EE9c",
        topicId: "g9-t2",
        goals: ["\u0110\u01B0a ra/v\xE0o d\u1EA5u c\u0103n, kh\u1EED m\u1EABu, tr\u1EE5c c\u0103n th\u1EE9c"],
        basic: ["$\\s{A^{2}B}=\\abs{A}\\s{B}$", "Kh\u1EED m\u1EABu c\u1EE7a bi\u1EC3u th\u1EE9c l\u1EA5y c\u0103n", "Tr\u1EE5c c\u0103n th\u1EE9c \u1EDF m\u1EABu"],
        advanced: ["Bi\u1EC3u th\u1EE9c li\xEAn h\u1EE3p", "R\xFAt g\u1ECDn c\u0103n k\xE9p $\\s{a\\pm2\\s{b}}$", "So s\xE1nh bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n"]
      },
      {
        code: "S3+S4",
        title: "R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n v\xE0 b\xE0i to\xE1n ph\u1EE5",
        topicId: "g9-t2",
        goals: ["Quy tr\xECnh 5 b\u01B0\u1EDBc \u2014 c\xE2u 1 c\u1EE7a \u0111\u1EC1 thi v\xE0o 10"],
        basic: ["\u0110\u1EB7t $t=\\s{x}$, ph\xE2n t\xEDch m\u1EABu", "Quy \u0111\u1ED3ng v\xE0 thu g\u1ECDn", "T\xEDnh gi\xE1 tr\u1ECB t\u1EA1i $x=a$"],
        advanced: ["T\xECm $x$ \u0111\u1EC3 $P$ nguy\xEAn", "So s\xE1nh $P$ v\u1EDBi m\u1ED9t s\u1ED1", "T\xECm GTNN, GTLN c\u1EE7a $P$", "Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a c\u0103n"]
      }
    ]
  },
  {
    id: "c9-3",
    grade: 9,
    roman: "III",
    name: "B\u1EA4T \u0110\u1EB2NG TH\u1EE8C V\xC0 B\u1EA4T PH\u01AF\u01A0NG TR\xCCNH",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "B\u1EA5t \u0111\u1EB3ng th\u1EE9c \u2014 B\u1EA5t ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t m\u1ED9t \u1EA9n",
        topicId: "g9-t4",
        goals: ["T\xEDnh ch\u1EA5t b\u1EA5t \u0111\u1EB3ng th\u1EE9c", "Gi\u1EA3i b\u1EA5t ph\u01B0\u01A1ng tr\xECnh"],
        basic: ["T\xEDnh ch\u1EA5t c\u1ED9ng, nh\xE2n v\u1EDBi s\u1ED1 d\u01B0\u01A1ng/\xE2m", "Gi\u1EA3i b\u1EA5t ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t", "Bi\u1EC3u di\u1EC5n t\u1EADp nghi\u1EC7m"],
        advanced: ["B\u1EA5t ph\u01B0\u01A1ng tr\xECnh c\xF3 tham s\u1ED1", "T\xECm nghi\u1EC7m nguy\xEAn", "Ch\u1EE9ng minh b\u1EA5t \u0111\u1EB3ng th\u1EE9c \u0111\u01A1n gi\u1EA3n"]
      }
    ]
  },
  {
    id: "c9-4",
    grade: 9,
    roman: "IV",
    name: "H\u1EC6 TH\u1EE8C L\u01AF\u1EE2NG TRONG TAM GI\xC1C VU\xD4NG",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "H\u1EC7 th\u1EE9c v\u1EC1 c\u1EA1nh v\xE0 \u0111\u01B0\u1EDDng cao",
        topicId: "g9-t5",
        goals: ["N\u0103m h\u1EC7 th\u1EE9c l\u01B0\u1EE3ng"],
        basic: ["$b^{2}=ab'$, $c^{2}=ac'$", "$h^{2}=b'c'$, $ah=bc$", "$\\f{1}{h^{2}}=\\f{1}{b^{2}}+\\f{1}{c^{2}}$"],
        advanced: ["B\xE0i to\xE1n t\u1ED5ng h\u1EE3p nhi\u1EC1u h\u1EC7 th\u1EE9c", "Ch\u1EE9ng minh h\u1EC7 th\u1EE9c b\u1EB1ng \u0111\u1ED3ng d\u1EA1ng"]
      },
      {
        code: "S2",
        title: "T\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c c\u1EE7a g\xF3c nh\u1ECDn",
        topicId: "g9-t5",
        goals: ["sin, cos, tan, cot v\xE0 quan h\u1EC7"],
        basic: ["\u0110\u1ECBnh ngh\u0129a b\u1ED1n t\u1EC9 s\u1ED1", "G\xF3c ph\u1EE5 nhau", "Gi\xE1 tr\u1ECB \u0111\u1EB7c bi\u1EC7t $30\\deg$, $45\\deg$, $60\\deg$"],
        advanced: ["$\\sin^{2}+\\cos^{2}=1$ v\xE0 c\xE1c h\u1EC7 qu\u1EA3", "R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c l\u01B0\u1EE3ng gi\xE1c", "So s\xE1nh t\u1EC9 s\u1ED1 l\u01B0\u1EE3ng gi\xE1c"]
      },
      {
        code: "S3",
        title: "Gi\u1EA3i tam gi\xE1c vu\xF4ng v\xE0 \u1EE9ng d\u1EE5ng th\u1EF1c t\u1EBF",
        topicId: "g9-t5",
        goals: ["Gi\u1EA3i tam gi\xE1c vu\xF4ng", "B\xE0i to\xE1n \u0111o \u0111\u1EA1c"],
        basic: ["Bi\u1EBFt hai c\u1EA1nh; bi\u1EBFt m\u1ED9t c\u1EA1nh m\u1ED9t g\xF3c", "T\xEDnh \u0111\u1EE7 c\xE1c c\u1EA1nh v\xE0 g\xF3c"],
        advanced: ["B\xE0i to\xE1n g\xF3c n\xE2ng, g\xF3c h\u1EA1", "\u0110o chi\u1EC1u cao to\xE0 nh\xE0, c\u1ED9t c\u1EDD", "B\xE0i to\xE1n \u0111\u1ED9 d\u1ED1c"]
      }
    ]
  },
  {
    id: "c9-5",
    grade: 9,
    roman: "V",
    name: "\u0110\u01AF\u1EDCNG TR\xD2N",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "\u0110\u01B0\u1EDDng tr\xF2n \u2014 D\xE2y v\xE0 \u0111\u01B0\u1EDDng k\xEDnh",
        topicId: "g9-t6",
        goals: ["Quan h\u1EC7 \u0111\u01B0\u1EDDng k\xEDnh v\xE0 d\xE2y"],
        basic: ["X\xE1c \u0111\u1ECBnh \u0111\u01B0\u1EDDng tr\xF2n", "\u0110\u01B0\u1EDDng k\xEDnh vu\xF4ng g\xF3c v\u1EDBi d\xE2y", "D\xE2y v\xE0 kho\u1EA3ng c\xE1ch t\u1EDBi t\xE2m"],
        advanced: ["B\xE0i to\xE1n t\xEDnh \u0111\u1ED9 d\xE0i d\xE2y", "Ch\u1EE9ng minh ba \u0111i\u1EC3m c\xF9ng thu\u1ED9c m\u1ED9t \u0111\u01B0\u1EDDng tr\xF2n"]
      },
      {
        code: "S2",
        title: "Ti\u1EBFp tuy\u1EBFn c\u1EE7a \u0111\u01B0\u1EDDng tr\xF2n",
        topicId: "g9-t6",
        goals: ["T\xEDnh ch\u1EA5t ti\u1EBFp tuy\u1EBFn; hai ti\u1EBFp tuy\u1EBFn c\u1EAFt nhau"],
        basic: ["V\u1ECB tr\xED t\u01B0\u01A1ng \u0111\u1ED1i \u0111\u01B0\u1EDDng th\u1EB3ng \u2013 \u0111\u01B0\u1EDDng tr\xF2n", "Ti\u1EBFp tuy\u1EBFn vu\xF4ng g\xF3c b\xE1n k\xEDnh", "Hai ti\u1EBFp tuy\u1EBFn c\u1EAFt nhau"],
        advanced: ["B\xE0i to\xE1n t\xEDnh \u0111\u1ED9 d\xE0i ti\u1EBFp tuy\u1EBFn", "\u0110\u01B0\u1EDDng tr\xF2n n\u1ED9i ti\u1EBFp tam gi\xE1c", "Ti\u1EBFp tuy\u1EBFn chung c\u1EE7a hai \u0111\u01B0\u1EDDng tr\xF2n"]
      },
      {
        code: "S3+S4",
        title: "G\xF3c v\u1EDBi \u0111\u01B0\u1EDDng tr\xF2n \u2014 T\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp",
        topicId: "g9-t6",
        goals: ["C\xE1c lo\u1EA1i g\xF3c; ch\u1EE9ng minh t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp"],
        basic: ["G\xF3c \u1EDF t\xE2m, g\xF3c n\u1ED9i ti\u1EBFp", "G\xF3c t\u1EA1o b\u1EDFi ti\u1EBFp tuy\u1EBFn v\xE0 d\xE2y cung", "D\u1EA5u hi\u1EC7u t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp"],
        advanced: ["G\xF3c c\xF3 \u0111\u1EC9nh trong / ngo\xE0i \u0111\u01B0\u1EDDng tr\xF2n", "H\u1EC7 th\u1EE9c ph\u01B0\u01A1ng t\xEDch $MT^{2}=MA\\cdot MB$", "C\xE2u h\xECnh 4 \xFD theo c\u1EA5u tr\xFAc thi v\xE0o 10"]
      },
      {
        code: "S5",
        title: "\u0110\u1ED9 d\xE0i cung \u2014 Di\u1EC7n t\xEDch h\xECnh qu\u1EA1t \u2014 \u0110a gi\xE1c \u0111\u1EC1u",
        topicId: "g9-t6",
        goals: ["C\xF4ng th\u1EE9c cung v\xE0 qu\u1EA1t tr\xF2n"],
        basic: ["$l=\\f{\\pi Rn}{180}$", "$S_{quat}=\\f{\\pi R^{2}n}{360}$", "\u0110a gi\xE1c \u0111\u1EC1u n\u1ED9i ti\u1EBFp"],
        advanced: ["Di\u1EC7n t\xEDch h\xECnh vi\xEAn ph\xE2n, h\xECnh v\xE0nh kh\u0103n", "B\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EC1 cung tr\xF2n"]
      }
    ]
  },
  {
    id: "c9-6",
    grade: 9,
    roman: "VI",
    name: "H\xC0M S\u1ED0 y = ax\xB2 V\xC0 PH\u01AF\u01A0NG TR\xCCNH B\u1EACC HAI",
    term: "HK2",
    lessons: [
      {
        code: "S1",
        title: "H\xE0m s\u1ED1 $y=ax^{2}$ v\xE0 \u0111\u1ED3 th\u1ECB",
        topicId: "g9-t3",
        goals: ["V\u1EBD parabol, x\xE1c \u0111\u1ECBnh t\xEDnh ch\u1EA5t"],
        basic: ["T\xEDnh ch\u1EA5t h\xE0m s\u1ED1 $y=ax^{2}$", "B\u1EA3ng gi\xE1 tr\u1ECB v\xE0 v\u1EBD \u0111\u1ED3 th\u1ECB", "\u0110i\u1EC3m thu\u1ED9c \u0111\u1ED3 th\u1ECB"],
        advanced: ["T\xECm $a$ khi bi\u1EBFt \u0111i\u1EC3m thu\u1ED9c \u0111\u1ED3 th\u1ECB", "B\xE0i to\xE1n v\u1EC1 giao \u0111i\u1EC3m v\u1EDBi \u0111\u01B0\u1EDDng th\u1EB3ng"]
      },
      {
        code: "S2",
        title: "Ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai m\u1ED9t \u1EA9n",
        topicId: "g9-t3",
        goals: ["C\xF4ng th\u1EE9c nghi\u1EC7m v\xE0 nh\u1EA9m nghi\u1EC7m"],
        basic: ["$\\Delta=b^{2}-4ac$; c\xF4ng th\u1EE9c nghi\u1EC7m", "C\xF4ng th\u1EE9c nghi\u1EC7m thu g\u1ECDn", "Nh\u1EA9m nghi\u1EC7m khi $a\\pm b+c=0$"],
        advanced: ["Ph\u01B0\u01A1ng tr\xECnh tr\xF9ng ph\u01B0\u01A1ng", "Ph\u01B0\u01A1ng tr\xECnh quy v\u1EC1 b\u1EADc hai (\u0111\u1EB7t \u1EA9n ph\u1EE5)", "Ph\u01B0\u01A1ng tr\xECnh ch\u1EE9a tham s\u1ED1"]
      },
      {
        code: "S3+S4",
        title: "H\u1EC7 th\u1EE9c Vi\xE8te v\xE0 \u1EE9ng d\u1EE5ng",
        topicId: "g9-t3",
        goals: ["Quy tr\xECnh 3 b\u01B0\u1EDBc cho c\xE2u ph\xE2n lo\u1EA1i"],
        basic: ["$S=-\\f{b}{a}$, $P=\\f{c}{a}$", "T\xEDnh bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng", "T\xECm hai s\u1ED1 bi\u1EBFt t\u1ED5ng v\xE0 t\xEDch"],
        advanced: ["\u0110i\u1EC1u ki\u1EC7n v\u1EC1 d\u1EA5u v\xE0 v\u1ECB tr\xED nghi\u1EC7m", "H\u1EC7 th\u1EE9c kh\xF4ng \u0111\u1ED1i x\u1EE9ng ($x_1=kx_2$)", "H\u1EC7 th\u1EE9c \u0111\u1ED9c l\u1EADp v\u1EDBi tham s\u1ED1", "T\u01B0\u01A1ng giao parabol \u2013 \u0111\u01B0\u1EDDng th\u1EB3ng"]
      }
    ]
  },
  {
    id: "c9-7",
    grade: 9,
    roman: "VII",
    name: "H\xCCNH TR\u1EE4 \u2014 H\xCCNH N\xD3N \u2014 H\xCCNH C\u1EA6U",
    term: "HK2",
    lessons: [
      {
        code: "S1",
        title: "H\xECnh tr\u1EE5, h\xECnh n\xF3n, h\xECnh c\u1EA7u",
        topicId: "g9-t7",
        goals: ["C\xF4ng th\u1EE9c di\u1EC7n t\xEDch v\xE0 th\u1EC3 t\xEDch"],
        basic: ["H\xECnh tr\u1EE5: $S_{xq}=2\\pi rh$, $V=\\pi r^{2}h$", "H\xECnh n\xF3n: $S_{xq}=\\pi rl$, $V=\\f{1}{3}\\pi r^{2}h$", "H\xECnh c\u1EA7u: $S=4\\pi R^{2}$, $V=\\f{4}{3}\\pi R^{3}$"],
        advanced: ["$l^{2}=r^{2}+h^{2}$; m\u1EB7t c\u1EAFt qua tr\u1EE5c", "V\u1EADt th\u1EC3 gh\xE9p nhi\u1EC1u kh\u1ED1i", "B\xE0i to\xE1n th\u1EF1c t\u1EBF v\u1EC1 b\u1EC3 ch\u1EE9a, ph\u1EC5u"]
      }
    ]
  },
  {
    id: "c9-8",
    grade: 9,
    roman: "VIII",
    name: "TH\u1ED0NG K\xCA V\xC0 X\xC1C SU\u1EA4T",
    term: "HK1",
    lessons: [
      {
        code: "S1",
        title: "B\u1EA3ng t\u1EA7n s\u1ED1, t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i v\xE0 bi\u1EC3u \u0111\u1ED3",
        topicId: "g9-t8",
        goals: ["L\u1EADp b\u1EA3ng t\u1EA7n s\u1ED1 v\xE0 v\u1EBD bi\u1EC3u \u0111\u1ED3"],
        basic: ["T\u1EA7n s\u1ED1, t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i", "B\u1EA3ng gh\xE9p nh\xF3m", "Bi\u1EC3u \u0111\u1ED3 t\u1EA7n s\u1ED1 t\u01B0\u01A1ng \u0111\u1ED1i"],
        advanced: ["Ph\xE2n t\xEDch v\xE0 so s\xE1nh hai m\u1EABu s\u1ED1 li\u1EC7u", "Nh\u1EADn x\xE9t xu h\u01B0\u1EDBng"]
      },
      {
        code: "S2",
        title: "Ph\xE9p th\u1EED ng\u1EABu nhi\xEAn v\xE0 x\xE1c su\u1EA5t",
        topicId: "g9-t8",
        goals: ["Kh\xF4ng gian m\u1EABu, x\xE1c su\u1EA5t bi\u1EBFn c\u1ED1"],
        basic: ["Ph\xE9p th\u1EED, k\u1EBFt qu\u1EA3 c\xF3 th\u1EC3", "$P(A)=\\f{m}{k}$"],
        advanced: ["Ph\xE9p th\u1EED hai giai \u0111o\u1EA1n, s\u01A1 \u0111\u1ED3 c\xE2y", "D\xF9ng bi\u1EBFn c\u1ED1 \u0111\u1ED1i", "B\xE0i to\xE1n gieo hai x\xFAc x\u1EAFc"]
      }
    ]
  },
  {
    id: "c9-9",
    grade: 9,
    roman: "IX",
    name: "T\u1ED4NG \xD4N THI TUY\u1EC2N SINH V\xC0O L\u1EDAP 10",
    term: "HK2",
    review: ["B\u1ED9 \u0111\u1EC1 luy\u1EC7n thi 100 \u0111\u1EC1 kh\u1ED1i 9", "\u0110\u1EC1 thi th\u1EED theo c\u1EA5u tr\xFAc S\u1EDF GD&\u0110T"],
    lessons: [
      {
        code: "C\u01101",
        title: "Chuy\xEAn \u0111\u1EC1 1 \u2014 R\xFAt g\u1ECDn v\xE0 t\xEDnh gi\xE1 tr\u1ECB bi\u1EC3u th\u1EE9c",
        topicId: "g9-t2",
        goals: ["L\u1EA5y tr\u1ECDn \u0111i\u1EC3m c\xE2u 1 (2,0 \u0111i\u1EC3m)"],
        basic: ["R\xFAt g\u1ECDn bi\u1EC3u th\u1EE9c ch\u1EE9a c\u0103n", "T\xEDnh gi\xE1 tr\u1ECB t\u1EA1i $x=a$"],
        advanced: ["T\xECm $x$ \u0111\u1EC3 $P$ nguy\xEAn, $P>0$, $P<k$", "T\xECm GTNN, GTLN c\u1EE7a $P$"]
      },
      {
        code: "C\u01102",
        title: "Chuy\xEAn \u0111\u1EC1 2 \u2014 H\u1EC7 ph\u01B0\u01A1ng tr\xECnh b\u1EADc nh\u1EA5t hai \u1EA9n",
        topicId: "g9-t1",
        goals: ["Gi\u1EA3i h\u1EC7 v\xE0 bi\u1EC7n lu\u1EADn"],
        basic: ["Gi\u1EA3i h\u1EC7 b\u1EB1ng th\u1EBF v\xE0 c\u1ED9ng \u0111\u1EA1i s\u1ED1", "H\u1EC7 c\xF3 \u1EA9n ph\u1EE5"],
        advanced: ["H\u1EC7 ch\u1EE9a tham s\u1ED1", "H\u1EC7 \u0111\u1ED1i x\u1EE9ng"]
      },
      {
        code: "C\u01103",
        title: "Chuy\xEAn \u0111\u1EC1 3 \u2014 Ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai v\xE0 h\u1EC7 th\u1EE9c Vi\xE8te",
        topicId: "g9-t3",
        goals: ["L\u1EA5y tr\u1ECDn \u0111i\u1EC3m c\xE2u ph\xE2n lo\u1EA1i"],
        basic: ["Gi\u1EA3i ph\u01B0\u01A1ng tr\xECnh b\u1EADc hai", "T\xEDnh bi\u1EC3u th\u1EE9c \u0111\u1ED1i x\u1EE9ng"],
        advanced: ["B\xE0i to\xE1n tham s\u1ED1 ba b\u01B0\u1EDBc", "T\u01B0\u01A1ng giao parabol \u2013 \u0111\u01B0\u1EDDng th\u1EB3ng"]
      },
      {
        code: "C\u01104",
        title: "Chuy\xEAn \u0111\u1EC1 4 \u2014 Gi\u1EA3i b\xE0i to\xE1n b\u1EB1ng c\xE1ch l\u1EADp ph\u01B0\u01A1ng tr\xECnh, h\u1EC7 ph\u01B0\u01A1ng tr\xECnh",
        topicId: "g9-t1",
        goals: ["Tr\xECnh b\xE0y \u0111\u1EE7 s\xE1u b\u01B0\u1EDBc"],
        basic: ["B\xE0i to\xE1n chuy\u1EC3n \u0111\u1ED9ng, n\u0103ng su\u1EA5t", "B\xE0i to\xE1n v\u1EC1 s\u1ED1"],
        advanced: ["B\xE0i to\xE1n hai v\xF2i n\u01B0\u1EDBc, xu\xF4i ng\u01B0\u1EE3c d\xF2ng", "B\xE0i to\xE1n ph\u1EA7n tr\u0103m, h\xECnh h\u1ECDc"]
      },
      {
        code: "C\u01105",
        title: "Chuy\xEAn \u0111\u1EC1 5 \u2014 H\xECnh h\u1ECDc t\u1ED5ng h\u1EE3p (c\xE2u 4 thi v\xE0o 10)",
        topicId: "g9-t6",
        goals: ["L\xE0m tr\u1ECDn v\u1EB9n 3 \xFD \u0111\u1EA7u, th\u1EED s\u1EE9c \xFD d"],
        basic: ["Ch\u1EE9ng minh t\u1EE9 gi\xE1c n\u1ED9i ti\u1EBFp", "Ch\u1EE9ng minh h\u1EC7 th\u1EE9c, tam gi\xE1c \u0111\u1ED3ng d\u1EA1ng"],
        advanced: ["T\xEDnh \u0111\u1ED9 d\xE0i, di\u1EC7n t\xEDch", "\u0110i\u1EC3m c\u1ED1 \u0111\u1ECBnh, qu\u1EF9 t\xEDch, c\u1EF1c tr\u1ECB h\xECnh h\u1ECDc"]
      }
    ]
  }
];
var ALL_CHAPTERS = [...G6, ...G7, ...G8, ...G9];

// src/content/index.ts
var mergeTypes = (...sources) => {
  const out = {};
  for (const src of sources) {
    for (const [key, list] of Object.entries(src)) {
      out[key] = [...out[key] ?? [], ...list];
    }
  }
  return out;
};
var EXTRA_TYPES = mergeTypes(
  EXTRA_TYPES_G6,
  EXTRA_TYPES_G7,
  EXTRA_TYPES_G8,
  EXTRA_TYPES_G9,
  EXTRA_TYPES_MONG
);
var LEVEL_RANK = { NB: 0, TH: 1, VD: 2, VDC: 3 };
var withExtras = (t) => {
  const extra = EXTRA_TYPES[t.id];
  if (!extra?.length) return t;
  return {
    ...t,
    types: [...t.types, ...extra].sort((a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level])
  };
};
var norm = (s) => s.toLowerCase().replace(/[^a-zà-ỹ0-9]/gi, "");
var withSkills = (t) => {
  const extra = EXTRA_SKILLS[t.id];
  if (!extra?.length) return t;
  const seen = new Set((t.practiceSkills ?? []).map((x) => norm(x.title)));
  const add = extra.filter((x) => !seen.has(norm(x.title)));
  return { ...t, practiceSkills: [...t.practiceSkills ?? [], ...add] };
};
var withDecode = (t) => {
  const extra = EXTRA_DECODE[t.id];
  if (!extra?.length) return t;
  const seen = new Set(t.decode.map((d) => norm(d.signal)));
  const add = extra.filter((d) => !seen.has(norm(d.signal)));
  return { ...t, decode: [...t.decode, ...add] };
};
var ALL_TOPICS = [...G6_TOPICS, ...G7_TOPICS, ...G8_TOPICS, ...G9_TOPICS].map(withExtras).map(withSkills).map(withDecode);

// _cov.ts
var dr = 0;
var ty = 0;
var ex = 0;
var sk = 0;
var th = 0;
var pit = 0;
var thin = [];
var ids = /* @__PURE__ */ new Set();
var dupIds = [];
for (const t of ALL_TOPICS) {
  dr += t.decode.length;
  ty += t.types.length;
  th += t.theory.length;
  ex += t.types.reduce((s, x) => s + (x.worked?.length || 0), 0);
  pit += t.types.reduce((s, x) => s + (x.pitfalls?.length || 0), 0);
  sk += t.practiceSkills?.length || 0;
  for (const ty2 of t.types) {
    if (ids.has(ty2.id)) dupIds.push(ty2.id);
    ids.add(ty2.id);
  }
  const nEx = t.types.reduce((s, x) => s + (x.worked?.length || 0), 0);
  const flags = [];
  if (t.decode.length < 6) flags.push(`\u0111\u1ECDc v\u1ECB ${t.decode.length}`);
  if (nEx < 4) flags.push(`v\xED d\u1EE5 ${nEx}`);
  if (!t.practiceSkills?.length) flags.push("CH\u01AFA c\xF3 b\u1ED9 k\u1EF9 n\u0103ng");
  if (flags.length) thin.push(`  ${t.id.padEnd(6)} ${flags.join(" \xB7 ")}`);
}
var blob = JSON.stringify(ALL_TOPICS);
var odd = (blob.match(/\$/g) || []).length % 2;
console.log("CHUY\xCAN \u0110\u1EC0:", ALL_TOPICS.length, "| l\xFD thuy\u1EBFt:", th, "| \u0111\u1ECDc v\u1ECB:", dr, "| d\u1EA1ng b\xE0i:", ty, "| v\xED d\u1EE5 m\u1EABu:", ex, "| l\u1ED7i sai:", pit, "| b\u1ED9 k\u1EF9 n\u0103ng:", sk, "| th\u1EBB CT:", FORMULAS2.length);
console.log("m\xE3 d\u1EA1ng b\xE0i tr\xF9ng:", dupIds.length ? dupIds.join(", ") : "kh\xF4ng c\xF3");
console.log("l\u1ED7i gi\xE1 tr\u1ECB:", /undefined|NaN/.test(blob) ? "C\xD3" : "kh\xF4ng");
console.log(thin.length ? "C\xD2N M\u1ECENG:\n" + thin.join("\n") : "M\u1ECCI CHUY\xCAN \u0110\u1EC0 \u0110\u1EC0U \u0110\u1EA0T CHU\u1EA8N (\u0111\u1ECDc v\u1ECB >=6, v\xED d\u1EE5 >=4, c\xF3 b\u1ED9 k\u1EF9 n\u0103ng)");
