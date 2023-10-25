<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" v-model="email" required />
        </div>
        <div class="form-group">
            <label for="lastName">Прізвище:</label>
            <input type="text" class="form-control" id="lastName" v-model="lastName" required />
        </div>
        <div class="form-group">
            <label for="firstName">Ім’я:</label>
            <input type="text" class="form-control" id="firstName" v-model="firstName" required />
        </div>
        <div class="form-group">
            <label for="middleName">По батькові:</label>
            <input type="text" class="form-control" id="middleName" v-model="middleName" required />
        </div>
        <div class="form-group">
            <label for="birthDate">Дата народження:</label>
            <input type="date" class="form-control" id="birthDate" v-model="birthDate" required />
        </div>
        <div class="form-group">
            <label for="group">Група:</label>
            <select class="form-control" id="group" v-model="group">
                <option value="ІА-21">ІА-21</option>
                <option value="ІА-22">ІА-22</option>
                <option value="ІА-23">ІА-23</option>
                <option value="ІА-24">ІА-24</option>
            </select>
        </div>
        <div class="form-group">
            <label>Стать:</label><br />
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="gender-male" name="gender" value="Чоловік" v-model="gender" />
                <label class="form-check-label" for="gender-male">Чоловік</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="gender-female" name="gender" value="Жінка" v-model="gender" />
                <label class="form-check-label" for="gender-female">Жінка</label>
            </div>
        </div>
        <div class="form-group">
            <label for="phone">Номер телефону:</label>
            <input type="tel" class="form-control" id="phone" v-model="phone" required pattern="\+380[0-9]{9}" />
        </div>
        <button type="submit">Додати рядок</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            lastName: '',
            firstName: '',
            middleName: '',
            birthDate: '',
            group: 'group1',
            gender: 'male',
            phone: '+380',
        };
    },
    methods: {
        submitForm() {
            if (this.validateFormData()) {
                this.$emit('form-submitted', {
                    email: this.email,
                    lastName: this.lastName,
                    firstName: this.firstName,
                    middleName: this.middleName,
                    birthDate: this.birthDate,
                    group: this.group,
                    gender: this.gender,
                    phone: this.phone,
                });
                this.resetForm();
            }
        },
        resetForm() {
            this.email = '';
            this.lastName = '';
            this.firstName = '';
            this.middleName = '';
            this.birthDate = '';
            this.group = 'group1';
            this.gender = 'male';
            this.phone = '+380';
        },
        validateFormData() {
            const phonePattern = /^\+380[0-9]{9}$/;
            if (!phonePattern.test(this.phone)) {
                this.$emit('error', 'Невірний формат номеру телефону.');
                return false;
            }
            return true;
        },
    },
};
</script>

