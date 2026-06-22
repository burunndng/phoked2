import { db } from "../src/lib/db";
import { SYLLABUS } from "../src/lib/syllabus";

// Idempotent upsert seed: preserves existing Progress rows and cached lesson
// `content` / `generatedAt` when re-running after schema/data updates.
// Matches modules by `number` and lessons by (moduleId, number).
async function main() {
  console.log("Upserting syllabus (progress + cached content preserved)...");

  for (const m of SYLLABUS) {
    const moduleRow = await db.module.upsert({
      where: { number: m.number },
      update: {
        title: m.title,
        theme: m.theme,
        description: m.description,
        accent: m.accent,
      },
      create: {
        number: m.number,
        title: m.title,
        theme: m.theme,
        description: m.description,
        accent: m.accent,
      },
    });

    for (const l of m.lessons) {
      await db.lesson.upsert({
        where: { moduleId_number: { moduleId: moduleRow.id, number: l.number } },
        update: {
          lessonCode: l.lessonCode,
          globalOrder: l.globalOrder,
          concept: l.concept,
          keyFigures: l.keyFigures,
          coreClaim: l.coreClaim,
          vector: l.vector,
          status: l.status,
          criticalNote: l.criticalNote ?? null,
          // content / generatedAt / progress preserved on update
        },
        create: {
          moduleId: moduleRow.id,
          number: l.number,
          lessonCode: l.lessonCode,
          globalOrder: l.globalOrder,
          concept: l.concept,
          keyFigures: l.keyFigures,
          coreClaim: l.coreClaim,
          vector: l.vector,
          status: l.status,
          criticalNote: l.criticalNote ?? null,
        },
      });
    }
    console.log(`  Module ${m.number}: ${m.lessons.length} lessons upserted`);
  }

  const moduleCount = await db.module.count();
  const lessonCount = await db.lesson.count();
  const contested = await db.lesson.count({ where: { status: "contested" } });
  const active = await db.lesson.count({
    where: { status: "actively-debated" },
  });
  console.log(
    `\nDone. ${moduleCount} modules, ${lessonCount} lessons (${contested} contested, ${active} actively-debated).`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
