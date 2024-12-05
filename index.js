const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

// Conectar ao MongoDB
mongoose.connect(`mongodb+srv://felipeduarteabc:WXoAiBrlPayO9Qw3@cluster0.vpmed.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => console.log("MongoDB conectado"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

// Esquema e modelo para Texto
const TextoSchema = new mongoose.Schema({
  id: { type: String, required: true }, 
  pagina: { type: String, required: true },
  titulo: { type: String, required: true },
  texto: { type: String, required: true },
});

const Texto = mongoose.model("textos", TextoSchema);

module.exports = Texto;

// Esquema e modelo para Imagem
const ImagemSchema = new mongoose.Schema({
  id: { type: String, required: true }, 
  descricao: { type: String, required: true },
  imagem: { type: String, required: true },
  pagina: { type: String, required: true } 
});
const Imagem = mongoose.model("imagens", ImagemSchema);

module.exports = Imagem;

// Esquema e modelo para Usuarios
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
});

const Usuario = mongoose.model("usuarios", UsuarioSchema);

module.exports = Usuario;


// Rota de login
app.post("/api/login", async (req, res) => {
  const { nome, senha } = req.body;

  try {
    // Busca o usuário pelo nome e senha no banco de dados
    const usuario = await Usuario.findOne({ nome, senha });

    if (!usuario) {
      return res.status(401).json({ error: "Nome ou senha incorretos." });
    }

    res.json({ message: "Login bem-sucedido", usuario: { nome: usuario.nome } });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login." });
  }
});

// Rota para carregar todos os Textos em ordem alfabética 
app.get("/api/textos", async (req, res) => {
  try {
    const textos = await Texto.aggregate([
      {
        $addFields: {
          paginaLower: { $toLower: "$pagina" }, 
        },
      },
      {
        $sort: { paginaLower: 1 },
      },
    ]);
    res.json(textos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Rota para atualizar um Texto específico
app.put("/api/textos/:id", async (req, res) => {
  try {
    const { pagina, titulo, texto } = req.body;

    const textoAtualizado = await Texto.findOneAndUpdate(
      { id: req.params.id }, // Atualiza pelo ID do parâmetro
      { pagina, titulo, texto },
      { new: true } // Retorna o documento atualizado
    );

    if (!textoAtualizado) {
      return res.status(404).json({ error: "Texto não encontrado." });
    }

    res.json(textoAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Rota para carregar todas as Imagens em ordem alfabética por página
app.get("/api/imagens", async (req, res) => {
  try {
    const imagens = await Imagem.aggregate([
      {
        $addFields: {
          paginaLower: { $toLower: "$pagina" }
        }
      },
      {
        $sort: { paginaLower: 1 }
      }
    ]);
    res.json(imagens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.post("/api/imagens", async (req, res) => {
  try {
    const { descricao, imagem, pagina } = req.body;

    const novaImagem = new Imagem({
      descricao,
      imagem,
      pagina
    });

    await novaImagem.save();
    res.status(201).json(novaImagem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar imagem." });
  }
});


// Rota para atualizar uma Imagem específica
app.put("/api/imagens/:id", async (req, res) => {
  try {
    const { descricao, imagem, pagina } = req.body;

    const imagemAtualizada = await Imagem.findByIdAndUpdate(
      req.params.id,
      { descricao, imagem, pagina },
      { new: true }
    );

    if (!imagemAtualizada) {
      return res.status(404).json({ error: "Imagem não encontrada." });
    }

    res.json(imagemAtualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// Rota para buscar textos
app.get('/textos', async (req, res) => {
  try {
    const textos = await Texto.find(); 
    res.json(textos); 
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar textos' });
  }
});

app.post("/api/textos", async (req, res) => {
  try {
    const { id, pagina, titulo, texto } = req.body;

    
    if (id) {
      const textoExistente = await Texto.findOne({ id });
      if (textoExistente) {
        return res.status(400).json({ error: "O ID já existe." });
      }
    }

    // Gera um ID único se não foi fornecido
    const novoTexto = new Texto({
      id: id || new mongoose.Types.ObjectId().toString(), // Gerar ID caso não enviado
      pagina,
      titulo,
      texto,
    });

    await novoTexto.save();
    res.status(201).json(novoTexto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar texto." });
  }
});


// Configuração do Multer para salvar os arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; // Nome único para o arquivo
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Rota para salvar uma nova imagem
app.post("/api/imagens", upload.single("imagem"), async (req, res) => {
  try {
    const { descricao, pagina } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Arquivo de imagem é obrigatório." });
    }

    const novaImagem = new Imagem({
      descricao,
      pagina,
      imagem: `/uploads/${req.file.filename}`, // Caminho relativo da imagem salva
    });

    await novaImagem.save();
    res.status(201).json(novaImagem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar imagem." });
  }
});

// Variável para armazenar o número de acessos
let contadorAcessos = 0;


// Middleware para contar acessos
app.use((req, res, next) => {
  contadorAcessos++;
  console.log(`Número de acessos: ${contadorAcessos}`);
  next();
});

// Uma rota simples para teste
app.get("/", (req, res) => {
  res.send("Página acessada!");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
