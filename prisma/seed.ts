import { db } from "../src/lib/db";
import { SYLLABUS } from "../src/lib/syllabus";

async function main() {
  console.log("Seeding syllabus...");

  // Wipe existing data (idempotent re-seed)
  await db.progress.deleteMany();
  await db.lesson.deleteMany();
  await db.module.deleteMany();

  for (const m of SYLLABUS) {
    const moduleRow = await db.module.create({
      data: {
        number: m.number,
        title: m.title,
        theme: m.theme,
        description: m.description,
        accent: m.accent,
      },
    });

    for (const l of m.lessons) {
      await db.lesson.create({
        data: {
          moduleId: moduleRow.id,
          number: l.number,
          lessonCode: l.lessonCode,
          globalOrder: l.globalOrder,
          concept: l.concept,
          originators: l.originators,
          coreClaim: l.coreClaim,
          vector: l.vector,
        },
      });
    }
    console.log(`  Module ${m.number}: ${m.lessons.length} lessons seeded`);
  }

  const moduleCount = await db.module.count();
  const lessonCount = await db.lesson.count();
  console.log(`\nDone. ${moduleCount} modules, ${lessonCount} lessons in database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
