import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { RecoilRoot } from "recoil";
import Formulario from "./Formulario";
import React from "react";

describe("o comportamento do Formulário.tsx", () => {
  test("quando o input está vazio, novos participantes não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    // encontra no DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    // encontra o botão
    const botao = screen.getByRole("button");

    expect(input).toBeInTheDocument();

    expect(botao).toBeDisabled();
  });

  test("adicionar um participante caso exista um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    // insere um valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana Cataraina",
      },
    });

    // clicar no botão de submit
    fireEvent.click(botao);

    // garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();
    // garantir que o input não tenha um valor
    expect(input).toHaveValue("");
  });

  test("nomes duplicados não podem ser adicionados na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Ana Cataraina",
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Ana Cataraina",
      },
    });

    fireEvent.click(botao);

    const mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos!"
    );
  });

  test("mensagem de erro deve sumir após um tempo", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Ana Cataraina",
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Ana Cataraina",
      },
    });

    fireEvent.click(botao);
    let mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeInTheDocument();

    //esperar N segundos

    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeNull();
  });
});
