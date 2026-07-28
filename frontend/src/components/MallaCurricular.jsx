import { BookOpen, Clock } from "lucide-react";

const mallaModules = [
  { code: "PSB-101", name: "Proceso de Salud en Bolivia", year: "Primer año", competences: 4, hours: 80, days: 16 },
  { code: "PAU-102", name: "Primeros Auxilios", year: "Primer año", competences: 5, hours: 170, days: 34 },
  { code: "ECS-103", name: "Promoción de la Salud", year: "Primer año", competences: 3, hours: 80, days: 16 },
  { code: "TPB-104", name: "Técnicas y Procedimientos Básicos en Enfermería", year: "Primer año", competences: 5, hours: 300, days: 60 },
  { code: "SSR-105", name: "Salud Sexual y Reproductiva", year: "Primer año", competences: 6, hours: 280, days: 56 },
  { code: "AIM-106", name: "Atención al Menor de 5 Años y Edad Escolar", year: "Primer año", competences: 4, hours: 290, days: 58 },
  { code: "SAB-201", name: "Saneamiento Básico", year: "Segundo año", competences: 4, hours: 160, days: 32 },
  { code: "VIG-202", name: "Vigilancia Epidemiológica", year: "Segundo año", competences: 4, hours: 160, days: 32 },
  { code: "MTR-203", name: "Medicina Tradicional", year: "Segundo año", competences: 3, hours: 80, days: 16 },
  { code: "IAP-204", name: "Investigación de Acción Participativa y Operativa", year: "Segundo año", competences: 3, hours: 160, days: 32 },
  { code: "PPP-205", name: "Práctica Pre Profesional en Establecimientos Urbanos y Rurales", year: "Segundo año", competences: 0, hours: 640, days: null }
];

const competenceLabels = {
  0: "Práctica integradora",
  3: "3 competencias",
  4: "4 competencias",
  5: "5 competencias",
  6: "6 competencias"
};

export default function MallaCurricular() {
  const maxHours = Math.max(...mallaModules.map((module) => module.hours));
  const practicalHours = mallaModules.find((module) => module.code === "PPP-205")?.hours ?? 0;

  return (
    <section className="section curriculum-section" id="malla">
      <div className="curriculum-head">
        <div>
          <span className="eyebrow">Plan de estudios</span>
          <h2>Malla curricular</h2>
          <p>Una vista clara del plan de estudios: módulos, competencias, horas académicas y duración estimada.</p>
        </div>
        <div className="curriculum-total">
          <BookOpen size={22} />
          <strong>2.400 h</strong>
          <span>Carga total</span>
        </div>
      </div>

      <div className="curriculum-table-card">
        <div className="curriculum-table-intro">
          <div>
            <strong>Distribución académica</strong>
            <span>{practicalHours} horas de práctica pre profesional incluidas en el plan.</span>
          </div>
          <Clock size={22} aria-hidden="true" />
        </div>

        <div className="curriculum-table-wrap">
          <table className="curriculum-table">
            <thead>
              <tr>
                <th>Año</th>
                <th>Código</th>
                <th>Módulo</th>
                <th>Competencias</th>
                <th>Horas</th>
                <th>Días</th>
              </tr>
            </thead>
            <tbody>
              {mallaModules.map((module) => (
                <tr key={module.code}>
                  <td data-label="Año"><span className="curriculum-year">{module.year}</span></td>
                  <td data-label="Código"><span className="curriculum-code">{module.code}</span></td>
                  <td data-label="Módulo">
                    <strong className="curriculum-module-name">{module.name}</strong>
                    <div className="curriculum-progress" aria-hidden="true">
                      <span style={{ width: `${Math.max(10, (module.hours / maxHours) * 100)}%` }} />
                    </div>
                  </td>
                  <td data-label="Competencias">{competenceLabels[module.competences]}</td>
                  <td data-label="Horas"><strong>{module.hours} h</strong></td>
                  <td data-label="Días">{module.days ? `${module.days} días` : "Práctica intensiva"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
