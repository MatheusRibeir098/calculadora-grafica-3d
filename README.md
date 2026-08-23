# 🧮 Calculadora Gráfica 3D

Calculadora científica com plotagem de funções 2D e superfícies 3D (`z = f(x, y)`) direto no navegador.

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r184-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

<!-- TODO: adicionar GIF da superfície 3D girando -->

🔗 Demo: _(deploy pendente)_

---

## ✨ O que faz

- **Calculadora científica** — avaliação de expressões com `math.js`. Botões para funções
  trigonométricas (`sin`, `cos`, `tan`, `asin`, `acos`, `atan`), logaritmos (`log`, `ln`),
  raiz quadrada (`sqrt`), potências (`x²`, `xⁿ`), `abs`, fatorial (`!`), porcentagem (`%`),
  constantes `π` e `e`, além das operações básicas. Fecha automaticamente parênteses
  desbalanceados e mantém histórico dos cálculos.
- **Plotagem 2D** — desenha o gráfico de funções de uma variável em `<canvas>` com zoom e
  pan. Exemplos aceitos: `sin(x)`, `x^2`, `1/x`, `sqrt(x)`.
- **Superfícies 3D** — renderiza `z = f(x, y)` em WebGL via Three.js / react-three-fiber,
  com controles de órbita (arrastar para girar) e modos de exibição sólido, wireframe ou
  ambos. Exemplos aceitos: `sin(x)*cos(y)` (padrão), `x^2 + y^2`, `sin(x) + cos(y)`.

> As expressões são interpretadas pelo `math.js`, então qualquer sintaxe suportada por ele
> — usando `x` (2D) ou `x` e `y` (3D) como variáveis — funciona.

---

## 🚀 Como rodar

Pré-requisitos: Node.js 18+.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

Para gerar o build de produção:

```bash
npm run build
npm start
```

---

## 🧪 Testes

Os testes usam Jest e cobrem o motor de cálculo, o validador de expressões e o detector de
descontinuidades.

```bash
npm test
```

---

## 🛠️ Stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript**
- **math.js** — parsing e avaliação de expressões
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — cena 3D e controles de órbita
- **Tailwind CSS** + **Radix UI** — interface
- **Motion** — animações
- **Jest** — testes unitários
