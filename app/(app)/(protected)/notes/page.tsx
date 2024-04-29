import { createClient } from "@/utils/supabase/server";

const NotesPage = async () => {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();
  return (
    <main>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </main>
  );
};

export default NotesPage;
