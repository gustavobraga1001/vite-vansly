# Front-End Vansly

Sistema de gerenciamento de Vans Universítárias 

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar como um passageiro; 
- [x] Deve ser possível se autenticar;   
- [x] Deve ser possível um passageiro visualizar ofertas de serviço;   
- [] Deve ser possível um passageiro filtrar ofertas de serviço;   
- [] Deve ser possível um passageiro contratar um serviço;   
- [] Deve ser possível um passageiro confirmar falta;   
- [] Deve ser possível um passageiro acompanhar um trajeto;   
- [] Deve ser possível se cadastrar um motorista;   
- [] Deve ser possível um motorista cadastrar um veiculo;  
- [] Deve ser possível um motorista anunciar um serviço;   
- [] Deve ser possível um motorista iniciar um trajeto;   
- [] Deve ser possível um motorista confirmar o embarque de um passageiro;   

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não deve poder confirmar mais de uma falta no mesmo dia;
- [] O passageiro não pode estar na rota se tiver uma falta no dia atual;
- [] O motorista não pode iniciar uma rota sem no minimo um passageiro na rota;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário tem que estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um bando PostgreSQL;
- [x] O usuário deve ser identificado por um JWT (Json Web Token);