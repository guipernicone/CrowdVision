# Crowd Vision
Crowd Vision é um sistema de segurança que visa auxiliar a detecção de pessoas portando armas de fogo de forma automática, por meio de técnicas de aprendizado de máquina.

O sistema é composto por três módulos principais:
- Uma interface web desenvolvida em ReactJS
- Um aplicação desenvolvida em Python responsável pela captura de imagens obtidas através de filmagens ou de câmeras conectadas ao computador.
- Um servidor responsável pela realização da detecção de objetos nas imagens, e o gerenciamento dos frames detectados.


### Rede Neural
Para o treinamento da rede neural foi utilziado o TensorFlow Objection Detection Api, disponivel em:
https://github.com/tensorflow/models/tree/r1.13.0
