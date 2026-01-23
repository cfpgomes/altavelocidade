// --- Helper Functions ---
export const date = (m, y) => y + ((m - 1) / 12);

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
    pt: {
        title: "Monitorização LAV Porto-Lisboa",
        subtitle: "Estado de progresso da Linha de Alta Velocidade",
        legendTitle: "Legenda de Estado",
        gantt: {
            initial: "Calendário Planeado para Adjudicação e Obras (2025)",
            actual: "Calendário Atual",
            today: "Hoje",
        },
        sections: [
            {
                id: 'ppp1',
                title: "PPP1: Porto - Oiã",
                statusKey: 's5',
                description: "O troço Campanhã-Oiã foi adjudicado à AVAN Norte em Julho de 2025. O RECAPE, submetido em Outubro, propunha alterar a estação subterrânea de Santo Ovídio para Vilar do Paraíso, à superfície, sendo chumbado pela APA por violar o Estudo Prévio. Atualmente (Jan 2026), o consórcio prepara um novo Projeto de Execução e respetivo RECAPE que se aproximam do Estudo Prévio.",
                details: [
                    { label: "Extensão", value: "72 km" },
                    { label: "Valor da Adjudicação", value: "~1.6MM €" },
                    { label: "Concessionária", value: "AVAN Norte" }
                ],
                gantt: {
                    initial:
                        { range: dateRange(2025, 2030) }
                    ,
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
                }
            },
            {
                id: 'ppp2',
                title: "PPP2: Oiã - Soure",
                statusKey: 's3',
                description: "O primeiro concurso para o troço Oiã-Soure ficou deserto em 2024, devido à exclusão da única proposta apresentada, pela AVAN Norte, que deslocava a estação de AV para fora da cidade de Coimbra. O concurso foi relançado em janeiro de 2026, com um caderno de encargos simplificado, com menos 11km e menos responsabilidades de manutenção. Prevê-se a adjudicação para o final de 2026.",
                details: [
                    { label: "Extensão", value: "61 km" },
                    { label: "Investimento", value: "~1.6MM €" },
                    { label: "Concessionária", value: "N/A" }
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
                }
            },
            {
                id: 'ppp3',
                title: "PPP3: Soure - Carregado",
                statusKey: 's2',
                description: "A Declaração de Impacte Ambiental (DIA) para o troço Soure-Carregado já foi emitida, estando agora a aguardar o lançamento do seu concurso, que se preverá ser em meados de 2026.",
                details: [
                    { label: "Extensão", value: "~132 km" },
                    { label: "Investimento", value: "N/A" },
                    { label: "Concessionária", value: "N/A" }
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
                }
            },
            {
                id: 'cp',
                title: "Comboios de Portugal: Material Circulante",
                statusKey: 's3',
                description: "A Comboios de Portugal vai adquirir 12 unidades de comboios de Alta Velocidade para operar na nova linha, com mais 8 unidades como opção. Já foi autorizada a despesa para esta aquisição.",
                details: [
                    { label: "Quantidade", value: "12 Unidades (+8 Opção)" },
                    { label: "Investimento", value: "~584M€" },
                    { label: "Velocidade Máxima", value: "300 km/h" }
                ],
                gantt: {
                    initial: { range: dateRange(2026, 2030) },
                    actual: [
                        { start: date(1, 2026), end: date(6, 2026), statusKey: 's3', source: "https://eco.sapo.pt/2026/01/22/cp-vai-ter-ate-20-comboios-para-a-alta-velocidade-investimento-soma-584-milhoes/", tooltip: "Concurso Público CP" },
                        { start: date(7, 2026), end: date(12, 2026), statusKey: 's5', source: "#", tooltip: "Adjudicação / Contrato (Previsão)" },
                        { start: date(1, 2027), end: date(12, 2030), statusKey: 's6', source: "#", tooltip: "Fabrico e Homologação (Previsão)" },
                        { start: date(1, 2031), end: date(6, 2031), statusKey: 's7', source: "#", tooltip: "Entrada em Serviço (Previsão)" }
                    ]
                }
            }
        ]
    },
    en: {
        title: "LAV Porto-Lisbon Tracker",
        subtitle: "High-Speed Rail Progress Monitor",
        legendTitle: "Status Legend",
        gantt: {
            initial: "Planned Schedule for Award & Construction (2025)",
            actual: "Current Schedule",
            today: "Today",
        },
        sections: [
            {
                id: 'ppp1',
                title: "PPP1: Porto - Oiã",
                statusKey: 's5',
                description: "The section Campanhã-Oiã was awarded to AVAN Norte in July 2025. The RECAPE, submitted in October, proposed to change the underground station from Santo Ovídio to Vilar do Paraíso, at surface level, which was rejected by the APA for violating the Preliminary Study. Currently (Jan 2026), the consortium is preparing a new Execution Project and respective RECAPE that align with the Preliminary Study.",
                details: [
                    { label: "Length", value: "72 km" },
                    { label: "Award Value", value: "~€1.6B" },
                    { label: "Concessionaire", value: "AVAN Norte" }
                ],
                gantt: {
                    initial:
                        { range: dateRange(2025, 2030) }
                    ,
                    actual: [
                        { start: date(7, 2021), end: date(3, 2023), statusKey: 's1', source: "https://siaia.apambiente.pt/AIADOC/AIA3610/pf102a_amb.ep.10.10.01.rnt.02202382892115.pdf", tooltip: "Preliminary Study and Environmental Impact Study" },
                        { start: date(3, 2023), end: date(8, 2023), statusKey: 's2', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade/impacte-ambiental", tooltip: "Approved Environmental Impact Declaration (DIA)" },
                        { start: date(1, 2024), end: date(7, 2024), statusKey: 's3', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: "Launch of the International Public Tender" },
                        { start: date(7, 2024), end: date(12, 2024), statusKey: 's4', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: "Proposals Under Evaluation" },
                        { start: date(7, 2025), end: date(10, 2025), statusKey: 's5', source: "https://www.infraestruturasdeportugal.pt/pt-pt/adjudicacao-da-concessao-da-linha-ferroviaria-de-alta-velocidade-entre-porto-campanha-e-oia", tooltip: "Contract Signing and RECAPE in preparation" },
                        { start: date(12, 2025), end: date(3, 2026), statusKey: 's5', source: "https://eco.sapo.pt/2026/01/21/consorcio-da-mota-engil-vai-entregar-novo-projeto-para-tgv-em-gaia/", tooltip: "New RECAPE in preparation" },
                        { start: date(6, 2026), end: date(7, 2030), statusKey: 's6', source: "#", tooltip: "Construction Phase (Forecast)" },
                        { start: date(7, 2030), end: date(12, 2030), statusKey: 's7', source: "#", tooltip: "Service Entry (Forecast)" }
                    ]
                }
            },
            {
                id: 'ppp2',
                title: "PPP2: Oiã - Soure",
                statusKey: 's3',
                description: "The first tender for the Oiã-Soure section was unsuccessful in 2024 after rejecting the only proposal, from AVAN Norte, which relocated the high-speed station outside Coimbra. The tender was relaunched in January 2026 with simplified terms, 11km shorter and reduced maintenance responsibilities. Contract award is expected by end of 2026.",
                details: [
                    { label: "Length", value: "61 km" },
                    { label: "Award Value", value: "~€1.6B" },
                    { label: "Concessionaire", value: "N/A" }
                ],
                gantt: {
                    initial: { range: dateRange(2027, 2032) },
                    actual: [
                        { start: date(7, 2021), end: date(6, 2023), statusKey: 's1', source: "https://siaia.apambiente.pt/AIADOC/AIA3624/pf102b_amb.ep.10.01.01-rnt-v0120231117103128.pdf", tooltip: "Preliminary Study and Environmental Impact Study" },
                        { start: date(6, 2023), end: date(11, 2023), statusKey: 's2', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade/impacte-ambiental", tooltip: "Environmental Impact Declaration Approved" },
                        { start: date(7, 2024), end: date(12, 2024), statusKey: 's3', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: "International Public Tender Launch" },
                        { start: date(1, 2025), end: date(3, 2025), statusKey: 's4', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade", tooltip: "Sole Proposal Rejected" },
                        { start: date(1, 2026), end: date(5, 2026), statusKey: 's3', source: "https://diariodarepublica.pt/dr/detalhe/anuncio-procedimento/1551-2026-1023994487", tooltip: "International Public Tender Relaunched" },
                        { start: date(5, 2026), end: date(10, 2026), statusKey: 's4', source: "#", tooltip: "Proposals Under Evaluation (Forecast)" },
                        { start: date(10, 2026), end: date(12, 2026), statusKey: 's5', source: "#", tooltip: "Contract Award (Forecast)" },
                        { start: date(1, 2027), end: date(1, 2032), statusKey: 's6', source: "#", tooltip: "Construction Phase (Forecast)" },
                        { start: date(1, 2032), end: date(7, 2032), statusKey: 's7', source: "#", tooltip: "Service Entry (Forecast)" }
                    ]
                }
            },
            {
                id: 'ppp3',
                title: "PPP3: Soure - Carregado",
                statusKey: 's2',
                description: "The Environmental Impact Declaration (EID) for the Soure-Carregado section has been issued and is awaiting tender launch, expected mid-2026.",
                details: [
                    { label: "Length", value: "~143 km" },
                    { label: "Investment", value: "N/A" },
                    { label: "Concessionaire", value: "N/A" }
                ],
                gantt: {
                    initial: { range: dateRange(2027, 2032) },
                    actual: [
                        { start: date(8, 2022), end: date(1, 2025), statusKey: 's1', source: "https://participa.pt/pt/consulta/linha-ferroviaria-de-alta-velocidade-entre-porto-e-lisboa--a-linha-ferroviaria-de-alta-velocidade", tooltip: "Preliminary Study and Environmental Impact Study" },
                        { start: date(2, 2025), end: date(7, 2025), statusKey: 's2', source: "https://www.infraestruturasdeportugal.pt/pt-pt/rede-de-alta-velocidade/impacte-ambiental", tooltip: "Environmental Impact Declaration Approved" },
                        { start: date(7, 2026), end: date(12, 2026), statusKey: 's3', source: "#", tooltip: "International Public Tender Launch (Forecast)" },
                        { start: date(1, 2027), end: date(5, 2027), statusKey: 's4', source: "#", tooltip: "Proposals Under Evaluation (Forecast)" },
                        { start: date(9, 2027), end: date(2, 2028), statusKey: 's5', source: "#", tooltip: "Contract Award (Forecast)" },
                        { start: date(6, 2028), end: date(6, 2032), statusKey: 's6', source: "#", tooltip: "Construction Phase (Forecast)" },
                        { start: date(7, 2032), end: date(12, 2032), statusKey: 's7', source: "#", tooltip: "Service Entry (Forecast)" }
                    ]
                }
            },
            {
                id: 'cp',
                title: "Comboios de Portugal: Rolling Stock",
                statusKey: 's3',
                description: "Comboios de Portugal will acquire 12 high-speed train units to operate on the new line, with an additional 8 units as an option. The expenditure for this acquisition has already been authorized.",
                details: [
                    { label: "Quantity", value: "12 Units (+8 Option)" },
                    { label: "Investment", value: "~€584M" },
                    { label: "Maximum Speed", value: "300 km/h" }
                ],
                gantt: {
                    initial: { range: dateRange(2026, 2030) },
                    actual: [
                        { start: date(1, 2026), end: date(6, 2026), statusKey: 's3', source: "https://eco.sapo.pt/2026/01/22/cp-vai-ter-ate-20-comboios-para-a-alta-velocidade-investimento-soma-584-milhoes/", tooltip: "Public Tender CP" },
                        { start: date(7, 2026), end: date(12, 2026), statusKey: 's5', source: "#", tooltip: "Award / Contract (Forecast)" },
                        { start: date(1, 2027), end: date(12, 2030), statusKey: 's6', source: "#", tooltip: "Manufacturing and Approval (Forecast)" },
                        { start: date(1, 2031), end: date(6, 2031), statusKey: 's7', source: "#", tooltip: "Entry into Service (Forecast)" }
                    ]
                }
            }
        ]
    }
};