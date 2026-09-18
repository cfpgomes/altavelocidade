// --- Chart Constants ---
export const CHART_START = 2021;
export const CHART_END = 2035;

// --- Helper Functions ---
export const date = (m, y) => y + ((m - 1) / 12);

// Helper function to convert decimal year to formatted date
export const formatDecimalDate = (decimalYear, isEndDate = false) => {
    // For end dates, we need to go back slightly to get the correct month
    // e.g., 2025.0 (end of Dec 2024) should show as "Dec 2024", not "Jan 2025"
    const adjustedYear = isEndDate ? decimalYear - 0.001 : decimalYear;
    const year = Math.floor(adjustedYear);
    let month = Math.round((adjustedYear - year) * 12);
    // Handle edge case where month rounds to 12 (should be 11 for December)
    if (month > 11) month = 11;
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
        pt: "Linhas de Alta Velocidade de Portugal",
        en: "High Speed Rail Lines of Portugal"
    },
    subtitle: {
        pt: "Monitorização do progresso das novas Linhas de Alta Velocidade",
        en: "Monitoring the progress of new High-Speed Lines"
    },
    legendTitle: {
        pt: "Legenda de Estado",
        en: "Status Legend"
    },
    gantt: {
        initial: {
            pt: "Calendário Originalmente Planeado para Adjudicação e Obras (2025)",
            en: "Originally Planned Schedule for Award & Construction (2025)"
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
            statusKey: 's6',
            description: {
                pt: "O troço Campanhã-Oiã foi adjudicado à AVAN Norte em Julho de 2025. O RECAPE, submetido em Outubro, propunha alterar a estação subterrânea de Santo Ovídio para Vilar do Paraíso, à superfície, sendo chumbado pela APA por violar o Estudo Prévio. Entretanto, o consórcio entregou um novo RECAPE que respeita o Estudo Prévio e que já foi aprovado. As obras começaram em Setembro de 2026.",
                en: "The section Campanhã-Oiã was awarded to AVAN Norte in July 2025. The RECAPE, submitted in October, proposed to change the underground station from Santo Ovídio to Vilar do Paraíso, at surface level, which was rejected by the APA for violating the Preliminary Study. Meanwhile, the consortium submitted a new RECAPE that respects the Preliminary Study and has already been approved. Construction began in September 2026."
            },
            details: [
                { label: { pt: "Extensão", en: "Length" }, value: "72 km" },
                { label: { pt: "Valor da Adjudicação", en: "Award Value" }, value: "~1.6MM €" },
                { label: { pt: "Concessionária", en: "Concessionaire" }, value: "AVAN Norte" }
            ],
            gantt: {
                initial: { range: dateRange(2025, 2030) },
                actual: [
                    { range: dateRange(7, 2021, 3, 2023), statusKey: 's1', source: "https://siaia.apambiente.pt/AIADOC/AIA3610/pf102a_amb.ep.10.10.01.rnt.02202382892115.pdf", tooltip: { pt: "Estudo Prévio e Estudo de Impacte Ambiental", en: "Preliminary Study and Environmental Impact Assessment" } },
                    { range: dateRange(3, 2023, 8, 2023), statusKey: 's2', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade/impacte-ambiental", tooltip: { pt: "Declaração de Impacte Ambiental (DIA) Aprovada", en: "Environmental Impact Statement (EIS) Approved" } },
                    { range: dateRange(1, 2024, 7, 2024), statusKey: 's3', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: { pt: "Lançamento do Concurso Público Internacional", en: "International Public Tender Launch" } },
                    { range: dateRange(7, 2024, 12, 2024), statusKey: 's4', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: { pt: "Propostas em Avaliação", en: "Proposals Under Evaluation" } },
                    { range: dateRange(7, 2025, 10, 2025), statusKey: 's5', source: "https://www.infraestruturasdeportugal.pt/pt-pt/adjudicacao-da-concessao-da-linha-ferroviaria-de-alta-velocidade-entre-porto-campanha-e-oia", tooltip: { pt: "Assinatura do Contrato e RECAPE em preparação", en: "Contract Signature and RECAPE in Preparation" } },
                    { range: dateRange(12, 2025, 8, 2026), statusKey: 's5', source: "https://eco.sapo.pt/2026/01/21/consorcio-da-mota-engil-vai-entregar-novo-projeto-para-tgv-em-gaia/", tooltip: { pt: "Novo RECAPE em preparação", en: "New RECAPE in Preparation" } },
                    { range: dateRange(9, 2026, 7, 2030), statusKey: 's6', source: "#", tooltip: { pt: "Fase de Construção (Previsão)", en: "Construction Phase (Forecast)" } },
                    { range: dateRange(7, 2030, 12, 2030), statusKey: 's7', source: "#", tooltip: { pt: "Entrada em Serviço (Previsão)", en: "Service Entry (Forecast)" } }
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
                { date: date(1, 2026), label: { pt: "AVAN Norte prepara novo RECAPE e Projeto de Execução para o troço Porto - Oiã", en: "AVAN Norte prepares new RECAPE and Execution Project for the Porto - Oiã section" }, link: "https://eco.sapo.pt/2026/01/21/consorcio-da-mota-engil-vai-entregar-novo-projeto-para-tgv-em-gaia/" },
                { date: date(6, 2026), label: { pt: "Consulta pública ao RECAPE do troço Porto - Oiã", en: "Public consultation on the RECAPE for the Porto - Oiã section" }, link: "https://participa.pt/pt/consulta/recape-linha-ferroviaria-de-alta-velocidade-troco-porto-campanha-a-oia-subtroco-4-e-subtroco-5" },
                { date: date(8, 2026), label: { pt: "RECAPE do troço Porto - Oiã aprovado pela APA", en: "RECAPE for the Porto - Oiã section approved by APA" }, link: "https://expresso.pt/economia/transportes/2026-08-11-construcao-da-alta-velocidade-porto-lisboa-pode-finalmente-avancar-apa-deu-luz-verde-ao-primeiro-troco-240413b8" },
                { date: date(9, 2026), label: { pt: "Início das obras do troço Porto - Oiã, a começar em Oiã", en: "Start of construction for the Porto - Oiã section, starting in Oiã" }, link: "https://observador.pt/2026/09/15/trabalhos-preparatorios-da-linha-de-alta-velocidade-porto-oia-arrancam-este-mes/" }
            ]
        },
        {
            id: 'ppp2',
            title: { pt: "PPP2: Oiã - Soure", en: "PPP2: Oiã - Soure" },
            statusKey: 's4',
            description: {
                pt: "O primeiro concurso para o troço Oiã-Soure ficou deserto em 2024, devido à exclusão da única proposta apresentada, pela AVAN Norte, que deslocava a estação de AV para fora da cidade de Coimbra. O concurso foi relançado em janeiro de 2026, com um caderno de encargos simplificado, com menos 11km e menos responsabilidades de manutenção. Este novo concurso recebeu duas propostas. Prevê-se a adjudicação para o final de 2026.",
                en: "The first tender for the Oiã-Soure section was unsuccessful in 2024 after rejecting the only proposal, from AVAN Norte, which relocated the high-speed station outside Coimbra. The tender was relaunched in January 2026 with simplified requirements, 11km shorter and reduced maintenance responsibilities. This new tender received two proposals. Contract award is expected by end of 2026."
            },
            details: [
                { label: { pt: "Extensão", en: "Length" }, value: "61 km" },
                { label: { pt: "Valor da Adjudicação", en: "Award Value" }, value: "~1.6MM €" },
                { label: { pt: "Concessionária", en: "Concessionaire" }, value: "N/A" }
            ],
            gantt: {
                initial: { range: dateRange(2027, 2032) },
                actual: [
                    { range: dateRange(7, 2021, 6, 2023), statusKey: 's1', source: "https://siaia.apambiente.pt/AIADOC/AIA3624/pf102b_amb.ep.10.01.01-rnt-v0120231117103128.pdf", tooltip: { pt: "Estudo Prévio e Estudo de Impacte Ambiental", en: "Preliminary Study and Environmental Impact Assessment" } },
                    { range: dateRange(6, 2023, 11, 2023), statusKey: 's2', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade/impacte-ambiental", tooltip: { pt: "Declaração de Impacte Ambiental (DIA) Aprovada", en: "Environmental Impact Statement (EIS) Approved" } },
                    { range: dateRange(7, 2024, 12, 2024), statusKey: 's3', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: { pt: "Lançamento do Concurso Público Internacional", en: "International Public Tender Launch" } },
                    { range: dateRange(1, 2025, 3, 2025), statusKey: 's4', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: { pt: "Exclusão da Única Proposta Apresentada", en: "Exclusion of the Only Proposal Submitted" } },
                    { range: dateRange(1, 2026, 6, 2026), statusKey: 's3', source: "https://diariodarepublica.pt/dr/detalhe/anuncio-procedimento/1551-2026-1023994487", tooltip: { pt: "Relançamento do Concurso Público Internacional", en: "Relaunch of International Public Tender" } },
                    { range: dateRange(7, 2026, 9, 2026), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação", en: "Proposals Under Evaluation" } },
                    { range: dateRange(11, 2026, 12, 2026), statusKey: 's5', source: "#", tooltip: { pt: "Assinatura do Contrato (Previsão)", en: "Contract Signature (Forecast)" } },
                    { range: dateRange(1, 2027, 1, 2031), statusKey: 's6', source: "#", tooltip: { pt: "Fase de Construção (Previsão)", en: "Construction Phase (Forecast)" } },
                    { range: dateRange(2, 2031, 7, 2031), statusKey: 's7', source: "#", tooltip: { pt: "Entrada em Serviço (Previsão)", en: "Service Entry (Forecast)" } }
                ]
            },
            timeline: [
                { date: date(9, 2022), label: { pt: "Apresentação da Nova Linha de Alta Velocidade Porto - Lisboa", en: "Presentation of the New Porto - Lisbon High-Speed Line" }, link: "https://www.infraestruturasdeportugal.pt/pt-pt/apresentacao-da-nova-linha-de-alta-velocidade-porto-lisboa" },
                { date: date(7, 2024), label: { pt: "Lançamento do Concurso Público Internacional para o Troço Oiã - Soure", en: "Launch of the International Public Tender for the Oiã - Soure Section" }, link: "https://www.infraestruturasdeportugal.pt/pt-pt/lancamento-do-concurso-publico-para-concessao-da-linha-ferroviaria-de-alta-velocidade-entre-oia-e" },
                { date: date(12, 2024), label: { pt: "Câmara de Coimbra quer exclusão da única proposta, por considerar inaceitável a deslocação da estação LAV de Coimbra-B para Taveiro", en: "The municipality of Coimbra wants exclusion of the only proposal, considering the relocation of the LAV station from Coimbra-B to Taveiro unacceptable" }, link: "https://observador.pt/2025/02/17/camara-de-coimbra-quer-exclusao-de-proposta-de-alta-velocidade-e-novo-concurso/" },
                { date: date(2, 2025), label: { pt: "Única proposta para o troço Oiã - Soure é excluída por não cumprir o caderno de encargos", en: "Only proposal for the Oiã - Soure section is excluded for not meeting the tender specifications" }, link: "https://www.jornaldenegocios.pt/empresas/transportes/detalhe/consorcio-da-mota-engil-excluido-do-concurso-para-o-segundo-troco-da-alta-velocidade" },
                { date: date(4, 2025), label: { pt: "Novo concurso mantém a estação em Coimbra-B, reduz o troço em 11km, e reduz também outros encargos", en: "New tender maintains the station at Coimbra-B, shortens the section by 11km, and also reduces other responsibilities" }, link: "https://observador.pt/2025/04/23/novo-concurso-da-ppp2-do-tgv-mantem-estacao-em-coimbra-b-mas-reduz-encargos/" },
                { date: date(1, 2026), label: { pt: "Relançamento do Concurso Público Internacional para o Troço Oiã - Soure", en: "Relaunch of the International Public Tender for the Oiã - Soure Section" }, link: "https://observador.pt/2026/01/22/alta-velocidade-entra-numa-nova-etapa-concreta-diz-infraestruturas-de-portugal/" },
                { date: date(7, 2026), label: { pt: "Duas propostas recebidas para o concurso do troço Oiã - Soure", en: "Two proposals received for the tender for the Oiã - Soure section" }, link: "https://eco.sapo.pt/2026/07/06/consorcios-da-mota-e-dst-disputam-segunda-ppp-da-alta-velocidade/" },
                { date: date(9, 2026), label: { pt: "Júri exclui a proposta da Lusolav e recomenda a adjudicação ao consórcio da Sacyr, DST, e Alberto Couto.", en: "The jury excludes the proposal from Lusolav and recommends awarding the contract to the consortium of Sacyr, DST, and Alberto Couto." }, link: "https://www.jornaldenegocios.pt/empresas/transportes/detalhe/sacyr-dst-e-aca-em-vias-de-ganhar-troco-oia-soure-juri-recomenda-exclusao-do-lusolav" }
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
                { label: { pt: "Valor da Adjudicação", en: "Award Value" }, value: "N/A" },
                { label: { pt: "Concessionária", en: "Concessionaire" }, value: "N/A" }
            ],
            gantt: {
                initial: { range: dateRange(2027, 2032) },
                actual: [
                    { range: dateRange(8, 2022, 1, 2025), statusKey: 's1', source: "https://participa.pt/pt/consulta/linha-ferroviaria-de-alta-velocidade-entre-porto-e-lisboa--a-linha-ferroviaria-de-alta-velocidade", tooltip: { pt: "Estudo Prévio e Estudo de Impacte Ambiental", en: "Preliminary Study and Environmental Impact Assessment" } },
                    { range: dateRange(2, 2025, 7, 2025), statusKey: 's2', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade/impacte-ambiental", tooltip: { pt: "Declaração de Impacte Ambiental (DIA) Aprovada", en: "Environmental Impact Statement (EIS) Approved" } },
                    { range: dateRange(7, 2026, 12, 2026), statusKey: 's3', source: "#", tooltip: { pt: "Lançamento do Concurso Público Internacional (Previsão)", en: "International Public Tender Launch (Forecast)" } },
                    { range: dateRange(1, 2027, 5, 2027), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação (Previsão)", en: "Proposals Under Evaluation (Forecast)" } },
                    { range: dateRange(9, 2027, 2, 2028), statusKey: 's5', source: "#", tooltip: { pt: "Assinatura do Contrato (Previsão)", en: "Contract Signature (Forecast)" } },
                    { range: dateRange(6, 2028, 6, 2032), statusKey: 's6', source: "#", tooltip: { pt: "Fase de Construção (Previsão)", en: "Construction Phase (Forecast)" } },
                    { range: dateRange(7, 2032, 12, 2032), statusKey: 's7', source: "#", tooltip: { pt: "Entrada em Serviço (Previsão)", en: "Service Entry (Forecast)" } }
                ]
            },
            timeline: [
                { date: date(9, 2022), label: { pt: "Apresentação da Nova Linha de Alta Velocidade Porto - Lisboa", en: "Presentation of the New Porto - Lisbon High-Speed Line" }, link: "https://www.infraestruturasdeportugal.pt/pt-pt/apresentacao-da-nova-linha-de-alta-velocidade-porto-lisboa" },
                { date: date(7, 2025), label: { pt: "Agência Portuguesa do Ambiente dá parecer favorável condicionado ao troço Soure - Carregado da alta velocidade", en: "Portuguese Environment Agency gives conditional favorable opinion on the Soure - Carregado high-speed section" }, link: "https://observador.pt/2025/07/03/agencia-portuguesa-do-ambiente-da-parecer-favoravel-condicionado-ao-troco-soure-carregado-da-alta-velocidade/" }
            ]
        },
        {
            id: 'quadruplicacao-linha-norte',
            title: { pt: "Quadruplicação Linha do Norte: Alverca - Castanheira do Ribatejo", en: "Quadrupling of the Northern Line: Alverca - Castanheira do Ribatejo" },
            statusKey: 's3',
            description: {
                pt: "A quadruplicação da Linha do Norte entre Alverca e Castanheira do Ribatejo permite acomodar o tráfego de e para a LAV Porto-Lisboa. O projeto já recebeu a Declaração de Impacte Ambiental favorável, estando agora a aguardar o lançamento do concurso para as obras.",
                en: "The quadrupling of the Northern Line between Alverca and Castanheira do Ribatejo allows for accommodating traffic to and from the Porto-Lisbon HSR. The project has already received a favorable Environmental Impact Statement and is now awaiting the launch of the construction tender."
            },
            details: [
                { label: { pt: "Extensão", en: "Length" }, value: "12 km" },
                { label: { pt: "Investimento", en: "Investment" }, value: "388 M€" },
                { label: { pt: "Responsável", en: "Responsible Party" }, value: "Infraestruturas de Portugal" }
            ],
            gantt: {
                initial: { range: dateRange(2026, 2032) },
                actual: [
                    { range: dateRange(10, 2024, 12, 2025), statusKey: 's1', source: "https://participa.pt/pt/consulta/modernizacao-do-troco-entre-alverca-e-castanheira-do-ribatejo", tooltip: { pt: "Estudo de Impacte Ambiental", en: "Environmental Impact Assessment" } },
                    { range: dateRange(1, 2026, 5, 2026), statusKey: 's2', source: "https://www.publico.pt/2026/05/22/local/noticia/ambiente-aprova-quadruplicacao-linha-alverca-castanheira-obras-podem-avancar-2175654", tooltip: { pt: "Declaração de Impacte Ambiental", en: "Environmental Impact Statement" } },
                    { range: dateRange(7, 2026, 12, 2026), statusKey: 's3', source: "#", tooltip: { pt: "Concurso Público (Previsão)", en: "Public Tender (Forecast)" } },
                    { range: dateRange(1, 2027, 3, 2027), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação (Previsão)", en: "Proposals Under Evaluation (Forecast)" } },
                    { range: dateRange(4, 2027, 6, 2027), statusKey: 's5', source: "#", tooltip: { pt: "Assinatura do Contrato (Previsão)", en: "Contract Signature (Forecast)" } },
                    { range: dateRange(7, 2027, 12, 2032), statusKey: 's6', source: "#", tooltip: { pt: "Fase de Construção (Previsão)", en: "Construction Phase (Forecast)" } },
                    { range: dateRange(1, 2033, 6, 2033), statusKey: 's7', source: "#", tooltip: { pt: "Entrada em Serviço (Previsão)", en: "Service Entry (Forecast)" } }
                ]
            },
            timeline: [
                { date: date(9, 2022), label: { pt: "Consulta Pública do Estudo de Impacte Ambiental da Modernização do Troço entre Alverca e Castanheira do Ribatejo", en: "Public Consultation of the Environmental Impact Study for the Modernization of the Section between Alverca and Castanheira do Ribatejo" }, link: "https://participa.pt/pt/consulta/modernizacao-do-troco-entre-alverca-e-castanheira-do-ribatejo" },
                {
                    date: date(5, 2026), label: { pt: "Declaração de Impacte Ambiental aprovada para a quadruplicação da Linha do Norte entre Alverca e Castanheira do Ribatejo", en: "Environmental Impact Statement approved for the quadrupling of the Northern Line between Alverca and Castanheira do Ribatejo" }, link: "https://www.publico.pt/2026/05/22/local/noticia/ambiente-aprova-quadruplicacao-linha-alverca-castanheira-obras-podem-avancar-2175654"
                }
            ]
        },
        {
            id: 'sinalizacao-telecomunicacoes',
            title: { pt: "Sinalização e Telecomunicações", en: "Signaling and Telecommunications" },
            statusKey: 's3',
            description: {
                pt: "Em paralelo à construção da LAV Porto - Lisboa, a Infraestruturas de Portugal está encarregue da instalação dos sistemas de sinalização e telecomunicações. A despesa para o concurso referente ao troço Porto - Oiã foi autorizada em janeiro de 2026. O concurso para o troço Oiã - Soure está previsto para meados de 2026.",
                en: "In parallel with the construction of the Porto - Lisbon HSR, Infraestruturas de Portugal is responsible for installing signaling and telecommunications systems. The expenditure for the tender concerning the Porto - Oiã section was authorized in January 2026. The tender for the Oiã - Soure section is expected mid-2026."
            },
            details: [
                { label: { pt: "Extensão", en: "Coverage" }, value: "Corredor Completo" },
                { label: { pt: "Investimento", en: "Investment" }, value: "269M€ + N/A + N/A" },
                { label: { pt: "Responsável", en: "Responsible Party" }, value: "Infraestruturas de Portugal" }
            ],
            gantt: {
                initial: { range: dateRange(2026, 2032) },
                actualRows: [
                    {
                        label: { pt: "Porto - Oiã", en: "Porto - Oiã" },
                        segments: [
                            { range: dateRange(1, 2026, 6, 2026), statusKey: 's3', source: "#", tooltip: { pt: "Concurso Público Porto-Oiã", en: "Public Tender Porto-Oiã" } },
                            { range: dateRange(7, 2026, 9, 2026), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação Porto-Oiã (Previsão)", en: "Proposals Under Evaluation Porto-Oiã (Forecast)" } },
                            { range: dateRange(10, 2026, 12, 2026), statusKey: 's5', source: "#", tooltip: { pt: "Adjudicação / Contrato Porto-Oiã (Previsão)", en: "Adjudication / Contract Porto-Oiã (Forecast)" } },
                            { range: dateRange(1, 2027, 12, 2031), statusKey: 's6', source: "#", tooltip: { pt: "Construção Porto-Oiã (Previsão)", en: "Construction Porto-Oiã (Forecast)" } }
                        ]
                    },
                    {
                        label: { pt: "Oiã - Soure", en: "Oiã - Soure" },
                        segments: [
                            { range: dateRange(1, 2027, 6, 2027), statusKey: 's3', source: "#", tooltip: { pt: "Concurso Público Oiã-Soure (Previsão)", en: "Public Tender Oiã-Soure (Forecast)" } },
                            { range: dateRange(7, 2027, 9, 2027), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação Oiã-Soure (Previsão)", en: "Proposals Under Evaluation Oiã-Soure (Forecast)" } },
                            { range: dateRange(10, 2027, 12, 2027), statusKey: 's5', source: "#", tooltip: { pt: "Adjudicação / Contrato Oiã-Soure (Previsão)", en: "Adjudication / Contract Oiã-Soure (Forecast)" } },
                            { range: dateRange(1, 2028, 12, 2032), statusKey: 's6', source: "#", tooltip: { pt: "Construção Oiã-Soure (Previsão)", en: "Construction Oiã-Soure (Forecast)" } }
                        ]
                    },
                    {
                        label: { pt: "Soure - Carregado", en: "Soure - Carregado" },
                        segments: [
                            { range: dateRange(1, 2027, 6, 2027), statusKey: 's3', source: "#", tooltip: { pt: "Concurso Público Soure-Carregado (Previsão)", en: "Public Tender Soure-Carregado (Forecast)" } },
                            { range: dateRange(7, 2027, 9, 2027), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação Soure-Carregado (Previsão)", en: "Proposals Under Evaluation Soure-Carregado (Forecast)" } },
                            { range: dateRange(10, 2027, 12, 2027), statusKey: 's5', source: "#", tooltip: { pt: "Adjudicação / Contrato Soure-Carregado (Previsão)", en: "Adjudication / Contract Soure-Carregado (Forecast)" } },
                            { range: dateRange(1, 2028, 12, 2032), statusKey: 's6', source: "#", tooltip: { pt: "Construção Soure-Carregado (Previsão)", en: "Construction Soure-Carregado (Forecast)" } }
                        ]
                    }
                ]
            },
            timeline: [
                { date: date(1, 2026), label: { pt: "Autorização de despesa do contrato de conceção-construção-manutenção para os sistemas de sinalização e telecomunicações no troço Porto - Oiã", en: "Authorization of expenditure for the design-construction-maintenance contract for signaling and telecommunications systems on the Porto - Oiã section" }, link: "https://diariodarepublica.pt/dr/detalhe/resolucao-conselho-ministros/9-2026-1014316396" }
            ]
        },
        {
            id: 'comboios',
            title: { pt: "Comboios de Portugal: Material Circulante", en: "Comboios de Portugal: Rolling Stock" },
            statusKey: 's3',
            description: {
                pt: "A Comboios de Portugal lançou um concurso de aquisição para 12 unidades de Comboios de Alta Velocidade para operar na nova linha, com mais 8 unidades como opção. Cada comboio, com 200 metros e mais de 500 lugares, vai custar até 42M€. ",
                en: "Comboios de Portugal has launched a procurement tender for 12 high-speed train units to operate on the new line, with an additional 8 units as an option. Each train, measuring 200 meters and offering over 500 seats, will cost up to 42M€."
            },
            details: [
                { label: { pt: "Quantidade", en: "Quantity" }, value: "12 Unidades (+8 Opção)" },
                { label: { pt: "Investimento", en: "Investment" }, value: "~504M€" },
                { label: { pt: "Velocidade Máxima", en: "Maximum Speed" }, value: "300 km/h" }
            ],
            gantt: {
                initial: { range: dateRange(2026, 2030) },
                actual: [
                    { range: dateRange(5, 2026, 10, 2026), statusKey: 's3', source: "https://eco.sapo.pt/2026/05/20/cada-comboio-da-alta-velocidade-vai-custar-42-milhoes-a-cp-revisao-de-preco-tem-travao-de-10/", tooltip: { pt: "Concurso Público CP", en: "CP Public Tender" } },
                    { range: dateRange(11, 2026, 1, 2027), statusKey: 's5', source: "#", tooltip: { pt: "Adjudicação / Contrato (Previsão)", en: "Adjudication / Contract (Forecast)" } },
                    { range: dateRange(4, 2027, 1, 2032), statusKey: 's6', source: "#", tooltip: { pt: "Fabrico e Homologação (Previsão)", en: "Manufacturing and Homologation (Forecast)" } },
                    { range: dateRange(4, 2032, 12, 2032), statusKey: 's7', source: "#", tooltip: { pt: "Entrada em Serviço (Previsão)", en: "Service Entry (Forecast)" } }
                ]
            },
            timeline: [
                { date: date(1, 2026), label: { pt: "CP – Comboios de Portugal foi autorizada a comprar até 20 automotoras para a LAV, num investimento de 584 milhões de euros", en: "CP – Comboios de Portugal was authorized to purchase up to 20 train units for the LAV, with an investment of 584 million euros" }, link: "https://www.portugal.gov.pt/pt/gc25/comunicacao/noticia?i=alta-velocidade-governo-avanca-com-compra-de-20-comboios-e-lanca-concurso-para-troco-oia-soure" },
                { date: date(5, 2026), label: { pt: "Lançamento do Concurso Público para a Aquisição de Material Circulante para a LAV", en: "Launch of the Public Tender for the Acquisition of Rolling Stock for the LAV"}, link: "https://eco.sapo.pt/2026/05/20/cada-comboio-da-alta-velocidade-vai-custar-42-milhoes-a-cp-revisao-de-preco-tem-travao-de-10/" }
            ]
        },
        {
            id: 'lav-porto-vigo-fase-1',
            title: { pt: "LAV Porto - Vigo: Fase 1", en: "HSR Porto - Vigo: Phase 1" },
            statusKey: 's1',
            description: {
                pt: "Esta fase destaca-se por envolver dois segmentos desconexos: Porto - Aeroporto Francisco Sá Carneiro, e Braga - Valença. O Estudo Prévio e o Estudo de Impacte Ambiental estão em finalização.",
                en: "This phase is notable for involving two disconnected segments: Porto - Francisco Sá Carneiro Airport, and Braga - Valença. The Preliminary Study and Environmental Impact Assessment are in finalization."
            },
            details: [
                { label: { pt: "Extensão", en: "Length" }, value: "N/A" },
                { label: { pt: "Investimento", en: "Investment" }, value: "N/A" },
                { label: { pt: "Concessionária", en: "Concessionaire" }, value: "N/A" }
            ],
            gantt: {
                initial: { range: dateRange(2028, 2033) },
                actual: [
                    { range: dateRange(2, 2024, 7, 2026), statusKey: 's1', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: { pt: "Estudo Prévio e Estudo de Impacte Ambiental (Previsão)", en: "Preliminary Study and Environmental Impact Assessment (Forecast)" } },
                    { range: dateRange(8, 2026, 12, 2026), statusKey: 's2', source: "#", tooltip: { pt: "Declaração de Impacte Ambiental (Previsão)", en: "Environmental Impact Statement (Forecast)" } },
                    { range: dateRange(1, 2027, 6, 2027), statusKey: 's3', source: "#", tooltip: { pt: "Lançamento do Concurso Público Internacional (Previsão)", en: "International Public Tender Launch (Forecast)" } },
                    { range: dateRange(7, 2027, 10, 2027), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação (Previsão)", en: "Proposals Under Evaluation (Forecast)" } },
                    { range: dateRange(11, 2027, 2, 2028), statusKey: 's5', source: "#", tooltip: { pt: "Assinatura do Contrato (Previsão)", en: "Contract Signature (Forecast)" } },
                    { range: dateRange(3, 2028, 12, 2032), statusKey: 's6', source: "#", tooltip: { pt: "Fase de Construção (Previsão)", en: "Construction Phase (Forecast)" } },
                    { range: dateRange(1, 2033, 6, 2033), statusKey: 's7', source: "#", tooltip: { pt: "Entrada em Serviço (Previsão)", en: "Service Entry (Forecast)" } }
                ]
            },
            timeline: [
                { date: date(2, 2024), label: { pt: "Início da Fase 1 em Estudo Prévio e EIA", en: "Phase 1 starts under Preliminary Study and EIA" }, link: "#" },
                { date: date(4, 2026), label: { pt: "Faseamento Porto - Aeroporto FSC e Braga - Valença consolidado", en: "Phasing for Porto - FSC Airport and Braga - Valença consolidated" }, link: "#" },
                { date: date(1, 2027), label: { pt: "Preparação de concurso internacional (previsão)", en: "Preparation of international tender (forecast)" }, link: "#" }
            ]
        },
        {
            id: 'lav-porto-vigo-fase-2',
            title: { pt: "LAV Porto - Vigo: Fase 2", en: "HSR Porto - Vigo: Phase 2" },
            statusKey: 's1',
            description: {
                pt: "A Fase 2 da LAV Porto - Vigo corresponde ao segmento Aeroporto Francisco Sá Carneiro - Nine. Este troço está atualmente em Estudo Prévio e Estudo de Impacte Ambiental.",
                en: "Phase 2 of the Porto - Vigo HSR corresponds to the Francisco Sa Carneiro Airport - Nine segment. This section is currently under Preliminary Study and Environmental Impact Assessment."
            },
            details: [
                { label: { pt: "Extensão", en: "Length" }, value: "N/A" },
                { label: { pt: "Investimento", en: "Investment" }, value: "N/A" },
                { label: { pt: "Concessionária", en: "Concessionaire" }, value: "N/A" }
            ],
            gantt: {
                initial: { range: dateRange(2024, 2033) },
                actual: [
                    { range: dateRange(2, 2024, 4, 2026), statusKey: 's1', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: { pt: "Estudo Prévio e Estudo de Impacte Ambiental (Previsão)", en: "Preliminary Study and Environmental Impact Assessment (Forecast)" } },
                    { range: dateRange(5, 2026, 12, 2026), statusKey: 's2', source: "#", tooltip: { pt: "Declaração de Impacte Ambiental (Previsão)", en: "Environmental Impact Statement (Forecast)" } },
                    { range: dateRange(1, 2031, 6, 2031), statusKey: 's3', source: "#", tooltip: { pt: "Lançamento do Concurso Público Internacional (Previsão)", en: "International Public Tender Launch (Forecast)" } },
                    { range: dateRange(7, 2031, 10, 2031), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação (Previsão)", en: "Proposals Under Evaluation (Forecast)" } },
                    { range: dateRange(9, 2031, 12, 2031), statusKey: 's5', source: "#", tooltip: { pt: "Assinatura do Contrato (Previsão)", en: "Contract Signature (Forecast)" } },
                    { range: dateRange(1, 2032, 6, 2034), statusKey: 's6', source: "#", tooltip: { pt: "Fase de Construção (Previsão)", en: "Construction Phase (Forecast)" } },
                    { range: dateRange(7, 2034, 12, 2034), statusKey: 's7', source: "#", tooltip: { pt: "Entrada em Serviço (Previsão)", en: "Service Entry (Forecast)" } }
                ]
            },
            timeline: [
                { date: date(2, 2024), label: { pt: "Início da Fase 2 em Estudo Prévio e EIA", en: "Phase 2 starts under Preliminary Study and EIA" }, link: "#" },
                { date: date(9, 2030), label: { pt: "Aprofundamento técnico do segmento Aeroporto FSC - Nine (previsão)", en: "Technical refinement of the FSC Airport - Nine segment (forecast)" }, link: "#" },
                { date: date(11, 2031), label: { pt: "Assinatura de contrato da Fase 2 (previsão)", en: "Phase 2 contract signature (forecast)" }, link: "#" }
            ]
        },
        {
            id: 'lav-lisboa-madrid-terceira-travessia',
            title: { pt: "Terceira Travessia do Tejo", en: "Third Tagus Crossing" },
            statusKey: 's1',
            description: {
                pt: "A Terceira Travessia do Tejo (TTT) é uma ponte rodoferroviária com 4 vias ferroviárias (2 para alta velocidade). É um projeto estruturante que poupará tempos muito significativos na ligação entre Lisboa e qualquer ponto da outra margem do Tejo, incluindo o Algarve. O Estudo Prévio e o Estudo de Impacte Ambiental estão em curso. A construção desta obra de arte estará incluída nas novas concessões das pontes 25 de Abril e Vasco da Gama.",
                en: "The Third Tagus Crossing (TTT) is a road-rail bridge with 4 railway tracks (2 for high-speed). It is a major project that will save significant time on the connection between Lisbon and any point on the other margin of the Tagus, including Algarve. The Preliminary Study and Environmental Impact Assessment are underway. The construction of this bridge will be included in the new concessions for the 25 de Abril and Vasco da Gama bridges."
            },
            details: [
                { label: { pt: "Extensão", en: "Length" }, value: "~15 km" },
                { label: { pt: "Valor da Adjudicação", en: "Award Value" }, value: "N/A" },
                { label: { pt: "Concessionária", en: "Concessionaire" }, value: "N/A" }
            ],
            gantt: {
                initial: { range: dateRange(2029, 2034) },
                actual: [
                    { range: dateRange(6, 2024, 3, 2026), statusKey: 's1', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: { pt: "Estudo Prévio e Estudo de Impacte Ambiental", en: "Preliminary Study and Environmental Impact Assessment" } },
                    { range: dateRange(3, 2026, 6, 2027), statusKey: 's2', source: "#", tooltip: { pt: "Declaração de Impacte Ambiental (Previsão)", en: "Environmental Impact Statement (Forecast)" } },
                    { range: dateRange(1, 2028, 6, 2028), statusKey: 's3', source: "#", tooltip: { pt: "Lançamento do Concurso Público Internacional (Previsão)", en: "International Public Tender Launch (Forecast)" } },
                    { range: dateRange(7, 2028, 12, 2028), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação (Previsão)", en: "Proposals Under Evaluation (Forecast)" } },
                    { range: dateRange(1, 2029, 6, 2029), statusKey: 's5', source: "#", tooltip: { pt: "Assinatura do Contrato (Previsão)", en: "Contract Signature (Forecast)" } },
                    { range: dateRange(1, 2030, 6, 2034), statusKey: 's6', source: "#", tooltip: { pt: "Fase de Construção (Previsão)", en: "Construction Phase (Forecast)" } },
                    { range: dateRange(7, 2034, 12, 2034), statusKey: 's7', source: "#", tooltip: { pt: "Entrada em Serviço (Previsão)", en: "Service Entry (Forecast)" } }
                ]
            },
            timeline: [
                { date: date(5, 2024), label: { pt: "A Infraestruturas de Portugal é mandatada a concluir os estudos da Terceira Travessia do Tejo", en: "Infraestruturas de Portugal is mandated to complete the studies for the Third Tagus Crossing" }, link: "https://diariodarepublica.pt/dr/detalhe/resolucao-conselho-ministros/68-2024-867194464" },
                { date: date(1, 2026), label: { pt: "Infraestruturas de Portugal entrega em breve modelo para concessão das três travessias do Tejo, incluindo a TTT", en: "Infraestruturas de Portugal will soon deliver a model for the concession of the three Tagus crossings, including the TTT" }, link: "https://eco.sapo.pt/2026/01/23/ip-entrega-em-breve-modelo-para-concessao-das-tres-travessias-do-tejo/" }
            ]
        },
        {
            id: 'lav-lisboa-madrid-barreiro-evora',
            title: { pt: "Barreiro - Évora", en: "Barreiro - Évora" },
            statusKey: 's1',
            description: {
                pt: "A ligação entre Barreiro e Évora tem a particularidade de também incluir um bypass ao Aeroporto Luís de Camões (cuja construção será em paralelo), assim como as conexões com as linhas regionais existentes. O estudo prévio e o estudo de impacte ambiental estão em curso. Apesar de ainda não existir muitos detalhes, algumas estimativas podem ser derivadas dos relatórios do novo aeroporto de Lisboa.",
                en: "The connection between Barreiro and Évora has the particularity of including a bypass to Luís de Camões Airport (whose construction will be in parallel), as well as connections to existing regional lines. The preliminary study and environmental impact assessment are underway. Although there are not many details yet, some estimates can be derived from the reports of the new Lisbon airport."
            },
            details: [
                { label: { pt: "Extensão", en: "Length" }, value: "N/A" },
                { label: { pt: "Valor da Adjudicação", en: "Award Value" }, value: "N/A" },
                { label: { pt: "Concessionária", en: "Concessionaire" }, value: "N/A" }
            ],
            gantt: {
                initial: { range: dateRange(2029, 2034) },
                actual: [
                    { range: dateRange(6, 2024, 3, 2026), statusKey: 's1', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: { pt: "Estudo Prévio e Estudo de Impacte Ambiental", en: "Preliminary Study and Environmental Impact Assessment" } },
                    { range: dateRange(3, 2026, 6, 2027), statusKey: 's2', source: "#", tooltip: { pt: "Declaração de Impacte Ambiental (Previsão)", en: "Environmental Impact Statement (Forecast)" } },
                    { range: dateRange(1, 2028, 6, 2028), statusKey: 's3', source: "#", tooltip: { pt: "Lançamento do Concurso Público Internacional (Previsão)", en: "International Public Tender Launch (Forecast)" } },
                    { range: dateRange(7, 2028, 12, 2028), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação (Previsão)", en: "Proposals Under Evaluation (Forecast)" } },
                    { range: dateRange(1, 2029, 6, 2029), statusKey: 's5', source: "#", tooltip: { pt: "Assinatura do Contrato (Previsão)", en: "Contract Signature (Forecast)" } },
                    { range: dateRange(1, 2030, 6, 2034), statusKey: 's6', source: "#", tooltip: { pt: "Fase de Construção (Previsão)", en: "Construction Phase (Forecast)" } },
                    { range: dateRange(7, 2034, 12, 2034), statusKey: 's7', source: "#", tooltip: { pt: "Entrada em Serviço (Previsão)", en: "Service Entry (Forecast)" } }
                ]
            },
            timeline: [
                { date: date(5, 2024), label: { pt: "A Infraestruturas de Portugal é mandatada a concluir da LAV Lisboa-Madrid", en: "Infraestruturas de Portugal is mandated to complete the studies for the Lisbon-Madrid HSR" }, link: "https://diariodarepublica.pt/dr/detalhe/resolucao-conselho-ministros/68-2024-867194464" },
                { date: date(10, 2025), label: { pt: "Sumário Executivo do Relatório de Consulta aos Stakeholders do Aeroporto Luís de Camões, onde se inclui parte do traçado preliminar do troço Barreiro-Évora", en: "Executive Summary of the Stakeholder Consultation Report for Luís de Camões Airport, which includes part of the preliminary route for the Barreiro-Évora section" }, link: "https://www.imt-ip.pt/noticias/novo-aeroporto-de-lisboa-aeroporto-luis-de-camoes/" }
            ]
        },
        {
            id: 'lav-lisboa-madrid-duplicacao-evora-elvas',
            title: { pt: "Duplicação Évora-Elvas", en: "Duplication Évora-Elvas" },
            statusKey: 's1',
            description: {
                pt: "O troço Évora-Elvas já está construído em via única, desenhado para 250 km/h e tráfego misto. Por esta razão, é considerada a primeira linha de alta velocidade de Portugal. A plataforma deste troço está preparada para receber uma segunda via, no caso de uma previsível duplicação. Não é claro se a duplicação aumentará a velocidade máxima para 300 km/h. Ainda não se conhece com exatidão o calendário destes trabalhos, pelo que estas previsões são altamente especulativas.",
                en: "The Évora-Elvas section is already built as a single track, designed for 250 km/h and mixed traffic. For this reason, it is considered Portugal's first high-speed line. The platform of this section is prepared to receive a second track, in case of a foreseeable duplication. It is not clear if the duplication will increase the maximum speed to 300 km/h. The exact schedule for these works is not yet known, so these forecasts are highly speculative."
            },
            details: [
                { label: { pt: "Extensão", en: "Length" }, value: "~80 km" },
                { label: { pt: "Investimento", en: "Investment" }, value: "N/A" },
                { label: { pt: "Responsável", en: "Responsible Party" }, value: "Infraestruturas de Portugal" }
            ],
            gantt: {
                initial: { range: dateRange(2028, 2034) },
                actual: [
                    { range: dateRange(1, 2030, 6, 2030), statusKey: 's3', source: "#", tooltip: { pt: "Concurso Público Internacional (Previsão)", en: "International Public Tender Launch (Forecast)" } },
                    { range: dateRange(7, 2030, 10, 2030), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação (Previsão)", en: "Proposals Under Evaluation (Forecast)" } },
                    { range: dateRange(11, 2030, 12, 2030), statusKey: 's5', source: "#", tooltip: { pt: "Assinatura do Contrato (Previsão)", en: "Contract Signature (Forecast)" } },
                    { range: dateRange(1, 2031, 6, 2034), statusKey: 's6', source: "#", tooltip: { pt: "Fase de Construção (Previsão)", en: "Construction Phase (Forecast)" } },
                    { range: dateRange(7, 2034, 12, 2034), statusKey: 's7', source: "#", tooltip: { pt: "Entrada em Serviço (Previsão)", en: "Service Entry (Forecast)" } }
                ]
            },
            timeline: [
                { date: date(1, 2026), label: { pt: "Linha Évora/Espanha pronta mas comboios só no final do ano", en: "Infraestruturas de Portugal is mandated to complete the studies for the Lisbon-Madrid HSR" }, link: "https://eco.sapo.pt/2026/01/16/linha-evora-espanha-pronta-mas-comboios-so-no-final-do-ano/" }
            ]
        },
        {
            id: 'lav-lisboa-madrid-ligacao-transfonteiriça',
            title: { pt: "Ligação Transfonteiriça Elvas-Caia", en: "Cross-Border Connection Elvas-Caia" },
            statusKey: 's1',
            description: {
                pt: "A última peça do corredor Lisboa-Madrid é a ligação transfronteiriça entre Elvas-Caia e Badajoz. Prevê-se a construção de uma nova estação em Caia para servir as cidades vizinhas de Elvas (Portugal) e Badajoz (Espanha). O estudo prévio e o estudo de impacte ambiental estão em curso. Ainda não se conhece com exatidão o calendário destes trabalhos, pelo que estas previsões são altamente especulativas.",
                en: "The last piece of the Lisbon-Madrid corridor is the cross-border connection between Elvas-Caia and Badajoz. The construction of a new station in Caia is planned to serve the neighboring cities of Elvas (Portugal) and Badajoz (Spain). The preliminary study and environmental impact assessment are underway. The exact schedule for these works is not yet known, so these forecasts are highly speculative." 
            },
            details: [
                { label: { pt: "Extensão", en: "Length" }, value: "N/A" },
                { label: { pt: "Investimento", en: "Investment" }, value: "N/A" },
                { label: { pt: "Responsável", en: "Responsible Party" }, value: "Infraestruturas de Portugal" }
            ],
            gantt: {
                initial: { range: dateRange(2030, 2034) },
                actual: [
                    { range: dateRange(6, 2024, 3, 2026), statusKey: 's1', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: { pt: "Estudo Prévio e Estudo de Impacte Ambiental", en: "Preliminary Study and Environmental Impact Assessment" } },
                    { range: dateRange(3, 2026, 6, 2027), statusKey: 's2', source: "#", tooltip: { pt: "Declaração de Impacte Ambiental (Previsão)", en: "Environmental Impact Statement (Forecast)" } },
                    { range: dateRange(1, 2028, 6, 2028), statusKey: 's3', source: "#", tooltip: { pt: "Lançamento do Concurso Público Internacional (Previsão)", en: "International Public Tender Launch (Forecast)" } },
                    { range: dateRange(7, 2028, 12, 2028), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação (Previsão)", en: "Proposals Under Evaluation (Forecast)" } },
                    { range: dateRange(1, 2029, 6, 2029), statusKey: 's5', source: "#", tooltip: { pt: "Assinatura do Contrato (Previsão)", en: "Contract Signature (Forecast)" } },
                    { range: dateRange(1, 2030, 6, 2034), statusKey: 's6', source: "#", tooltip: { pt: "Fase de Construção (Previsão)", en: "Construction Phase (Forecast)" } },
                    { range: dateRange(7, 2034, 12, 2034), statusKey: 's7', source: "#", tooltip: { pt: "Entrada em Serviço (Previsão)", en: "Service Entry (Forecast)" } }
                ]
            },
            timeline: [
                { date: date(5, 2024), label: { pt: "A Infraestruturas de Portugal é mandatada a concluir da LAV Lisboa-Madrid", en: "Infraestruturas de Portugal is mandated to complete the studies for the Lisbon-Madrid HSR" }, link: "https://diariodarepublica.pt/dr/detalhe/resolucao-conselho-ministros/68-2024-867194464" }
            ]
        },
        {
            id: 'lav-lisboa-madrid-sinalizacao-telecomunicacoes',
            title: { pt: "Sinalização e Telecomunicações", en: "Signaling and Telecommunications" },
            statusKey: 's1',
            description: {
                pt: "Em paralelo à construção da LAV Lisboa-Madrid, a Infraestruturas de Portugal está encarregue da instalação dos sistemas de sinalização e telecomunicações. Ainda não se conhece com exatidão o calendário destes trabalhos, pelo que estas previsões são altamente especulativas.",
                en: "In parallel with the construction of the Lisbon-Madrid HSR, Infraestruturas de Portugal is responsible for installing signaling and telecommunications systems. The exact schedule for these works is not yet known, so these forecasts are highly speculative."
            },
            details: [
                { label: { pt: "Extensão", en: "Coverage" }, value: "Corredor Completo" },
                { label: { pt: "Investimento", en: "Investment" }, value: "N/A" },
                { label: { pt: "Responsável", en: "Responsible Party" }, value: "Infraestruturas de Portugal" }
            ],
            gantt: {
                initial: { range: dateRange(2028, 2034) },
                actual: [
                    { range: dateRange(1, 2029, 12, 2029), statusKey: 's3', source: "#", tooltip: { pt: "Concurso Público Internacional (Previsão)", en: "International Public Tender Launch (Forecast)" } },
                    { range: dateRange(1, 2030, 3, 2030), statusKey: 's4', source: "#", tooltip: { pt: "Propostas em Avaliação (Previsão)", en: "Proposals Under Evaluation (Forecast)" } },
                    { range: dateRange(4, 2030, 6, 2030), statusKey: 's5', source: "#", tooltip: { pt: "Assinatura do Contrato (Previsão)", en: "Contract Signature (Forecast)" } },
                    { range: dateRange(1, 2031, 6, 2034), statusKey: 's6', source: "#", tooltip: { pt: "Fase de Construção (Previsão)", en: "Construction Phase (Forecast)" } },
                    { range: dateRange(7, 2034, 12, 2034), statusKey: 's7', source: "#", tooltip: { pt: "Entrada em Serviço (Previsão)", en: "Service Entry (Forecast)" } }
                ]
            },
            timeline: []
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