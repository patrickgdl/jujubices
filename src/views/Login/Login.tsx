import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { Session } from "@supabase/supabase-js"
import { Block } from "baseui/block"
import { useEffect, useState } from "react"
import supabase from "~/services/supabase"

export default function Login() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <Block $style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw" }}>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "black",
                  brandAccent: "black",
                },
              },
            },
          }}
          providers={["google", "facebook"]}
          localization={{
            variables: {
              sign_in: {
                email_label: "Seu e-mail",
                password_label: "Sua senha",
                email_input_placeholder: "Seu e-mail",
                password_input_placeholder: "Sua senha",
                button_label: "Entrar",
                loading_button_label: "Entrando...",
                social_provider_text: "Logue com {{provider}}",
                link_text: "Já tem uma conta? Entre",
              },
              forgotten_password: {
                email_label: "Seu e-mail",
                password_label: "Sua senha",
                email_input_placeholder: "Seu e-mail",
                button_label: "Enviar",
                loading_button_label: "Enviando...",
                link_text: "Esqueceu sua senha?",
                confirmation_text: "Um e-mail foi enviado para você",
              },
              sign_up: {
                email_label: "Seu e-mail",
                password_label: "Sua senha",
                email_input_placeholder: "Seu e-mail",
                password_input_placeholder: "Sua senha",
                button_label: "Cadastrar",
                loading_button_label: "Cadastrando...",
                social_provider_text: "Cadastre-se com {{provider}}",
                link_text: "Não tem uma conta? Cadastre-se",
              },
            },
          }}
        />
      </Block>
    )
  } else {
    return <div>Logado!</div>
  }
}
