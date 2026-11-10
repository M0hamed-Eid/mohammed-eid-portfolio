/**
 * A brief brand splash on hard page loads only.
 *
 * Deliberately has no React state: the overlay is server-rendered and dismisses
 * itself with a CSS animation, and `SessionVisitScript` marks repeat visits on
 * the document element *before* first paint so returning visitors never see it
 * flash over already-painted content. Keeping this out of React also keeps it
 * off the hydration path, so it cannot delay interactivity.
 */

const VISIT_SCRIPT = `try{var k='me-portfolio-visited';if(sessionStorage.getItem(k)){document.documentElement.classList.add('session-visited')}else{sessionStorage.setItem(k,'1')}}catch(e){}`;

export function SessionVisitScript() {
  return <script dangerouslySetInnerHTML={{ __html: VISIT_SCRIPT }} />;
}

export function LoadingScreen() {
  return (
    <div className="splash-screen" aria-hidden>
      <span className="font-display text-5xl">
        M<span className="text-gradient-brand animate-gradient">.</span>
      </span>
    </div>
  );
}
