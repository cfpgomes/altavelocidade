// --- Helper Functions ---
export const date = (m, y) => y + ((m - 1) / 12);

// Helper function to convert decimal year to formatted date
export const formatDecimalDate = (decimalYear) => {
    const year = Math.floor(decimalYear);
    const month = Math.round((decimalYear - year) * 12);
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const monthNamesEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
        pt: `${monthNames[month]} ${year}`,
        en: `${monthNamesEN[month]} ${year}`
    };
};

export const dateRange = (a1, a2, b1, b2) => {
    if (b1 !== undefined && b2 !== undefined) {
        return {
            start: a2 + ((a1 - 1) / 12),
            end: b2 + (b1 / 12),
            startLabelEN: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][a1 - 1]} ${a2}`,
            endLabelEN: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][b1 - 1]} ${b2}`,
            startLabelPT: `${['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][a1 - 1]} ${a2}`,
            endLabelPT: `${['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][b1 - 1]} ${b2}`
        };
    } else {
        return {
            start: a1,
            end: a2 + 1,
            startLabelEN: `${a1}`,
            endLabelEN: `${a2}`,
            startLabelPT: `${a1}`,
            endLabelPT: `${a2}`
        };
    }
};



// --- Configuration ---
export const STATUS_CONFIG = {
    s1: {
        ui: 'bg-slate-100 text-slate-700 border-slate-200',
        hex: '#64748b',
        label: { pt: "Estudo Prévio", en: "Preliminary Study" }
    },
    s2: {
        ui: 'bg-sky-100 text-sky-700 border-sky-200',
        hex: '#0ea5e9',
        label: { pt: "Declaração de Impacte Ambiental", en: "Environmental Impact Statement" }
    },
    s3: {
        ui: 'bg-pink-100 text-pink-700 border-pink-200',
        hex: '#ec4899',
        label: { pt: "Concurso Público", en: "Public Tender" }
    },
    s4: {
        ui: 'bg-purple-100 text-purple-700 border-purple-200',
        hex: '#a855f7',
        label: { pt: "Propostas em Avaliação", en: "Proposal Evaluation" }
    },
    s5: {
        ui: 'bg-red-100 text-red-700 border-red-200',
        hex: '#ef4444',
        label: { pt: "Contrato / RECAPE", en: "Contract / RECAPE" }
    },
    s6: {
        ui: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        hex: '#eab308',
        label: { pt: "Obras em Curso", en: "Construction" }
    },
    s7: {
        ui: 'bg-green-100 text-green-700 border-green-200',
        hex: '#22c55e',
        label: { pt: "Concluído", en: "Finished" }
    },
};

