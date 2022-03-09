<script lang="ts">
  import { user } from '../stores'

  export let onSubmit: () => void

  let name: string = ''
  let age: string = ''

  const diseases = {
    diabete: false,
    cataracte: false,
    myopie: false,
    presbytie: false,
    glaucome: false,
    autres: false
  }

  const submit = (): void => {
    const diseasesValue = []
    Object.keys(diseases).forEach(disease => {
      if (diseases[disease]) {
        diseasesValue.push(disease)
      }
    })

    $user = {
      name,
      age: Number(age),
      diseases: diseasesValue
    }

    onSubmit()
  }
</script>

<div class="container py-5">
  <h1 class="fs-4 mb-2">Veuillez nous en dire un peu plus sur vous:</h1>
  <div class="mb-3">
    <label for="name" class="form-label">Votre prénom:</label>
    <input type="text" class="form-control" id="name" bind:value={name} placeholder="Joséphine">
  </div>

  <div class="mb-3">
    <label for="name" class="form-label">Votre âge:</label>
    <select class="form-select" bind:value={age}>
      {#each [...Array(80).keys()].map(x => x+15) as age}
        <option value={age}>{age}</option>
      {/each}
    </select>
  </div>

  <div class="mb-3">
    <p class="m-0">J'ai déjà été confronté à une de ces maladies:</p>
    <div class="ms-3">
      {#each Object.keys(diseases) as disease}
        <!-- content here -->
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" bind:checked={diseases[disease]} id={disease}>
          <label class="form-check-label" for={disease}>
            {disease}
          </label>
        </div>
      {/each}
    </div>
  </div>

  <div class="d-flex justify-content-center">
    <button class="btn btn-primary m-auto" on:click={submit}>Valider!</button>
  </div>
</div>

<style>
  .container {
    max-height: 100%;
    overflow-y: scroll;
  }
</style>