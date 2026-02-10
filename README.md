##Desafio Técnico – QA API Pedidos

Esse repositório contém os testes que fiz para a API de pedidos usando Postman + Mock Server do próprio Postman.

## 1-Como não havia uma API real disponível, utilizei o mock do Postman para simular os comportamentos esperados da API, como:

criação de pedidos

validações de payload

idempotência (409 em duplicidade)

consulta de status

erros básicos

O objetivo foi validar a estrutura dos testes, lógica dos scripts e organização da collection, já pensando em como a API real deveria funcionar.

## 2-Escopo
POST /orders

Criação de pedido com:

orderId

customer

total

GET /orders/{orderId}

Consulta do pedido retornando:

PENDING

PROCESSED

FAILED

## 3-Como priorizei os testes

Priorizei os cenários com maior impacto no negócio:

Duplicidade de pedidos (idempotência)

Pedido preso em PENDING

Payload inválido

Status incorreto no GET

Total negativo ou tipo errado

Automatizei nessa ordem:

Idempotência

Happy path + fluxo assíncrono (simulado)

Validações

Erros básicos

## 4-Casos cobertos
Happy path

POST criando pedido e GET simulando polling até PROCESSED.

Idempotência

Mesmo orderId enviado duas vezes.
Esperado: segunda tentativa retorna 409 Conflict.

Esse comportamento foi simulado diretamente no Mock Server do Postman.

## 5-Validações

Sem customer → 400

Total negativo → 400

Total como string → 400

## 6-Erros básicos

GET com orderId inexistente → 404

Bug encontrado

A API permite criar pedidos duplicados usando o mesmo orderId.

Comportamento atual:

primeira chamada → 201

segunda chamada → 201 novamente

Comportamento esperado:

primeira → 201

segunda → 409 Conflict

O cenário foi documentado com evidências no Postman.

## 7-Como rodar os testes

Instalar o Newman:

npm install -g newman newman-reporter-htmlextra


Executar:

newman run postman/API_Orders.postman_collection.json \
-e postman/Challenge_Env.postman_environment.json \
--delay-request 5000 \
--reporters cli,htmlextra \
--reporter-htmlextra-export relatorio.html


O delay de 5 segundos foi usado para simular o processamento assíncrono.

## 8-Extra – Performance com k6

Foi feito um teste simples de carga no POST:

10 usuários virtuais

30 segundos

Print do relatório em:

evidences/k6-performance-report.png

Rodar:

.\k6.exe run performance-test.js

##9-Extra – Pipeline CI

Configurei um GitHub Actions que roda os testes do Newman automaticamente a cada push ou pull request.

Durante a execução do pipeline no GitHub Actions utilizando Newman, nem todos os testes foram aprovados, apesar de todos funcionarem corretamente no Postman Desktop.

Essa inconsistência acontece devido à ausência de uma API real, sendo necessário utilizar mocks do Postman combinados com endpoints genéricos.

Esse cenário gera comportamentos diferentes entre:

Execução manual no Postman Desktop -> Todos os testes passaram normalmente

Execução automatizada via Newman (CI) -> Tem uma regra mais rigida 

Arquivo:

.github/workflows/test-api.yml

Atenciosamente,

Alexandre Gonsalves
