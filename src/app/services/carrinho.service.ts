import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ItemCarrinho } from '../models/itemcarrinho.model';
import { Jogo } from '../models/jogo.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  carrinho$ = this.carrinhoSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const carrinhoArmazenado = localStorageService.getItem('carrinho') || [];
    this.carrinhoSubject.next(carrinhoArmazenado);
  }
  getUrlImagem(nomeImagem: string): string {
    if (!nomeImagem) {
      // Return a default image or handle the absence of an image name appropriately
      return './assets/padraosemImagem.jpg'; // Adjust this path to your default image
    }
    return `http://localhost:8080/jogos/image/download/${nomeImagem}`;
  }

  adicionar(jogo: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const itemExistente = carrinhoAtual.find((item) => item.id === jogo.id);

    if (itemExistente) {
      itemExistente.quantidade += jogo.quantidade || 1;
    } else {
      carrinhoAtual.push({ ...jogo });
    }

    this.carrinhoSubject.next(carrinhoAtual);
    this.atualizarArmazenamentoLocal();
  }

  removerTudo(): void {
    this.localStorageService.removeItem('carrinho');
    window.location.reload(); // reload na página
  }

  remover(item: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const carrinhoAtualizado = carrinhoAtual.filter(
      (itemCarrinho) => itemCarrinho.id !== item.id
    );

    this.carrinhoSubject.next(carrinhoAtualizado);
    this.atualizarArmazenamentoLocal();
  }

  obter(): ItemCarrinho[] {
    return this.carrinhoSubject.value;
  }

  private atualizarArmazenamentoLocal(): void {
    localStorage.setItem(
      'carrinho',
      JSON.stringify(this.carrinhoSubject.value)
    );
  }
}