export const CONTENT = {
    title: {
        pt: "LAV Porto-Lisboa",
        en: "LAV Porto-Lisboa"
    },
    subtitle: {
        pt: "Monitorização do progresso da nova Linha de Alta Velocidade Porto-Lisboa",
        en: "New Porto-Lisbon High Speed Line progress tracker"
    },
    legendTitle: {
        pt: "Legenda de Estado",
        en: "Status Legend"
    },
    gantt: {
        initial: {
            pt: "Calendário Planeado para Adjudicação e Obras (2025)",
            en: "Planned Schedule for Award & Construction (2025)"
        },
        actual: {
            pt: "Calendário Atual",
            en: "Current Schedule"
        },
        today: {
            pt: "Hoje",
            en: "Today"
        }
    },
    sections: [
        {
            id: 'ppp1',
            title: { pt: "PPP1: Porto - Oiã", en: "PPP1: Porto - Oiã" },
            statusKey: 's5',
            description: {
                pt: "O troço Campanhã-Oiã foi adjudicado à AVAN Norte em Julho de 2025. O RECAPE, submetido em Outubro, propunha alterar a estação subterrânea de Santo Ovídio para Vilar do Paraíso, à superfície, sendo chumbado pela APA por violar o Estudo Prévio. Atualmente (Jan 2026), o consórcio prepara um novo Projeto de Execução e respetivo RECAPE que se aproximam do Estudo Prévio.",
                en: "The section Campanhã-Oiã was awarded to AVAN Norte in July 2025. The RECAPE, submitted in October, proposed to change the underground station from Santo Ovídio to Vilar do Paraíso, at surface level, which was rejected by the APA for violating the Preliminary Study. Currently (Jan 2026), the consortium is preparing a new Execution Project and respective RECAPE that align with the Preliminary Study."
            },
            details: [
                { label: { pt: "Extensão", en: "Length" }, value: "72 km" },
                { label: { pt: "Valor da Adjudicação", en: "Award Value" }, value: "~1.6MM €" },
                { label: { pt: "Concessionária", en: "Concessionaire" }, value: "AVAN Norte" }
            ],
            gantt: {
                initial: { range: dateRange(2025, 2030) },
                actual: [
                    { start: date(7, 2021), end: date(3, 2023), statusKey: 's1', source: "https://siaia.apambiente.pt/AIADOC/AIA3610/pf102a_amb.ep.10.10.01.rnt.02202382892115.pdf", tooltip: "Estudo Prévio e Estudo de Impacte Ambiental" },
                    { start: date(3, 2023), end: date(8, 2023), statusKey: 's2', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade/impacte-ambiental", tooltip: "Declaração de Impacte Ambiental (DIA) Aprovada" },
                    { start: date(1, 2024), end: date(7, 2024), statusKey: 's3', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: "Lançamento do Concurso Público Internacional" },
                    { start: date(7, 2024), end: date(12, 2024), statusKey: 's4', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: "Propostas em Avaliação" },
                    { start: date(7, 2025), end: date(10, 2025), statusKey: 's5', source: "https://www.infraestruturasdeportugal.pt/pt-pt/adjudicacao-da-concessao-da-linha-ferroviaria-de-alta-velocidade-entre-porto-campanha-e-oia", tooltip: "Assinatura do Contrato e RECAPE em preparação" },
                    { start: date(12, 2025), end: date(3, 2026), statusKey: 's5', source: "https://eco.sapo.pt/2026/01/21/consorcio-da-mota-engil-vai-entregar-novo-projeto-para-tgv-em-gaia/", tooltip: "Novo RECAPE em preparação" },
                    { start: date(6, 2026), end: date(7, 2030), statusKey: 's6', source: "#", tooltip: "Fase de Construção (Previsão)" },
                    { start: date(7, 2030), end: date(12, 2030), statusKey: 's7', source: "#", tooltip: "Entrada em Serviço (Previsão)" }
                ]
            },
            timeline: [
                { date: date(9, 2022), label: { pt: "Apresentação da Nova Linha de Alta Velocidade Porto - Lisboa", en: "Presentation of the New Porto - Lisbon High-Speed Line" }, link: "https://www.infraestruturasdeportugal.pt/pt-pt/apresentacao-da-nova-linha-de-alta-velocidade-porto-lisboa" },
                { date: date(10, 2024), label: { pt: "Adjudicação do Troço Campanhã - Oiã à AVAN Norte", en: "Awarding of the Campanhã - Oiã Section to AVAN Norte" }, link: "https://www.infraestruturasdeportugal.pt/pt-pt/adjudicacao-da-concessao-da-linha-ferroviaria-de-alta-velocidade-entre-porto-campanha-e-oia" },
                {date: date(7, 2025), label: { pt: "Assinada concessão e apresentado financiamento do PPP1", en: "Contract signed and financing presented for PPP1" }, link: "https://www.infraestruturasdeportugal.pt/pt-pt/alta-velocidade-lisboa-porto-assinada-concessao-e-apresentado-financiamento-do-primeiro-troco" },
                {date: date(10, 2025), label: { pt: "Consulta Pública do RECAPE para o troço Porto - Oiã", en: "Public Consultation on the RECAPE for the Porto - Oiã section" }, link: "https://participa.pt/pt/consulta/recape-linha-ferroviaria-de-alta-velocidade-entre-porto-e-lisboa-troco-porto-campanha-a-oia" },
                { date: date(11, 2025), label: { pt: "Síntese das mudanças polémicas propostas pela AVAN Norte, incluindo a deslocação da estação de Santo Ovídio para Vilar do Paraíso", en: "Summary of controversial changes proposed by AVAN Norte, including the relocation of Santo Ovídio station to Vilar do Paraíso" }, link: "https://www.jn.pt/pais/artigo/as-tres-principais-mudancas-ao-projeto-do-tgv-no-porto-e-em-gaia/18015424" },
                { date: date(11, 2025), label: { pt: "Consulta pública ao RECAPE do troço Porto - Oiã com 259 participações", en: "Public consultation on the RECAPE for the Porto - Oiã section with 259 participations" }, link: "https://www.jornaldenegocios.pt/empresas/detalhe/consulta-publica-ao-relatorio-do-troco-porto-oia-da-linha-de-tgv-com-259-participacoes" },
                { date: date(12, 2025), label: { pt: "Agência Portuguesa do Ambiente chumba alterações que a AVAN Norte queria fazer em Gaia e no Porto", en: "Portuguese Environment Agency rejects changes that AVAN Norte wanted to make in Gaia and Porto" }, link: "https://www.jornaldenegocios.pt/empresas/transportes/detalhe/20251222-140409-apa-chumba-alteracoes-que-o-consorcio-do-tgv-queria-fazer-em-gaia-e-no-porto" },
                { date: date(1, 2026), label: { pt: "AVAN Norte prepara novo RECAPE e Projeto de Execução para o troço Porto - Oiã", en: "AVAN Norte prepares new RECAPE and Execution Project for the Porto - Oiã section" }, link: "https://eco.sapo.pt/2026/01/21/consorcio-da-mota-engil-vai-entregar-novo-projeto-para-tgv-em-gaia/" }
            ]
        },
        {
            id: 'ppp2',
            title: { pt: "PPP2: Oiã - Soure", en: "PPP2: Oiã - Soure" },
            statusKey: 's3',
            description: {
                pt: "O primeiro concurso para o troço Oiã-Soure ficou deserto em 2024, devido à exclusão da única proposta apresentada, pela AVAN Norte, que deslocava a estação de AV para fora da cidade de Coimbra. O concurso foi relançado em janeiro de 2026, com um caderno de encargos simplificado, com menos 11km e menos responsabilidades de manutenção. Prevê-se a adjudicação para o final de 2026.",
                en: "The first tender for the Oiã-Soure section was unsuccessful in 2024 after rejecting the only proposal, from AVAN Norte, which relocated the high-speed station outside Coimbra. The tender was relaunched in January 2026 with simplified terms, 11km shorter and reduced maintenance responsibilities. Contract award is expected by end of 2026."
            },
            details: [
                { label: { pt: "Extensão", en: "Length" }, value: "61 km" },
                { label: { pt: "Investimento", en: "Award Value" }, value: "~1.6MM €" },
                { label: { pt: "Concessionária", en: "Concessionaire" }, value: "N/A" }
            ],
            gantt: {
                initial: { range: dateRange(2027, 2032) },
                actual: [
                    { start: date(7, 2021), end: date(6, 2023), statusKey: 's1', source: "https://siaia.apambiente.pt/AIADOC/AIA3624/pf102b_amb.ep.10.01.01-rnt-v0120231117103128.pdf", tooltip: "Estudo Prévio e Estudo de Impacte Ambiental" },
                    { start: date(6, 2023), end: date(11, 2023), statusKey: 's2', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade/impacte-ambiental", tooltip: "Declaração de Impacte Ambiental (DIA) Aprovada" },
                    { start: date(7, 2024), end: date(12, 2024), statusKey: 's3', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: "Lançamento do Concurso Público Internacional" },
                    { start: date(1, 2025), end: date(3, 2025), statusKey: 's4', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: "Exclusão da Única Proposta Apresentada" },
                    { start: date(1, 2026), end: date(5, 2026), statusKey: 's3', source: "https://diariodarepublica.pt/dr/detalhe/anuncio-procedimento/1551-2026-1023994487", tooltip: "Relançamento do Concurso Público Internacional" },
                    { start: date(5, 2026), end: date(10, 2026), statusKey: 's4', source: "#", tooltip: "Propostas em Avaliação (Previsão)" },
                    { start: date(10, 2026), end: date(12, 2026), statusKey: 's5', source: "#", tooltip: "Assinatura do Contrato (Previsão)" },
                    { start: date(1, 2027), end: date(1, 2031), statusKey: 's6', source: "#", tooltip: "Fase de Construção (Previsão)" },
                    { start: date(2, 2031), end: date(7, 2031), statusKey: 's7', source: "#", tooltip: "Entrada em Serviço (Previsão)" }
                ]
            },
            timeline: [
                { date: date(9, 2022), label: { pt: "Apresentação da Nova Linha de Alta Velocidade Porto - Lisboa", en: "Presentation of the New Porto - Lisbon High-Speed Line" }, link: "https://www.infraestruturasdeportugal.pt/pt-pt/apresentacao-da-nova-linha-de-alta-velocidade-porto-lisboa" },
                { date: date(7, 2024), label: { pt: "Lançamento do Concurso Público Internacional para o Troço Oiã - Soure", en: "Launch of the International Public Tender for the Oiã - Soure Section" }, link: "https://www.infraestruturasdeportugal.pt/pt-pt/lancamento-do-concurso-publico-para-concessao-da-linha-ferroviaria-de-alta-velocidade-entre-oia-e" },
                { date: date(12, 2024), label: { pt: "Câmara de Coimbra quer exclusão da única proposta, por considerar inaceitável a deslocação da estação LAV de Coimbra-B para Taveiro", en: "The municipality of Coimbra wants exclusion of the only proposal, considering the relocation of the LAV station from Coimbra-B to Taveiro unacceptable" }, link: "https://observador.pt/2025/02/17/camara-de-coimbra-quer-exclusao-de-proposta-de-alta-velocidade-e-novo-concurso/" },
                { date: date(2, 2025), label: { pt: "Única proposta para o troço Oiã - Soure é excluída por não cumprir o caderno de encargos", en: "Only proposal for the Oiã - Soure section is excluded for not meeting the tender specifications" }, link: "https://www.jornaldenegocios.pt/empresas/transportes/detalhe/consorcio-da-mota-engil-excluido-do-concurso-para-o-segundo-troco-da-alta-velocidade" },
                { date: date(4, 2025), label: { pt: "Novo concurso mantém a estação em Coimbra-B, reduz o troço em 11km, e reduz também outros encargos", en: "New tender maintains the station at Coimbra-B, shortens the section by 11km, and also reduces other responsibilities" }, link: "https://observador.pt/2025/04/23/novo-concurso-da-ppp2-do-tgv-mantem-estacao-em-coimbra-b-mas-reduz-encargos/" },
                { date: date(1, 2026), label: { pt: "Relançamento do Concurso Público Internacional para o Troço Oiã - Soure", en: "Relaunch of the International Public Tender for the Oiã - Soure Section" }, link: "https://observador.pt/2026/01/22/alta-velocidade-entra-numa-nova-etapa-concreta-diz-infraestruturas-de-portugal/" }
            ]
        },
        {
            id: 'ppp3',
            title: { pt: "PPP3: Soure - Carregado", en: "PPP3: Soure - Carregado" },
            statusKey: 's2',
            description: {
                pt: "A Declaração de Impacte Ambiental (DIA) para o troço Soure-Carregado já foi emitida, estando agora a aguardar o lançamento do seu concurso, que se preverá ser em meados de 2026.",
                en: "The Environmental Impact Declaration (EID) for the Soure-Carregado section has been issued and is awaiting tender launch, expected mid-2026."
            },
            details: [
                { label: { pt: "Extensão", en: "Length" }, value: "~132 km" },
                { label: { pt: "Investimento", en: "Investment" }, value: "N/A" },
                { label: { pt: "Concessionária", en: "Concessionaire" }, value: "N/A" }
            ],
            gantt: {
                initial: { range: dateRange(2027, 2032) },
                actual: [
                    { start: date(8, 2022), end: date(1, 2025), statusKey: 's1', source: "https://participa.pt/pt/consulta/linha-ferroviaria-de-alta-velocidade-entre-porto-e-lisboa--a-linha-ferroviaria-de-alta-velocidade", tooltip: "Estudo Prévio e Estudo de Impacte Ambiental" },
                    { start: date(2, 2025), end: date(7, 2025), statusKey: 's2', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade/impacte-ambiental", tooltip: "Declaração de Impacte Ambiental (DIA) Aprovada" },
                    { start: date(7, 2026), end: date(12, 2026), statusKey: 's3', source: "#", tooltip: "Lançamento do Concurso Público Internacional (Previsão)" },
                    { start: date(1, 2027), end: date(5, 2027), statusKey: 's4', source: "#", tooltip: "Propostas em Avaliação (Previsão)" },
                    { start: date(9, 2027), end: date(2, 2028), statusKey: 's5', source: "#", tooltip: "Assinatura do Contrato (Previsão)" },
                    { start: date(6, 2028), end: date(6, 2032), statusKey: 's6', source: "#", tooltip: "Fase de Construção (Previsão)" },
                    { start: date(7, 2032), end: date(12, 2032), statusKey: 's7', source: "#", tooltip: "Entrada em Serviço (Previsão)" }
                ]
            },
            timeline: [
                { date: date(9, 2022), label: { pt: "Apresentação da Nova Linha de Alta Velocidade Porto - Lisboa", en: "Presentation of the New Porto - Lisbon High-Speed Line" }, link: "https://www.infraestruturasdeportugal.pt/pt-pt/apresentacao-da-nova-linha-de-alta-velocidade-porto-lisboa" },
                { date: date(7, 2025), label: { pt: "Agência Portuguesa do Ambiente dá parecer favorável condicionado ao troço Soure - Carregado da alta velocidade", en: "Portuguese Environment Agency gives conditional favorable opinion on the Soure - Carregado high-speed section" }, link: "https://observador.pt/2025/07/03/agencia-portuguesa-do-ambiente-da-parecer-favoravel-condicionado-ao-troco-soure-carregado-da-alta-velocidade/" }
            ]
        },
        {
            id: 'comboios',
            title: { pt: "Comboios de Portugal: Material Circulante", en: "Comboios de Portugal: Rolling Stock" },
            statusKey: 's3',
            description: {
                pt: "A Comboios de Portugal vai adquirir 12 unidades de comboios de Alta Velocidade para operar na nova linha, com mais 8 unidades como opção. Já foi autorizada a despesa para esta aquisição.",
                en: "Comboios de Portugal will acquire 12 high-speed train units to operate on the new line, with an additional 8 units as an option. The expenditure for this acquisition has already been authorized."
            },
            details: [
                { label: { pt: "Quantidade", en: "Quantity" }, value: "12 Unidades (+8 Opção)" },
                { label: { pt: "Investimento", en: "Investment" }, value: "~584M€" },
                { label: { pt: "Velocidade Máxima", en: "Maximum Speed" }, value: "300 km/h" }
            ],
            gantt: {
                initial: { range: dateRange(2026, 2030) },
                actual: [
                    { start: date(1, 2026), end: date(6, 2026), statusKey: 's3', source: "https://eco.sapo.pt/2026/01/22/cp-vai-ter-ate-20-comboios-para-a-alta-velocidade-investimento-soma-584-milhoes/", tooltip: "Concurso Público CP" },
                    { start: date(7, 2026), end: date(12, 2026), statusKey: 's5', source: "#", tooltip: "Adjudicação / Contrato (Previsão)" },
                    { start: date(1, 2027), end: date(12, 2030), statusKey: 's6', source: "#", tooltip: "Fabrico e Homologação (Previsão)" },
                    { start: date(1, 2031), end: date(6, 2031), statusKey: 's7', source: "#", tooltip: "Entrada em Serviço (Previsão)" }
                ]
            },
            timeline: [
                { date: date(1, 2026), label: { pt: "CP – Comboios de Portugal foi autorizada a comprar até 20 automotoras para a LAV, num investimento de 584 milhões de euros", en: "CP – Comboios de Portugal was authorized to purchase up to 20 train units for the LAV, with an investment of 584 million euros" }, link: "https://www.portugal.gov.pt/pt/gc25/comunicacao/noticia?i=alta-velocidade-governo-avanca-com-compra-de-20-comboios-e-lanca-concurso-para-troco-oia-soure" }
            ]
        }
    ]
};

// Derive language-specific, non-duplicated content at usage time
export const getContentByLang = (lang = 'pt') => {
    const l = lang === 'en' ? 'en' : 'pt';
    return {
        title: CONTENT.title[l],
        subtitle: CONTENT.subtitle[l],
        legendTitle: CONTENT.legendTitle[l],
        gantt: {
            initial: CONTENT.gantt.initial[l],
            actual: CONTENT.gantt.actual[l],
            today: CONTENT.gantt.today[l]
        },
        sections: CONTENT.sections.map(section => ({
            ...section,
            title: section.title[l],
            description: section.description[l],
            details: section.details.map(d => ({ ...d, label: d.label[l] })),
            // timeline keeps bilingual labels; consumers can use label[lang]
        }))
    };
};