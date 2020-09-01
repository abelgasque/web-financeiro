export class Categoria{
    id: number = 0;
    nome: string
}

export class Endereco{
    uf: string;
    cidade: string;
    bairro: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
}

export class Contato{
    id: number = 0;
    nome: string;
    email: string;
    telefone: string;
}

export class Permissao{
    id: number;
    descricao: string;
}

export class Usuario{
    id: number = 0;
    nome: string;
    email: string;
    senha: string; 
    permissoes: any[] = [];
    situacao: string = 'ATIVO';
}

export class Pessoa{
    id: number = 0;
    nome: string;
    cpf: string;
    endereco = new Endereco();
    situacao = 'ATIVO';
    contatos = new Array<Contato>();
    usuario = new Usuario();
} 

export class Lancamento{
    id: number = 0;
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: 0.0;
    observacao: string;
    tipo = 'RECEITA';
    categoria = new Categoria();
    pessoa = new Pessoa();
    anexo: string = null;
    urlAnexo: string = null;
}

export class LancamentoFilter{
    descricao: string;
    vencimentoDe: Date;
    vencimentoAte: Date;
    pessoa: number = 0;
    pagina = 0;
    itensPorPagina = 10;
    total = 0;
}

export class PessoaFilter{
    nome: string;
    cpf: string;
    situacao: string;
    pagina = 0;
    itensPorPagina = 10;
    total = 0;
}