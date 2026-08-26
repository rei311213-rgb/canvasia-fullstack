import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const templates = [
  { name: 'Professional Certificate', category: 'templates', data: { version: 1, width: 760, height: 540, objects: [
    { id: 'border', kind: 'border', x: 22, y: 22, w: 716, h: 496 }, { id: 'title', kind: 'text', text: 'CERTIFICATE OF ACHIEVEMENT', x: 90, y: 120, fontSize: 30 }, { id: 'presented', kind: 'text', text: 'Presented to', x: 100, y: 190, fontSize: 20 }, { id: 'recipient', kind: 'text', text: 'RECIPIENT NAME', x: 100, y: 240, fontSize: 34 }
  ] } },
  { name: 'Church Weekly Bulletin', category: 'church', data: { version: 1, width: 760, height: 540, objects: [{ id: 'church', kind: 'text', text: 'SACRED HEART CATHOLIC CHURCH', x: 80, y: 80, fontSize: 28 }, { id: 'bulletin', kind: 'text', text: 'WEEKLY BULLETIN', x: 120, y: 145, fontSize: 34 }] } },
  { name: 'School Achievement', category: 'school', data: { version: 1, width: 760, height: 540, objects: [{ id: 'title', kind: 'text', text: 'STUDENT ACHIEVEMENT', x: 100, y: 110, fontSize: 32 }, { id: 'name', kind: 'text', text: 'STUDENT NAME', x: 100, y: 200, fontSize: 28 }] } },
  { name: 'Business Flyer', category: 'templates', data: { version: 1, width: 760, height: 540, objects: [{ id: 'heading', kind: 'text', text: 'YOUR BUSINESS', x: 90, y: 100, fontSize: 38 }, { id: 'offer', kind: 'text', text: 'Professional announcement', x: 90, y: 180, fontSize: 24 }, { id: 'shape', kind: 'shape', x: 90, y: 260, w: 240, h: 120 }] } },
  { name: 'Social Announcement', category: 'social', data: { version: 1, width: 760, height: 540, objects: [{ id: 'heading', kind: 'text', text: 'BIG ANNOUNCEMENT', x: 100, y: 150, fontSize: 36 }, { id: 'icon', kind: 'icon', text: '✓', x: 350, y: 260, fontSize: 56 }] } }
];
async function main(){ for(const t of templates) await prisma.template.upsert({where:{name:t.name},update:{category:t.category,data:t.data},create:t}); }
main().finally(()=>prisma.$disconnect());
