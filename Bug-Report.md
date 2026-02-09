# Bug – API permite duplicidade de pedidos com mesmo orderId

## Criticidade
Alta  

## Ambiente
API de Orders – Ambiente de testes

## Cenário
1. Enviar POST /orders com orderId = "TESTE-123"
2. Repetir o POST com o mesmo orderId

## Resultado atual
A API de criação de pedidos (POST /orders) não possui controle de idempotência.
Ao enviar múltiplas requisições com o mesmo orderId, o sistema cria novos pedidos em todas as tentativas, retornando 201 Created, quando deveria bloquear duplicidades.

Esse comportamento pode gerar inconsistência de dados, pedidos duplicados e impactos financeiros.

## Correção esperada
O sistema deveria impedir a criação de pedidos duplicados (idempotência).

## Evidências
- Respostas da API mostrando criação duplicada (Arquivo PDF).

- Prints do Postman (Arquivo PDF).


