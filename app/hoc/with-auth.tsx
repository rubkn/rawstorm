import { auth } from "@/lib/auth";
import { Session } from "next-auth";

type WithAuthProps = {
  session: Session | null;
};

type ComponentType<P = object> = React.ComponentType<P>;

export function WithAuth<P extends WithAuthProps>(
  WrappedComponent: ComponentType<P>
) {
  return async function AuthenticatedComponent(
    props: Omit<P, keyof WithAuthProps>
  ) {
    const session = await auth();

    return <WrappedComponent {...(props as P)} session={session} />;
  };
}
