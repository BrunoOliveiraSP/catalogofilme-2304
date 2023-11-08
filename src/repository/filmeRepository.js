import conexao from "./connection.js";


export async function salvar(filme) {
  let comando = `
    INSERT INTO tb_filme (nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
                  VALUES (?, ?, ?, ?, ?)
  `

  let resp = await conexao.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel])
  let info = resp[0];

  filme.id = info.insertId;
  return filme;
}


export async function listarTodos() {
  let comando = `
     SELECT id_filme        as id,
            nm_filme        as nome,
            ds_sinopse      as sinopse,
            vl_avaliacao    as avaliacao,
            dt_lancamento   as lancamento,
            bt_disponivel   as disponivel
       FROM tb_filme
  `

  let resp = await conexao.query(comando);
  let lista = resp[0];

  return lista;
}




export async function buscarPorNome(nome) {
  let comando = `
     SELECT id_filme        as id,
            nm_filme        as nome,
            ds_sinopse      as sinopse,
            vl_avaliacao    as avaliacao,
            dt_lancamento   as lancamento,
            bt_disponivel   as disponivel
       FROM tb_filme
      WHERE nm_filme like ?
  `

  let resp = await conexao.query(comando, ['%'+nome+'%']);
  let lista = resp[0];

  return lista;
}




export async function buscarPorId(id) {
  let comando = `
     SELECT id_filme        as id,
            nm_filme        as nome,
            ds_sinopse      as sinopse,
            vl_avaliacao    as avaliacao,
            dt_lancamento   as lancamento,
            bt_disponivel   as disponivel,
            img_filme       as imagem
       FROM tb_filme
      WHERE id_filme = ?
  `

  let resp = await conexao.query(comando, [id]);
  let lista = resp[0];

  return lista[0];
}



export async function alterar(id, filme) {
  let comando = `
   UPDATE tb_filme
      SET nm_filme = ?,
          ds_sinopse = ?,
          vl_avaliacao = ?,
          dt_lancamento = ?,
          bt_disponivel = ?
    WHERE id_filme = ?
  `

  let resp = await conexao.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel, id]); 
  let info = resp[0];

  return info.affectedRows;
}



export async function alterarCapa(id, caminho) {
  let comando = `
   UPDATE tb_filme
      SET img_filme = ?
    WHERE id_filme = ?
  `

  let resp = await conexao.query(comando, [caminho, id]); 
  let info = resp[0];

  return info.affectedRows;
}



export async function remover(id) {
  let comando = `DELETE FROM tb_filme WHERE id_filme = ?`

  let resp = await conexao.query(comando, [id]);
  let info = resp[0];

  return info.affectedRows;
}

