"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Gavel,
  Clock,
  Shield,
  Users,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        {/* HERO */}
        <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden">
          {/* Background blur / efeito visual */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),transparent)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),transparent)]"></div>

          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl font-extrabold mb-6 text-blue-600 dark:text-blue-400 relative z-10"
          >
            Revolucione o mundo dos leilões online
          </motion.h1>

          <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl max-w-2xl text-gray-600 dark:text-gray-300 mb-10 relative z-10"
          >
            Crie, participe e ganhe em leilões online com total transparência,
            segurança e tecnologia em tempo real.
          </motion.p>

          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 z-10"
          >
            <Link
                href="/auctions"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition"
            >
              Ver Leilões
            </Link>
            <Link
                href="/register"
                className="px-8 py-3 border border-gray-400 dark:border-gray-700 rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Criar Conta
            </Link>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="max-w-6xl mx-auto py-24 px-6">
          <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-16"
          >
            Funcionalidades Principais
          </motion.h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Gavel,
                title: "Lances em Tempo Real",
                desc: "Atualizações instantâneas enquanto os participantes competem.",
              },
              {
                icon: Shield,
                title: "Segurança Total",
                desc: "Proteção contra fraudes e verificação de usuários.",
              },
              {
                icon: Clock,
                title: "Contagem Automática",
                desc: "Timers dinâmicos com encerramento automático dos leilões.",
              },
              {
                icon: Users,
                title: "Comunidade Ativa",
                desc: "Centenas de compradores e vendedores conectados.",
              },
            ].map((feature, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-400 transition text-center flex flex-col items-center"
                >
                  <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.desc}
                  </p>
                </motion.div>
            ))}
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="bg-blue-50 dark:bg-gray-900 py-24 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-12"
            >
              Como Funciona?
            </motion.h2>

            <div className="grid sm:grid-cols-3 gap-10">
              {[
                {
                  icon: TrendingUp,
                  title: "1. Crie ou Descubra Leilões",
                  desc: "Anuncie ou encontre oportunidades exclusivas para dar seu lance.",
                },
                {
                  icon: Gavel,
                  title: "2. Dê Seu Lance",
                  desc: "Participe em tempo real e acompanhe as atualizações instantâneas.",
                },
                {
                  icon: Sparkles,
                  title: "3. Vença o Leilão",
                  desc: "O maior lance ao final do tempo vence o item. Simples e rápido!",
                },
              ].map((step, i) => (
                  <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.2 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-xl transition"
                  >
                    <step.icon className="w-10 h-10 text-blue-500 mb-3" />
                    <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.desc}
                    </p>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-28 text-center px-6"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">
            Entre agora e participe dos melhores leilões online.
          </p>
          <Link
              href="/register"
              className="px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-2xl hover:bg-blue-700 shadow-lg hover:shadow-blue-400/40 transition"
          >
            Criar Conta Gratuitamente
          </Link>
        </motion.section>

        {/* FOOTER */}
        <footer className="bg-gray-100 dark:bg-gray-950 py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
          © {new Date().getFullYear()} LeilãoApp — Todos os direitos reservados.
        </footer>
      </div>
  );
}




