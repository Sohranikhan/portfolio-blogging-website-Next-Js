import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions  = {
    providers: [
        CredentialsProvider({
            id:"credentials",
            name: "Akdevp",
            credentials: {
              email: { label: "Email", type: "email", placeholder: "abc@gmail.com" },
              password: { label: "Password", type: "password",placeholder: "a4W93G$d" }
            },
            async authorize(credentials) {
                try {
                    const authResponse = await fetch("http://localhost:3000/api/login", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(credentials),
                      })
                      const jsRes = await authResponse.json()
                if (jsRes.success === false) {
                        return null
                      }                     
                      return jsRes.user
                } catch (error) {
                   return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login',
      },
    session:{
        strategy: 'jwt'
      },
      callbacks: {
        async jwt({token, user, session}){
            // (token, user);
            if (user) {
                return{
                    ...token,
                    id: user._id,
                    isadmin: user.isadmin,
                    verified: user.verified,
                    image: user.image
                }
            }
            return token;
        },
        async session({ session, token, user }) {
            if (session.user) {
                return{
                    ...session,
                    user:{
                        ...session.user,
                        id: token.id,
                        isadmin: token.isadmin,
                        verified: token.verified ,
                        image: token.image
                    },
            }}
        return session;
    },
    async redirect({ url, baseUrl }) {
        return baseUrl;
    }
},
    secret: process.env.AUTH_SECRET
}