# Desafio B2Blue - Sistema de Controle de Volume de Armazenamento

Bem-vindo ao desafio da B2Blue, onde sua criatividade e habilidades técnicas serão postas à prova! Este projeto é um sistema de controle de volume de armazenamento de resíduos, desenvolvido com React e Material UI.

![image](https://github.com/user-attachments/assets/4dfa7f0c-a7f9-4dc5-a1e9-158973494274)



## Tecnologias Usadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Material UI**: Biblioteca de componentes React que implementa o Material Design.
- **Next.js**: Framework React para desenvolvimento de aplicações web.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **SQLite**: Banco de dados leve utilizado para armazenar dados.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.

## Requisitos para Rodar o Projeto

- **Node.js**: Versão 16 ou superior.
- **npm**: Versão 8 ou superior.

## Instruções de Setup

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_DIRETORIO>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra o navegador e acesse [http://localhost:3000](http://localhost:3000) para ver o resultado.
5. Ao acessar a aplicação pela primeira vez, um banco de dados(`database.sqlite`) será criado automaticamente para armazenar as operações.
Por padrão serão criadas 3 estações.

## Comandos Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Cria uma versão otimizada para produção.
- `npm run start`: Inicia a aplicação em modo de produção.
- `npm run lint`: Executa o linter para verificar a qualidade do código.

## Rotas da API Disponíveis

- `GET /api/stations`: Retorna todas as estações de armazenamento.
- `POST /api/operations`: Registra uma nova operação (atualização de volume ou coleta).
- `GET /api/operations`: Retorna todas as operações registradas.
- `GET /api/operations/:stationId`: Retorna as operações de uma estação específica.

## Descrição do Projeto

O projeto foi desenvolvido para atender ao desafio da B2Blue, que visa criar um sistema de controle de volume de armazenamento de resíduos. O sistema permite que os usuários informem a porcentagem de volume ocupado em cada estação. Quando uma estação atinge 80% de ocupação, um pedido de coleta é gerado automaticamente. Após a confirmação da coleta, o volume da estação é reiniciado para 0%.

## Contribuições

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, faça um fork do repositório e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
