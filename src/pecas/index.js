// Catálogo de peças. O estilo (estilo.json) escolhe quais usar, pelo nome.
import CabecalhoDividido from './cabecalho/Dividido.astro';
import CabecalhoCapsula from './cabecalho/Capsula.astro';
import HeroEditorial from './hero/Editorial.astro';
import HeroCentralizado from './hero/Centralizado.astro';
import DadosFaixa from './dados/Faixa.astro';
import SobreCitacao from './sobre/Citacao.astro';
import SobrePerfil from './sobre/Perfil.astro';
import ServicosCardapio from './servicos/Cardapio.astro';
import ServicosAcordeao from './servicos/Acordeao.astro';
import ProcessoPassos from './processo/Passos.astro';
import GaleriaMosaico from './galeria/Mosaico.astro';
import GaleriaCarrossel from './galeria/Carrossel.astro';
import FaqColunas from './faq/Colunas.astro';
import LocalFotoEndereco from './local/FotoEndereco.astro';
import LocalMapaCartao from './local/MapaCartao.astro';
import FinalConvite from './final/Convite.astro';
import FinalFaixa from './final/Faixa.astro';
import RodapeColunas from './rodape/Colunas.astro';
import RodapeLinha from './rodape/Linha.astro';
import BarraAgendar from './comum/BarraAgendar.astro';
import BotaoFlutuante from './comum/BotaoFlutuante.astro';
import CabecalhoAberto from './cabecalho/Aberto.astro';
import HeroSangrado from './hero/Sangrado.astro';
import ManifestoFrase from './manifesto/Frase.astro';
import SobreOrganico from './sobre/Organico.astro';
import ServicosCards from './servicos/Cards.astro';
import GaleriaColunas from './galeria/Colunas.astro';
import LocalHorarios from './local/Horarios.astro';
import FinalFoto from './final/Foto.astro';
import RodapeAssinatura from './rodape/Assinatura.astro';
import Dock from './comum/Dock.astro';
import Nada from './comum/Nada.astro';
import CabecalhoMinimo from './cabecalho/Minimo.astro';
import HeroTipografico from './hero/Tipografico.astro';
import SobreLateral from './sobre/Lateral.astro';
import ServicosAbas from './servicos/Abas.astro';
import GaleriaFaixa from './galeria/Faixa.astro';
import SocialInstagram from './social/Instagram.astro';
import LocalFaixa from './local/Faixa.astro';
import FinalBloco from './final/Bloco.astro';
import RodapeMinimo from './rodape/Minimo.astro';
import CabecalhoBoutique from './cabecalho/Boutique.astro';
import HeroPortal from './hero/Portal.astro';
import SobreCarta from './sobre/Carta.astro';
import ServicosIndice from './servicos/Indice.astro';
import DepoimentosCartoes from './depoimentos/Cartoes.astro';
import GaleriaArcada from './galeria/Arcada.astro';
import FinalArco from './final/Arco.astro';
import RodapeVisita from './rodape/Visita.astro';
import BolhaWhats from './comum/BolhaWhats.astro';

export const pecas = {
  'cabecalho/dividido': CabecalhoDividido,
  'cabecalho/capsula': CabecalhoCapsula,
  'hero/editorial': HeroEditorial,
  'hero/centralizado': HeroCentralizado,
  'dados/faixa': DadosFaixa,
  'sobre/citacao': SobreCitacao,
  'sobre/perfil': SobrePerfil,
  'servicos/cardapio': ServicosCardapio,
  'servicos/acordeao': ServicosAcordeao,
  'processo/passos': ProcessoPassos,
  'galeria/mosaico': GaleriaMosaico,
  'galeria/carrossel': GaleriaCarrossel,
  'faq/colunas': FaqColunas,
  'local/foto-endereco': LocalFotoEndereco,
  'local/mapa-cartao': LocalMapaCartao,
  'final/convite': FinalConvite,
  'final/faixa': FinalFaixa,
  'rodape/colunas': RodapeColunas,
  'rodape/linha': RodapeLinha,
  'flutuante/barra': BarraAgendar,
  'flutuante/botao': BotaoFlutuante,
  'cabecalho/aberto': CabecalhoAberto,
  'hero/sangrado': HeroSangrado,
  'manifesto/frase': ManifestoFrase,
  'sobre/organico': SobreOrganico,
  'servicos/cards': ServicosCards,
  'galeria/colunas': GaleriaColunas,
  'local/horarios': LocalHorarios,
  'final/foto': FinalFoto,
  'rodape/assinatura': RodapeAssinatura,
  'flutuante/dock': Dock,
  'flutuante/nenhum': Nada,
  'cabecalho/minimo': CabecalhoMinimo,
  'hero/tipografico': HeroTipografico,
  'sobre/lateral': SobreLateral,
  'servicos/abas': ServicosAbas,
  'galeria/faixa': GaleriaFaixa,
  'social/instagram': SocialInstagram,
  'local/faixa': LocalFaixa,
  'final/bloco': FinalBloco,
  'rodape/minimo': RodapeMinimo,
  'cabecalho/boutique': CabecalhoBoutique,
  'hero/portal': HeroPortal,
  'sobre/carta': SobreCarta,
  'servicos/indice': ServicosIndice,
  'depoimentos/cartoes': DepoimentosCartoes,
  'galeria/arcada': GaleriaArcada,
  'final/arco': FinalArco,
  'rodape/visita': RodapeVisita,
  'flutuante/bolha': BolhaWhats,
};
