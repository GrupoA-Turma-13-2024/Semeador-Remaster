const mongoose = require("mongoose");

// Conecte-se ao MongoDB
mongoose.connect(`mongodb+srv://felipeduarteabc:WXoAiBrlPayO9Qw3@cluster0.vpmed.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => console.log("MongoDB conectado"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

// Esquemas de exemplo
const TextoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  pagina: { type: String, required: true },
  titulo: { type: String, required: true },
  texto: { type: String, required: true },
});

const ImagemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  pagina: { type: String, required: true },
  imagem: { type: String, required: true }, // URL ou caminho da imagem
  descricao: { type: String, required: true },
});


const filmeSchema = new mongoose.Schema({
  id: String,
  titulo: String,
  sinopse: String
});

const Texto = mongoose.model("textos", TextoSchema);
const Imagem = mongoose.model("imagens", ImagemSchema);
const Filme = mongoose.model("filmes", filmeSchema);

module.exports = { Texto, Imagem }; 

// Dados de exemplo
const textos = [
  {
    id: "17",
    pagina: "Home",
    titulo: "Educação infantil",
    texto: "O atendimento à Educação Infantil é ofertado a crianças de 4 e 5 anos. O currículo que rege a prática da Educação Infantil tem como base a BNCC – Base Nacional Comum Curricular cuja concepção vincula educar e cuidar, entendendo o cuidado como algo indissociável do processo educativo. A escola acolhe as vivências e os conhecimentos construídos pelas crianças no ambiente da família e no contexto de sua comunidade articulando-os à prática pedagógica, ampliando assim o universo de experiências, conhecimentos e habilidades dessas crianças, diversificando e consolidando novas aprendizagens, atuando de maneira complementar à educação familiar. Os direitos de aprendizagem e desenvolvimento garantidos na BNCC por meio do conviver, brincar, participar, explorar, expressar e conhecer-se são respeitados e incentivados no dia a dia da prática escolar."
  }
];

const imagens = [
  { id: "11", 
    pagina: "Eventos",
    descricao: "Imagem ia", 
    imagem: "https://cdn.pixabay.com/photo/2024/06/01/14/00/ai-8802304_1280.jpg" },
];

const filmes = [
  { id: "1", titulo: "Novo Título", sinopse: "Novo conteúdo de texto" },
  { id: "2", titulo: "Mais um Título", sinopse: "Outro conteúdo de texto" },
  { id: "3", titulo: "Mais um Título", sinopse: "Outro conteúdo de texto" }
];
// Inserir dados

async function seedDatabase() {
  await Imagem.insertMany(imagens);
  console.log("Dados inseridos com sucesso");
  mongoose.connection.close();
}

seedDatabase();
